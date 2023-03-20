import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const DoerViewer = ({ route, navigation }) => {
    const id = route.params?.id
    const [storage,setStorage] = useState([])
    const [isPinned, setIsPinned] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [isEditted,setIsEditted] = useState(false)
    
    const handleBack = () => {
        navigation.goBack()
    };
    const handleDelete = () => {
        let data = storage
        const dataNew= data.filter(item => item.id != id)
        saveToStorage(dataNew)
        navigation.goBack();
    };

    const handlePinClick = () => {
        setIsPinned(!isPinned); // function change
        let data = storage
        data.map(item => {
            if(item.id == id) {
                item.pinned = !isPinned
            }
        })
        saveToStorage(data)
        if (!isPinned){
            ToastAndroid.show("You pinned a note", ToastAndroid.SHORT);

        }
    };
    const handleStarred = () => {
        setIsStarred(!isStarred);
        let data = storage
        data.map(item => {
            if(item.id == id) {
                item.starred = !isStarred
            }
        })
        saveToStorage(data)
        if (!isStarred)
            ToastAndroid.show("You Starred a note", ToastAndroid.SHORT);
    };

    const handleSave =() => {
        let data = storage
        data.map(item => {
            if(item.id == id) {
                item.title = title
                item.note = note
                item.pinned = isPinned
                item.starred = isStarred
            }
        })
        saveToStorage(data)
        Keyboard.dismiss()
        navigation.navigate("Home",{edit:"yes"})
    }

    const saveToStorage = async (_storage) => {
        const _storageJson = JSON.stringify(_storage)
        await AsyncStorage.setItem("@doers",_storageJson)

    }
    const getData = async() => {
        let data = await AsyncStorage.getItem("@doers")
        let dataJson = JSON.parse(data)
        setStorage(dataJson)
        getCurrent(id,dataJson)
    }

    const getCurrent = (id,storage) => {
        let _current_doer = storage.filter(item => item.id == id)
        let _current = _current_doer[0]
        setTitle(_current?.title)
        setNote(_current?.note)
        setIsPinned(_current?.pinned)
        setIsStarred(_current?.starred)
        
    }

    useEffect(() => {
        getData()
        
    },[id])
    return (
        <View style={styles.container}>
            <View style={styles.InputContainer}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity>
                        <AntDesign
                            name="arrowleft"
                            size={28}
                            color="black"
                            style={{ marginRight: 10 }}
                            onPress={handleBack}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Edit Doer</Text>
                    {isEditted &&  (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={styles.headerIcons}
                        onPress={handlePinClick}
                    >
                        <MaterialCommunityIcons
                            name={isPinned ? "pin-off" : "pin"}
                            size={28}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerIcons}
                        onPress={handleStarred}
                    >
                        <AntDesign
                            name={isStarred ? "star" : "staro"}
                            size={28}
                            color="black"
                            style={{ alignSelf: "center" }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcons}>
                        <AntDesign
                            name="delete"
                            size={28}
                            color="black"
                            style={{ alignSelf: "center" }}
                            onPress={handleDelete}
                        />
                    </TouchableOpacity>
                </View>
                {/* Input */}
                <View style={styles.NewDoerContainer}>
                    <TextInput
                        style={styles.inputTitle}
                        placeholder="Title"
                        multiline={true}
                        numberOfLines={2}
                        textAlignVertical="top"
                        maxLength={100}
                        onChangeText={setTitle}
                        onChange={() => setIsEditted(true)}
                        value={title}
                    ></TextInput>
                    <TextInput
                        style={styles.inputNote}
                        placeholder="Note"
                        multiline={true}
                        numberOfLines={11}
                        textAlignVertical="top"
                        onChangeText={setNote}
                        onChange={() => setIsEditted(true)}

                        value={note}
                    ></TextInput>
                </View>
            </View>
        </View>
    );
};

export default DoerViewer;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFCFD",
        alignItems: "center",
        justifyContent: "center",
    },
    InputContainer: {
        flex: 1,
        backgroundColor: "#FBFCFD",
        width: "100%",
        padding: 15,
        paddingTop: 10,
    },
    headerContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        height: 50,
    },
    headerText: {
        fontFamily: "Inter_500Medium",
        fontSize: 21,
        flex: 1,
    },
    headerIcons: {
        marginLeft: 5,
    },
    NewDoerContainer: {
        flex: 1,
        width: "100%",
        borderWidth: 1,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#DFE3E6",
        marginBottom: 10,
    },
    inputTitle: {
        fontFamily: "Inter_400Regular",
        fontSize: 20,
        textAlign: "left",
        alignItems: "flex-start",
        alignContent: "flex-start",
        marginBottom: 20,
    },
    inputNote: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
    },button: {
        backgroundColor: "#DFE3E6",
        paddingVertical: 6,
        paddingHorizontal: 9,
        borderRadius: 7,
        marginLeft:11
    },
    buttonText: {
        fontSize: 15,
        fontFamily: "Inter_500Medium",
    },
});

import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CodeViewer({navigation,route}) {
    const id = route.params?.id
    const [storage,setStorage] = useState([])
    const [theme, setTheme] = useState("dark");
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");

    const handleBack = () => {
        navigation.goBack();
    };
    const handleTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
    };

    const saveCodeToStorage = async (id) => {
        let data = storage;
        data.map(one => {
            if(one.id == id) {
                one.title = title
                one.code = code
            }
        });
        let jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem("@codes", jsonValue);
    };
    const removeCodeFromStorage = async (id) => {
        let data = storage;
        let newdata = data.filter(one => one.id != id );
        let jsonValue = JSON.stringify(newdata);
        await AsyncStorage.setItem("@codes", jsonValue);
    };
    const handleSave = () => {
        saveCodeToStorage(id);
        navigation.goBack();
        Keyboard.dismiss()
    };

    const getData = async () => {
        const data = await AsyncStorage.getItem("@codes");
        const jsonValue = JSON.parse(data) || [];
        setStorage(jsonValue);
        getCurrent(id,jsonValue)
        
    };
    const getCurrent = (id,storage) => {
        let copy = storage.filter(item =>  item.id == id)
        let ob = copy[0]
        setTitle(ob.title)
        setCode(ob.code)


    }

    // delete code
    const handleDelete =() => {
        removeCodeFromStorage(id)
        navigation.goBack()

    }

    useEffect(() => {
        getData();
    }, [id]);
    return (
        <View style={styles.container}>
            <View style={styles.InputContainer}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <AntDesign
                        name="arrowleft"
                        size={28}
                        color="black"
                        style={{ marginRight: 10 }}
                        onPress={() => handleBack()}
                    />
                    <Text style={styles.headerText}>Code</Text>
                    {title && code && (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSave}
                            disabled={!title && !code}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.headerIcons}>
                        <AntDesign
                            name="delete"
                            size={28}
                            color="black"
                            style={{ alignSelf: "center" }}
                            onPress={handleDelete}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerIcons}
                        onPress={handleTheme}
                    >
                        <Feather
                            name={theme == "light" ? "moon" : "sun"}
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                {/* Input */}
                <View
                    style={[
                        styles.NewCodeContainer,
                        {
                            backgroundColor:
                                theme == "light" ? "white" : "#3A3E4E",
                        },
                    ]}
                >
                    {/* ask for which language */}
                    {/* title */}
                    <TextInput
                        style={[
                            styles.inputCodeTitle,
                            { color: theme == "light" ? "#687076" : "#C6C6C6" },
                        ]}
                        placeholder="for what is this code is?"
                        multiline={true}
                        numberOfLines={2}
                        textAlignVertical="top"
                        maxLength={100}
                        onChangeText={setTitle}
                        value={title}
                        placeholderTextColor={
                            theme == "light" ? "#687076" : "#C6C6C6"
                        }
                    ></TextInput>
                    {/* code */}
                    <TextInput
                        style={[
                            styles.inputCode,
                            { color: theme == "light" ? "#687076" : "#C6C6C6" },
                        ]}
                        placeholder="Code in your preferred language"
                        multiline={true}
                        numberOfLines={11}
                        textAlignVertical="top"
                        onChangeText={setCode}
                        value={code}
                        placeholderTextColor={
                            theme == "light" ? "#687076" : "#C6C6C6"
                        }
                    ></TextInput>
                </View>
            </View>
        </View>
    )
}

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
        marginLeft: 11,
    },
    NewCodeContainer: {
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
    inputCodeLanguage: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
        textAlign: "left",
        alignItems: "flex-start",
        alignContent: "flex-start",
        marginBottom: 10,
        color: "white",
    },
    inputCodeTitle: {
        fontFamily: "Inter_400Regular",
        fontSize: 20,
        textAlign: "left",
        alignItems: "flex-start",
        alignContent: "flex-start",
        marginBottom: 20,
        color: "white",
    },
    inputCode: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
    },
    button: {
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

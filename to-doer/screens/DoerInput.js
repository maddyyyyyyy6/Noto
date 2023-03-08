import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const DoerInput = ({ navigation }) => {
    const [isPinned, setIsPinned] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const titleInputRef = useRef(null);

    const now = new Date();
    const id = now.getTime();
    const handleBack = () => {
        if (title) {
            navigation.navigate("Home", {
                doer: {
                    title: title,
                    note: note,
                    id: id,
                    starred: isStarred,
                    pinned: isPinned,
                },
            });
        } else if (note) {
            navigation.navigate("Home", {
                doer: {
                    note: note,
                    id: id,
                    starred: isStarred,
                    pinned: isPinned,
                },
            });
        } else {
            navigation.navigate("Home");
        }
    };
    const handlePinned = () => {
        setIsPinned(!isPinned);
    };
    const handleStarred = () => {
        setIsStarred(!isStarred);
    };

    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);
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
                    <Text style={styles.headerText}>New Doer?</Text>
                    <TouchableOpacity
                        style={styles.headerIcons}
                        onPress={handlePinned}
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
                </View>
                {/* Input */}
                <View style={styles.NewDoerContainer}>
                    <TextInput
                        ref={titleInputRef}
                        style={styles.inputTitle}
                        placeholder="Title"
                        multiline={true}
                        numberOfLines={2}
                        textAlignVertical="top"
                        maxLength={100}
                        onChangeText={setTitle}
                        value={title}
                    ></TextInput>
                    <TextInput
                        style={styles.inputNote}
                        placeholder="Note"
                        multiline={true}
                        numberOfLines={11}
                        textAlignVertical="top"
                        onChangeText={setNote}
                        value={note}
                    ></TextInput>
                </View>
            </View>
        </View>
    );
};
export default DoerInput;
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
        paddingTop: 30,
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
    },
});

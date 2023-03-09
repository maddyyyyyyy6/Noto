import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const CodeInput = ({ navigation }) => {
    const [theme, setTheme] = useState("light");
    const [isPinned, setIsPinned] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const titleInputRef = useRef(null);

    const now = new Date();
    const id = now.getTime();
    const handleBack = () => {
        navigation.goBack();
    };
    const handleTheme = () => {
        setTheme(theme == "light" ? "dark" : "light");
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
                    <Text style={styles.headerText}>Code</Text>
                    {/* <TouchableOpacity
                        style={styles.headerIcons}
                        onPress={handlePinned}
                    >
                        <MaterialCommunityIcons
                            name={isPinned ? "pin-off" : "pin"}
                            size={28}
                            color="black"
                        />
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity
                        style={styles.headerIcons}
                        onPress={handleStarred}
                    >
                        <AntDesign
                            name={isStarred ? "star" : "staro"}
                            size={28}
                            color="black"
                            style={{ alignSelf: "center" }}
                        />
                    </TouchableOpacity> */}
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
                    <TextInput
                        ref={titleInputRef}
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
                    <TextInput
                        style={[
                            styles.inputCode,
                            { color: theme == "light" ? "#687076" : "#C6C6C6" },
                        ]}
                        placeholder="Code your preferred language"
                        multiline={true}
                        numberOfLines={11}
                        textAlignVertical="top"
                        onChangeText={setNote}
                        value={note}
                        placeholderTextColor={
                            theme == "light" ? "#687076" : "#C6C6C6"
                        }
                    ></TextInput>
                </View>
            </View>
        </View>
    );
};
export default CodeInput;
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
});
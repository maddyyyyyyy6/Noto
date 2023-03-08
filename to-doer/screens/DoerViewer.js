import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
const DoerViewer = ({ route, navigation }) => {
    const [isPinned, setIsPinned] = useState(doerInfo?.pinned);
    const [isStarred, setIsStarred] = useState(doerInfo?.starred);

    const doerInfo = route.params?.doer;
    useEffect(() => {
        const newinfo = route.params.doer;
        setIsPinned(newinfo.pinned);
        setIsStarred(newinfo.starred);
    }, [route.params?.doer]);

    const handleBack = () => {
        navigation.navigate("Home");
    };
    const handleDelete = () => {
        navigation.goBack();
        doerInfo.deletion(doerInfo.id);
    };

    const handlePinClick = () => {
        setIsPinned(!isPinned);
        if (!isPinned)
            ToastAndroid.show("You pinned a note", ToastAndroid.SHORT);
    };
    const handleStarred = () => {
        setIsStarred(!isStarred);
        if (!isStarred)
            ToastAndroid.show("You Starred a note", ToastAndroid.SHORT);
    };
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
                            color={isStarred ? "gold" : "black"}
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
                    >
                        {doerInfo.title}
                    </TextInput>
                    <TextInput
                        style={styles.inputNote}
                        placeholder="Note"
                        multiline={true}
                        numberOfLines={11}
                        textAlignVertical="top"
                    >
                        {doerInfo.note}
                    </TextInput>
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

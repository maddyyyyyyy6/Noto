import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const DoerViewer = ({ route, navigation }) => {
    const doerInfo = route.params?.doer;
    const handleBack = () => {
        navigation.navigate("Home");
    };
    const handleDelete = () => {
        navigation.goBack();
        doerInfo.deletion(doerInfo.id);
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
                    <AntDesign
                        name="delete"
                        size={24}
                        color="black"
                        style={{ alignSelf: "center" }}
                        onPress={handleDelete}
                    />
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

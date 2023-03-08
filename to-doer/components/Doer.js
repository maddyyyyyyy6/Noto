import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Doer = ({ title, note,id, navigation }) => {
    const handleViewer = () => {
        navigation.navigate("Viewer", {
            doer: {
                title: title,
                note: note,
                id:id
            },
        });
    };
    return (
        <TouchableOpacity
            style={[styles.doerContainer]}
            activeOpacity={0.9}
            onPress={handleViewer}
        >
            <Text style={styles.doerTitle}>{title}</Text>
            <Text style={styles.doerDes}>{note}</Text>
        </TouchableOpacity>
    );
};
export default Doer;

const styles = StyleSheet.create({
    doerContainer: {
        borderWidth: 1,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#DFE3E6",
        marginBottom: 10,
    },
    doerTitle: {
        fontSize: 24,
        color: "#687076",
        fontWeight: "500",
        fontFamily: "Inter_500Medium",
    },
    doerDes: {
        fontSize: 17,
        color: "#687076",
        fontWeight: "200",
        fontFamily: "Inter_100Thin",
    },
    shadowDoer: {
        shadowColor: "#7A7A7A",
        shadowOffset: {
            width: -1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 4.22,

        elevation: 3,
    },
});

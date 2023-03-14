import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Doer = ({ title, note, id, navigation, deletion, starred, pinned }) => {
    const [selected,setSelected] = useState(false)
    const handlePress = () => {
        if(selected) {
            setSelected(false)
        }else{
            handleViewer(); // Call the onPress event handler
        }
    };
    const handleLongPress = () => {
        setSelected(true)
    };
    const handleViewer = () => {
        navigation.navigate("Viewer", {
            doer: {
                title: title,
                note: note,
                id: id,
                deletion: deletion,
                starred: starred,
                pinned: pinned,
            },
        });
    };

    const getData = () => {
    }
    return (
        <TouchableOpacity
            style={[styles.doerContainer, { borderWidth: selected?2.5:1,borderColor:selected?"gray":"#DFE3E6", }]}
            activeOpacity={0.7}
            onPress={handlePress}
            onLongPress={handleLongPress}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.doerTitle}>{title}</Text>
                {pinned && (
                    <MaterialCommunityIcons
                        name="pin"
                        size={20}
                        color="black"
                    />
                )}
            </View>
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
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        fontFamily: "Inter_300Light",
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

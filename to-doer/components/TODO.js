import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// constants
const todo = { background: "#BFF2F5", fontColor: "#00939C" };
const working = { background: "#E7D7FE", fontColor: "#814DA7" };
const done = { background: "#CEF2DE", fontColor: "#458860" };

export default function TODO ({title,text,state}) {
    const track = state

    const getTrackColor = () => {
        if (track == "to-do") return todo.background;
        if (track == "working") return working.background;
        if (track == "done") return done.background;
      };
      const getNewBarTextColor = () => {
        if (track == "to-do") return todo.fontColor;
        if (track == "working") return working.fontColor;
        if (track == "done") return done.fontColor;
      };
    return (
        <TouchableOpacity
            style={[styles.doerContainer,{backgroundColor:getTrackColor(),borderColor:getNewBarTextColor()}]}
            activeOpacity={0.7}
            // onPress={handlePress}
        >
            <View style={styles.headerContainer}>
                <Text style={[styles.doerTitle,{color:getNewBarTextColor()}]}>{title}</Text>
            </View>
            <Text style={[styles.doerDes,{color:getNewBarTextColor()}]}>{text}</Text>
        </TouchableOpacity>
    )
}

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
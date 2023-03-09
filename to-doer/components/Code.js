import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Code({ title, code }) {
    return (
        <View style={styles.codeContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <View style={styles.codeViewContainer}>
                <Text style={styles.codeText}>{code}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    codeContainer: {
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#DFE3E6",
        marginBottom: 10,
        overflow: "hidden",
    },
    headerContainer: {
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontFamily: "Inter_500Medium",
    },
    codeViewContainer: {
        backgroundColor: "#3A3E4E",
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        color: "white",
    },
    codeText: {
        color: "white",
        fontSize: 14,
        color: "#687076",
        fontWeight: "600",
        fontFamily: "Inter_500Medium",
    },
});

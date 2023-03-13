import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Code({ title, code, language }) {
    return (
        <View style={styles.codeContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{title}</Text>
                <View style={styles.chipLanguage}>
                    <Text style={styles.languageText}>{language}</Text>
                </View>
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
        flexDirection: "row",
        justifyContent: "space-between",
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
        color: "#DFE3E6",
        fontWeight: "600",
        fontFamily: "Inter_500Medium",
    },
    chipLanguage: {
        backgroundColor: "#DFE3E6",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: 9,
    },
    languageText: {
        fontSize: 11,
        color: "#687076",
        fontFamily: "Inter_500Medium",
    },
});

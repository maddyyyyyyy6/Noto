import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from "react-native";
import Doer from "../components/Doer";
import { useState, useRef, useEffect } from "react";

export default function Home({ navigation, route }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const timeString = currentDate.toLocaleTimeString();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const flatListRef = useRef();
    const [doers, setDoers] = useState([
    
    ]);

    useEffect(() => {
        const newDoer = route.params?.doer;
        if (newDoer) {
            setDoers([...doers, newDoer]);
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [route.params?.doer]);

    return (
        <View style={styles.container}>
            <View style={styles.homeContainer}>
                {/* search bar component */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchText}
                            placeholder="Search to-doer"
                        ></TextInput>
                    </View>
                </View>
                {/* chip component */}
                <View style={styles.chipsContainer}>
                    <TouchableHighlight style={styles.chipItem}>
                        <Text style={styles.chipText}>
                            {/* 06-March-2023 {Date}-{Month}-{Year} */}
                            {formattedDate}
                        </Text>
                    </TouchableHighlight>
                    <TouchableOpacity style={styles.chipItem}>
                        <Text style={styles.chipText}>{timeString}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    ref={flatListRef}
                    data={doers}
                    renderItem={({ item }) => (
                        <Doer
                            title={item.title}
                            note={item.note}
                            navigation={navigation}
                            id={item.id}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    bounces="true"
                />
                <View style={styles.newDoerContainer}>
                    <View
                        style={styles.newDoerBar}
                        // TODO:make it navigating
                    >
                        <Text
                            onPress={() => navigation.navigate("DoerInput")}
                            style={styles.newDoerText}
                        >
                            New Doer?
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBFCFD",
        alignItems: "center",
        justifyContent: "center",
    },
    homeContainer: {
        flex: 1,
        backgroundColor: "#FBFCFD",
        width: "100%",
        padding: 15,
        paddingTop: 30,
    },
    searchContainer: {
        // width: "100%",
        // height: 20,
    },
    searchBar: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#DFE3E6",
    },
    searchText: {
        fontSize: 20,
        color: "#DFE3E6",
        color: "#687076",
        fontWeight: "semibold",
        fontFamily: "Inter_400Regular",
    },
    newDoerBar: {
        width: "100%",
        backgroundColor: "#DFE3E6",
        padding: 10,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#DFE3E6",
        marginTop: 9,
    },
    newDoerText: {
        fontSize: 20,
        color: "#687076",
        fontWeight: "medium",
        fontFamily: "Inter_400Regular",
    },
    chipsContainer: {
        flexDirection: "row",
        marginVertical: 9,
    },
    chipItem: {
        backgroundColor: "#DFE3E6",
        marginRight: 15,
        borderRadius: 11,
        // padding: 5,
        paddingVertical: 6,
        paddingHorizontal: 9,
    },
    chipText: {
        color: "#687076",
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Inter_500Medium",
    },
    doerView: {
        width: "10%",
        flex: 1,
    },
});

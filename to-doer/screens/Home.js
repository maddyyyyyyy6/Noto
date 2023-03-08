import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import Doer from "../components/Doer";
import { useState, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Home({ navigation, route }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showStarred, setShowStarred] = useState(false);
    const timeString = currentDate.toLocaleTimeString();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    // for asyncstorage

    const storeData = async (doers) => {
        try {
            const jsonValue = JSON.stringify(doers);
            await AsyncStorage.setItem("@doers", jsonValue);
        } catch (e) {
            // saving error
        }
    };

    // getting data

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@doers");
            const data = JSON.parse(jsonValue) || [];
            setDoers(data);
        } catch (e) {
            // error reading value
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const [doers, setDoers] = useState([
        {
            title: "Welcome Coding🎈",
            note: "Welcome to To-Doer, the innovative task management application designed specifically for programmers. Our app provides you with a comprehensive platform to organize your tasks, set priorities, and monitor your progress.",
            id: "18082004",
            starred: true,
            pinned: false,
        },
        {
            title: "testing",
            note: "testin",
            id: "180820",
            starred: true,
            pinned: false,
        },
    ]);

    useEffect(() => {
        let newDoer = route.params?.doer;
        if (newDoer) {
            setDoers([...doers, newDoer]);
            storeData([...doers, newDoer]);
            newDoer = "";
        }
        let editDoer = route.params?.editDoer;
        if (editDoer) {
            let copyDoers = doers;
            copyDoers.map((doer) => {
                if (doer.id == editDoer.id) {
                    doer.title = editDoer.title;
                    doer.note = editDoer.note;
                    doer.starred = editDoer.starred;
                    doer.pinned = editDoer.pinned;
                }
            });

            setDoers(copyDoers);
            storeData(copyDoers);
        }
    }, [route.params]);

    const handleDeleteDoer = (id) => {
        const updateDoers = doers.filter((one) => one.id != id);
        setDoers(updateDoers);
    };

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
                    <ScrollView
                        bouncesZoom={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.chipItem}
                        >
                            <Text style={styles.chipText}>{formattedDate}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.chipItem}
                        >
                            <Text style={styles.chipText}>{timeString}</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.chipItem}
                        >
                            <MaterialCommunityIcons
                                name="pin"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.chipItem, styles.chipSelecteds]}
                        >
                            <AntDesign
                                name="star"
                                size={20}
                                color="black"
                                style={{ alignSelf: "center" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.chipItem}
                        >
                            <Ionicons name="school" size={20} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.chipItem}
                        >
                            <AntDesign
                                name="codesquareo"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.chipItem}
                        >
                            <Entypo name="code" size={20} color="black" />
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <ScrollView>
                    {doers.map((item) => (
                        <Doer
                            title={item.title}
                            note={item.note}
                            navigation={navigation}
                            id={item.id}
                            key={item.id}
                            deletion={handleDeleteDoer}
                            starred={item.starred}
                            pinned={item.pinned}
                        />
                    ))}
                </ScrollView>
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
    chipSelected: {
        borderWidth: 2,
        borderColor: "#687076",
    },
    doerView: {
        width: "10%",
        flex: 1,
    },
});

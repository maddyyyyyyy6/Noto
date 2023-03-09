import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Doer from "../components/Doer";
export default function Starred({ navigation }) {
    const [isStarred, setIsStarred] = useState(false);
    const [list, setList] = useState([]);

    // get list from async storage

    const getData = async () => {
        try {
            const datalist = await AsyncStorage.getItem("@doers");
            const data = JSON.parse(datalist) || [];

            // sort it by starred
            const notolist = data.filter((item) => item.starred);
            setList(notolist);
        } catch (e) {
            //
        }
    };

    // console.log(list);
    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.StarredContainer}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity>
                        <AntDesign
                            name="arrowleft"
                            size={28}
                            color="black"
                            style={{ marginRight: 10 }}
                            onPress={() => navigation.goBack()}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Starred</Text>

                    <TouchableOpacity style={styles.headerIcons}>
                        <AntDesign
                            name={isStarred ? "star" : "staro"}
                            size={28}
                            color="black"
                            style={{ alignSelf: "center" }}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.notoContainer}>
                    {list.map((item) => (
                        <Doer
                            title={item.title}
                            note={item.note}
                            navigation={navigation}
                        />
                    ))}
                </ScrollView>
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
    StarredContainer: {
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
    notoContainer: {
        flex: 1,
        width: "100%",
    },
});

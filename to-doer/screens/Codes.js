import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Code from "../components/Code";
export default function Codes({ navigation }) {
    const [codes, setCodes] = useState([]);
    const [languages, setLanguages] = useState([
        "Python",
        "Javascript",
        "C++",
        "Swift",
        "Scala",
        "Rust",
        "Bash",
    ]);

    // get list from async storage

    const getData = async () => {
        try {
            const datalist = await AsyncStorage.getItem("@codes");
            const data = JSON.parse(datalist) || [];

            // sort it by starred
            const codeslist = data.filter((item) => item.starred);
            codeslist.push({
                title: "Python",
                code: `print("Hello, World!")`,
            });
            codeslist.push({
                title: "Javascript",
                code: `<View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchText}
                            placeholder="Search Codes"
                        ></TextInput>
                    </View>`,
            });
            codeslist.push({
                title: "Python OOPs",
                code: `class <ClassName>:

    <class_attribute_name> = <value>

    def __init__(self,<param1>, <param2>, ...):
        self.<attr1> = <param1>
        self.<attr2> = <param2>
        .
        .
        .
        # As many attributes as needed
    
   def <method_name>(self, <param1>, ...):
       <code>
       
   # As many methods as needed`,
            });

            codeslist.push({
                title: "Python Function()",
                code: `def __init__(self, <parameter1>, <parameter2>, ...):
        self.<attribute1> = <parameter1>  # Instance attribute
        self.<attribute2> = <parameter2>  # Instance attribute
        .
        .
        .
        # As many instance attributes as needed`,
            });
            setCodes(codeslist);
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
            <View style={styles.CodesContainer}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchText}
                            placeholder="Search Codes"
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.chipsContainer}>
                    <ScrollView
                        bouncesZoom={true}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {/* <TouchableOpacity
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
                        </TouchableOpacity> */}

                        {/* some chips for languages */}
                        {languages.map((language) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.chipItem, styles.chipSelecteds]}
                            >
                                <Text style={styles.chipText}>{language}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <ScrollView
                    style={styles.notoContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {codes.map((item) => (
                        <Code
                            title={item.title}
                            code={item.code}
                            navigation={navigation}
                        />
                    ))}
                </ScrollView>
                <View>
                    <View style={styles.newCodesBar}>
                        <Text style={styles.newCodeText}>New Code?</Text>
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
    CodesContainer: {
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
    notoContainer: {
        flex: 1,
        width: "100%",
    },
    newCodesBar: {
        width: "100%",
        backgroundColor: "#DFE3E6",
        padding: 10,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: "#DFE3E6",
        marginTop: 9,
    },
    newCodeText: {
        fontSize: 20,
        color: "#687076",
        fontWeight: "medium",
        fontFamily: "Inter_400Regular",
    },
});

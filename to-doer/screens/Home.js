import { StatusBar } from "expo-status-bar";
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
import { useState } from "react";
import {
    useFonts,
    Inter_100Thin,
    Inter_400Regular,
    Inter_500Medium,
} from "@expo-google-fonts/inter";
const Data = [
    {
        title: "Hacking",
        des: "Then, you can integrate it in your project by using the useFonts hook. You can directly use this hook from the Google Fonts package. Under the hood, the hook uses Font.loadAsync. You do not have to explicitly import the font file since that is done by the package itself.",
    },
    {
        title: "Hacking",
        des: "can  the hook uses Font.loadAsync. You do not have to explicitly import the font file since that is done by the package itself.",
    },
    {
        title: "Hacking",
        des: "ct the font file since that is done by the package itself.",
    },
    {
        title: "Hacking",
        des: "ct the font file since that is done by the package itself.",
    },
    {
        title: "Hacking",
        des: "ct the font file since that is done by the package itself.",
    },
    {
        title: "Hacking",
        des: "ct the font file since that is done by the package itself.",
    },
    {
        title: "Hacking",
        des: "ct the font file since that is done by the package itself.",
    },
    {
        title: "Hacking",
        des: "ct the font file since that is done by the package itself.",
    },
    {
        title: "Loading fonts on web",
        des: "Sometimes, particularly on the web -- people choose to render their content in a platform default font while their custom font is loading. Alternatively, to render the rest of their content, that doesn't depend on the custom font while the font is loading. These approaches are called FOUT and FOIT and you can read a lot more about them on the web.In general, these strategies are not recommended for native apps. If you include your fonts in your project, the fonts will always be delivered to the user by the time your code is running. The one exception to this is that you may prefer to do this on the web.",
    },
];

export default function Home({ navigation }) {
    const [doers, setDoers] = useState(Data);
    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_400Regular,
        Inter_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }
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
                        <Text style={styles.chipText}>06-March-2023</Text>
                    </TouchableHighlight>
                    <TouchableOpacity style={styles.chipItem}>
                        <Text style={styles.chipText}>06:44 pm</Text>
                    </TouchableOpacity>
                </View>
                {/* doer component */}
                {/* <ScrollView style={styles.doerView}>
                    {doers.map((doer) => (
                        <Doer title={doer.title} description={doer.des} />
                    ))}
                </ScrollView> */}
                <FlatList
                    data={doers}
                    renderItem={({ item }) => (
                        <Doer title={item.title} description={item.des} />
                    )}
                    keyExtractor={(item) => item.id}
                    bounces="true"
                />
                <View style={styles.newDoerContainer}>
                    <View
                        style={styles.newDoerBar}
                        onPress={() => navigation.navigate("DoerInput")}
                    >
                        <Text
                            style={styles.newDoerText}
                            placeholder="New Doer?"
                        ></Text>
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

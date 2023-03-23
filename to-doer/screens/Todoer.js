import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Vibration,
} from "react-native";
import TODO from "../components/TODO";
import { useIsFocused } from "@react-navigation/native";

// constants
const todo = { background: "#BFF2F5", fontColor: "#00939C" };
const working = { background: "#E7D7FE", fontColor: "#814DA7" };
const done = { background: "#CEF2DE", fontColor: "#458860" };
export default function Todoer({navigation}) {
  const [TODOS, setTODOS] = useState([]);
  const [track, SetTrack] = useState("to-do");
  const isFocused = useIsFocused()

  const getData = async () => {
    const data = await AsyncStorage.getItem("@TODOS");
    const dataJSON = JSON.parse(data) || [];
    AddToStorage(dataJSON)
  };
  const AddToStorage =(_data) => {
    setTODOS(_data);

  }
  const vibrate = () => {
    Vibration.vibrate(1 * 50);
  };

  useEffect(() => {
    getData()
  }, []);

  useEffect(() =>{
    if(isFocused) {
      getData()
    }
  },[isFocused])
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
    <View style={styles.container}>
      <View style={styles.homeContainer}>
        {/* Header */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar,{borderColor:getNewBarTextColor()}]}>
            <TextInput
              // onChangeText={setSearchedTerm}
              style={[styles.searchText,{color:getNewBarTextColor()}]}
              placeholder={`Search ${track}`}
              // value={searchedTerm}
              placeholderTextColor={getNewBarTextColor()}
            ></TextInput>
          </View>
        </View>
        {/* State */}
        <View style={styles.chipsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.chipItem,
              { backgroundColor: track == "to-do" ? todo.background : "white" },
            ]}
            onPress={() => {
              SetTrack("to-do");
              vibrate();
            }}
          >
            <Text style={[styles.chipText, { color: todo.fontColor }]}>
              to-do
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.chipItem,
              {
                backgroundColor:
                  track == "working" ? working.background : "white",
              },
            ]}
            onPress={() => {
              SetTrack("working");
              vibrate();
            }}
          >
            <Text style={[styles.chipText, { color: working.fontColor }]}>
              working
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.chipItem,
              { backgroundColor: track == "done" ? done.background : "white" },
            ]}
            onPress={() => {
              SetTrack("done");
              vibrate();
            }}
          >
            <Text style={[styles.chipText, { color: done.fontColor }]}>
              done
            </Text>
          </TouchableOpacity>
        </View>
        {/* list */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* empty list info text */}
          {/* {
            TODOS && <View style={[styles.chipItem,{backgroundColor:getTrackColor()}]}>
              <Text style={[styles.chipText,{color:getNewBarTextColor()}]}>
                {track} list is empty
              </Text>
            </View>
          } */}
          
          {TODOS.map((item) => {
            if (item.state == track) {
              return (
                <TODO
                  key={item.key}
                  id={item.id}
                  title={item.title}
                  text={item.text}
                  state={item.state}
                  navigation={navigation}
                />
              );
            }
          })}
        </ScrollView>
        {/* new */}
        <View style={styles.newDoerContainer}>
          <View
            style={[
              styles.newItemBar,
              {
                backgroundColor: getTrackColor(),
                borderColor: getNewBarTextColor(),
              },
            ]}
          >
            <Text
              onPress={() => navigation.navigate("TODOInput",{state:track})}
              style={[styles.newItemText, { color: getNewBarTextColor() }]}
            >
              New {track}?
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
    paddingTop: 10,
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
  newItemBar: {
    width: "100%",
    backgroundColor: "#DFE3E6",
    padding: 10,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#DFE3E6",
    marginTop: 9,
  },
  newItemText: {
    fontSize: 20,
    color: "#687076",
    fontWeight: "medium",
    fontFamily: "Inter_400Regular",
  },
  chipsContainer: {
    flexDirection: "row",
    marginVertical: 9,
    justifyContent: "space-between",
  },
  chipItem: {
    backgroundColor: "#DFE3E6",
    borderRadius: 11,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flex: 1,
    // alignContent:"center",
    textAlign: "center",
    margin: 5,
  },
  chipText: {
    color: "#687076",
    fontSize: 19,
    fontWeight: "600",
    fontFamily: "Inter_500Medium",
    alignSelf: "center",
  },
  chipSelected: {
    borderWidth: 2,
    borderColor: "#687076",
  },
  doerView: {
    width: "10%",
    flex: 1,
  },
  viewText: {
    color: "#687076",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Inter_500Medium",
    marginBottom: 2,
  },
  separator: {
    height: 1,
    borderBottomWidth: 0.8,
    borderBottomColor: "#DFE3E6",
    marginBottom: 10,
  },
  infoText: {
    fontFamily: "Inter_400Regular",
    fontSize: 18,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#687076",
  },
  buttonExample: {
    backgroundColor: "#DFE3E6",
    borderRadius: 11,
    // padding: 5,
    paddingVertical: 6,
    paddingHorizontal: 9,
  },
  buttonExampleText: {
    color: "#687076",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Inter_500Medium",
  },
});

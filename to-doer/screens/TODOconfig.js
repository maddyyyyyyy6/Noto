import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const todo = { background: "#BFF2F5", fontColor: "#00939C" };
const working = { background: "#E7D7FE", fontColor: "#814DA7" };
const done = { background: "#CEF2DE", fontColor: "#458860" };

export default function TODOconfig({ navigation, route }) {
  const id = route.params?.id;
  const [storage, setStorage] = useState([]);
  const [theme, setTheme] = useState("light");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [track, setTrack] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };
  const handleTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };
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

  const saveTODOToStorage = (id) => {
    let data = storage;
    data.map((one) => {
      if (one.id == id) {
        one.title = title;
        one.text = text;
      }
    });
    saveToStorage(data);
  };
  const saveToStorage = async (_storage) => {
    let jsonValue = JSON.stringify(_storage);
    await AsyncStorage.setItem("@TODOS", jsonValue);
  };
  const removeTODOFromStorage = async (id) => {
    let data = storage;
    let newdata = data.filter((one) => one.id != id);
    let jsonValue = JSON.stringify(newdata);
    await AsyncStorage.setItem("@TODOS", jsonValue);
  };
  const handleSave = () => {
    saveTODOToStorage(id);
    navigation.goBack();
    Keyboard.dismiss();
  };

  const getData = async () => {
    const data = await AsyncStorage.getItem("@TODOS");
    const jsonValue = JSON.parse(data) || [];
    setStorage(jsonValue);
    getCurrent(id, jsonValue);
  };
  const getCurrent = (id, storage) => {
    let copy = storage.filter((item) => item.id == id);
    let ob = copy[0];
    setTitle(ob.title);
    setText(ob.text);
    setTrack(ob.state);
  };

  // delete code
  const handleDelete = () => {
    removeTODOFromStorage(id);
    navigation.goBack();
  };
  const handleStateChange = (_state) => {
    let data = storage;
    setTrack(_state);
    data.map((item) => {
      if (item.id == id) {
        item.state = _state;
      }
    });
    saveToStorage(data);
  };

  useEffect(() => {
    getData();
  }, [id]);
  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <AntDesign
            name="arrowleft"
            size={28}
            color="black"
            style={{ marginRight: 10 }}
            onPress={() => handleBack()}
          />
          <Text style={styles.headerText}>TODO config</Text>
          {(title || text) && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: getTrackColor() }]}
              onPress={handleSave}
              disabled={!title && !code}
            >
              <Text
                style={[styles.buttonText, { color: getNewBarTextColor() }]}
              >
                Save
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.headerIcons}>
            <AntDesign
              name="delete"
              size={28}
              color="black"
              style={{ alignSelf: "center" }}
              onPress={handleDelete}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.headerIcons} onPress={handleTheme}>
            <Feather
              name={theme == "light" ? "moon" : "sun"}
              size={24}
              color="black"
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.stateContainer}>
          <TouchableOpacity
            style={[
              styles.stateItem,
              { backgroundColor: track == "to-do" ? todo.background : "white" },
            ]}
            onPress={() => handleStateChange("to-do")}
          >
            <Text style={[styles.stateItemText, { color: todo.fontColor }]}>
              thinking!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.stateItem,
              {
                backgroundColor:
                  track == "working" ? working.background : "white",
              },
            ]}
            onPress={() => handleStateChange("working")}
          >
            <Text style={[styles.stateItemText, { color: working.fontColor }]}>
              In progress!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.stateItem,
              { backgroundColor: track == "done" ? done.background : "white" },
            ]}
            onPress={() => handleStateChange("done")}
          >
            <Text style={[styles.stateItemText, { color: done.fontColor }]}>
              Finished!
            </Text>
          </TouchableOpacity>
        </View>
        {/* Input */}
        <View
          style={[
            styles.NewCodeContainer,
            {
              backgroundColor: theme == "light" ? "white" : "#3A3E4E",
              borderColor: getNewBarTextColor(),
            },
          ]}
        >
          {/* ask for which language */}
          {/* title */}
          <TextInput
            style={[styles.inputCodeTitle, { color: getNewBarTextColor() }]}
            placeholder="TODO Title"
            multiline={true}
            numberOfLines={2}
            textAlignVertical="top"
            maxLength={100}
            onChangeText={setTitle}
            value={title}
            placeholderTextColor={getNewBarTextColor()}
          ></TextInput>

          {/* text */}
          <TextInput
            style={[styles.inputCode, { color: getNewBarTextColor() }]}
            placeholder="TODO info (option)"
            multiline={true}
            numberOfLines={11}
            textAlignVertical="top"
            onChangeText={setText}
            value={text}
            placeholderTextColor={getNewBarTextColor()}
          ></TextInput>
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
  InputContainer: {
    flex: 1,
    backgroundColor: "#FBFCFD",
    width: "100%",
    padding: 15,
    paddingTop: 10,
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
    marginLeft: 11,
  },
  NewCodeContainer: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#DFE3E6",
    marginBottom: 10,
  },
  inputCodeLanguage: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    textAlign: "left",
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginBottom: 10,
    color: "white",
  },
  inputCodeTitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 20,
    textAlign: "left",
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginBottom: 20,
    color: "white",
  },
  inputCode: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#DFE3E6",
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 7,
    marginLeft: 11,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  stateContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  stateItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "red",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 3,
  },
  stateItemText: {
    fontSize: 15,
  },
});

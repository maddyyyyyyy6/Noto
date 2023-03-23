import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const todo = { background: "#BFF2F5", fontColor: "#00939C" };
const working = { background: "#E7D7FE", fontColor: "#814DA7" };
const done = { background: "#CEF2DE", fontColor: "#458860" };
export default function TODOInput({ navigation, route }) {
  const track = route.params.state;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [storage,setStorage] = useState([])
  const now = new Date()
  const id = now.getTime()
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

  const handleBack = () => {
    navigation.goBack();
  };
  const getData = async() => {
    const data = await AsyncStorage.getItem("@TODOS")
    const dataJSON = JSON.parse(data) ||[]
    setStorage(dataJSON)
  }
  const createTODO = () => {
    const data ={
      id:id,
      title:title,
      text:text,
      state:track
    }

    const list = storage
    list.push(data)
    saveToStorage(list)
    navigation.goBack()

  }
  const saveToStorage =async(_storage) => {
    const _storageJSON =JSON.stringify(_storage)
    await AsyncStorage.setItem("@TODOS",_storageJSON)
  }

  useEffect(() => {
    getData()
  },[])
  console.log(storage)



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.InputContainer}>
        <View style={styles.headerContainer}>
          <AntDesign
            name="arrowleft"
            size={28}
            color="black"
            style={{ marginRight: 10 }}
            onPress={() => handleBack()}
          />
          <Text style={styles.headerText}>New TODO?</Text>
          {title && (
            <TouchableOpacity onPress={createTODO} style={[styles.button, { backgroundColor: getTrackColor() }]}>
              <Text
                style={[styles.buttonText, { color: getNewBarTextColor() }]}
              >
                Create
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.chipContainer}>
          <View style={[styles.chipItem, { backgroundColor: getTrackColor() }]}>
            <Text
              style={[styles.chipItemText, { color: getNewBarTextColor() }]}
            >
              {track}
            </Text>
          </View>
        </View>
        <View style={styles.NewDoerContainer}>
          <TextInput
            style={styles.inputTitle}
            placeholder="Title"
            multiline={true}
            numberOfLines={2}
            textAlignVertical="top"
            maxLength={100}
            onChangeText={setTitle}
            value={title}
          ></TextInput>
          <TextInput
            style={styles.inputNote}
            placeholder="Info"
            multiline={true}
            numberOfLines={11}
            textAlignVertical="top"
            onChangeText={setText}
            value={text}
          ></TextInput>
        </View>
      </View>
      {/* state */}
      <Text>TODO</Text>
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
    marginLeft: 5,
  },
  NewDoerContainer: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#DFE3E6",
    marginBottom: 10,
  },
  inputTitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 20,
    textAlign: "left",
    alignItems: "flex-start",
    alignContent: "flex-start",
    marginBottom: 20,
  },
  inputNote: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#DFE3E6",
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  buttonToggle: {
    borderRadius: 10,
    backgroundColor: "#452393",
  },
  chipContainer: {
    borderRadius: 20,
    textAlign: "center",
    marginVertical: 10,
  },
  chipItem: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  chipItemText: {
    fontSize: 20,
  },
});

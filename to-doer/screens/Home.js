import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import Doer from "../components/Doer";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Home({ navigation, route }) {
  const [doers, setDoers] = useState([]);
  const [pinnedItems, setPinnedItems] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // for multi selecting
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // for asyncstorage
  const storeData = async (doers) => {
    try {
      const jsonValue = JSON.stringify(doers);
      await AsyncStorage.setItem("@doers", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  // getting doers list from Asyncstorage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@doers");
      const data = JSON.parse(jsonValue) || [];
      // for sorting pinned notes
      const sortpinned = data.filter((item) => item.pinned);
      setPinnedItems(sortpinned);
      setDoers(data);
    } catch (e) {
      // error reading value
    }
  };
  // getData at startup
  useEffect(() => {
    getData();
  }, []);

  // effect when user typed in search if empty no change
  useEffect(() => {
    handleSearch(searchedTerm);
  }, [searchedTerm]);

  // for selection functions
  
  
  // delete Button bulk selection
  const handleDeleteButton = () => {
    let selected = selectedItems
    let list = doers
    list = list.filter(item => !selected.includes(item.id))
    storeData(list)
    getData()
    setIsSelecting(false)

  };

  // Update and Edit storing and getting notes
  useEffect(() => {
    let newDoer = route.params?.doer;
    if (newDoer) {
      storeData([...doers, newDoer]);
      newDoer = "";
      getData();
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

      storeData(copyDoers);
      getData();
    }
  }, [route.params]);

  // delete from doerEdit
  const handleDeleteDoer = (id) => {
    const updateDoers = doers.filter((one) => one.id != id);
    storeData(updateDoers);
    getData();
  };

  // search handling function
  const handleSearch = (_searchTerm) => {
    let copy = doers;
    let search = copy.filter((item) => item.title.includes(_searchTerm));
    setSearchResults(search);
  };

  // multi selection handling for storing ids in selected Items
  const handleSelection = (id,action) => {
    if(action == "add") {
        let list = selectedItems
        list.push(id)
        setSelectedItems(list)
    }else if(action =="remove") {
        let list = selectedItems
        list.pop(id)
        setSelectedItems(list)
      
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#FBFCFD"
        barStyle={"dark-content"}
        // showHideTransition={statusBarTransition}
        // hidden={"true"}
      />
      <View style={styles.homeContainer}>
        {/* search bar component */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              onChangeText={setSearchedTerm}
              style={styles.searchText}
              placeholder="Search to-doer"
              value={searchedTerm}
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
            
            {!isSelecting ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.chipItem, styles.chipSelecteds]}
                  onPress={() => navigation.navigate("Starred")}
                >
                  <AntDesign
                    name="staro"
                    size={20}
                    color="#687076"
                    style={{ alignSelf: "center" }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.chipItem}
                  onPress={() => navigation.navigate("Codes")}
                >
                  <Text style={styles.chipText}>Codes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.chipItem}
                  onPress={() => setIsSelecting(true)}
                >
                  <Ionicons
                    name="md-checkmark-circle"
                    size={20}
                    color="#687076"
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.chipItem}
                  onPress={handleDeleteButton}
                >
                  <Text style={styles.chipText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.chipItem}
                  onPress={() => {setSelectedItems([]) 
                    setIsSelecting(false)}}
                >
                  <Ionicons
                    name="md-close-circle-sharp"
                    size={20}
                    color="#687076"
                  />
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Message info */}
          {doers.length == 0 && pinnedItems.length == 0 && (
            <Text style={styles.infoText}>
              Your to-doer list is currently empty! {"\n"}
              Let's get started by tapping on{"\n"}
              New Doer? below!
            </Text>
          )}
          {/* pinned items */}
          {!searchedTerm && pinnedItems.length != 0 && (
            <Text style={styles.viewText}>
              Pinned
              <MaterialCommunityIcons name="pin" size={18} color="#687076" />
            </Text>
          )}
          {/* search results */}
          {searchedTerm && (
            <Text style={styles.viewText}>
              Searched Results
              <EvilIcons name="search" size={20} color="#687076" />
            </Text>
          )}

          {!searchedTerm &&
            pinnedItems.map((item) => (
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
            {/* seperator */}
          {pinnedItems.length != 0 && <View style={styles.separator}></View>}
          {/* notes/ doers */}
          {!searchedTerm &&
            doers.map((item) => {
              if (!item.pinned) {
                return (
                  <Doer
                    title={item.title}
                    note={item.note}
                    navigation={navigation}
                    id={item.id}
                    key={item.id}
                    deletion={handleDeleteDoer}
                    starred={item.starred}
                    pinned={item.pinned}
                    isSelection={isSelecting}
                    setSelectedList={handleSelection}
                  />
                );
              }
            })}

          {/*if the search bar is not empty */}
          {searchedTerm &&
            searchResults.map((item) => (
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
        {/* Add Section */}
        <View style={styles.newDoerContainer}>
          <View style={styles.newDoerBar}>
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

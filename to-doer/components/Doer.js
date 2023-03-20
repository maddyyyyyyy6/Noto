import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Doer = ({ title, note, id, navigation, starred, pinned,isSelection,setSelectedList }) => {
    const [isSelecting,setIsSelecting] = useState(false)
    const [isSelected,setIsSelected] = useState(false)
    const [border,setBorder] = useState({
        width:2,
        color:"#DFE3E6"
    })
    const handlePress = () => {
        if(isSelecting) {
            // if selection state is true make send id  to the function for adding this to selected list
            if(!isSelected) {
                setBorder({
                    width:3,
                    color:"gray"
                })
                setSelectedList(id,"add")
                setIsSelected(true)
            }else{
                setBorder({
                    width:2,
                    color:"#DFE3E6"
                })
                setSelectedList(id,"remove")
                setIsSelected(false)
                
            }

            
        }else{
            handleViewer(); // Call the onPress event handler
        }
    };
    const handleViewer = () => {
        navigation.navigate("Viewer",{id:id});
    };

    const getData = () => {
    }


    useEffect(() => {
        setIsSelecting(isSelection)
        if(!isSelection) {
            setBorder({
                width:2,
                color:"#DFE3E6"
            })
        }
    },[isSelection])

    return (
        <TouchableOpacity
            style={[styles.doerContainer, { borderWidth: border.width,borderColor:border.color }]}
            activeOpacity={0.7}
            onPress={handlePress}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.doerTitle}>{title}</Text>
                {pinned && (
                    <MaterialCommunityIcons
                        name="pin"
                        size={20}
                        color="black"
                    />
                )}
            </View>
            <Text style={styles.doerDes}>{note}</Text>
        </TouchableOpacity>
    );
};
export default Doer;

const styles = StyleSheet.create({
    doerContainer: {
        borderWidth: 1,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#DFE3E6",
        marginBottom: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    doerTitle: {
        fontSize: 24,
        color: "#687076",
        fontWeight: "500",
        fontFamily: "Inter_500Medium",
    },
    doerDes: {
        fontSize: 17,
        color: "#687076",
        fontWeight: "200",
        fontFamily: "Inter_300Light",
    },
    shadowDoer: {
        shadowColor: "#7A7A7A",
        shadowOffset: {
            width: -1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 4.22,

        elevation: 3,
    },
});

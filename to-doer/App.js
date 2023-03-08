import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigation";
import {
    useFonts,
    Inter_100Thin,
    Inter_400Regular,
    Inter_500Medium,
} from "@expo-google-fonts/inter";
export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_400Regular,
        Inter_500Medium,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

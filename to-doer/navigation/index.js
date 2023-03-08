import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import DoerViewer from "../screens/DoerViewer";
import DoerInput from "../screens/DoerInput";

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DoerInput"
                component={DoerInput}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Viewer"
                component={DoerViewer}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

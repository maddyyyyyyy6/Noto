import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import NoteViewer from "../screens/NoteViewer";
import NoteInput from "../screens/NoteInput";
import Starred from "../screens/Starred";
import Codes from "../screens/Codes";
import CodeInput from "../screens/CodeInput";
import CodeViewer from "../screens/CodeViewer";
import Todoer from "../screens/Todoer";
import TODOInput from "../screens/TODOInput";
import TODOconfig from "../screens/TODOconfig";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        gestureDirection: "horizontal",
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Todoer"
        component={Todoer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TODOInput"
        component={TODOInput}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TODOconfig"
        component={TODOconfig}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="NoteInput"
        component={NoteInput}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="NoteInput"
        component={NoteInput}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Viewer"
        component={NoteViewer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Starred"
        component={Starred}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Codes"
        component={Codes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CodeInput"
        component={CodeInput}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CodeView"
        component={CodeViewer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

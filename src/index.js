import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TabsNavigation"
          component={TabsNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false, 
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: true, 
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: true, 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const tabs = createMaterialBottomTabNavigator();

function TabsNavigation() {
  return (
    <tabs.Navigator
        activeColor="#fff"
        activeBackgroundColor="#fff"
        inactiveColor="#ffffff"
        barStyle={{ backgroundColor: '#2BB7FF' }}>
      <tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={"#2BB7FF"} size={26} />
          ),
        }}
      />
    </tabs.Navigator>
  );
}
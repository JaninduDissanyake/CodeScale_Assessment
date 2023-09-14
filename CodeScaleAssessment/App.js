/** @format */

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import {
  CharacterDetailsScreen,
  CharactersListScreen,
  LoginScreen,
  ProfileScreen,
  SignUpScreen,
} from "./App/Screens";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./App/Config/FirebaseConfig";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  const headerRightButton = (
    <TouchableOpacity onPress={handleProfilePress}>
      <Ionicons
        name="settings"
        size={30}
        color="black"
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  );

  return (
    <InsideStack.Navigator
      screenOptions={{
        headerRight: () => headerRightButton,
      }}
    >
      <InsideStack.Screen
        name="List"
        component={CharactersListScreen}
        options={{
          headerTitle: "THRONEPEDIA",
        }}
      />
      <InsideStack.Screen
        name="CharacterDetails"
        component={CharacterDetailsScreen}
        options={({ route }) => ({
          title: "",
          headerBackVisible: true,
        })}
      />
      <InsideStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerBackVisible: true,
          headerRight: () => null,
        }}
      />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const theme = useColorScheme();
  //for dark theme --> theme={theme === "dark" ? DarkTheme : DefaultTheme}
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return () => {
      // Unsubscribe the observer when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Inside" : "Login"}>
        <Stack.Screen
          name="Inside"
          component={InsideLayout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

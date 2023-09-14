/** @format */

import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../Config/FirebaseConfig";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  // // Fetch the currently authenticated user's email
  // useEffect(() => {
  //   const currentUser = FIREBASE_AUTH.currentUser;
  //   console.log("currentUser:", currentUser.email, currentUser.displayName);
  //   if (currentUser) {
  //     setUser(currentUser);
  //   }
  // }, []);

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <View style={styles.containor}>
      <View style={styles.textField}>
        <Text style={styles.labelText}>Name</Text>
        {/* <Text style={styles.text}>{user}</Text> */}
      </View>
      <View style={styles.textField}>
        <Text style={styles.labelText}>Email</Text>
        {/* <Text style={styles.text}>{user}</Text> */}
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};
//myemail1@gmail.com
//password
export default Profile;

const styles = StyleSheet.create({
  containor: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  signOutButton: {
    backgroundColor: "#FF5733", // Customize the background color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 100,
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "white", // Customize the text color
    fontSize: 16,
    fontWeight: "bold",
  },
  textField: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "column",
  },
  labelText: {
    fontSize: 12,
  },
  text: {
    fontSize: 15,
    marginTop: 5,
  },
});

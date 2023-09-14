/** @format */

import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { FIREBASE_AUTH } from "../Config/FirebaseConfig";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(
      (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
        } else {
          setUser(null);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
      toast.show("Logged out successfully", {
        type: "success",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <View style={styles.containor}>
      <Image
        source={require("../../assets/Thronepedia-removebg.png")} // Local file path
        style={{ width: 200, height: 200, alignSelf: "center" }}
      />
      {user ? (
        <>
          <View style={styles.textField}>
            <Text style={styles.labelText}>Name</Text>
            <Text style={styles.text}>{user.displayName || "N/A"}</Text>
          </View>
          <View style={styles.textField}>
            <Text style={styles.labelText}>Email</Text>
            <Text style={styles.text}>{user.email}</Text>
          </View>
        </>
      ) : (
        <Text>Loading user information...</Text>
      )}
      <TouchableOpacity onPress={handleLogout} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containor: {
    // flex: 1,
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
    fontSize: 18,
    marginTop: 5,
  },
});

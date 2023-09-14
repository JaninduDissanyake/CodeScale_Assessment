/** @format */

import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../Config/FirebaseConfig";
import { useTheme, useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const [name, setName] = useState(""); // to store name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState(""); // to store password
  const [loading, setLoading] = useState(false); // to show loading indicator
  const [passwordVisible, setPasswordVisible] = useState(true); // to show/hide password
  const auth = FIREBASE_AUTH; // firebase auth object
  const [errormMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  const signUpFunc = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required.");
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      await AsyncStorage.setItem("displayName", name);
      await AsyncStorage.setItem("email", email);
      console.log(response);
      alert("Sign Up Success");
      navigation.navigate("Inside");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
      alert("Sign Up Failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleReload = () => {
    // Clear form fields and error message
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassowrd("");
    setErrorMsg(null);
  };

  const handleLoginBtn = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.containor}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={{ textAlign: "center", marginTop: 20 }}>Sign Up</Text>

        <TextInput
          label={"Name"}
          style={styles.input}
          value={name}
          placeholder="Name"
          autoCapitalize="none"
          onChangeText={(text) => setName(text)}
        ></TextInput>
        <TextInput
          label={"Email"}
          style={styles.input}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>

        {/* password field */}
        <View style={styles.inputContainer}>
          <TextInput
            label={"Password"}
            style={styles.passwordInput}
            secureTextEntry={passwordVisible}
            value={password}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <Entypo
            name={passwordVisible ? "eye" : "eye-with-line"}
            size={24}
            color="gray"
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          />
        </View>
        {/* password confirmation field */}
        <View style={styles.inputContainer}>
          <TextInput
            label={"Confirm Password"}
            style={styles.passwordInput}
            secureTextEntry={passwordVisible}
            value={confirmPassword}
            placeholder="Confirm Password"
            autoCapitalize="none"
            onChangeText={(text) => setConfirmPassowrd(text)}
          ></TextInput>
          <Entypo
            name={passwordVisible ? "eye" : "eye-with-line"}
            size={24}
            color="gray"
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => signUpFunc()}
            >
              <Text style={{ color: "#fff" }}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.signInView}>
          <Text>Have an account?</Text>
          <TouchableOpacity
            style={styles.signUptext}
            onPress={() => handleLoginBtn()}
          >
            <Text style={styles.signUptext}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  containor: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  input: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 15,
  },

  signUptext: {
    color: "#2E94F9",
  },
  signInView: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signupButton: {
    backgroundColor: "#27ae60",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    marginTop: 60,
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    marginLeft: 7,
  },
  eyeIcon: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

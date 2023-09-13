/** @format */

import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useTheme, useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // to show loading indicator
  const auth = FIREBASE_AUTH; // firebase auth object
  const navigation = useNavigation();
  const signUpFunc = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign Up Failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginBtn = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.containor}>
      <Text style={{ textAlign: "center", marginTop: 20 }}>Sign Up</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>

      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={{ signUpFunc }}
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
    placeholderTextColor: "#61727C",
  },

  signUptext: {
    color: "#2E94F9",
    fontWeight: "bold",
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
    marginTop: 30,
    alignItems: "center",
  },
});

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
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  //const colors = useTheme().colors;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // to show loading indicator
  const auth = FIREBASE_AUTH; // firebase auth object

  const signInFunc = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign In Failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.containor}>
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
      <Text style={styles.forgotPwText}>Forgot Password?</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <Button title="Sign In" onPress={{ signInFunc }} />
        </>
      )}

      <View style={styles.signupView}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          style={styles.signUptext}
          onPress={() => handleSignUp()}
        >
          <Text style={styles.signUptext}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
  forgotPwText: {
    textAlign: "right",
    marginBottom: 60,
  },
  signupView: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signUptext: {
    color: "#2E94F9",
  },
});

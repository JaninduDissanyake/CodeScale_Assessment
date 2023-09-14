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
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../Config/FirebaseConfig";
import { useTheme, useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Entypo } from "@expo/vector-icons";

const SignUp = () => {
  const [name, setName] = useState(""); // to store name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState(""); // to store password
  const [loading, setLoading] = useState(false); // to show loading indicator
  const [passwordVisible, setPasswordVisible] = useState(true); // to show/hide password
  const auth = FIREBASE_AUTH; // firebase auth object
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const [showPasswordIndicators, setShowPasswordIndicators] = useState(false);

  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    setHasLowerCase(/[a-z]/.test(password));
    setHasUpperCase(/[A-Z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setIsLengthValid(password.length >= 8);
  };

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

      console.log(response);
      alert("Sign Up Success");
      navigation.navigate("Inside");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
      alert("Sign Up Failed" + error.message);
      handleReload();
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

  const handlePasswordFocus = () => {
    setShowPasswordIndicators(true); // Show indicators when focused
    validatePassword(password);
  };

  const handlePasswordBlur = () => {
    setShowPasswordIndicators(false); // Hide indicators when blurred
  };

  return (
    <View style={styles.containor}>
      <KeyboardAvoidingView behavior="padding">
        <Image
          source={require("../../assets/Thronepedia-removebg.png")} // Local file path
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
          }}
        />

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
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
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

        {/* Password validation indicators */}
        {showPasswordIndicators && (
          <View style={styles.passwordIndicatorsContainor}>
            <View style={styles.passwordIndicators}>
              <Text style={styles.passwordIndicatorsText}>
                {hasLowerCase ? "✔️" : "❌"} Lowercase
              </Text>
              <Text style={styles.passwordIndicatorsText}>
                {hasNumber ? "✔️" : "❌"} Number
              </Text>
            </View>
            <View style={styles.passwordIndicators}>
              <Text style={styles.passwordIndicatorsText}>
                {hasUpperCase ? "✔️" : "❌"} Uppercase
              </Text>
              <Text style={styles.passwordIndicatorsText}>
                {isLengthValid ? "✔️" : "❌"} Min. 8 characters
              </Text>
            </View>
          </View>
        )}

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
    marginLeft: 10,
    fontSize: 15,
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
  passwordIndicatorsContainor: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordIndicators: {
    flexDirection: "column",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  passwordIndicatorsText: {
    fontWeight: "bold",
    marginVertical: 8,
  },
});

/** @format */

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../Config/FirebaseConfig";
import Axios from "axios";
import { useNavigation } from "@react-navigation/native";

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const navigation = useNavigation();

  const [user, setUser] = useState(null);

  // Fetch the currently authenticated user's email
  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    console.log("currentUser:", currentUser);
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    Axios.get("https://thronesapi.com/api/v2/Characters")
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  }, []);

  const handleCharacterPress = (character) => {
    navigation.navigate("CharacterDetails", { character });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCharacterPress(item)}>
            <View style={styles.characterContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.characterImage}
              />
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>{item.fullName}</Text>
                <Text style={styles.characterId}>ID: {item.id}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CharactersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  characterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  characterInfo: {
    marginLeft: 16,
  },
  characterName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  characterId: {
    fontSize: 14,
    color: "#777",
  },
});

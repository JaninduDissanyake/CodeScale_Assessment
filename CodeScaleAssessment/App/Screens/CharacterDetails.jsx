/** @format */

import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../Config/FirebaseConfig";

const CharacterDetails = ({ route }) => {
  const { character } = route.params;

  // const [user, setUser] = useState(null);

  // // Fetch the currently authenticated user's email
  // useEffect(() => {
  //   const currentUser = FIREBASE_AUTH.currentUser;
  //   console.log("currentUser:", currentUser);
  //   if (currentUser) {
  //     setUser(currentUser);
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.characterName}>{character.fullName}</Text>
      <Image
        source={{ uri: character.imageUrl }}
        style={styles.characterImage}
      />

      {/* <Text style={styles.characterId}>ID: {character.id}</Text> */}
      <View style={styles.detailContainor}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.detailTags}>Full Name:</Text>
          <Text style={styles.detailTags}>First Name:</Text>
          <Text style={styles.detailTags}>Last Name:</Text>
          <Text style={styles.detailTags}>Title:</Text>
          <Text style={styles.detailTags}>Family:</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.characterDetails}>{character.fullName}</Text>
          <Text style={styles.characterDetails}>{character.firstName}</Text>
          <Text style={styles.characterDetails}>{character.lastName}</Text>
          <Text style={styles.characterDetails}>{character.title}</Text>
          <Text style={styles.characterDetails}>{character.family}</Text>
        </View>
      </View>
    </View>
  );
};

export default CharacterDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  characterImage: {
    width: 250,
    height: 250,
    borderRadius: 50,
    marginTop: 20,
    marginVertical: 20,
  },
  characterName: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
  },
  characterId: {
    fontSize: 16,
    color: "#777",
  },
  detailContainor: {
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 200,
    borderRadius: 10,
    boarderWidth: 1,
    marginTop: 20,
    margin: 10,
    padding: 10,
  },
  characterDetails: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  detailTags: {
    fontSize: 16,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

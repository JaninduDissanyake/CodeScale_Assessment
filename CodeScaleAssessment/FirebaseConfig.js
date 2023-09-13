/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD43GOHNJM1t8JUxqiJwTWoz_yEpYYWg7M",
  authDomain: "codescaleassessment.firebaseapp.com",
  projectId: "codescaleassessment",
  storageBucket: "codescaleassessment.appspot.com",
  messagingSenderId: "653368125917",
  appId: "1:653368125917:web:908e7c1b48010d798bae34",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

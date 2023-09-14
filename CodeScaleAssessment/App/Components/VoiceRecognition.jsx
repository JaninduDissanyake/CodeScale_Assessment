/** @format */

import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import Voice from "@react-native-voice/voice";

const VoiceRecognition = ({ onVoiceResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    // Initialize Voice
    Voice.onSpeechResults = (e) => {
      const recognized = e.value[0];
      setRecognizedText(recognized);
      onVoiceResult(recognized); // Pass the recognized text to the parent component
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [onVoiceResult]);

  const startListening = async () => {
    try {
      await Voice.start("en-US");
      setIsListening(true);
    } catch (error) {
      console.error("Voice recognition error:", error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error("Voice recognition error:", error);
    }
  };

  return (
    <View>
      <Text>Voice Recognition: {recognizedText}</Text>
      <Button
        title={isListening ? "Stop Listening" : "Start Listening"}
        onPress={isListening ? stopListening : startListening}
      />
    </View>
  );
};

export default VoiceRecognition;

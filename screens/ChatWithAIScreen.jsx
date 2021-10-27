import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";

const ChatWithAIScreen = ({ navigation }) => {
  return (
    <Screen>
      <TopBar title="Chat with Sophia" navigation={navigation} />
    </Screen>
  );
};

export default ChatWithAIScreen;

const styles = StyleSheet.create({});

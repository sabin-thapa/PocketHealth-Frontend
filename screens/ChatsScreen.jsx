import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";

const ChatsScreen = ({ navigation }) => {
  return (
    <Screen>
      <TopBar title="Chats" navigation={navigation} />
    </Screen>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});

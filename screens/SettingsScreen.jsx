import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";
const SettingsScreen = ({ navigation }) => {
  return (
    <Screen>
      <TopBar title="Settings" navigation={navigation} />
    </Screen>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});

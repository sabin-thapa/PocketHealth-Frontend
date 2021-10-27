import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";

const SymptomsCheckerScreen = ({ navigation }) => {
  return (
    <Screen>
      <TopBar title="Symptoms Checker" navigation={navigation} />
    </Screen>
  );
};

export default SymptomsCheckerScreen;

const styles = StyleSheet.create({});

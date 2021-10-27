import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";

const MentalWellnessScreen = ({ navigation }) => {
  return (
    <Screen>
      <TopBar title="Mental Wellness" navigation={navigation} />
    </Screen>
  );
};

export default MentalWellnessScreen;

const styles = StyleSheet.create({});

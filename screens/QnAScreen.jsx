import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";

const QnAScreen = ({ navigation }) => {
  return (
    <Screen>
      <TopBar title="QnA" navigation={navigation} />
    </Screen>
  );
};

export default QnAScreen;

const styles = StyleSheet.create({});

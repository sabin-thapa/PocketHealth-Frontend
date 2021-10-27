import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";

const NotificationScreen = ({ navigation }) => {
  return (
    <Screen>
      <TopBar title="Notifications" navigation={navigation} />
    </Screen>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});

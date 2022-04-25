import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import TopBar from "../components/TopBar";
import colors from "../utils/colors";
import Screen from "./Screen";

const VaccineReminderScreen = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <TopBar title="Vaccine Reminder" navigation={navigation} />
      
    </Screen>
  );
};

export default VaccineReminderScreen;

const styles = StyleSheet.create({});

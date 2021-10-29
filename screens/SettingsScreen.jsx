import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";
import DrawerTopBar from "../components/DrawerTopBar";
const SettingsScreen = ({ navigation, route }) => {
  return (
    <Screen>
      {route.params.from ==='stack'?<TopBar title="Settings" navigation={navigation} />: <DrawerTopBar title="Settings" navigation={navigation}/>}
    </Screen>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});

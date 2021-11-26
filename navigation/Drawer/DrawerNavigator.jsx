import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import AppNavigator from "../AppNavigator";
import ProfileNavigator from "../ProfileNavigator.jsx";
import SettingsScreen from "../../screens/SettingsScreen";
import SearchScreen from "../../screens/SearchScreen";
import NotesScreen from "../../screens/NotesScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "transparent",
            width: Dimensions.get('screen').width -100,
          },
        }}
      >
        <Drawer.Screen name="Main" component={AppNavigator} />
        <Drawer.Screen name="Profile" component={ProfileNavigator} />
        <Drawer.Screen name="Search Articles" component={SearchScreen} />
        <Drawer.Screen name="Notes" component={NotesScreen} />
        <Drawer.Screen name="ToolsAndSettings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});

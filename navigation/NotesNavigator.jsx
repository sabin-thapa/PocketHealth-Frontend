import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "../screens/NotesScreen";
import NoteDetail from "../screens/NoteDetail";

const Stack = createStackNavigator();
const NotesNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotesMain" component={NotesScreen} />
      <Stack.Screen name="NoteDetail" component={NoteDetail} />
    </Stack.Navigator>
  );
};

export default NotesNavigator;

const styles = StyleSheet.create({});

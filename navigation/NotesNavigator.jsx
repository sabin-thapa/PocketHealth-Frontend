import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "../screens/NotesScreen";
import NoteDetail from "../screens/NoteDetail";
import NoteProvider from "../contexts/NoteProvider";

const Stack = createStackNavigator();
const NotesNavigator = () => {

  return (
    <NoteProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NotesMain" component={NotesScreen} />
        <Stack.Screen name="NoteDetail" component={NoteDetail} />
      </Stack.Navigator>
    </NoteProvider>
  );
};

export default NotesNavigator;

const styles = StyleSheet.create({});

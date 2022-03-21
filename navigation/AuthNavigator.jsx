import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Carousal from "../screens/Carousal";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import DrawerNavigator from "./Drawer/DrawerNavigator";

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Carousal} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="App" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;


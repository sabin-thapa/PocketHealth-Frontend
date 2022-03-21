import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthProvider } from "./contexts/AuthProvider";
import Route from "./navigation/Route";

export default function App() {
 
  return (
    <View style={styles.container}>
      <AuthProvider>
      <Route />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

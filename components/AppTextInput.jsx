import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import colors from "../utils/colors";

const AppTextInput = ({ style, placeholder, ...otherProps }) => {
  return (
    <View style={styles.container}>
      <TextInput
        underlineColor="#000"
        mode="outlined"
        theme={{
          colors: {
            text: "#000",
            underlineColor: "#000",
            primary: "#000",
            background: "#FFF",
          },
          roundness: 10,
        }}
        style={[styles.inputText, style]}
        label={placeholder}
        placeholderTextColor={colors.gray}
        {...otherProps}
      />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 35,
    width: "90%",
    marginVertical: 7,
  },
  inputText: {
    fontSize: 16,
    width: "100%",
    minHeight: 50,
  },
  icon: {
    marginRight: 10,
  },
});

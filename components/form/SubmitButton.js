import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useFormikContext } from "formik";
import colors from "../../utils/colors";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
      <Text style={styles.submitTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  submitButton: {
    padding: 13,
    backgroundColor: colors.secondary,
    borderRadius: 35,
    width: "90%",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 5,
  },
  submitTitle: {
    fontSize: 17,
    color: colors.white,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
});

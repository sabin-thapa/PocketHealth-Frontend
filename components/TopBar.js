import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TopBar = ({ title, navigation, style:s }) => {
  return (
    <>
      <View
        style={[s,{
          flexDirection: "row",
          paddingHorizontal: 5,
          marginTop: 17
        }]}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.hr}></View>
    </>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 1,
    marginLeft: 20,
    letterSpacing: 0.4
  },
  hr:{
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.3,
    marginTop: 6,
    marginBottom: 5,
    width: '95%',
    alignSelf: 'center',
},
});

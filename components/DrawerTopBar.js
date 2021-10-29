import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import hamburgerIcon from "../assets/hamburger.png";

const DrawerTopBar = ({ title, navigation }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 5,
          marginTop: 17
        }}
      >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image style={styles.hamburgerIcon} source={hamburgerIcon} /> 
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.hr}></View>
    </>
  );
};

export default DrawerTopBar;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold' ,
    marginTop: 1,
    marginLeft: 30,
    letterSpacing: 0.3
  },
  hr:{
    borderBottomColor: '#aaa',
    borderBottomWidth: 0.3,
    marginTop: 6,
    marginBottom: 15,
    width: '95%',
    alignSelf: 'center',
},
hamburgerIcon: {
  width: 22,
  height: 22,
  marginTop: 1
},
});

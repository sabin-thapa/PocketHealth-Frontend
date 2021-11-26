import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import googleIcon from "../assets/google.png";
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import twitterIcon from "../assets/twitter.png";

const SocialIcons = ({ screen }) => {
  return (
    <>
      <Text style={styles.header}>Or you can {screen} using:</Text>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.6} style={styles.iconContainer}>
          <Image style={styles.authIcon} source={googleIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.iconContainer}>
          <Image style={styles.authIcon} source={facebookIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.iconContainer}>
          <Image style={styles.authIcon} source={instagramIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.iconContainer}>
          <Image style={styles.authIcon} source={twitterIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SocialIcons;

const styles = StyleSheet.create({
  authIcon: {
    width: 40,
    height: 40,
  },
  container: {
    flexDirection: "row",
   
  },
  header: {
    color: "#555",
    marginTop:35,
    marginBottom:15
    
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 15,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});

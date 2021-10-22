import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import hanburgerIcon from "../../assets/hamburger.png";
import searchIcon from "../../assets/search.png";
import settingsIcon from "../../assets/control.png";
import notificationIcon from "../../assets/notification.png";

const TopBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.hamburgerIcon} source={hanburgerIcon} />
      </TouchableOpacity>
      <View style={styles.rightTopSection}>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Image style={styles.otherIcon} source={searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Image style={styles.otherIcon} source={notificationIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image style={styles.otherIcon} source={settingsIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    height: "8%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hamburgerIcon: {
    width: 30,
    height: 30,
  },
  rightTopSection: {
    flexDirection: "row",
  },
  otherIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 13,
  },
});

import React, { useState } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
import doctor from "../assets/addUser.png";
import patient from "../assets/add-user.png";

const bgs = [
  "#335D9F",
  "#AD7FFB",
  "#F4717F",
  "#26A65B",
  "#53a0d4",
  "#d69738",
  "#518a46",
];

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    // [0, width, width*2, ... ]
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
      ></Animated.View>
      <Text style={styles.roleText}> Select your role in the app. </Text>
    </>
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["40deg", "0deg", "40deg"],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <>
      <Animated.View
        style={{
          width: height,
          height: height,
          top: -height * 0.65,
          left: -height * 0.3,
          backgroundColor: "#fff",
          borderRadius: 86,
          position: "absolute",
          transform: [{ rotate }, { translateX }],
        }}
      />
    </>
  );
};

const AuthButtons = ({ navigation }) => {
  return (
    <View style={{ position: "absolute", bottom: "17%", flexDirection: "row" }}>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp", {role: 'patient'})}
        activeOpacity={0.7}
        style={styles.authButton}
      >
        <Text style={styles.authText}>Patient</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp", {role: 'practitioner'})}
        activeOpacity={0.7}
        style={styles.authButton}
      >
        <Text style={styles.authText}>Practitioner</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUpRole = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Image
        source={patient}
        style={{
          width: width / 2.4,
          height: height / 2,
          resizeMode: "contain",
          marginBottom: height/1.5
        }}
        />
      <AuthButtons navigation={navigation} />
    </View>
  );
};

export default SignUpRole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  authButton: {
    padding: 13,
    backgroundColor: "#fff",
    marginRight: 20,
    borderRadius: 10,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  authText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 15,
  },
  roleText: {
    textAlign: "center",
    marginTop: 100,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

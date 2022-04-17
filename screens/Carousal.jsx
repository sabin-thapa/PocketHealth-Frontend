import React, {useState} from "react";
import {
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Flatlist,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");
import healthcareIcon from "../assets/healthcare.png";
import symptomsIcon from "../assets/symptoms.png";
import scheduleIcon from "../assets/schedule.png";
import robotIcon from "../assets/robot.png";
import mentalHealthIcon from "../assets/mental-health.png";
import articlesIcon from "../assets/medical-report.png";
import QnaIcon from "../assets/question.png";

const bgs = ["#335D9F", "#AD7FFB", "#F4717F", "#26A65B", "#53a0d4", "#d69738", "#518a46"];
const DATA = [
  {
    key: "3571572",
    title: "Welcome!",
    description: "Welcome to your simple yet smart pocket health assistant. ",
    image: healthcareIcon,
  },
  // {
  //   key: "3571747",
  //   title: "Check Symptoms",
  //   description:
  //     "You can check your symptoms simply by answering a few questions.",
  //   image: symptomsIcon,
  // },
  {
    key: "3571680",
    title: "Scheduler",
    description: "You can schedule your medicine times and appointments.",
    image: scheduleIcon,
  },
  // {
  //   key: "3571603",
  //   title: "Chatbot",
  //   description:
  //     "An intellligent chatbot available to help you fight your disease.",
  //   image: robotIcon,
  // },
  {
    key: "3571604",
    title: "Calculate BMI",
    description:
      "Calculate and track your BMI with the help of chart and fraph statistics.",
    image: mentalHealthIcon,
  },
  {
    key: "3571605",
    title: "Save Medical Data",
    description:
      "Save medical data so that you can have access to them at any time!",
    image: articlesIcon,
  },
  // {
  //   key: "3571606",
  //   title: "Chats & QnA",
  //   description:
  //     "Ask questions to experts and other members or give your advices.",
  //   image: QnaIcon,
  // },
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: "8%", flexDirection: "row" }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.7, 1.1, 0.7],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              margin: 5,
              transform: [{ scale }],
              opacity,
            }}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    // [0, width, width*2, ... ]
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    ></Animated.View>
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
  );
};

const AuthButtons = ({ navigation }) => {
  return (
    <View style={{ position: "absolute", bottom: "17%", flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUpRole")}
        activeOpacity={0.7}
        style={styles.authButton}
      >
        <Text style={styles.authText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignIn")}
        activeOpacity={0.7}
        style={styles.authButton}
      >
        <Text style={styles.authText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const Carousal = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
        pagingEnabled
        contentContainerStyle={{ paddingBottom: 100 }}
        shoeHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{ width, alignItems: "center", paddingHorizontal: 40 }}
            >
              <View style={{ flex: 0.7, justifyContent: "center" }}>
                <Image
                  source={item.image}
                  style={{
                    width: width / 2.4,
                    height: height / 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    marginTop:-20,
                    fontWeight: "bold",
                    fontSize: 40,
                    marginBottom: 10,
                    color: "white",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 17,
                    lineHeight: 22,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <AuthButtons navigation={navigation} />
      <Indicator scrollX={scrollX} />
    </View>
  );
};

export default Carousal;

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
});

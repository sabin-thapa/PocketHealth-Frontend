import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Screen from "./Screen";
import pushupPic from "../assets/pushup.png";
import PedometerPic from "../assets/walking.png";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";

const options = [
  {
    title: "Pushups Counter",
    url: pushupPic,
    background: "#A3ABFF",
    labelColor: "#FEF9F3",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link: "Pushup",
  },
  {
    title: "Pedometer",
    url: PedometerPic,
    background: "#FEB18F",
    labelColor: "#3F414E",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link: "Pedometer",
  },
];

const ExerciseTracker = ({ navigation }) => {
  const [time, setTime] = useState(null);
  const [bloodSugar, setBloodSugar] = useState(0);
  const onPressSave = () => {
    console.log("saved");
    navigation.navigate("SugarDetail");
  };
  return (
    <Screen style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 5,
          justifyContent: "space-between",
        }}
      >
        <View flexDirection="row">
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Exercise Trackers</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: 5, marginRight: 15 }}
          onPress={() => navigation.navigate("ExerciseDetail")}
        >
          <Text
            style={{
              textDecorationLine: "underline",
              fontSize: 17,
              marginTop: -5,
            }}
          >
            Statistics
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:20}}>

        {options.map((item, index) => {
            return (
            <TouchableOpacity
                activeOpacity={0.7}
                key={`cardItem - ${index}`}
                onPress={() => navigation.navigate(item.link)}
            >
                <View
                style={[
                    styles.card,
                    {
                    backgroundColor: item.background,
                    height: item.height,
                    },
                ]}
                >
                <Image
                    style={[
                    styles.cardImage,
                    {
                        width: item.imageSize.width,
                        height: item.imageSize.height,
                    },
                    ]}
                    source={item.url}
                />
                <Text style={[styles.label, { color: item.labelColor }]}>
                    {item.title}
                </Text>
                </View>
            </TouchableOpacity>
            );
        })}
      </View>
    </Screen>
  );
};

export default ExerciseTracker;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    paddingLeft: 5,
  },
  cardImage: {
    alignSelf: "center",
    marginTop: 20,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    marginBottom: 8,
    marginHorizontal: 4,
  },
  container: {
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  date: {
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 30,
  },
  timeInput: {
    paddingVertical: 12,
    paddingLeft: 7,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 7,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  sugarPicStyles: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 30,
  },
  saveBtn: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: colors.secondary,
    borderRadius: 25,
    color: "#fff",
    width: "85%",
    marginTop: 30,
  },
  inputText: {
    fontSize: 16,
    width: "90%",
    minHeight: 50,
    marginLeft: 10,
  },
  textInputContainer: {
    borderRadius: 10,
    width: "95%",
    marginVertical: 7,
    marginHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 20,
  },
});

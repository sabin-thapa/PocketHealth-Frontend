import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pedometer } from "expo-sensors";

import React, { useEffect, useState } from "react";
import Screen from "./Screen";

const getDate = () => {
  const dateday = new Date().getDate();
  const datemonth = new Date().getMonth() + 1;
  const dateyear = new Date().getFullYear();
  return dateday + "-" + datemonth + "-" + dateyear;
};

const PedometerScreen = ({ navigation }) => {
  const [pedometerAvailability, setPedometerAvailability] = useState("");
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },

      (error) => {
        setPedometerAvailability(error);
      }
    );
    console.log(stepCount)
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
            <Text style={styles.headerText}>
              Pedometer {pedometerAvailability}
            </Text>
            <Text style={styles.date}>{getDate()}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: 5, marginRight: 15 }}
          onPress={() => navigation.navigate("ExerciseDetail")}
        >
          <Text style={{ textDecorationLine: "underline", fontSize: 17 }}>
            Statistics
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>{stepCount}</Text>
      </View>
    </Screen>
  );
};

export default PedometerScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  date: {
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
});

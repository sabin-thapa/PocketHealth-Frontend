import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Proximity from 'react-native-proximity';

import React, {useEffect, useState} from "react";
import Screen from "./Screen";

const getDate = () => {
    const dateday = new Date().getDate();
    const datemonth = new Date().getMonth() + 1;
    const dateyear = new Date().getFullYear();
    return dateday + "-" + datemonth + "-" + dateyear;
  };

const PushupScreen = ({ navigation }) => {

  const [proximity, setProximity] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    Proximity.addListener(proximityListener());
  }, []);
  
  const proximityListener = (data) => {
    console.log(data);
    setProximity(data.proximity);
    setDistance(data.distance);
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
            <Text style={styles.headerText}>Pushups Counter</Text>
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
        <Text>{proximity}</Text>
        <Text>{distance}</Text>
      </View>
    </Screen>
  );
};

export default PushupScreen;

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

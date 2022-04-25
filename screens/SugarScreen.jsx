import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Screen from "./Screen";
import sugarPic from "../assets/sugar.png";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";
import axios from "axios";


const getDate = () => {
  const dateday = new Date().getDate();
  const datemonth = new Date().getMonth() + 1;
  const dateyear = new Date().getFullYear();
  return dateday + "-" + datemonth + "-" + dateyear;
};

const SugarScreen = ({ navigation }) => {
  const [time, setTime] = useState(null);
  const [glucose, setGlucose] = useState(0)
  const [ketone, setKetone] = useState(0)
  const [haemoglobin, setHaemoglobin] = useState(0)
  const onPressSave = async () => {
    await axios
    .post(`http://172.17.0.88:8000/api/trackers/bloodsugar/`, {
      user: 2,
      glucose_value: glucose,
      ketone_value: ketone,
      haemoglobin_value: haemoglobin,
      time_value: time,
    })
    .then((res) => {
      console.log(res.data, "response from sugar POST");
    })
    console.log("Sugar data Saved");
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
            <Text style={styles.headerText}>Blood Sugar</Text>
            <Text style={styles.date}>{getDate()}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: 5, marginRight: 15 }}
          onPress={() => navigation.navigate("SugarDetail")}
        >
          <Text style={{ textDecorationLine: "underline", fontSize: 17 }}>
            Statistics
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image style={styles.sugarPicStyles} source={sugarPic} />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          underlineColor="#000"
          mode="outlined"
          onChangeText={setGlucose}
          theme={{
            colors: {
              text: "#000",
              underlineColor: "#000",
              primary: "#000",
              background: "#DDD",
            },
            roundness: 10,
          }}
          style={styles.inputText}
          label="Blood Glucose"
          placeholder="Blood Glucose (mg/dL)"
          placeholderTextColor={colors.gray}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          underlineColor="#000"
          onChangeText={setKetone}
          mode="outlined"
          theme={{
            colors: {
              text: "#000",
              underlineColor: "#000",
              primary: "#000",
              background: "#DDD",
            },
            roundness: 10,
          }}
          style={styles.inputText}
          label="Ketone Level"
          placeholder="Ketone Level (mg/dL)"
          placeholderTextColor={colors.gray}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          underlineColor="#000"
          onChangeText={setHaemoglobin}
          mode="outlined"
          theme={{
            colors: {
              text: "#000",
              underlineColor: "#000",
              primary: "#000",
              background: "#DDD",
            },
            roundness: 10,
          }}
          style={styles.inputText}
          label="Haemoglobin Level"
          placeholder="Haemoglobin Level (%)"
          placeholderTextColor={colors.gray}
        />
      </View>

      <View style={styles.timeInput}>
        <RNPickerSelect
          placeholder={{ label: "Time", value: null }}
          style={{ inputAndroid: { color: "black" } }}
          onValueChange={(value) => setTime(value)}
          items={[
            { label: "Before Breakfast", value: "BB" },
            { label: "After Breakfast", value: "AB" },
            { label: "Before Lunch", value: "BL" },
            { label: "After Lunch", value: "AL" },
            { label: "Before Dinner", value: "BD" },
            { label: "After Dinner", value: "AD" },
            { label: "Before Sleep", value: "BS" },
            { label: "Fasting", value: "F" },
            { label: "Other", value: "O" },
          ]}
        />
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={onPressSave}>
        <Text style={styles.saveText}>Save Record</Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default SugarScreen;

const styles = StyleSheet.create({
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
    marginHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 17,
  },
});

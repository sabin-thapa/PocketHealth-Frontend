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
import pressurePic from "../assets/hypertension.png";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";

const getDate = () => {
  const dateday = new Date().getDate();
  const datemonth = new Date().getMonth() + 1;
  const dateyear = new Date().getFullYear();
  return dateday + "-" + datemonth + "-" + dateyear;
};

const SugarScreen = ({ navigation }) => {
  const [time, setTime] = useState(null);
  const [bloodSugar, setBloodSugar] = useState(0)
  const onPressSave = () => {
    console.log("saved");
    navigation.navigate("PressureDetail");
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
            <Text style={styles.headerText}>Blood Pressure</Text>
            <Text style={styles.date}>{getDate()}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: 5, marginRight: 15 }}
          onPress={() => navigation.navigate("PressureDetail")}
        >
          <Text style={{ textDecorationLine: "underline", fontSize: 17 }}>
            Statistics
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image style={styles.pressurePicStyles} source={pressurePic} /> 
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
            underlineColor="#000"
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
            label="Systolic"
            placeholder="Systolic (mm/Hg)"
            placeholderTextColor={colors.gray}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
            underlineColor="#000"
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
            label="Diastolic"
            placeholder="Diastolic (mm/Hg)"
            placeholderTextColor={colors.gray}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
            underlineColor="#000"
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
            label="Pulse Rate"
            placeholder="Pulse Rate (bpm)"
            placeholderTextColor={colors.gray}
        />
      </View>
    
      <View style={styles.positionInput}>
        <View style={styles.oneInput}>
          <RNPickerSelect
            placeholder={{ label: "Body Position", value: null }}
            style={{ inputAndroid: { color: "black" } }}
            onValueChange={(value) => setTime(value)}
            items={[
              { label: "Seated", value: "S" },
              { label: "Lying", value: "L" },
              { label: "Semi-recumbent", value: "SR" },
              { label: "Standing", value: "St" },
            ]}
          />
        </View>
        <View style={styles.oneInput}>
          <RNPickerSelect
            placeholder={{ label: "Arm", value: null }}
            style={{ inputAndroid: { color: "black" } }}
            onValueChange={(value) => setTime(value)}
            items={[
              { label: "Left", value: "Left" },
              { label: "Right", value: "Right" },
            ]}
          />
        </View>
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
  oneInput: {
    width: "46%",
    paddingVertical: 12,
    paddingLeft: 7,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 7,
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
  positionInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  pressurePicStyles:{
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 40,
    marginTop: 30
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
  textInputContainer:{
    borderRadius: 10,
    width: "95%",
    marginHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 17
  }
});

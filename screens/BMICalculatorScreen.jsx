import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import Screen from "./Screen";
import RNSpeedometer from "react-native-speedometer";
import Slider from "@react-native-community/slider";
import colors from "../utils/colors";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector";
import axios from "axios";
import {AuthContext} from '../contexts/AuthProvider'
import {PORT, BASE_URL} from '@env'

const { screenWidth, screenHeight } = Dimensions.get("window");

const getDate = () => {
  const dateday = new Date().getDate();
  const datemonth = new Date().getMonth() + 1;
  const dateyear = new Date().getFullYear();
  return dateday + "-" + datemonth + "-" + dateyear;
};

const BMIDETAILS = [
  {
    value: "Very Severely Underweight",
    color: "#A3ABFF",
    range: "<16",
  },
  {
    value: "Severely Underweight",
    color: "#59ABE3",
    range: "16.0-16.9",
  },
  {
    value: "Underweight",
    color: "#8484d1",
    range: "17.0-18.4",
  },
  {
    value: "Normal",
    color: "#8DB255",
    range: "18.5-24.9",
  },
  {
    value: "Overweight",
    color: "#ff9933",
    range: "25.0-29.9",
  },
  {
    value: "Obese Class I",
    color: "#CD7D7D",
    range: "30.0-34.9",
  },
  {
    value: "Obese Class II",
    color: "#FA6E5A",
    range: ">35",
  },
];

const bmiLables = [];
for (let i = 0; i < 40; i++) {
  if (i >= 10 && i < 17) {
    bmiLables.push({
      name: " ".repeat(i),
      labelColor: "#A3ABFF",
      activeBarColor: "#A3ABFF",
    });
  } else if (i >= 17 && i < 18) {
    bmiLables.push({
      name: " ".repeat(i),
      labelColor: "#59ABE3",
      activeBarColor: "#59ABE3",
    });
  } else if (i >= 18 && i < 19) {
    bmiLables.push({
      name: " ".repeat(i),
      labelColor: "#8484d1",
      activeBarColor: "#8484d1",
    });
  } else if (i >= 19 && i < 25) {
    bmiLables.push({
      name: " ".repeat(i),
      labelColor: "#8DB255",
      activeBarColor: "#8DB255",
    });
  } else if (i >= 25 && i < 29) {
    bmiLables.push({
      name: " ".repeat(i),
      labelColor: "#ff9933",
      activeBarColor: "#ff9933",
    });
  } else if (i >= 29 && i < 33) {
    bmiLables.push({
      name: " ".repeat(i),
      labelColor: "#CD7D7D",
      activeBarColor: "#CD7D7D",
    });
  } else if (i >= 27 && i < 40) {
    bmiLables.push({
      name: " ".repeat(i),
      labelColor: "#FA6E5A",
      activeBarColor: "#FA6E5A",
    });
  }
}

const BMIList = () => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={BMIDETAILS}
        keyExtractor={(_, i) => `BMIs-${i}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.bmiListContainer}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={[styles.bmiListDot, { backgroundColor: item.color }]}
                ></View>
                <Text style={styles.bmiListValue}>{item.value}</Text>
              </View>
              <Text style={styles.bmiListRange}>{item.range}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const BMICalculatorScreen = ({ navigation }) => {
  const {token, user} = useContext(AuthContext)
  const [bmiValue, setBmiValue] = useState(19.0);
  const [data, setData] = useState(null);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(180);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInch, setHeightInch] = useState(0);
  const [bmiResult, setBmiResult] = useState(BMIDETAILS[3]);
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const onChangeValues = () => {
    let weightInKg = weight;
    let heightInCm = height;
    if (weightUnit === "kg") {
      weightInKg = weight;
    } else {
      weightInKg = weight * 0.45359237;
    }
    if (heightUnit === "cm") {
      heightInCm = height;
    } else {
      heightInCm = heightFeet * 30.48 + heightInch * 2.54;
    }
    const bmi = weightInKg / ((heightInCm * heightInCm) / 10000);
    setBmiValue(parseFloat(bmi.toFixed(1)));
    if (bmi < 16) {
      setBmiResult(BMIDETAILS[0]);
    } else if (bmi > 16 && bmi < 16.9) {
      setBmiResult(BMIDETAILS[1]);
    } else if (bmi >= 17 && bmi < 18.4) {
      setBmiResult(BMIDETAILS[2]);
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setBmiResult(BMIDETAILS[3]);
    } else if (bmi >= 25 && bmi < 29.9) {
      setBmiResult(BMIDETAILS[4]);
    } else if (bmi >= 30 && bmi < 34.9) {
      setBmiResult(BMIDETAILS[5]);
    } else {
      setBmiResult(BMIDETAILS[6]);
    }
  };

  useEffect(() => {
    onChangeValues();
  }, [weight, height, heightUnit, weightUnit, heightFeet, heightInch]);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}:${PORT}/api/trackers/bmi/`)
  //     .then((res) => {
  //       // console.log(res.data, "BMI Calculator screen data");
  //       const { height_in_cm, weight_in_kg, bmiResult } = res.data[0];
  //       setHeight(height_in_cm);
  //       setWeight(weight_in_kg);
  //       const bmi = weight_in_kg / ((height_in_cm * height_in_cm) / 10000);

  //       setBmiValue(bmi);
  //     })
  //     .catch((err) => {
  //       console.log(err, "Err");
  //     });
  // }, []);


  const weightOptions = [
    { label: "kg", value: "kg" },
    { label: "lb", value: "lb" },
  ];
  const heightOptions = [
    { label: "cm", value: "cm" },
    { label: "ft-in", value: "ft-in" },
  ];

  const onPressSave = async () => {
    await axios
    .post(`http://172.17.0.88:8000/api/trackers/bmi/`, {
      user: 2,
      weight_in_kg: weight,
      height_in_cm: height,
    })
    .then((res) => {
      console.log(res.data, "response from bmi POST");
    })
    console.log("BMI Saved");
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
            <Text style={styles.headerText}>BMI</Text>
            <Text style={styles.date}>{getDate()}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: 5, marginRight: 15 }}
          onPress={() => navigation.navigate("BMIDetail")}
        >
          <Text style={{textDecorationLine: "underline", fontSize: 17 }}>
            Statistics
          </Text>
        </TouchableOpacity>
      </View>
      <RNSpeedometer
        size={300}
        minValue={10}
        maxValue={40}
        labels={bmiLables}
        allowedDecimals={1}
        value={bmiValue}
        labelStyle={{ display: "none" }}
        innerCircleStyle={{
          borderWidth: 0.3,
          borderColor: "#333",
          backgroundColor: "#fff",
        }}
      />
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          fontSize: 15,
          marginTop: 14,
        }}
      >
        Your BMI is
      </Text>
      <Text style={styles.bmiValue}>{bmiValue}</Text>
      <Text style={[styles.bmiResult, { backgroundColor: bmiResult.color }]}>
        {bmiResult.value}
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View style={styles.sliderHeader}>
          <Text style={styles.sliderText}>Height </Text>
          <View style={styles.oneLine}>
            {heightUnit === "cm" ? (
              <>
                <TouchableOpacity
                  onPress={() => setHeight((Number(height) - 0.1).toFixed(1))}
                  style={styles.decBtn}
                >
                  <AntDesign
                    name="minuscircle"
                    size={15}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
                <Text style={styles.measure}>{height}</Text>
                <TouchableOpacity
                  onPress={() => setHeight((Number(height) + 0.1).toFixed(1))}
                  sstyle={styles.incBtn}
                >
                  <AntDesign
                    name="pluscircle"
                    size={15}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.measure}>
                {heightFeet}' {heightInch}''
              </Text>
            )}
            <SwitchSelector
              height={30}
              style={{ maxWidth: 80, marginLeft: 20 }}
              options={heightOptions}
              initial={0}
              buttonColor={colors.secondary}
              onPress={(value) => setHeightUnit(value)}
            />
          </View>
        </View>
        {heightUnit === "cm" ? (
          <Slider
            style={{
              width: "100%",
              height: 20,
              transform: [{ scaleX: 1.5 }, { scaleY: 1.1 }],
            }}
            minimumValue={0}
            maximumValue={300}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor="#000"
            thumbTintColor="tomato"
            value={height}
            onValueChange={(value) => setHeight(value.toFixed(1))}
            step={0.2}
          />
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Slider
              style={{
                width: "50%",
                height: 20,
                transform: [{ scaleX: 1.5 }, { scaleY: 1.1 }],
              }}
              minimumValue={0}
              maximumValue={8}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor="#000"
              thumbTintColor="tomato"
              value={heightFeet}
              onValueChange={(value) => setHeightFeet(value)}
              step={1}
            />
            <Slider
              style={{
                width: "50%",
                height: 20,
                transform: [{ scaleX: 1.5 }, { scaleY: 1.1 }],
              }}
              minimumValue={0}
              maximumValue={12}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor="#000"
              thumbTintColor="tomato"
              value={heightInch}
              onValueChange={(value) => setHeightInch(value)}
              step={1}
            />
          </View>
        )}
        <View style={styles.sliderHeader}>
          <Text style={styles.sliderText}>Weight </Text>
          <View style={styles.oneLine}>
            <TouchableOpacity
              onPress={() => setWeight((Number(weight) - 0.1).toFixed(1))}
              style={styles.decBtn}
            >
              <AntDesign
                name="minuscircle"
                size={15}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <Text style={styles.measure}>{weight}</Text>
            <TouchableOpacity
              onPress={() => setWeight((Number(weight) + 0.1).toFixed(1))}
              sstyle={styles.incBtn}
            >
              <AntDesign name="pluscircle" size={15} color={colors.secondary} />
            </TouchableOpacity>
            <SwitchSelector
              height={30}
              style={{ maxWidth: 80, marginLeft: 20 }}
              options={weightOptions}
              initial={0}
              buttonColor={colors.secondary}
              onPress={(value) => setWeightUnit(value)}
            />
          </View>
        </View>
        <Slider
          style={{
            width: "100%",
            height: 20,
            transform: [{ scaleX: 1.5 }, { scaleY: 1.1 }],
          }}
          minimumValue={0}
          maximumValue={200}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor="#000"
          onValueChange={(value) => setWeight(value.toFixed(1))}
          thumbTintColor="tomato"
          value={weight}
          step={0.2}
        />
      </View>
      <BMIList />
      <TouchableOpacity style={styles.saveBtn} onPress={()=>{
        onPressSave()
        navigation.navigate('BMIDetail')
      }}>
        <Text style={styles.saveText}>Save Record</Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default BMICalculatorScreen;
export { BMIList };

const styles = StyleSheet.create({
  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
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
  listContainer: {
    justifyContent: "center",
    marginTop: 25,
  },
  bmiListValue: {
    fontSize: 15,
    opacity: 0.5,
  },
  bmiListRange: {
    fontSize: 15,
    opacity: 0.5,
  },
  bmiListDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 10,
  },
  bmiValue: {
    alignSelf: "center",
    fontSize: 45,
    fontWeight: "bold",
    marginTop: -8,
  },
  bmiListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  bmiResult: {
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
    borderWidth: 0.1,
    borderColor: "#000",
    borderRadius: 25,
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1.1,
  },
  sliderHeader: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 3,
  },
  sliderText: {
    fontSize: 16,
  },
  measure: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 3,
    marginRight: 20,
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
  sliderContainer: {
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  decBtn: {
    marginRight: 15,
  },
  incBtn: {
    marginRight: 20,
  },
  oneLine: {
    flexDirection: "row",
    alignItems: "center",
  },
});

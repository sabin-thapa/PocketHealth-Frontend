import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "./Screen";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import colors from "../utils/colors";
import { Rect, Ellipse, Text as TextSVG, Svg } from "react-native-svg";
import RNPickerSelect from "react-native-picker-select";

let dummyData = [
  {
    bmiValue: 21.2,
    date: "Sep 1, 2022",
    weight: 89,
  },

  {
    bmiValue: 21.2,
    date: "Sep 1, 2020",
    weight: 89,
  },
  {
    bmiValue: 21,
    date: "Sep 2, 2020",
    weight: 87,
  },
  {
    bmiValue: 20.5,
    date: "Oct 1, 2021",
    weight: 87,
  },
  {
    bmiValue: 20,
    date: "Oct 2, 2021",
    weight: 88,
  },
  {
    bmiValue: 18.3,
    date: "Oct 3, 2021",
    weight: 86,
  },
  {
    bmiValue: 17.9,
    date: "Oct 4, 2021",
    weight: 85,
  },
  {
    bmiValue: 17,
    date: "Oct 5, 2021",
    weight: 82,
  },
  {
    bmiValue: 17.2,
    date: "Oct 6, 2021",
    weight: 80,
  },
  {
    bmiValue: 17.5,
    date: "Oct 7, 2021",
    weight: 79,
  },
  {
    bmiValue: 17.6,
    date: "Oct 8, 2021",
    weight: 75,
  },
  {
    bmiValue: 18,
    date: "Oct 9, 2021",
    weight: 73,
  },
  {
    bmiValue: 18.1,
    date: "Oct 10, 2021",
    weight: 72,
  },
  {
    bmiValue: 18.2,
    date: "Oct 11, 2021",
    weight: 70,
  },
  {
    bmiValue: 18.5,
    date: "Oct 12, 2021",
    weight: 68,
  },
  {
    bmiValue: 18.6,
    date: "Oct 13, 2021",
    weight: 65,
  },
  {
    bmiValue: 18.7,
    date: "Oct 14, 2021",
    weight: 63,
  },
  {
    bmiValue: 18.8,
    date: "Oct 15, 2021",
    weight: 60,
  },
  {
    bmiValue: 18.7,
    date: "Oct 16, 2021",
    weight: 62,
  },
  {
    bmiValue: 18.6,
    date: "Oct 17, 2021",
    weight: 63,
  },
  {
    bmiValue: 18.9,
    date: "Oct 18, 2021",
    weight: 65,
  },
  {
    bmiValue: 19.2,
    date: "Oct 19, 2021",
    weight: 68,
  },
  {
    bmiValue: 19.6,
    date: "Oct 20, 2021",
    weight: 68,
  },
  {
    bmiValue: 19.7,
    date: "Oct 21, 2021",
    weight: 68,
  },
  {
    bmiValue: 20,
    date: "Oct 22, 2021",
    weight: 68,
  },
  {
    bmiValue: 21,
    date: "Oct 23, 2021",
    weight: 68,
  },
  {
    bmiValue: 21.2,
    date: "Oct 24, 2021",
    weight: 68,
  },
  {
    bmiValue: 21.6,
    date: "Oct 25, 2021",
    weight: 68,
  },
  {
    bmiValue: 22,
    date: "Oct 26, 2021",
    weight: 68,
  },
  {
    bmiValue: 22.5,
    date: "Oct 27, 2021",
    weight: 68,
  },
  {
    bmiValue: 22.1,
    date: "Oct 28, 2021",
    weight: 68,
  },
  {
    bmiValue: 22,
    date: "Oct 29, 2021",
    weight: 68,
  },
  {
    bmiValue: 21,
    date: "Oct 30, 2021",
    weight: 68,
  },
];

const BMIDetailScreen = ({ navigation }) => {
  const [BmiTooltipPos, setBmiTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const [WeightTooltipPos, setWeightTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const [year, setYear] = useState("2021");
  const [month, setMonth] = useState("Jan");
  const [loading, setLoading] = useState(false);
  // need to refactor this mess
  var xLabels = ["Null"];
  var bmiData = [0];
  var weightData = [0];

  const calculateValues = () => {
    var i = 0;
    dummyData.forEach((item, index, array) => {
      if (item.date.split(", ")[1] === year) {
        if (item.date.split(" ")[0] === month) {
          if (i == 0) {
            xLabels = [];
            bmiData = [];
            weightData = [];
          }
          i++;
          xLabels.push(item.date.split(",")[0]);
          bmiData.push(item.bmiValue);
          weightData.push(item.weight);
        }
      }
    });
  };
  // .........
  calculateValues();

  return (
    <Screen style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("BMI")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Statistics</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.oneInput}>
          <RNPickerSelect
            placeholder={{ label: "Year", value: null }}
            style={{ inputAndroid: { color: "black" } }}
            onValueChange={(value) => setYear(value)}
            items={[
              { label: "2020", value: "2020" },
              { label: "2021", value: "2021" },
              { label: "2022", value: "2022" },
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
              { label: "2025", value: "2025" },
              { label: "2026", value: "2026" },
              { label: "2027", value: "2027" },
              { label: "2028", value: "2028" },
              { label: "2029", value: "2029" },
              { label: "2030", value: "2030" },
            ]}
          />
        </View>
        <View style={styles.oneInput}>
          <RNPickerSelect
            placeholder={{ label: "Month", value: null }}
            style={{ inputAndroid: { color: "black" } }}
            onValueChange={(value) => setMonth(value)}
            items={[
              { label: "January", value: "Jan" },
              { label: "February", value: "Feb" },
              { label: "March", value: "Mar" },
              { label: "April", value: "Apr" },
              { label: "May", value: "May" },
              { label: "June", value: "Jun" },
              { label: "July", value: "Jul" },
              { label: "August", value: "Aug" },
              { label: "September", value: "Sep" },
              { label: "October", value: "Oct" },
              { label: "November", value: "Nov" },
              { label: "December", value: "Dec" },
            ]}
          />
        </View>
      </View>
      <Text style={styles.graphHeader}>BMI</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.Graphcontainer}
        horizontal={true}
      >
        <LineChart
          data={{
            labels: xLabels,
            datasets: [{ data: bmiData, color: () => "#fff" }],
          }}
          width={Dimensions.get("window").width - 70 + xLabels.length * 40}
          withShadow={true}
          withHorizontalLines={false}
          yLabelsOffset={20}
          onDataPointClick={(value) => setPointValue(value)}
          height={270}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: colors.primary,
            backgroundGradientTo: colors.secondary,
            decimalPlaces: 2,
            strokeWidth: 1,
            color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#ff9933",
            },
            propsForBackgroundLines: {
              strokeDasharray: "",
            },
            propsForLabels: {
              fontSize: 11,
            },
            useShadowColorFromDataset: true,
          }}
          bezier
          style={{
            borderRadius: 7,
            paddingTop: 30,
          }}
          decorator={() => {
            return BmiTooltipPos.visible ? (
              <View>
                <Svg>
                  <Ellipse
                    cx={BmiTooltipPos.x}
                    cy={BmiTooltipPos.y - 20}
                    rx="21"
                    ry="13"
                    stroke="white"
                    strokeWidth="0.4"
                    fill="black"
                  />
                  <TextSVG
                    x={BmiTooltipPos.x}
                    y={BmiTooltipPos.y - 15}
                    fill="white"
                    fontSize="13"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {BmiTooltipPos.value}
                  </TextSVG>
                </Svg>
              </View>
            ) : null;
          }}
          onDataPointClick={(data) => {
            let isSamePoint =
              BmiTooltipPos.x === data.x && BmiTooltipPos.y === data.y;

            isSamePoint
              ? setBmiTooltipPos((previousState) => {
                  return {
                    ...previousState,
                    value: data.value,
                    visible: !previousState.visible,
                  };
                })
              : setBmiTooltipPos({
                  x: data.x,
                  value: data.value,
                  y: data.y,
                  visible: true,
                });
          }}
        />
      </ScrollView>
      <Text style={styles.graphHeader}>Weight (kg)</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.Graphcontainer}
        horizontal={true}
      >
        <LineChart
          data={{
            labels: xLabels,
            datasets: [{ data: weightData, color: () => "#fff" }],
          }}
          width={Dimensions.get("window").width - 70 + xLabels.length * 40}
          withShadow={true}
          withHorizontalLines={false}
          onDataPointClick={(value) => setPointValue(value)}
          height={300}
          yLabelsOffset={20}
          chartConfig={{
            backgroundGradientFrom: colors.secondary,
            backgroundGradientTo: colors.primary,
            decimalPlaces: 2,
            strokeWidth: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#8DB255",
            },
            propsForBackgroundLines: {
              strokeDasharray: "",
            },
            propsForLabels: {
              fontSize: 11,
            },
            useShadowColorFromDataset: true,
          }}
          bezier
          style={{
            borderRadius: 7,
            paddingTop: 30,
          }}
          decorator={() => {
            return WeightTooltipPos.visible ? (
              <View>
                <Svg>
                  <Ellipse
                    cx={WeightTooltipPos.x}
                    cy={WeightTooltipPos.y - 20}
                    rx="21"
                    ry="13"
                    stroke="white"
                    strokeWidth="0.4"
                    fill="black"
                  />
                  <TextSVG
                    x={WeightTooltipPos.x}
                    y={WeightTooltipPos.y - 15}
                    fill="white"
                    fontSize="13"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {WeightTooltipPos.value}
                  </TextSVG>
                </Svg>
              </View>
            ) : null;
          }}
          onDataPointClick={(data) => {
            let isSamePoint =
              WeightTooltipPos.x === data.x && WeightTooltipPos.y === data.y;

            isSamePoint
              ? setWeightTooltipPos((previousState) => {
                  return {
                    ...previousState,
                    value: data.value,
                    visible: !previousState.visible,
                  };
                })
              : setWeightTooltipPos({
                  x: data.x,
                  value: data.value,
                  y: data.y,
                  visible: true,
                });
          }}
        />
      </ScrollView>
    </Screen>
  );
};

export default BMIDetailScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  oneInput: {
    width: "46%",
    paddingVertical: 12,
    paddingLeft: 7,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 7,
  },
  container: {
    marginTop: 20,
  },
  Graphcontainer: {
    maxHeight: 340,
    marginHorizontal: 4,
    marginBottom: -20,
    marginTop: -20,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  graphHeader: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 5,
    letterSpacing: 1.3,
  },
});

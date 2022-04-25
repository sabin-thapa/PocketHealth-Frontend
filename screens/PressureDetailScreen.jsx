import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";import React, {useState, useEffect} from 'react'
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import colors from "../utils/colors";
import { Rect, Ellipse, Text as TextSVG, Svg } from "react-native-svg";
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios'

import Screen from "./Screen";

let dummyData = [
  {
    systolicValue: 120,
    diastolicValue: 80,
    pulse: 60,
    date: "Sep 1, 2022",
  },

  {
    systolicValue: 130,
    diastolicValue: 90,
    pulse: 65,
    date: "Sep 1, 2020",
  },
  {
    systolicValue: 120,
    diastolicValue: 90,
    pulse: 60,
    date: "Sep 2, 2020",
  },
  {
    systolicValue: 110,
    diastolicValue: 70,
    pulse: 65,
    date: "Oct 1, 2021",
  },
  {
    systolicValue: 130,
    diastolicValue: 70,
    pulse: 70,
    date: "Oct 2, 2021",
  },
  {
    systolicValue: 110,
    diastolicValue: 70,
    pulse: 70,
    date: "Oct 3, 2021",
  },
  {
    systolicValue: 130,
    diastolicValue: 80,
    pulse: 60,
    date: "Oct 4, 2021",
  },
  {
    systolicValue: 130,
    diastolicValue: 90,
    pulse: 55,
    date: "Oct 5, 2021",
  },
  {
    systolicValue: 110,
    diastolicValue: 80,
    pulse: 60,
    date: "Oct 6, 2021",
  },
  {
    systolicValue: 130,
    diastolicValue: 70,
    pulse: 65,
    date: "Oct 7, 2021",
  },
  {
    systolicValue: 110,
    diastolicValue: 70,
    pulse: 60,
    date: "Oct 8, 2021",
  },
];

const PressureDetailScreen = ({navigation}) => {
  const [DiastolicToolTips, setDiastolicToolTips] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const [SystolicToolTips, setSystolicToolTips] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const [PulseToolTips, setPulseToolTips] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const [year, setYear] = useState("2021");
  const [notDummyData, setNotDummyData] = useState([]);
  const [month, setMonth] = useState("Jan");
  var xLabels = ["Null"];
  var systolicData = [0];
  var diastolicData = [0];
  var pulseData = [0];
  const calculateValues = () => {
    var i = 0;
    notDummyData.forEach((item, index, array) => {
      if (item.date.split(", ")[1] === year) {
        if (item.date.split(" ")[0] === month) {
          if (i == 0) {
            xLabels = [];
            diastolicData = [];
            systolicData = [];
            pulseData = [];
          }
          i++;
          xLabels.push(item.date.split(",")[0]);
          diastolicData.push(item.diastolicValue);
          systolicData.push(item.systolicValue);
          pulseData.push(item.pulse);
        }
      }
    });
  };
  // .........
  calculateValues();

  useEffect(() => {
    const getData = async () => {
      var dataContainer = []
      await axios.get(`http://172.17.0.88:8000/api/trackers/pressure/`)
      .then(res => {
        const val = res.data
        console.log(val);
        val?.map((vl) => {
          var datestring = new Date(vl.created_at).toDateString()
          var datearray = datestring.split(" ")
          var date = datearray[1] + " " + datearray[2] + ", " + datearray[3] 

          return dataContainer.push({
            date: date,
            systolicValue: vl.systolic_value,
            diastolicValue: vl.diastolic_value,
            pulse: vl.pulse_value
          })
        })
        setNotDummyData(dataContainer)
      })
      .catch(err => {
        console.log(err, "Err")}
        )
      }
      getData()
      const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const currentDate = new Date();
      let currentMonth = month[currentDate.getMonth()]
      setMonth(currentMonth.toString())
      setYear(currentDate.getFullYear().toString())
    }, [])

  return (
    <Screen style={styles.container}>
    <ScrollView>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Pressure")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Blood Pressure Statistics</Text>
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
        <Text style={styles.graphHeader}>Diastolic (mm/Hg)</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.Graphcontainer}
          horizontal={true}
        >
          <LineChart
            data={{
              labels: xLabels,
              datasets: [{ data: diastolicData, color: () => "#fff" }],
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
              return DiastolicToolTips.visible ? (
                <View>
                  <Svg>
                    <Ellipse
                      cx={DiastolicToolTips.x}
                      cy={DiastolicToolTips.y - 20}
                      rx="21"
                      ry="13"
                      stroke="white"
                      strokeWidth="0.4"
                      fill="black"
                    />
                    <TextSVG
                      x={DiastolicToolTips.x}
                      y={DiastolicToolTips.y - 15}
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {DiastolicToolTips.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                DiastolicToolTips.x === data.x && DiastolicToolTips.y === data.y;

              isSamePoint
                ? setDiastolicToolTips((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setDiastolicToolTips({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
          />
        </ScrollView>
        <Text style={styles.graphHeader}>Systolic (mm/Hg)</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.Graphcontainer}
          horizontal={true}
        >
          <LineChart
            data={{
              labels: xLabels,
              datasets: [{ data: systolicData, color: () => "#fff" }],
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
              return SystolicToolTips.visible ? (
                <View>
                  <Svg>
                    <Ellipse
                      cx={SystolicToolTips.x}
                      cy={SystolicToolTips.y - 20}
                      rx="21"
                      ry="13"
                      stroke="white"
                      strokeWidth="0.4"
                      fill="black"
                    />
                    <TextSVG
                      x={SystolicToolTips.x}
                      y={SystolicToolTips.y - 15}
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {SystolicToolTips.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                SystolicToolTips.x === data.x && SystolicToolTips.y === data.y;

              isSamePoint
                ? setSystolicToolTips((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setSystolicToolTips({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
          />
        </ScrollView>
        <Text style={styles.graphHeader}>Pulse (bpm)</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.Graphcontainer}
          horizontal={true}
        >
          <LineChart
            data={{
              labels: xLabels,
              datasets: [{ data: pulseData, color: () => "#fff" }],
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
              return PulseToolTips.visible ? (
                <View>
                  <Svg>
                    <Ellipse
                      cx={PulseToolTips.x}
                      cy={PulseToolTips.y - 20}
                      rx="21"
                      ry="13"
                      stroke="white"
                      strokeWidth="0.4"
                      fill="black"
                    />
                    <TextSVG
                      x={PulseToolTips.x}
                      y={PulseToolTips.y - 15}
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {PulseToolTips.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                PulseToolTips.x === data.x && PulseToolTips.y === data.y;

              isSamePoint
                ? setPulseToolTips((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setPulseToolTips({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
          />
        </ScrollView>
      </ScrollView>
    </Screen>
  )
}

export default PressureDetailScreen

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
    marginBottom: 10,
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

})
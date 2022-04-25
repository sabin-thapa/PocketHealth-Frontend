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
import axios from 'axios'

import RNPickerSelect from "react-native-picker-select";

import Screen from "./Screen";

let dummyData = [
  {
    glucose: 71.5,
    haemoglobin: 13.2,
    ketone: 0,
    date: "Sep 1, 2022",
  },

  {
    glucose: 72,
    haemoglobin: 12.4,
    ketone: 0,
    date: "Sep 1, 2020",
  },
  {
    glucose: 73,
    haemoglobin: 13,
    ketone: 0,
    date: "Sep 2, 2020",
  },
  {
    glucose: 70,
    haemoglobin: 13.6,
    ketone: 0.7,
    date: "Oct 1, 2021",
  },
  {
    glucose: 68,
    haemoglobin: 14,
    ketone: 0.8,
    date: "Oct 2, 2021",
  },
  {
    glucose: 70,
    haemoglobin: 14.2,
    ketone: 1,
    date: "Oct 3, 2021",
  },
  {
    glucose: 74,
    haemoglobin: 14.5,
    ketone: 1.2,
    date: "Oct 4, 2021",
  },
  {
    glucose: 74.6,
    haemoglobin: 14.7,
    ketone: 1.4,
    date: "Oct 5, 2021",
  },
  {
    glucose: 74.8,
    haemoglobin: 15,
    ketone: 1.6,
    date: "Oct 6, 2021",
  },
  {
    glucose: 76,
    haemoglobin: 12,
    ketone: 1.2,
    date: "Oct 7, 2021",
  },
  
];

const SugarDetailScreen = ({navigation}) => {
  const [GlucoseToolTips, setGlucoseToolTips] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const [HaemoglobinToolTips, setHaemoglobinToolTips] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const [KetoneToolTips, setKetoneToolTips] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  const [year, setYear] = useState("2021");
  const [notDummyData, setNotDummyData] = useState([]);
  const [month, setMonth] = useState("Jan");
  var xLabels = ["Null"];
  var glucoseData = [0];
  var haemoglobinData = [0];
  var ketoneData = [0];
  const calculateValues = () => {
    var i = 0;
    notDummyData.forEach((item, index, array) => {
      if (item.date.split(", ")[1] === year) {
        if (item.date.split(" ")[0] === month) {
          if (i == 0) {
            xLabels = [];
            glucoseData = [];
            haemoglobinData = [];
            ketoneData = [];
          }
          i++;
          xLabels.push(item.date.split(",")[0]);
          glucoseData.push(item.glucose);
          haemoglobinData.push(item.haemoglobin);
          ketoneData.push(item.ketone);
        }
      }
    });
  };
  // .........
  calculateValues();

  useEffect(() => {
    const getData = async () => {
      var dataContainer = []
      await axios.get(`http://172.17.0.88:8000/api/trackers/bloodsugar/`)
      .then(res => {
        const val = res.data
        console.log(val);
        val?.map((vl) => {
          var datestring = new Date(vl.created_at).toDateString()
          var datearray = datestring.split(" ")
          var date = datearray[1] + " " + datearray[2] + ", " + datearray[3] 

          return dataContainer.push({
            date: date,
            glucose: vl.glucose_value,
            haemoglobin: vl.haemoglobin_value,
            ketone: vl.ketone_value
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
      <View
        style={{
          flexDirection: "row",
          marginLeft: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Sugar")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Blood Sugar Statistics</Text>
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
      <ScrollView>
        <Text style={styles.graphHeader}>Blood Glucose</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.Graphcontainer}
          horizontal={true}
        >
          <LineChart
            data={{
              labels: xLabels,
              datasets: [{ data: glucoseData, color: () => "#fff" }],
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
              return GlucoseToolTips.visible ? (
                <View>
                  <Svg>
                    <Ellipse
                      cx={GlucoseToolTips.x}
                      cy={GlucoseToolTips.y - 20}
                      rx="21"
                      ry="13"
                      stroke="white"
                      strokeWidth="0.4"
                      fill="black"
                    />
                    <TextSVG
                      x={GlucoseToolTips.x}
                      y={GlucoseToolTips.y - 15}
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {GlucoseToolTips.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                GlucoseToolTips.x === data.x && GlucoseToolTips.y === data.y;

              isSamePoint
                ? setGlucoseToolTips((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setGlucoseToolTips({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
          />
          
        </ScrollView>
        <Text style={styles.graphHeader}>Haemoglobin (%) </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.Graphcontainer}
          horizontal={true}
        >
          <LineChart
            data={{
              labels: xLabels,
              datasets: [{ data: haemoglobinData, color: () => "#fff" }],
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
              return HaemoglobinToolTips.visible ? (
                <View>
                  <Svg>
                    <Ellipse
                      cx={HaemoglobinToolTips.x}
                      cy={HaemoglobinToolTips.y - 20}
                      rx="21"
                      ry="13"
                      stroke="white"
                      strokeWidth="0.4"
                      fill="black"
                    />
                    <TextSVG
                      x={HaemoglobinToolTips.x}
                      y={HaemoglobinToolTips.y - 15}
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {HaemoglobinToolTips.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
              HaemoglobinToolTips.x === data.x && HaemoglobinToolTips.y === data.y;

              isSamePoint
                ? setHaemoglobinToolTips((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setHaemoglobinToolTips({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
          />
          
        </ScrollView>
        <Text style={styles.graphHeader}>Ketone</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.Graphcontainer}
          horizontal={true}
        >
          <LineChart
            data={{
              labels: xLabels,
              datasets: [{ data: ketoneData, color: () => "#fff" }],
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
              return KetoneToolTips.visible ? (
                <View>
                  <Svg>
                    <Ellipse
                      cx={KetoneToolTips.x}
                      cy={KetoneToolTips.y - 20}
                      rx="21"
                      ry="13"
                      stroke="white"
                      strokeWidth="0.4"
                      fill="black"
                    />
                    <TextSVG
                      x={KetoneToolTips.x}
                      y={KetoneToolTips.y - 15}
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {KetoneToolTips.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
              KetoneToolTips.x === data.x && KetoneToolTips.y === data.y;

              isSamePoint
                ? setKetoneToolTips((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setKetoneToolTips({
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

export default SugarDetailScreen

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
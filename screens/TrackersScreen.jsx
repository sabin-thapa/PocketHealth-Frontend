import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from "react-native";import Screen from "./Screen";
import TopBar from "../components/TopBar";
import BMIPic from "../assets/body-mass-index.png";
import SugarPic from "../assets/sugar-blood-level.png";
import PressurePic from "../assets/blood-pressure.png";
import ExercisePic from "../assets/exercise.png";
import colors from "../utils/colors";



const options = [
  {
    title: "BMI",
    url: BMIPic,
    background: "#A3ABFF",
    labelColor: "#FEF9F3",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link: "BMI",
  },
  {
    title: "Blood Sugar",
    url: SugarPic,
    background: "#FEB18F",
    labelColor: "#3F414E",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link: "Sugar",
  },
  {
    title: "Blood Pressure",
    url: PressurePic,
    background: "#6CB28E",
    labelColor: "#FFECCC",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link: "Pressure",
  },
  {
    title: "Exercise Tracker",
    url: ExercisePic,
    background: "#A3ABFF",
    labelColor: "#FEF9F3",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link: "Exercise",
  },
];

const TrackersScreen = ({ navigation }) => {
  return (
    <Screen>
      <TopBar title="Trackers" navigation={navigation} />
      <View style={styles.titleWrapper}>
          <Text style={styles.welcomeText}>
            Please choose a tracker to get started.
          </Text>
        </View>

        <View style={styles.cardsView}>
          <View style={{ flex: 1 }}>
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
          </View>
    </Screen>
  );
};

export default TrackersScreen;

const styles = StyleSheet.create({
    recommendationHeader: {
        flex: 1,
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        paddingHorizontal: 5,
      },
      backgroundImage: {
        position: "absolute",
        top: "13%",
      },
      container: {
        backgroundColor: colors.light,
      },
      helloText: {
        fontSize: 23,
        color: colors.primary,
        paddingHorizontal: 5,
      },
      subHeading: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary,
      },
      welcomeText: {
        fontSize: 17,
        color: colors.primary,
        opacity: 0.5,
        marginTop: 5,
        marginBottom: 20,
        paddingHorizontal: 5,
      },
      label: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        paddingLeft: 5,
      },
      cardsView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
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
});

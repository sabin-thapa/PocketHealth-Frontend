import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import colors from "../utils/colors";
import TopBar from "../components/HomeScreen/TopBar";
import Screen from "./Screen";
import backgroundPic from "../assets/bg2.png";
import mentalHealthPic from "../assets/mental-health2.png";
import BMIPic from "../assets/body-mass-index.png";
import SymptomCheckerPic from "../assets/stomachache.png";
import ArticlesPic from "../assets/application.png";
import reminderPic from "../assets/reminder.png";
import chatsPic from "../assets/chat.png";
import chatBotPic from "../assets/chatbot.png";
import QnAPic from "../assets/question1.png";
import Recommendations from "../components/Recommendations";

const options = [
  {
    title: "Mental Wellness",
    url: mentalHealthPic,
    background: "#FA6E5A",
    labelColor: "#FEF9F3",
    height: 170,
    imageSize: { width: 90, height: 90 },
    link: 'MentalWellness'
  },
  {
    title: "BMI Calculator",
    url: BMIPic,
    background: "#A3ABFF",
    labelColor: "#FEF9F3",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link: 'BMI'
  },
  {
    title: "Symptom Checker",
    url: SymptomCheckerPic,
    background: "#FEB18F",
    labelColor: "#3F414E",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link: 'SymptomsChecker'
  },
  {
    title: "Aricles",
    url: ArticlesPic,
    background: "#FFCF86",
    labelColor: "#3F414E",
    height: 170,
    imageSize: { width: 90, height: 90 },
    link: 'ArticlesScreen'
  },
  {
    title: "Reminder",
    url: reminderPic,
    background: "#6CB28E",
    labelColor: "#FFECCC",
    height: 170,
    imageSize: { width: 80, height: 80 },
    link:'Reminder'
  },
  {
    title: "Chats",
    url: chatsPic,
    background: "#3F414E",
    labelColor: "#EBEAEC",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link:'Chats'
  },
  {
    title: "Chat with AI",
    url: chatBotPic,
    background: "#F4717F",
    labelColor: "#3F414E",
    height: 135,
    imageSize: { width: 60, height: 60 },
    link: 'ChatWithAI'
  },
  {
    title: "QnA",
    url: QnAPic,
    background: "#999999",
    labelColor: "#3F414E",
    height: 170,
    imageSize: { width: 90, height: 90 },
    link: 'QnA'
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <TopBar navigation={navigation} />
      <Image style={styles.backgroundImage} source={backgroundPic} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewWrapper}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.helloText}>Hello</Text>
          <Text style={styles.welcomeText}>
            Please choose an option to get started.
          </Text>
        </View>

        <View style={styles.cardsView}>
          <View style={{ flex: 1 }}>
            {options.map((item, index) => {
              if (index % 2 == 0) {
                return (
                    <TouchableOpacity activeOpacity={0.7} key={`cardItem - ${index}`} onPress={()=>navigation.navigate(item.link)}>
                        <View
                            style={[
                            styles.card,
                            { backgroundColor: item.background, height: item.height },
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
              }
            })}
          </View>
          <View style={{ flex: 1 }}>
            {options.map((item, index) => {
              if (index % 2 != 0) {
                return (
                    <TouchableOpacity activeOpacity={0.7} key={`cardItem - ${index}`} onPress={()=>navigation.navigate(item.link)}>
                        <View
                            style={[
                            styles.card,
                            { backgroundColor: item.background, height: item.height },
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
              }
            })}
          </View>
        </View>
        <View style={[styles.recommendedWrapper]}>
          <View style={[styles.recommendationHeader]}>
            <Text style={[styles.subHeading]}>Recommended For You</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate('Recommendations')}>
              <Text style={{ color: colors.primary, marginTop: 4 }}>
                See all >>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Recommendations />
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;

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
    fontSize: 30,
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
    marginTop: 10,
    marginBottom: 10,
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

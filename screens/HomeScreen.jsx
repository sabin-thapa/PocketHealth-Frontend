import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNotes } from "../contexts/NoteProvider";
import { AuthContext } from "../contexts/AuthProvider";

import colors from "../utils/colors";
import TopBar from "../components/HomeScreen/TopBar";
import Screen from "./Screen";
import backgroundPic from "../assets/bg2.png";
import BMIPic from "../assets/body-mass-index.png";
import SugarPic from "../assets/sugar-blood-level.png";
import PressurePic from "../assets/blood-pressure.png";
import MainPic from "../assets/main.png";
import MedicineRemPic from "../assets/appointment.png";
import VaccineRemPic from "../assets/vaccine.png";
import DueRemPic from "../assets/deadline.png";

const tracker_options = [
  {
    title: "BMI",
    url: BMIPic,
    background: "#A3ABFF",
    labelColor: "#FEF9F3",
    link: "BMI",
  },
  {
    title: "Blood Sugar",
    url: SugarPic,
    background: "#FEB18F",
    labelColor: "#3F414E",
    link: "Sugar",
  },
  {
    title: "Pressure",
    url: PressurePic,
    background: "#6CB28E",
    labelColor: "#FFECCC",
    link: "Pressure",
  },
];

const reminder_options = [
  {
    title: "Medicine",
    url: MedicineRemPic,
    background: "#A3ABFF",
    labelColor: "#FEF9F3",
    link: "Sugar",
  },
  {
    title: "Vaccine",
    url: VaccineRemPic,
    background: "#FEB18F",
    labelColor: "#3F414E",
    link: "Pressure",
  },
  {
    title: "Due Date",
    url: DueRemPic,
    background: "#6CB28E",
    labelColor: "#FFECCC",
    link: "Pressure",
  },
]

const HomeScreen = ({ navigation }) => {
  const [time, setTime] = useState("");

  const { notes, setNotes, findNotes } = useNotes();
  const {user} = useContext(AuthContext)

  const reverseData = (data) => {
    return data.sort((a, b) => parseInt(b.time - a.time));
  };

  const reverseNotes = reverseData(notes).slice(0,2);

  const openNote = (note) => {
    navigation.navigate("NoteDetail", { note });
  };

  const findTime = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setTime("Morning");
    if (hrs === 12 || hrs < 17) return setTime("Afternoon");
    setTime("Evening");
  };

  useEffect(() => {
    findTime();
    console.log(user.id);
  }, []);

  return (
    <Screen style={styles.container}>
      <TopBar navigation={navigation} />
      <Image style={styles.backgroundImage} source={backgroundPic} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewWrapper}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.helloText}>{`Good ${time}`}</Text>
          <Text style={styles.welcomeText}>
            Please choose an option to get started.
          </Text>
        </View>

        <View>
          <Image style={styles.mainImage} source={MainPic} />
        </View>

        <View style={styles.cardsContainer}>
          <Text style={styles.cardHeader}>Trackers</Text>
          <View style={styles.cardLevel}>
            {tracker_options.map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={`cardItem - ${index}`}
                    onPress={() => navigation.navigate(item.link)}
                  >
                    <View
                      style={[styles.card,{backgroundColor: item.background}]}
                    >
                      <Image
                        style={styles.cardImage}
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
          <Text style={styles.cardHeader}>Reminders</Text>
          <View style={styles.cardLevel}>
            {reminder_options.map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={`cardItem - ${index}`}
                    onPress={() => navigation.navigate(item.link)}
                  >
                    <View
                      style={[styles.card,{backgroundColor: item.background}]}
                    >
                      <Image
                        style={styles.cardImage}
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
          <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardHeader}>Latest Notes</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate("Notes", {screen: 'NotesMain'})}>
              <Text style={{color: colors.primary, marginRight:10}}>See All</Text>
            </TouchableOpacity>
          </View>
            <View style={styles.notesContainer}>
              {reverseNotes.map((item, index)=>{
                return(
                  <View key={index} style={styles.note}>
                    {item.title.length!==0 && <Text style={styles.notetitle} numberOfLines={2}>{item.title}</Text>}
                    {item.desc.length!==0 && <Text style={styles.notedesc} numberOfLines={6}>{item.desc}</Text>}
                  </View>
                )
              })}
            </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  notesContainer:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30
  },
  note: {
    backgroundColor: 'white',
    width: '47%',
    maxHeight: 150,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 45,
    borderRadius: 12,
},
  mainImage:{
    width: 300,
    height: 300,
    alignSelf: 'center'
  },
  cardLevel:{
    flex: 1,
    flexWrap: 'wrap',
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  cardHeader:{
    fontSize: 16,
    color: colors.primary,
    opacity: 0.9,
    marginBottom: 5,
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
    fontSize: 16,
    color: colors.primary,
    opacity: 0.5,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 17,
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
    height: 60,
    width: 60
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    marginHorizontal: 3,
    width: 115,
  },
  notedesc: {
    fontSize: 15,
    color: colors.darkgray,
  },
  notetitle: {
      fontWeight: '700',
      fontSize: 16,
      color: colors.primary,
      marginBottom: 5
  },
});

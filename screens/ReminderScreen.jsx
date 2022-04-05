import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import TopBar from "../components/TopBar";
import colors from "../utils/colors";
import Screen from "./Screen";
import { Agenda } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import DrawerTopBar from "../components/DrawerTopBar";
import RoundIconBtn from "../components/RoundIconBtn";
import Reminder from "../components/Reminder";
import ReminderModal from "../components/ReminderModal";
import img from "../assets/schedule.png";

const reminders = [
  {
    id: 1,
    title: "Anti-Biotics",
    time: "8AM",
    frequency: ['Sun', 'Mon', 'Tue'],
    type: "capsule",
    startDate: 'April 1',
    endDate: 'April 14'
  },
  {
    id: 2,
    title: "Protein",
    time: "8AM",
    frequency: ["Every Day"],
    type: "tablet",
    startDate: 'April 1',
    endDate: 'April 14'
  },
  {
    id: 3,
    title: "Pantop",
    time: "8AM",
    frequency: ["Every Day"],
    type: "tablet",
    startDate: 'April 1',
    endDate: 'April 14'
  },
  {
    id: 4,
    title: "Protein",
    time: "8AM",
    frequency: ["Every Day"],
    type: "liquid",
    startDate: 'April 1',
    endDate: 'April 14'
  },
  {
    id: 5,
    title: "Pantop",
    time: "8AM",
    frequency: "Every Day",
    type: "tablet",
    startDate: 'April 1',
    endDate: 'April 14'
  },
];

const ReminderScreen = ({ navigation }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [items, setItems] = React.useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  //   const loadItems = (day) => {
  //     setTimeout(() => {
  //       for (let i = 0; i < 10; i++) {
  //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //         const strTime = timeToString(time);

  //         if (!items[strTime]) {
  //           items[strTime] = [];
  //             items[strTime].push({
  //               name: "Reminder for " + strTime + " #" ,
  //               height: Math.max(50, Math.floor(Math.random() * 5)),
  //               day: strTime,
  //             });
  //         }
  //       }
  //       const newItems = {};
  //       Object.keys(items).forEach((key) => {
  //         newItems[key] = items[key];
  //       });
  //       setItems(newItems)
  //     }, 1000);
  //   };

  //   const renderItem = (item) => {
  //     return (
  //       <TouchableOpacity style={{ marginTop: 40 }}>
  //         <Card>
  //           <Card.Content>
  //             <View style={styles.itemContainer}>
  //               <Text> {item.name}</Text>
  //             </View>
  //           </Card.Content>
  //         </Card>
  //       </TouchableOpacity>
  //     );
  //   };

  const openReminder = (reminder) => {
    navigation.navigate("ReminderDetail", { reminder });
  };

  const handleSubmit = async (title) => {
    console.log("Submitted");
  };

  return (
    <Screen style={styles.container}>
      <TopBar title="Reminders" navigation={navigation} />
      {/* <Agenda
        items={items}
        // renderItem={renderItem}
        // loadItemsForMonth={loadItems}
        // onCalendarToggled={(calOpen) => setCalendarOpen(!calOpen)}
      /> */}
      {/* <View style={styles.addSection}>
        <MaterialCommunityIcons
          style={styles.calendarIcon}
          name="calendar-multiple-check"
          size={96}
          color={colors.primary}
        />
        <Text style={styles.mainText}> Add Reminder </Text>
        <Text style={styles.descriptionText}>
          {" "}
          Take your medication on time with the help of our reminder{" "}
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("AddReminder")}
        >
          <Text style={styles.btnText}> Add Medicine Reminder </Text>
        </TouchableOpacity>
      </View> */}

      <RoundIconBtn
        onPress={() => {
          setModalVisible(true);
        }}
        antIconName="plus"
        style={styles.addBtn}
      />

      <ReminderModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
      <View style={styles.image}>
        <Image source={img} style={{ width: 200, height: 200 }} />
      </View>
      {reminders.length === 0 ? (
        <Text
          style={{
            alignSelf: "center",
            marginTop: 20,
            fontSize: 20,
            color: colors.gray,
          }}
        >
          Tap on the plus icon to add a new reminder.
        </Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 10 }}
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Reminder onPress={() => openReminder(item)} item={item} />
          )}
        />
      )}
    </Screen>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlue,
  },
  addSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },

  mainText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descriptionText: {
    marginBottom: 4,
    marginTop: 10,
    color: colors.darkgray,
  },
  btn: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginTop: 12,
    marginBottom: 4,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.gray,
  },
  btnText: {
    fontSize: 16,
    color: colors.darkgray,
  },
  itemContainer: {
    display: "flex",
    justifyContent: "center",
    // alignItems: 'center',
    // marginTop: 30,
    fontSize: 16,
  },
  itemText: {
    marginTop: "14%",
    fontSize: 16,
    color: colors.secondary,
  },
  addBtn: {
    position: "absolute",
    zIndex: 1,
    bottom: 40,
    right: 40,
  },
  image: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10
  },
  
});

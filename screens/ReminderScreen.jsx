import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, Alert } from "react-native";
import TopBar from "../components/TopBar";
import colors from "../utils/colors";
import Screen from "./Screen";

import RoundIconBtn from "../components/RoundIconBtn";
import Reminder from "../components/Reminder";
import ReminderModal from "../components/ReminderModal";
import img from "../assets/schedule.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReminderContext } from "../contexts/ReminderProvider";
import { useReminders } from "../contexts/ReminderProvider";
import * as Notifications from "expo-notifications";


// const reminders = [
//   {
//     id: 1,
//     title: "Anti-Biotics",
//     time: "8AM",
//     frequency: ['Sun', 'Mon', 'Tue'],
//     type: "capsule",
//     startDate: 'April 1',
//     endDate: 'April 14'
//   },
//   {
//     id: 2,
//     title: "Protein",
//     time: "8AM",
//     frequency: ["Every Day"],
//     type: "tablet",
//     startDate: 'April 1',
//     endDate: 'April 14'
//   },
//   {
//     id: 3,
//     title: "Pantop",
//     time: "8AM",
//     frequency: ["Every Day"],
//     type: "tablet",
//     startDate: 'April 1',
//     endDate: 'April 14'
//   },
//   {
//     id: 4,
//     title: "Protein",
//     time: "8AM",
//     frequency: ["Every Day"],
//     type: "liquid",
//     startDate: 'April 1',
//     endDate: 'April 14'
//   },
//   {
//     id: 5,
//     title: "Pantop",
//     time: "8AM",
//     frequency: "Every Day",
//     type: "tablet",
//     startDate: 'April 1',
//     endDate: 'April 14'
//   },
// ];

const ReminderScreen = ({ navigation }) => {
  const { reminders, setReminders, findReminders } = useReminders();
  const [modalVisible, setModalVisible] = useState(false);
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  // Notifications

  async function scheduleNotification(hour) {
    var today = new Date()
    const curr = today.getHours()
    let tyam;

    if(curr < hour) {
      tyam = parseInt(hour) - parseInt(curr)
    } else {
      tyam = 24-parseInt(curr)+parseInt(hour)
    }


    const secs = tyam*60*60 
    
    await Notifications.requestPermissionsAsync().then((permission) => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "💊 Medicine Reminder",
          subtitle: "Time to take your meds!",
        },
        trigger: {
          repeats: true,
          seconds: secs,
        },
      });
    });
    Alert.alert("Notification scheduled!!");
  }

  const cancelNotifications = () => {
    Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert("All notifications cancelled!");
  };

  useEffect(() => {
    findReminders();
    console.log(reminders);
  }, []);

  const openReminder = (reminder) => {
    navigation.navigate("ReminderDetail", { reminder });
  };

  const revData = (rem) => {
    return rem.sort((a, b) => parseInt(b.time - a.time));
  };

  const reverseReminders = revData(reminders);

  const handleSubmit = async (
    medicineName,
    medicineType,
    frequency,
    selectedHours
  ) => {
    const rem = {
      id: Date.now(),
      medicineName,
      medicineType,
      frequency,
      selectedHours,
      time: Date.now(),
    };
    const updatedReminders = [...reminders, rem];
    setReminders(updatedReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(updatedReminders));
    setModalVisible(false);
    scheduleNotification(selectedHours)
  };

  return (
    <Screen style={styles.container}>
      <TopBar title="Reminders" navigation={navigation} />
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
          data={reverseReminders}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});

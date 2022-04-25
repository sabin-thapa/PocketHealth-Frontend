import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import Screen from "./Screen";
import RoundIconBtn from "../components/RoundIconBtn";
import colors from "../utils/colors";
import { Card } from "react-native-paper";
import NoteModal from "../components/NoteModal";
import { useReminders } from "../contexts/ReminderProvider";
import ReminderModal from "../components/ReminderModal";
import AsyncStorage from '@react-native-async-storage/async-storage'


const ReminderDetailScreen = (props) => {
  const [reminder, setReminder] = useState(props.route.params.reminder);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {setReminders} = useReminders()

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
    console.log('Edit modal clicked');
  }

  const handleOnClose = () => setShowModal(false);

  const handleUpdate = async (medicineName, frequency, selectedHours, medicineType) => {
    const result = await AsyncStorage.getItem("reminders");
    let reminders = [];
    if (result !== null) reminders = JSON.parse(result);

    const newReminders = reminders.filter((n) => {
      if (n.id === reminder.id) {
        n.medicineName = medicineName;
        n.frequency = frequency;
        n.medicineType = medicineType;
        n.selectedHours = selectedHours;

        setReminder(n);
      }
      return n;
    });
    setReminders(newReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(newReminders));
    handleOnClose();
  };

  const deleteReminder = async () => {
    const result = await AsyncStorage.getItem("reminders");
    let reminders = [];
    if (result !== null) reminders = JSON.parse(result);

    const newReminders = reminders.filter((n) => n.id !== reminder.id);
    setReminders(newReminders);
    await AsyncStorage.setItem("reminders", JSON.stringify(newReminders));
    props.navigation.goBack();
  };


  const confirmDelete = () => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete your reminder permanently!",
      [
        {
          text: "Delete",
          onPress: deleteReminder,
        },
        {
          text: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };



  return (
    <Screen>
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <View style={styles.textContent}>
              <Text style={styles.titleText}>{reminder.medicineName}</Text>
              <Text>{reminder.selectedHours}</Text>
              <Text>{reminder.frequency}</Text>
            </View>
          </Card.Content>
        </Card>
        <View style={styles.btnContainer}>
          <RoundIconBtn
            antIconName="delete"
            style={{ backgroundColor: colors.secondary, marginBottom: 15 }}
            onPress={confirmDelete}
          />
          <RoundIconBtn antIconName="edit" onPress={openEditModal} />
        </View>
      </View>
      <ReminderModal
        isEdit={isEdit}
        reminder={reminder}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </Screen>
  );
};

export default ReminderDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    top: 500,
  },
  titleText: {
    fontWeight: "bold",
  },
});

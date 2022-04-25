import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Button,
  DatePickerIOSBase,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../utils/colors";
import AppTextInput from "./AppTextInput";
import RNPickerSelect from "react-native-picker-select";

const ReminderModal = ({ visible, onSubmit, onClose, reminder, isEdit }) => {
  const [medicineName, setMedicineName] = useState("");
  const [medicineType, setMedicineType] = useState("tablet");
  const [frequency, setFrequency] = useState(null);
  const [selectedHours, setSelectedHours] = useState(0);

  const hoursData = [
    { value: "1", label: "1 AM" },
    { value: "2", label: "2 AM" },
    { value: "3", label: "3 AM" },
    { value: "4", label: "4 AM" },
    { value: "5", label: "5 AM" },
    { value: "6", label: "6 AM" },
    { value: "7", label: "7 AM" },
    { value: "8", label: "8 AM" },
    { value: "9", label: "9 AM" },
    { value: "10", label: "10 AM" },
    { value: "11", label: "11 AM" },
    { value: "12", label: "12 PM" },
    { value: "13", label: "13 PM" },
    { value: "14", label: "14 PM" },
    { value: "15", label: "15 PM" },
    { value: "16", label: "16 PM" },
    { value: "17", label: "17 PM" },
    { value: "18", label: "18 PM" },
    { value: "19", label: "19 PM" },
    { value: "20", label: "20 PM" },
    { value: "21", label: "21 PM" },
    { value: "22", label: "22 PM" },
    { value: "23", label: "23 PM" },
    { value: "24", label: "24 PM" },
  ];

  const onPressSubmit = ({
    medicineName,
    frequency,
    medicineType,
    selectedHours,
  }) => {
    console.log("Submitted");
    if (isEdit) {
      onSubmit(medicineName, frequency, medicineType, selectedHours),
        Daten.now();
    } else {
      onSubmit(medicineName, frequency, medicineType, selectedHours);
    }
  };

  useEffect(() => {
    // console.log(selectedHours, selectedMinutes);
    if (isEdit) {
      setMedicineName(reminder.title);
      setMedicineType(reminder.medicineType);
      setSelectedHours(reminder.selectedHours);
      setFrequency(reminder.frequency);
    }
  }, [isEdit]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesome
            name="close"
            size={30}
            color={colors.danger}
            onPress={onClose}
          />
        </TouchableOpacity>
        <AppTextInput
          placeholder="Medicine"
          style={{ backgroundColor: "white" }}
          value={medicineName}
          onChangeText={(val) => setMedicineName(val)}
        />
        {/* <AppTextInput
          placeholder="Dose per day"
          style={{ backgroundColor: "white" }}
          keyboardType="numeric"
          value={dosePerDay}
          onChangeText={(val) => setDosePerDay(val)}
        /> */}
        {/* Time Picker  */}
        {/* Day Picker  */}
        {/* DropDown  */}
        <View style={styles.oneInput}>
          <RNPickerSelect
            placeholder={{ label: "Medicine type", value: null }}
            style={{ inputAndroid: { color: "black" } }}
            onValueChange={(value) => setMedicineType(value)}
            items={[
              { label: "tablet", value: "tablet" },
              { label: "capsule", value: "capsule" },
              { label: "liquid", value: "liquid" },
            ]}
          />
        </View>
        <View style={styles.oneInput}>
          <RNPickerSelect
            placeholder={{ label: "Frequency", value: null }}
            style={{ inputAndroid: { color: "black" } }}
            onValueChange={(value) => setFrequency(value)}
            items={[
              { label: "OD: Once Daily", value: "Once Daily" },
              { label: "BD: Twice Daily", value: "Twice Daily" },
              { label: "TD: Thrice Daily", value: "Thrice Daily" },
            ]}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text> Remind me at </Text>
          <View style={styles.oneInput}>
            <RNPickerSelect
              placeholder={{ label: "Time", value: null }}
              style={{ inputAndroid: { color: "black" } }}
              onValueChange={(value) => setSelectedHours(value)}
              items={hoursData}
            />
          </View>
          {/* <View style={styles.oneInput}>
            <RNPickerSelect
              placeholder={{ label: "Minutes", value: null }}
              style={{ inputAndroid: { color: "black" } }}
              onValueChange={(value) => setSelectedMinutes(value)}
              items={minutesData}
            />
          </View> */}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            onPressSubmit(medicineName, medicineType, frequency, selectedHours)
          }
        >
          <Text style={styles.submitText}>Save Reminder</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ReminderModal;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  closeButton: {
    marginLeft: "80%",
    marginBottom: 80,
  },
  inputText: {
    fontSize: 16,
    width: "100%",
    height: 50,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginTop: 30,
    alignSelf: "flex-start",
    marginLeft: 100,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.3,
  },
  oneInput: {
    width: "90%",
    paddingVertical: 12,
    paddingLeft: 7,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 7,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -116,
  },
  dateText: {
    marginRight: 10,
    marginTop: 16,
    color: colors.gray,
  },
});

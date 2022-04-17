import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../utils/colors";
import AppTextInput from "./AppTextInput";
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";

const ReminderModal = ({ visible, onSubmit, onClose, reminder, isEdit }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [medicineName, setMedicineName] = useState("");
  const [dosePerDay, setDosePerDay] = useState(3);
  const [medicineType, setMedicineType] = useState("tablet");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onPressSubmit = ({medicineName, dosePerDay, medicineType, startDate, endDate}) => {
    console.log("Submitted");
    onSubmit(medicineName, dosePerDay, medicineType, startDate, endDate)
  };
  useEffect(() => {
    if (isEdit) {
      setMedicineName(reminder.title);
      setDosePerDay(reminder.desc);
      setMedicineType(reminder.desc);
      setStartDate(reminder.desc);
      setEndDate(reminder.desc);
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
          value = {medicineName}
          onChangeText = {(val) => setMedicineName(val)}
        />
        <AppTextInput
          placeholder="Dose per day"
          style={{ backgroundColor: "white" }}
          keyboardType="numeric"
          value = {dosePerDay}
          onChangeText = {(val) => setDosePerDay(val)}
        />
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
        {/* Start Date Picker  */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}> Start Date </Text>
          <DatePicker
            style={styles.datePickerStyle}
            date={startDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="05-04-2022"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setStartDate(date);
            }}
          />
        </View>
        {/* End Date Picker  */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}> End Date </Text>
          <DatePicker
            style={styles.datePickerStyle}
            date={endDate} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="05-04-2022"
            maxDate="05-04-2028"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setEndDate(date);
            }}
          />
        </View>
        {/* <TouchableOpacity >
                <Button title="Pick" onPress = { () => setShowDatePicker(true)} />
            </TouchableOpacity>
        {showDatePicker ? <DateTimePicker mode="time" value={new Date(1598051730000)} /> : null}
        <DateTimePicker mode="date" value={new Date(1598051730000)} /> */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => onPressSubmit(medicineName, dosePerDay, startDate, endDate, medicineType)}
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
    width: "100%",
    marginLeft: 20,
    paddingVertical: 12,
    paddingLeft: 7,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 7,
    
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -116

  },
  dateText: {
    marginRight: 10,
    marginTop: 16,
    color: colors.gray,
  },
});

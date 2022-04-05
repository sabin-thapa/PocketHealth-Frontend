import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Screen from "./Screen";
import RoundIconBtn from "../components/RoundIconBtn";
import colors from "../utils/colors";
import { Card } from "react-native-paper";

const ReminderDetailScreen = (props) => {
  const [reminder, setReminder] = useState(props.route.params.reminder);
  return (
    <Screen>
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <View style={styles.textContent}>
              <Text style={styles.titleText}>{reminder.title}</Text>
              <Text>{reminder.time}</Text>
              <Text>{reminder.frequency}</Text>
            </View>
          </Card.Content>
        </Card>
        <View style={styles.btnContainer}>
          <RoundIconBtn
            antIconName="delete"
            style={{ backgroundColor: colors.secondary, marginBottom: 15 }}
            onPress={{}}
          />
          <RoundIconBtn antIconName="edit" onPress={{}} />
        </View>
      </View>
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

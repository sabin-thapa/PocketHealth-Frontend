import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import colors from "../utils/colors";
import Screen from "./Screen";
import ListItem from "../components/ListItem";
import { Ionicons } from "@expo/vector-icons";
import TopBar from "../components/TopBar";


const AccountSettingsScreen = ({ navigation }) => {

    const onPressSave = () => {
        console.log("saved");
      };

  return (
    <Screen style={styles.screen}>
        <TopBar title="Account Settings" navigation={navigation} />
      <View style={{marginBottom: 30}}>
        <ListItem
          title="John Doe"
          subTitle="johndoe@gmail.com"
          image={require("../assets/sajan.png")}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            underlineColor="#000"
            mode="outlined"
            theme={{
              colors: {
                text: "#000",
                underlineColor: "#000",
                primary: "#000",
                background: "#DDD",
              },
              roundness: 10,
            }}
            style={styles.inputText}
            label="Password"
            placeholder="Current Password"
            placeholderTextColor={colors.gray}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            underlineColor="#000"
            mode="outlined"
            theme={{
              colors: {
                text: "#000",
                underlineColor: "#000",
                primary: "#000",
                background: "#DDD",
              },
              roundness: 10,
            }}
            style={styles.inputText}
            label="New Password"
            placeholder="New Password"
            placeholderTextColor={colors.gray}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            underlineColor="#000"
            mode="outlined"
            theme={{
              colors: {
                text: "#000",
                underlineColor: "#000",
                primary: "#000",
                background: "#DDD",
              },
              roundness: 10,
            }}
            style={styles.inputText}
            label="Retype New Password"
            placeholder="Retype New Password"
            placeholderTextColor={colors.gray}
          />
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={onPressSave}>
          <Text style={styles.saveText}>Save Record</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 20,
  },
  screen: {
    backgroundColor: colors.light,
    paddingHorizontal: 17,
    flex: 1,
    marginTop: -10,
  },
  inputText: {
    fontSize: 16,
    width: "90%",
    minHeight: 50,
    marginLeft: 10,
  },
  textInputContainer: {
    borderRadius: 10,
    width: "95%",
    marginHorizontal: 5,
    backgroundColor: "white",
    marginBottom: 17,
  },
  saveBtn: {
    padding: 10,
    alignSelf: "center",
    backgroundColor: colors.secondary,
    borderRadius: 25,
    color: "#fff",
    width: "85%",
    marginTop: 30,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
});

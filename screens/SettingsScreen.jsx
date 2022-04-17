import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";
import DrawerTopBar from "../components/DrawerTopBar";
import colors from "../utils/colors";
import ItemSeparator from "../components/ItemSeperator";
import MyIcon from "../components/MyIcon";
import ListItem from "../components/ListItem";

const settingsItems = [
  {
    title: "Account",
    icon: {
      name: "account",
      color: colors.secondary,
    },
    targetScreen: "AccountSettings",
    routes: {
      name: "AccountSettings",
    },
  },

  {
    title: "Profile",
    icon: {
      name: "face-profile",
      color: colors.secondary,
    },
    targetScreen: "ProfileSettings",
    routes: {
      name: "ProfileSettings",
    },
  },
];

const SettingsScreen = ({ navigation, route }) => {
  return (
    <Screen>
      {route.params.from === "stack" ? (
        <TopBar title="Settings" navigation={navigation} />
      ) : (
        <DrawerTopBar title="Settings" navigation={navigation} />
      )}

      <FlatList
        data={settingsItems}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            IconComponent={
              <MyIcon name={item.icon.name} backgroundColor={item.icon.color} />
            }
            onPress={() => navigation.push(item.targetScreen, item.routes)}
          />
        )}
      />
    </Screen>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});

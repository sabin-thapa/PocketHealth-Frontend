import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";
import DrawerTopBar from "../components/DrawerTopBar";
import colors from "../utils/colors";
import ItemSeparator from "../components/ItemSeperator";
import MyIcon from "../components/MyIcon";
import ListItem from "../components/ListItem";
import { AuthContext } from "../contexts/AuthProvider";

const settingsItems = [

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
  {
    title: "Report Issues/ Contact Us",
    icon: {
      name: "alert-circle",
      color: colors.secondary,
    },
    targetScreen: "ReportScreen",
    routes: {
      name: "Report",
    },
  },
];

const settingsItems1 = [

  {
    title: "Lot Out",
    icon: {
      name: "logout",
      color: colors.secondary,
    },
  },
];


const SettingsScreen = ({ navigation, route }) => {
  const {setIsAuthenticated, logout, user} = useContext(AuthContext)
  return (
    <Screen>
      {route.params.from === "stack" ? (
        <TopBar title="Settings" navigation={navigation} />
      ) : (
        <DrawerTopBar title="Settings" navigation={navigation} />
      )}

      <View style={styles.container}>
        <FlatList
          data={settingsItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <>
              <ListItem
                title={item.title}
                IconComponent={
                  <MyIcon name={item.icon.name} backgroundColor={colors.secondary} />
                }
                onPress={() => navigation.push(item.targetScreen, item.routes)}
              />
            </>
          )}
        />

        <FlatList
          style={styles.container1}
          data={settingsItems1}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <>
              <ListItem
                title={item.title}
                IconComponent={
                  <MyIcon name={item.icon.name} backgroundColor={colors.secondary} />
                }
                onPress={() => logout()}
              />
            </>
          )}
        />
      </View>
    </Screen>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container1:{
    marginTop: '155%'
  }
});

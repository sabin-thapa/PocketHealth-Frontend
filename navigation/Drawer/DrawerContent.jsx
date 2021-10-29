import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer, Avatar, Title, Caption, Paragraph } from "react-native-paper";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import colors from "../../utils/colors";

const DrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.topDrawerSection}>
          <DrawerItem
            icon={({ size }) => (
              <FontAwesome name="home" size={size / 1.2} color={colors.black} />
            )}
            label="Home"
            onPress={() => props.navigation.navigate("Home")}
          />
          <DrawerItem
            icon={({ size }) => (
              <FontAwesome
                name="user-circle"
                size={size / 1.2}
                color={colors.black}
              />
            )}
            label="Profile"
            onPress={() => props.navigation.navigate("Profile")}
          />
          <DrawerItem
            icon={({ size }) => (
              <FontAwesome
                name="group"
                size={size / 1.2}
                color={colors.black}
              />
            )}
            label="Search Articles"
            onPress={() =>
              props.navigation.navigate({name: "Search Articles", params: {from: 'drawer'}})
            }
          />
          <DrawerItem
            icon={({ size }) => (
              <Entypo
                name="help-with-circle"
                size={size / 1.2}
                color={colors.black}
              />
            )}
            label="Notes"
            onPress={() => props.navigation.navigate("Notes")}
          />
          <DrawerItem
            icon={({ size }) => (
              <Entypo
                name="help-with-circle"
                size={size / 1.2}
                color={colors.black}
              />
            )}
            label="Settings"
            onPress={() => props.navigation.navigate({name: "Settings", params: {from: 'drawer'}})}
          />
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ size }) => (
            <MaterialCommunityIcons
              name="logout"
              size={size}
              color={colors.danger}
            />
          )}
          label="Log Out"
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  topDrawerSection: {
    borderTopColor: "#f4f4f4",
    borderTopWidth: 2,
  },
  drawerContent: {
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
  },

  count: {
    fontWeight: "bold",
  },
  followerSection: {
    flexDirection: "row",
    marginVertical: 10,
    marginRight: 20,
  },
  drawerText: {
    marginLeft: 10,
  },
  enrolledGroup: {
    marginVertical: 5,
  },
});

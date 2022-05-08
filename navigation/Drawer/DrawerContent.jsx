import React, {useContext} from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Constants from "expo-constants";
import userIcon from "../../assets/user.png";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import colors from "../../utils/colors";
import { AuthContext } from "../../contexts/AuthProvider";

const DrawerContent = (props) => {
  const {setIsAuthenticated, logout, user} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfo}>
          <Image source={userIcon} style={{width: 60, height: 60, marginRight: 15}} />
          <Text style={{fontSize:20, fontWeight: 'bold', color: colors.darkgray}}>{user.email}</Text>
        </View>
        <View style={styles.topDrawerSection}>
          <DrawerItem
            icon={() => (
              <FontAwesome name="home" size={25} color={colors.primary} />
            )}
            label={() => <Text style={styles.label}>Home</Text>}
            onPress={() => props.navigation.navigate("Home")}
          />
          <DrawerItem
            icon={() => (
              <FontAwesome name="user" size={30} color={colors.primary} />
            )}
            label={() => <Text style={styles.label}>Profile</Text>}
            onPress={() => props.navigation.navigate("Profile")}
          />
          <DrawerItem
            icon={() => (
              <FontAwesome5 name="file-medical" size={28} color={colors.primary} />
            )}
            label={() => <Text style={styles.label}>Medical Reports</Text>}
            onPress={() => props.navigation.navigate("Reports")}
          />
          {/* <DrawerItem
            icon={() => (
              <FontAwesome name="search" size={25} color={colors.primary} />
            )}
            label={() => <Text style={styles.label}>Search Articles</Text>}
            onPress={() =>
              props.navigation.navigate({
                name: "Search Articles",
                params: { from: "drawer" },
              })
            }
          /> */}
          <DrawerItem
            icon={() => (
              <FontAwesome name="sticky-note" size={28} color={colors.primary} />
            )}
            label={() => <Text style={styles.label}>Notes</Text>}
            onPress={() => props.navigation.navigate("Notes")}
          />
          <DrawerItem
            icon={() => (
              <Ionicons name="settings" size={25} color={colors.primary} />
            )}
            label={() => <Text style={styles.label}>Settings</Text>}
            onPress={() =>
              props.navigation.navigate({
                name: "Settings",
                params: { from: "drawer" },
              })
            }
          />
        </View>
      </DrawerContentScrollView>

      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => (
            <MaterialCommunityIcons
              name="logout"
              size={25}
              color={colors.danger}
            />
          )}
          label={() => (
            <Text style={[styles.label, { color: colors.danger }]}>
              Log Out
            </Text>
          )}
          onPress={() => logout()}
        />
        <Text style={styles.copyRightText}>
          Copyright @ 2021 PocketHealth, Inc.All Rights Reserved{" "}
        </Text>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: Constants.statusBarHeight,
  },
  copyRightText: {
    fontSize: 10,
    alignSelf: "center",
    paddingTop: 20,
    color: colors.darkgray,
  },
  label: {
    color: colors.darkgray,
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#999",
    borderTopWidth: 0.4,
  },
  topDrawerSection: {
    borderTopColor: "#999",
    borderTopWidth: 0.4,
  },
  drawerContent: {
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
  },
  userInfo:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30
  }
});

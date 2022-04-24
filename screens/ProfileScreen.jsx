import React, { useContext } from "react";
import { Text, FlatList, StyleSheet, View, Image } from "react-native";
import Screen from "../screens/Screen";
import DrawerTopBar from "../components/DrawerTopBar";
import { TouchableOpacity } from "react-native-gesture-handler";
import ItemSeparator from "../components/ItemSeperator";
import MyIcon from "../components/MyIcon";
import ListItem from "../components/ListItem";
import colors from "../utils/colors";
import { AuthContext } from "../contexts/AuthProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileItems = [
  {
    title: "Dhulikhel-4, Kavrepalanchok",
    icon: {
      name: "map-marker",
      color: colors.secondary,
    },
  },
  {
    title: "+977-9845977921",
    icon: {
      name: "phone",
      color: colors.secondary,
    },
  },
  {
    title: "Male",
    icon: {
      name: "account",
      color: colors.secondary,
    },
  },
  {
    title: "johndoe@gmail.com",
    icon: {
      name: "email",
      color: colors.secondary,
    },
  },

  {
    title: "07 Dec, 1999",
    icon: {
      name: "cake",
      color: colors.secondary,
    },
  },
];

const Profile = ({ navigation, route }) => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <Screen>
        <DrawerTopBar title="Profile" navigation={navigation} />

        <View style={styles.container}>
          <Image source={require("../assets/sajan.png")} style={styles.logo} />
        </View>
        <Text style={styles.name}> John Doe </Text>

        <FlatList
          data={ProfileItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <MyIcon
                  name={item.icon.name}
                  backgroundColor={item.icon.color}
                />
              }
            />
          )}
        />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              onPress={() => logout()}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <MaterialCommunityIcons
                name="logout"
                size={25}
                color={colors.white}
              />
              <Text style={[styles.label, { color: colors.white }]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: colors.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 25,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    color: colors.primary,
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 500,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: colors.secondary,
    width: 200,
    height: 40,
    borderRadius: 20,
  },
});

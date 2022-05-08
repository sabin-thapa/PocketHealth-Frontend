import React, { useContext, useEffect } from "react";
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
import axios from "axios";
import { REACT_APP_BASE_URL, REACT_APP_PORT } from "@env";

const Profile = ({ navigation, route }) => {
  const { logout, user, userData, setUserData } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `${REACT_APP_BASE_URL}:${REACT_APP_PORT}/api/patient/register_model/`,
        {
          params: {
            ID: user.pk,
          },
        }
      )
      .then(function (response) {
        console.log(response.data[0], "user profile response");
        setUserData(response.data[0]);
      });
  }, []);

  const ProfileItems = [
    {
      title: `${userData?.address[0].city}  ${userData?.address[0].district}` || 'address here',
      icon: {
        name: "map-marker",
        color: colors.secondary,
      },
    },
    {
      title: userData.contact[0] || '9845977921',
      icon: {
        name: "phone",
        color: colors.secondary,
      },
    },
    {
      title: userData?.gender || 'gender here',
      icon: {
        name: "account",
        color: colors.secondary,
      },
    },
    {
      title: user.email || 'email here',
      icon: {
        name: "email",
        color: colors.secondary,
      },
    },

    {
      title: userData?.birthDate || 'birth date here',
      icon: {
        name: "cake",
        color: colors.secondary,
      },
    },
  ];

  return (
    <>
      <Screen>
        <DrawerTopBar title="Profile" navigation={navigation} />

        <View style={styles.container}>
          <Image source={require("../assets/sajan.png")} style={styles.logo} />
        </View>
        <Text style={styles.name}>
          {" "}
          {userData?.name?.given} {userData?.name?.family}{" "}
        </Text>

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

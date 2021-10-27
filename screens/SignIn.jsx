import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AppTextInput from "../components/AppTextInput";
import AuthHeader from "../components/AuthHeader";
import * as Yup from "yup";
import colors from "../utils/colors";
import AppForm from "../components/form/AppForm";
import AppFormField from "../components/form/AppFormField";
import SubmitButton from "../components/form/SubmitButton";
import SignInIcon from "../assets/login.png";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import SocialIcons from "../components/SocialIcons";
import BackSquare from "../components/BackSquare";

const { width, height } = Dimensions.get("screen");

const loginValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  password: Yup.string().required().label("Password"),
});

const SignIn = ({ navigation }) => {
  const LoginHandler = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
        <BackSquare />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.pop()}
      >
        <Ionicons name="arrow-back" size={30} color={colors.primary} />
      </TouchableOpacity>
      
      <Image
        source={SignInIcon}
        style={{ width: width / 4, height: width / 4, marginBottom: 20 }}
      />

      <AuthHeader title="Sign In" />
      <AppForm
        initialValues={{ name: "", password: "" }}
        onSubmit={LoginHandler}
        validationSchema={loginValidationSchema}
      >
        <AppFormField name="name" placeholder="Username" />
        <AppFormField name="password" placeholder="Password" />
        <SubmitButton title="Login" />
      </AppForm>
      <TouchableOpacity
        style={{ marginTop: 17 }}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={{ color: "white", fontSize: 14 }}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
      <SocialIcons screen="Sign In" />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: Constants.statusBarHeight + 20,
    left: 20,
  },
  container: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

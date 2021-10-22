import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AuthHeader from "../components/AuthHeader";
import AppFormField from "../components/form/AppFormField";
import colors from "../utils/colors";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import SubmitButton from "../components/form/SubmitButton";
import SignUpIcon from "../assets/add-user.png";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import SocialIcons from "../components/SocialIcons";
import BackSquare from "../components/BackSquare";
const { width, height } = Dimensions.get("screen");

const registerValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please provide your name").label("name"),
  email: Yup.string()
    .email("Please enter a valid email!")
    .required("Email is required!")
    .label("Email"),
  password: Yup.string()
    .required("Password is required!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match!")
    .required("Confirm Password is required!")
    .label("ConfirmPassword"),
});

const SignUp = ({ navigation }) => {
  const registerHandler = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
        <BackSquare />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="arrow-back" size={30} color={colors.primary} />
      </TouchableOpacity>
      
      <Image
        source={SignUpIcon}
        style={{ width: width / 4, height: width / 4, marginBottom: 20 }}
      />
      <AuthHeader title="Create an account" />
      <AppForm
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={registerHandler}
        validationSchema={registerValidationSchema}
      >
        <AppFormField name="name" placeholder="Username" />
        <AppFormField name="email" placeholder="Email" />
        <AppFormField name="password" placeholder="Password" secureTextEntry />
        <AppFormField
          name="confirmPassword"
          placeholder="Confirm password"
          secureTextEntry
        />
        <SubmitButton title="Register" />
      </AppForm>
      <TouchableOpacity
        style={{ marginTop: 17}}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={{color: "white", fontSize: 14}}>Already have an account? Sign In</Text>
      </TouchableOpacity>
      <SocialIcons screen="Sign Up" />
    </View>
  );
};

export default SignUp;

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

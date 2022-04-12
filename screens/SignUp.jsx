import React, { useEffect, useState } from "react";
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
import { Entypo, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import SocialIcons from "../components/SocialIcons";
import BackSquare from "../components/BackSquare";
const { width, height } = Dimensions.get("screen");
import axios from "axios";
import SignUpDatabase from "./SignUpDatabase";
import Loading from "../components/Loading";

const registerValidationSchema = Yup.object().shape({
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

const SignUp = ({ navigation, route }) => {
  const { role } = route.params;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const PORT = process.env.REACT_APP_PORT;
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const registerHandler = (values) => {
    console.log(values);
    setLoading(true);
    {
      role === "patient" &&
        axios
          .post("http://192.168.1.80:8000/api/patient_register/", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            console.log(res, "patient register api response");
            navigation.navigate("SignUpDatabase", {
              role: "patient",
              email: values.email,
            });
          })
          .catch((err) => {
            setLoading(false)
            console.log(
              `Error in posting patient register api data: ${err.message}`
            );
            setError(`${err.message} - the user already exists [400]`);
          });
      setLoading(false);
    }
    {
      role === "practitioner" &&
      setLoading(true);
        axios
          .post("http://192.168.1.80:8000/api/practitioner_register/", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            console.log(res.data, "Practitioner register api response");
            navigation.navigate("SignUpDatabase", {
              role: "practitioner",
              email: values.email,
            });
          })
          .catch((err) => {
            setLoading(false)
            console.log(
              `Error in posting practitioner register api data: ${err.message}`
            );
            setError(err.message);
          });
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(role, "Role - General Register Screen");
    setError("");
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.pop()}>
        <Ionicons name="arrow-back" size={30} color={colors.primary} />
      </TouchableOpacity>

      <Image
        source={SignUpIcon}
        style={{ width: width / 4, height: width / 4 }}
      />
      <View style={{ paddingTop: 20 }}>
        <AuthHeader
          title={`${role.charAt(0).toUpperCase() + role.slice(1)} Registration`}
        />
      </View>
      <AppForm
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={registerHandler}
        validationSchema={registerValidationSchema}
      >
        <AppFormField name="email" placeholder="Email" />
        <AppFormField
          name="password"
          placeholder="Password"
          secureTextEntry={!showPassword}
        />
        {!showPassword ? (
          <Entypo
            name="eye-with-line"
            size={20}
            style={{
              position: "absolute",
              top: "52.5%",
              left: "86%",
              zIndex: 10,
            }}
            onPress={() => setShowPassword(true)}
          />
        ) : (
          <Entypo
            name="eye"
            size={20}
            style={{
              position: "absolute",
              top: "52.5%",
              left: "86%",
              zIndex: 10,
            }}
            onPress={() => setShowPassword(false)}
          />
        )}

        <AppFormField
          name="confirmPassword"
          placeholder="Confirm password"
          secureTextEntry={!showPassword}
        />
        {!showPassword ? (
          <Entypo
            name="eye-with-line"
            size={20}
            style={{
              position: "absolute",
              top: "63%",
              left: "86%",
              zIndex: 10,
            }}
            onPress={() => setShowPassword(true)}
          />
        ) : (
          <Entypo
            name="eye"
            size={20}
            style={{
              position: "absolute",
              top: "63%",
              left: "86%",
              zIndex: 10,
            }}
            onPress={() => setShowPassword(false)}
          />
        )}
        <Text style={{ color: colors.danger }}> {error} </Text>
        <SubmitButton title="Register" />
      </AppForm>
      <TouchableOpacity
        style={{ marginTop: 17 }}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={{ color: "#555", fontSize: 14 }}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
      {/* <SocialIcons screen="Sign Up" /> */}
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
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

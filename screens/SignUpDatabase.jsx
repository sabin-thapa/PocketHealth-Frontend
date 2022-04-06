import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
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
import axios from "axios";
import { RadioButton } from "react-native-paper";
import AppTextInput from "../components/AppTextInput";

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

const SignUpDatabase = ({ navigation }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const PORT = process.env.REACT_APP_PORT;

  const [gender, setGender] = useState("male");

  const registerHandler = (values) => {
    console.log(values);
    axios
      .post("http://192.168.1.80:8000/api/patient_register/", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res, "patient register api response");
      })
      .catch((err) => {
        console.log(`Error in posting register api data: ${err}`);
      });
  };

  useEffect(() => {
    console.log(BASE_URL, ":", PORT);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.pop()}>
        <Ionicons name="arrow-back" size={30} color={colors.primary} />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <AuthHeader title="Please fill in the form" />
      </View>
      <ScrollView>
        <AppForm
          initialValues={{
            name: "",
            address: "",
            confirmPassword: "",
          }}
          onSubmit={registerHandler}
          validationSchema={registerValidationSchema}
        >
          <AppFormField name="name" placeholder="Full Name" />
          <AppFormField name="address" placeholder="Address" />

          {/* <AppFormField name="maritalStatus" placeholder="Marital Status" /> */}
          {/* <AppFormField name="birthDate" placeholder="Birth Date" /> */}
          <AppFormField name="contact" placeholder="Contact" keyboardType='numeric' />
          <AppFormField name="communication" placeholder="Communication" />
          <AppFormField
            name="managingOrganization"
            placeholder="Managing Organization"
          />
          <AppFormField name="link" placeholder="Link" />
          <View style={styles.genderContainer}>
            {/* <Text style={styles.text}> Gender </Text> */}
            <View style={styles.genderBtns}>
              <View style={styles.genderBtn}>
                <RadioButton
                  value="male"
                  status={gender === "male" ? "checked" : "unchecked"}
                  onPress={() => setGender("male")}
                />
                <Text> Male </Text>
              </View>
              <View style={styles.genderBtn}>
                <RadioButton
                  value="female"
                  status={gender === "female" ? "checked" : "unchecked"}
                  onPress={() => setGender("female")}
                />
                <Text> Female </Text>
              </View>
              <View style={styles.genderBtn}>
                <RadioButton
                  value="other"
                  status={gender === "other" ? "checked" : "unchecked"}
                  onPress={() => setGender("other")}
                />
                <Text> Other </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <SubmitButton title="Submit" />
          </View>
        </AppForm>
      </ScrollView>

      {/* <SocialIcons screen="Sign Up" /> */}
    </View>
  );
};

export default SignUpDatabase;

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: Constants.statusBarHeight + 20,
    left: 20,
  },
  container: {
    backgroundColor: "#DDD",
    flex: 1,
    paddingTop: 50,
  },
  genderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  genderBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  genderBtn: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },

});

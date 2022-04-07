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
import RNPickerSelect from "react-native-picker-select";

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

const SignUpDatabase = ({ navigation, route }) => {
  const { role } = route.params;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const PORT = process.env.REACT_APP_PORT;

  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");

  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [thirdPage, setThirdPage] = useState(false);
  const [fourthPage, setFourthPage] = useState(false);
  const [fifthPage, setFifthPage] = useState(false);
  const [sixthPage, setSixthPage] = useState(false);
  const [seventhPage, setSeventhPage] = useState(false);
  const [eighthPage, setEighthPage] = useState(false);
  const [ninthPage, setNinthPage] = useState(false);

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

  const PrevNextNav = ({ prev, next }) => {};

  useEffect(() => {
    console.log(role, " ROLE");
    axios
      .get("http://192.168.1.80:8000/api/patient/register_model")
      .then((res) => {
        console.log(res.data, "response");
      })
      .catch((err) => {
        console.log(`Error in posting patient register api data: ${err}`);
      });
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
            names: {},
            address: "",
          }}
          onSubmit={registerHandler}
          validationSchema={registerValidationSchema}
        >
          {/* General  */}
          <Text style={styles.title}> General </Text>
          {firstPage && (
            <>
              {/* Get current user's email  */}
              <AppFormField
                name={role}
                placeholder={role}
                style={styles.formField}
              />

              <AppFormField
                name="birthDate"
                placeholder="Birth Date"
                style={styles.formField}
              />

              <View style={styles.oneInput}>
                <RNPickerSelect
                  placeholder={{ label: "Gender", value: null }}
                  style={{ inputAndroid: { color: colors.dark } }}
                  onValueChange={(value) => setGender(value)}
                  items={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                    { label: "Unknown", value: "Unknown" },
                  ]}
                />
              </View>
            </>
          )}
          {/* Human Names  */}
          <Text style={styles.title}> Names </Text>
          <View style={styles.oneInput}>
            <RNPickerSelect
              placeholder={{ label: "Use", value: null }}
              style={{ inputAndroid: { color: colors.dark } }}
              onValueChange={(value) => setGender(value)}
              items={[
                { label: "Official", value: "Official" },
                { label: "Usual", value: "Usual" },
                { label: "Temp", value: "Temp" },
                { label: "Nickname", value: "Nickname" },
                { label: "Anonynomous", value: "Anonynomous" },
                { label: "Maiden", value: "Maiden" },
                { label: "Old", value: "Old" },
              ]}
            />
          </View>
          <View style={styles.nameContainer}>
            <AppFormField
              name="name"
              placeholder="Family"
              style={styles.nameFormField}
            />
            <AppFormField
              name="name"
              placeholder="Given"
              style={styles.nameFormField}
            />
          </View>
          <View style={styles.nameContainer}>
            <AppFormField
              name="name"
              placeholder="Prefix"
              style={styles.nameFormField}
            />
            <AppFormField
              name="name"
              placeholder="Suffix"
              style={styles.nameFormField}
            />
          </View>
          {/* Telecoms  */}
          <Text style={styles.title}> Telecoms </Text>
          <AppFormField
            name="telecom"
            placeholder="Telecom"
            style={styles.formField}
          />
          {/* Addresses  */}
          <Text style={styles.title}> Addresses </Text>
          <View style={styles.oneInput}>
            <RNPickerSelect
              placeholder={{ label: "Use", value: null }}
              style={{ inputAndroid: { color: colors.dark } }}
              onValueChange={(value) => setGender(value)}
              items={[
                { label: "Home", value: "Home" },
                { label: "Work", value: "Work" },
                { label: "Temporary", value: "Temporary" },
                { label: "Building", value: "Building" },
              ]}
            />
          </View>
          <View style={styles.oneInput}>
            <RNPickerSelect
              placeholder={{ label: "Address Type", value: null }}
              style={{ inputAndroid: { color: colors.dark } }}
              onValueChange={(value) => setGender(value)}
              items={[
                { label: "Postal", value: "Postal" },
                { label: "Physical", value: "Physical" },
                { label: "Postal & Physical", value: "Postal & Physical" },
              ]}
            />
          </View>
          {/* {Marital Status  */}
          <Text style={styles.title}> Marital Status </Text>

          <View style={styles.oneInput}>
            <RNPickerSelect
              placeholder={{ label: "Marital Status", value: null }}
              style={{ inputAndroid: { color: colors.dark } }}
              onValueChange={(value) => setMaritalStatus(value)}
              items={[
                { label: "Single", value: "Single" },
                { label: "Married", value: "Married" },
                { label: "Divorced", value: "Divorced" },
                { label: "Widowed", value: "Widowed" },
                { label: "Annuled", value: "Annuled" },
                { label: "Interlocutory", value: "Interlocutory" },
                { label: "Legally Separated", value: "Legally Separated" },
                { label: "Polygamous", value: "Polygamous" },
                { label: "Never Married", value: "Never Married" },
                { label: "Domestic Partner", value: "Domestic Partner" },
                { label: "Unknown", value: "Unknown" },
              ]}
            />
          </View>
          {/* Contacts  */}
          <Text style={styles.title}> Contacts </Text>
          <AppFormField
            name="contact"
            placeholder="Contact"
            keyboardType="numeric"
            style={styles.formField}
          />
          {/* Communications  */}
          <Text style={styles.title}> Communications </Text>
          <AppFormField
            name="communication"
            placeholder="Communication"
            style={styles.formField}
          />
          {/* Organizations  */}
          <Text style={styles.title}> Organizations </Text>
          <AppFormField
            name="managingOrganization"
            placeholder="Managing Organization"
            style={styles.formField}
          />
          {/* Links  */}
          <Text style={styles.title}> Links </Text>
          <AppFormField
            name="link"
            placeholder="Link"
            style={styles.formField}
          />

          <View style={styles.genderContainer}>
            {/* <View style={styles.genderBtns}>
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
            </View> */}
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
  oneInput: {
    width: "90%",
    paddingVertical: 16,
    paddingLeft: 7,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkgray,
    marginHorizontal: 7,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.light,
  },
  formField: {
    backgroundColor: colors.light,
    color: colors.dark,
  },
  title: {
    marginLeft: 20,
    paddingVertical: 5,
    fontSize: 20,
    color: colors.primary,
  },
  nameFormField: {
    backgroundColor: colors.light,
    color: colors.dark,
    width: "60%",
  },
  nameContainer: {
    display: "flex",
    marginLeft: 110,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

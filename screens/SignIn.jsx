import React, { useContext, useEffect, useState } from "react";
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
import SignInIcon from "../assets/login1.png";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { AuthContext } from "../contexts/AuthProvider";
import * as axios from "axios";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("screen");

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required()
    .label("Email"),
  password: Yup.string().required().label("Password"),
});

const SignIn = ({ navigation }) => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    token,
    setToken,
  } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const LoginHandler = (values) => {
    setLoading(true);
    axios
      .post("http://172.17.0.88:8000/api/login/", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res.data.token, " login response");
        setUser(res.data);
        setToken(res.data.token);
        setError("");
        setLoading(false)
        setIsAuthenticated(true);
        console.log(user, " user context var");
      })
      .catch((err) => {
        console.log(err.message);
        setError(`Invalid credentials - ${err.message}`);
        setLoading(false)
      });

    //check credentials in datebase
    // setIsAuthenticated(true)
    // navigation.navigate('App', {screen: 'Home'})
  };

  useEffect(() => {
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
        source={SignInIcon}
        style={{ width: width / 1.6, height: width / 1.8, marginBottom: 20 }}
      />

      <AuthHeader title="Sign In" />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={LoginHandler}
        validationSchema={loginValidationSchema}
      >
        <AppFormField name="email" placeholder="Email" />
        <AppFormField name="password" placeholder="Password" secureTextEntry />
        <Text style={{ color: colors.danger }}> {error} </Text>
        <SubmitButton title="Login" />
      </AppForm>
      <TouchableOpacity
        style={{ marginTop: 17 }}
        onPress={() => navigation.navigate("SignUpRole")}
      >
        <Text style={{ color: "#555", fontSize: 14 }}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
      {/* <SocialIcons screen="Sign In" /> */}
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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

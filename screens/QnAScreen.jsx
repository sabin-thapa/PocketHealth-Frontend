import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import TopBar from "../components/TopBar";
import axios from 'axios';

const QnAScreen = ({ navigation }) => {
  const [data, setData] = useState([]);


  return (
    <Screen>
      <TopBar title="QnA" navigation={navigation} />
    </Screen>
  );
};

export default QnAScreen;

const styles = StyleSheet.create({});

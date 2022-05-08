import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Screen from "./Screen";
import DrawerTopBar from "../components/DrawerTopBar";
import * as DocumentPicker from 'expo-document-picker';
// import * as Permissions from 'expo-permissions'
import {AuthContext} from '../contexts/AuthProvider'
import axios from 'axios'
import RoundIconBtn from "../components/RoundIconBtn";

const Reports = ({ navigation }) => {
  const [notDummyData, setNotDummyData] = useState([]);
  const {token, user} = useContext(AuthContext)

  useEffect(() => {
    const getData = async () => {
      var dataContainer = []
      await axios.get(`http://192.168.1.11:8000/api/trackers/upload_report/`)
      .then(res => {
        const val = res.data
        console.log(val);
        val?.map((vl) => {
          if (vl.user == user.pk){
            var datestring = new Date(vl.posted_at).toDateString()
            var datearray = datestring.split(" ")
            var date = datearray[1] + " " + datearray[2] + ", " + datearray[3] 
  
            return dataContainer.push({
              date: date,
              file_url: vl.file,
            })
          }
        })
        setNotDummyData(dataContainer)
      })
      .catch(err => {
        console.log(err, "Err")}
        )
      }
      getData()
  }, [])
  

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/*",
      });
      if (result.type === "success") {
        console.log(result.uri);
      }
    } catch (error) {
      console.log("Error reading the File!");
    }
  };

  return (
    <Screen>
      <DrawerTopBar navigation={navigation} title="My Medical Reports" />
      <RoundIconBtn
        onPress={() => selectFile()}
        antIconName="plus"
        style={styles.addBtn}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10 }}
        data={notDummyData}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item }) => (
          <View>
            <Text>{item.file_url}</Text>
          </View>
        )}
      />

    </Screen>
  );
};

export default Reports;

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    right: 40,
    bottom: 40,
    zIndex: 1,
  },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DrawerTopBar from "../components/DrawerTopBar";
import Screen from "./Screen";
import RoundIconBtn from "../components/RoundIconBtn";
import { useNotes } from '../contexts/NotesProvider';

const NotesScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
  return (
    <Screen>
      <DrawerTopBar navigation={navigation} title="Notes" />
      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName='plus'
        style={styles.addBtn}
      />

    </Screen>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        right: 40,
        bottom: 40,
        zIndex: 1,
      },
});

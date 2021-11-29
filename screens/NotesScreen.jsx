import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import DrawerTopBar from "../components/DrawerTopBar";
import Screen from "./Screen";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteModal from "../components/NoteModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Note from "../components/Note";

const NotesScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  
  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      setNotes(JSON.parse(result));
    }
  };

  useEffect(() => {
    findNotes();
  }, [])

  const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  };

  const reverseNotes = reverseData(notes)

  const openNote = note => {
    navigation.navigate('NoteDetail', { note });
  };

  const handleSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    setModalVisible(false)
  };
  return (
    <Screen>
        <DrawerTopBar navigation={navigation} title="Notes" />
        <RoundIconBtn
          onPress={() => setModalVisible(true)}
          antIconName="plus"
          style={styles.addBtn}
        />
        <NoteModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmit}
        />
        {notes.length ===0? <Text>No Notes Yet!</Text>: 
          <FlatList 
            showsVerticalScrollIndicator={false}
            style={{marginBottom:10}}
            data={reverseNotes}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Note onPress={() => openNote(item)} item={item} />
            )}
          />
        }
    </Screen>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    right: 40,
    bottom: 40,
    zIndex: 1,
  },
});

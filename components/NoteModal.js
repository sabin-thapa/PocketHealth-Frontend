import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AppTextInput from "./AppTextInput";
import colors from "../utils/colors";

const NoteModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onPressSubmit = (title, description) => {
    if (title.length === 0 && description.length === 0) {
      Alert.alert("Both fields can't be empty");
    } else {
      setTitle("");
      setDescription("");
      if (isEdit) {
        onSubmit(title, description, Date.now());
      } else {
        onSubmit(title, description);
      }
    }
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDescription(note.desc);
    }
  }, [isEdit]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesome name="close" size={24} color={colors.secondary} />
        </TouchableOpacity>
        <AppTextInput
          placeholder="Title"
          style={{ backgroundColor: "white" }}
          value={title}
          onChangeText={(title) => setTitle(title)}
        />
        <AppTextInput
          placeholder="Description"
          style={{ backgroundColor: "white" }}
          value={description}
          onChangeText={(desc) => setDescription(desc)}
          multiline={true}
          numberOfLines={18}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => onPressSubmit(title, description)}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NoteModal;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  inputText: {
    fontSize: 16,
    width: "100%",
    height: 50,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginTop: 30,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.3,
  },
});

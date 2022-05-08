import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ReminderContext = createContext();

const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([
  ]);
  const findReminders = async () => {
    const res = await AsyncStorage.getItem("reminders");
    if (res !== null) {
      setReminders(JSON.parse(res));
    }
  };

  useEffect(() => {
    findReminders();
  }, []);
  return (
    <ReminderContext.Provider
      value={{ reminders, setReminders, findReminders }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
export const useReminders = () => useContext(ReminderContext);

export default ReminderProvider;

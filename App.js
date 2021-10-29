import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import DrawerNavigator from './navigation/Drawer/DrawerNavigator';

export default function App() {
  const [authenticatd, setAuthenticatd] = useState(true)
  return (
    <View style={styles.container}>
      {!authenticatd? <AuthNavigator />: <DrawerNavigator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ReminderScreen from '../screens/ReminderScreen'
import AddReminderScreen from '../screens/AddReminderScreen'

const Stack = createStackNavigator()
const ReminderNavigator = () => {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false}}>
        <Stack.Screen name="Main" component={ReminderScreen} />
        <Stack.Screen name="AddReminder" component={AddReminderScreen} />

    </Stack.Navigator>
  )
}

export default ReminderNavigator
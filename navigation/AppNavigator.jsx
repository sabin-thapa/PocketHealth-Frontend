import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import BMICalculator from '../screens/BMICalculator';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Search" component={SearchScreen}/>
                <Stack.Screen name="BMI" component={BMICalculator}/>
                <Stack.Screen name="Notification" component={NotificationScreen}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})

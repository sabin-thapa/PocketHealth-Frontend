import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import BMICalculatorScreen from '../screens/BMICalculatorScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';

import ArticlesScreen from '../screens/ArticlesScreen';
import MentalWellnessScreen from '../screens/MentalWellnessScreen';
import SymptomsCheckerScreen from '../screens/SymptomsCheckerScreen';
import ReminderScreen from '../screens/ReminderScreen';
import ChatsScreen from '../screens/ChatsScreen';
import QnAScreen from '../screens/QnAScreen';
import ChatWithAIScreen from '../screens/ChatWithAIScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import BMIDetailScreen from '../screens/BMIDetailScreen';


const Stack = createStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: true}}/>
                <Stack.Screen name="BMI" component={BMICalculatorScreen}/>
                <Stack.Screen name="BMIDetail" component={BMIDetailScreen}/>
                <Stack.Screen name="Notification" component={NotificationScreen}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>

                <Stack.Screen name="MentalWellness" component={MentalWellnessScreen}/>
                <Stack.Screen name="ArticlesScreen" component={ArticlesScreen}/>
                <Stack.Screen name="SymptomsChecker" component={SymptomsCheckerScreen}/>
                <Stack.Screen name="Reminder" component={ReminderScreen}/>
                <Stack.Screen name="Chats" component={ChatsScreen}/>
                <Stack.Screen name="QnA" component={QnAScreen}/>
                <Stack.Screen name="ChatWithAI" component={ChatWithAIScreen}/>
                <Stack.Screen name="Recommendations" component={RecommendationsScreen}/>


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})

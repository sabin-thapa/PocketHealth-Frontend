import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';

import BMICalculatorScreen from '../screens/BMICalculatorScreen';
import TrackersScreen from '../screens/TrackersScreen';
import SugarScreen from '../screens/SugarScreen';
import PressureScreen from '../screens/PressureScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';

import ArticlesScreen from '../screens/ArticlesScreen';
import MentalWellnessScreen from '../screens/MentalWellnessScreen';
import SymptomsCheckerScreen from '../screens/SymptomsCheckerScreen';
import ChatsScreen from '../screens/ChatsScreen';
import QnAScreen from '../screens/QnAScreen';
import ChatWithAIScreen from '../screens/ChatWithAIScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import BMIDetailScreen from '../screens/BMIDetailScreen';
import SugarDetailScreen from '../screens/SugarDetailScreen';
import PressureDetailScreen from '../screens/PressureDetailScreen';
import ExerciseScreen from '../screens/ExerciseTracker';
import ExerciseDetailScreen from '../screens/ExerciseTrackerDetail';
import PushupScreen from '../screens/PushupScreen';
import PedometerScreen from '../screens/PedometerScreen';
import ReminderNavigator from './ReminderNavigator';
import WaterReminderScreen from '../screens/WaterReminder';


const Stack = createStackNavigator();
const AppNavigator = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Search" component={SearchScreen}/>
                <Stack.Screen name="Trackers" component={TrackersScreen}/>
                <Stack.Screen name="Sugar" component={SugarScreen}/>
                <Stack.Screen name="SugarDetail" component={SugarDetailScreen}/>
                <Stack.Screen name="Pressure" component={PressureScreen}/>
                <Stack.Screen name="PressureDetail" component={PressureDetailScreen}/>
                <Stack.Screen name="BMI" component={BMICalculatorScreen}/>
                <Stack.Screen name="BMIDetail" component={BMIDetailScreen}/>
                <Stack.Screen name="Exercise" component={ExerciseScreen}/>
                <Stack.Screen name="Pushup" component={PushupScreen}/>
                <Stack.Screen name="Pedometer" component={PedometerScreen}/>
                <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen}/>
                <Stack.Screen name="Notification" component={NotificationScreen}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
                <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen}/>
                <Stack.Screen name="AccountSettings" component={AccountSettingsScreen}/>
                <Stack.Screen name="MentalWellness" component={MentalWellnessScreen}/>
                <Stack.Screen name="ArticlesScreen" component={ArticlesScreen}/>
                <Stack.Screen name="SymptomsChecker" component={SymptomsCheckerScreen}/>
                <Stack.Screen name="Reminder" component={ReminderNavigator}/>
                <Stack.Screen name="Chats" component={ChatsScreen}/>
                <Stack.Screen name="QnA" component={QnAScreen}/>
                <Stack.Screen name="ChatWithAI" component={ChatWithAIScreen}/>
                <Stack.Screen name="Recommendations" component={RecommendationsScreen}/>
        <Stack.Screen name="WaterReminder" component={WaterReminderScreen} />

            </Stack.Navigator>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})

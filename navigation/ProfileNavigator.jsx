import { StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createStackNavigator()

const ProfileNavigator = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator

const styles = StyleSheet.create({})

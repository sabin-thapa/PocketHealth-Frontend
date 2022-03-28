import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TopBar from '../components/TopBar'
import Screen from './Screen'

const ReminderScreen = ({navigation}) => {
    return (
        <Screen>
            <TopBar title="Reminder" navigation={navigation} />
            <Text>This is the reminder screen </Text> 
        </Screen>
    )
}

export default ReminderScreen

const styles = StyleSheet.create({})

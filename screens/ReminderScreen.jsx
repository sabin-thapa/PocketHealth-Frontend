import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TopBar from '../components/TopBar'
import Screen from './Screen'

const ReminderScreen = ({navigation}) => {
    return (
        <Screen>
            <TopBar title="Reminder" navigation={navigation} />
        </Screen>
    )
}

export default ReminderScreen

const styles = StyleSheet.create({})

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DrawerTopBar from '../components/DrawerTopBar'
import Screen from './Screen'

const NotesScreen = ({ navigation}) => {
    return (
        <Screen>
            <DrawerTopBar navigation={navigation} title="Notes" />
        </Screen>
    )
}

export default NotesScreen

const styles = StyleSheet.create({})

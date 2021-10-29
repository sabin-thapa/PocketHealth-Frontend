import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DrawerTopBar from '../components/DrawerTopBar'
import Screen from '../screens/Screen'

const ProfileNavigator = ({navigation}) => {
    return (
        <Screen>
            <DrawerTopBar title="Profile" navigation={navigation} />
        </Screen>
    )
}

export default ProfileNavigator

const styles = StyleSheet.create({})

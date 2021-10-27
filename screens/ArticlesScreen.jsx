import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Screen from './Screen'
import TopBar from '../components/TopBar'

const ArticlesScreen = ({navigation}) => {
    return (
        <Screen>
            <TopBar title="Articles" navigation={navigation} />
        </Screen>
    )
}

export default ArticlesScreen

const styles = StyleSheet.create({})

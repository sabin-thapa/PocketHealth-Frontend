import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from "expo-constants"
import colors from '../utils/colors'
import TopBar from '../components/HomeScreen/TopBar'

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TopBar navigation={navigation} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 15,
        backgroundColor: colors.light,
        flex:1,

    }
})

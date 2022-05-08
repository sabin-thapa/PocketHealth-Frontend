import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from './Screen'
import DrawerTopBar from '../components/DrawerTopBar'

const ReportScreen = ({navigation}) => {
  return (
    <Screen>
      <DrawerTopBar navigation={navigation} title="Report" />
      
    </Screen>
  )
}

export default ReportScreen

const styles = StyleSheet.create({})
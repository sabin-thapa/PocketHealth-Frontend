import React, {useEffect} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import TopBar from '../components/TopBar'
import Screen from './Screen'

const AddReminderScreen = ({navigation}) => {
  return (
    <Screen>
      <TopBar title='Add Reminder' navigation={navigation}/>
      <View style = {styles.container}>
        <Text> Add Reminder</Text>
      </View>
    </Screen>
  )
}

export default AddReminderScreen

const styles = StyleSheet.create({

})
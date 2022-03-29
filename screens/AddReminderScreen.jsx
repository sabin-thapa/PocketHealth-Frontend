import React, {useState} from 'react'
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native'
import AppForm from '../components/form/AppForm'
import TopBar from '../components/TopBar'
import Screen from './Screen'
import * as Yup from 'yup'
import AppFormField from '../components/form/AppFormField'

const AddReminderScreen = ({navigation}) => {


  const medicineValidationSchema = Yup.object().shape({
    medicineName: Yup.string().required().label("Medicine Name")
  })

  const handleSubmit = () => {
    console.log('Added medications');
  }

  return (
    <Screen>
      <TopBar title='Add Reminder' navigation={navigation}/>
      <View style = {styles.container}>
        <AppForm
          initialValues={{ medicineName: "", startDate: "", endDate: "", dosage: ""}}
          validationSchema = {medicineValidationSchema}
          onSubmit = {handleSubmit}
        >
          <AppFormField name="medicineName" placeholder="Medicine Name" />
        {/* <TouchableOpacity> <Text> Save </Text></TouchableOpacity> */}
        </AppForm>
      </View>
    </Screen>
  )
}

export default AddReminderScreen

const styles = StyleSheet.create({

})
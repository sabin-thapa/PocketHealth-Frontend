import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import TopBar from '../components/TopBar'
import colors from '../utils/colors'
import Screen from './Screen'
import {Agenda} from 'react-native-calendars'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ReminderScreen = ({navigation}) => {
    const [calendarOpen, setCalendarOpen] = React.useState(false)
    const [items, setItems] = React.useState({
        '2022-03-28':[{name: 'medicine 1', cookies: true}], 
        '2022-03-29':[{name: 'medicine 2', cookies: true}], 
        '2022-03-30':[{name: 'medicine 3', cookies: true}], 
        '2022-03-31':[{name: 'medicine 3', cookies: true}], 
        '2022-04-01':[{name: 'medicine 3', cookies: true}], 
        '2022-02-28':[{name: 'test2', cookies: false}], 
    })

    const renderItem = (item) => {
        return(
            <View style = {styles.itemContainer}>
                <Text style = {styles.itemText}> {item.name} </Text>
            </View>
            )
    }
    return (
        <Screen style = {styles.container}>
            <TopBar title="Reminders" navigation={navigation} />
                <Agenda 
                    items = {items}
                    renderItem = {renderItem}
                    onCalendarToggled = {calOpen => setCalendarOpen(!calOpen)}
                />
            <View style={styles.addSection}>
                <MaterialCommunityIcons
                    style = {styles.calendarIcon}
                    name='calendar-multiple-check'
                    size={96}
                    color={colors.primary}
                />
                <Text style={styles.mainText}> Add Reminder </Text>
                <Text style = {styles.descriptionText}> Take your medication on time with the help of our reminder </Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddReminder')}>
                    <Text style={styles.btnText}> Add Medicine Reminder  </Text>    
                </TouchableOpacity>
            </View>
        </Screen>
    )
}

export default ReminderScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightBlue
    },
    addSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,

    },

    mainText: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: 'bold',
        marginBottom: 4
    },
    descriptionText: {
        marginBottom: 4,
        marginTop: 10,
        color: colors.darkgray
    },
    btn: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        marginTop: 12,
        marginBottom: 4,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: colors.primary
    },
    btnText: {
        fontSize: 16,
        color: colors.darkgray
    },
    itemContainer: {
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        margin: 5,
        fontSize: 16,
    },
    itemText: {
        marginTop: '14%',
        fontSize: 16,
        color: colors.secondary
    }
})

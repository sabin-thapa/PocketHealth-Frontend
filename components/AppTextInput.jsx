import React from 'react'
import {StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import colors from '../utils/colors'

const AppTextInput = ({placeholder, ...otherProps}) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputText} placeholder={placeholder} placeholderTextColor={colors.gray} {...otherProps}/>
        </View>
    )
}

export default AppTextInput

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.light,
        borderRadius:35,
        width:"90%",
        paddingVertical:10,
        paddingHorizontal:20,
        marginVertical:7
    },
    inputText:{
        fontSize:16,
        width:"100%"
    },
    icon:{
        marginRight:10
    },
    
})

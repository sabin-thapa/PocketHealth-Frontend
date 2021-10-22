import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../utils/colors'

const AuthHeader = ({title}) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default AuthHeader

const styles = StyleSheet.create({
    title:{
        fontSize:21,
        marginBottom:50, 
        fontWeight: 'bold',
        color: colors.primary
    }
})

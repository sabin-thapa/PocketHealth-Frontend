import React from 'react'
import { StyleSheet, Text, View, Dimensions} from 'react-native'
import colors from '../utils/colors';
const { width, height } = Dimensions.get("screen");

const BackSquare = () => {
    return (
        <View style={styles.backSquare} />
    )
}

export default BackSquare

const styles = StyleSheet.create({
    backSquare:{
        width: height,
        height: height,
        top: -height * 0.6,
        left: -height * 0.3,
        backgroundColor: '#b0dfe5',
        position: "absolute",
        transform: [{ rotate: '290deg' }]
    }
})

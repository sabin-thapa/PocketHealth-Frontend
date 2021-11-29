import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import colors from '../utils/colors';
const width = Dimensions.get('window').width - 40;

const Note = ({ item, onPress }) => {
    const { title, description } = item;
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>
                {title}
            </Text>
            <Text style={styles.desc} numberOfLines={4}>{description}</Text>
        </TouchableOpacity>
    )
}

export default Note

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10,
    },
    desc:{
        fontSize: 18,
        color: 'black'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
})

import React from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import colors from '../utils/colors'
const { width, height } = Dimensions.get("screen");

const recommendations = [
    {
        title: 'Recommendation',
        description: 'Recommendation'
    },
    {
        title: 'Recommendation',
        description: 'Recommendation'
    },
    {
        title: 'Recommendation',
        description: 'Recommendation'
    },
    {
        title: 'Recommendation',
        description: 'Recommendation'
    },
    {
        title: 'Recommendation',
        description: 'Recommendation'
    },
   
]

const Recommendations = () => {
    return (
        <View style={styles.container}>
          <FlatList 
            data={recommendations}
            keyExtractor={(_, i) => `item-${i}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                return (
                    <View style={styles.recommendationCard}>
                        <Text style={styles.recommendationTitle}>{item.title}</Text>
                        <Text style={styles.recommendationDescription}>{item.description}</Text>
                    </View>
                )}}
          />
        </View>
    )
}

export default Recommendations

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        flexDirection: 'row',
        marginBottom: 100
    },
    recommendationCard:{ 
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: width/2 + 20,
        marginHorizontal: 4,
        flex:1,
        backgroundColor: '#ddd',
        borderRadius: 5,
        height: height/5
    },
    recommendationTitle:{ 
        fontSize: 19
    },
    recommendationDescription:{ 

    }
})

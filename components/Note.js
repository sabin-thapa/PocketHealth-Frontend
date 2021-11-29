import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import colors from '../utils/colors';
const width = Dimensions.get('window').width - 40;

const Note = ({ item, onPress }) => {
    const { title, desc, time } = item;

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index]);
      }

    let formatted_date;
    const computeDate=(time)=>{
        const newDate = new Date(time);
        let b = newDate.toString().split(" ");
        let c= b[4].split(':');

        const now = new Date();
        let comp1 = b.slice(1,3);
        let comp2 = (now.toString().split(' ')).slice(1,3);
        if(arrayEquals(comp1, comp2)){
            formatted_date = c[0]+':'+c[1];
        }
        else{
            formatted_date = b[1]+" " + b[2]+", "+b[3]+ " at " + c[0]+':'+c[1]; 
        }
    
    }
    computeDate(time);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
            {title.length!==0 && <Text style={styles.title} numberOfLines={2}>
                {title}
            </Text>}
            {desc.length!==0 && <Text style={styles.desc} numberOfLines={6}>{desc}</Text>}
            <Text style={styles.date}>{formatted_date}</Text>
        </TouchableOpacity>
    )
}

export default Note

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: width / 2 + 3,
        paddingHorizontal: 16,
        paddingTop: 18,
        paddingBottom: 45,
        borderRadius: 12,
    },
    date:{
        position: 'absolute',
        bottom: 18,
        left: 16,
        color: colors.gray,
        fontSize: 12
    },
    desc: {
        fontSize: 15,
        color: colors.darkgray,
    },
    title: {
        fontWeight: '700',
        fontSize: 16,
        color: 'black',
        marginBottom: 5
    },
})

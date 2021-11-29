import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import AppTextInput from './AppTextInput';
import colors from '../utils/colors';

const NoteInputModal = ({ visible, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onPressSubmit=(title, description) =>{
        setTitle("");
        setDescription("");
        onSubmit(title,description);
    }

    return (
            <Modal visible={visible} animationType='slide'>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}><FontAwesome name="close" size={24} color={colors.secondary} /></TouchableOpacity>
                    <AppTextInput placeholder='Title' style={{ backgroundColor: 'white' }} value={title} onChangeText={(title) => setTitle(title)} />
                    <AppTextInput placeholder='Description' style={{ backgroundColor: 'white' }} value={description} onChangeText={(desc) => setDescription(desc)}  multiline={true} numberOfLines={18}/>
                    <TouchableOpacity style={styles.submitButton} onPress={() => onPressSubmit(title, description)}><Text style={styles.submitText}>Submit</Text></TouchableOpacity>
                </View>
            </Modal>
    )
}

export default NoteInputModal

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    closeButton:{
        position: 'absolute',
        top:20,
        right:20
    },
    inputText: {
        fontSize: 16,
        width: "100%",
        height: 50,
    },
    submitButton:{
        paddingVertical:10,
        paddingHorizontal:40,
        backgroundColor: colors.primary,
        borderRadius: 20,
        marginTop: 30,
        alignSelf: "flex-start",
        marginLeft: 20
    },
    submitText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.3
    }
})

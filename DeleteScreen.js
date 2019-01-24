import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const DeleteScreen = (props) => {

    return (
        <LinearGradient 
        colors={['rgba(235,43,70,1)', 'rgba(0,21,72,1)']}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'
        
        }}>
        <View style={styles.modal}>
            <Text style={styles.title}>Är du säker på att du vill radera ditt konto ? </Text>

            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.deleteButton} onPress={()=> props.delete()}>
                <Text style={styles.buttonText}>Ja </Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.closeButton} onPress={() => props.modalClose()}>
                <Text style={styles.buttonText}>Nej</Text>
            </TouchableHighlight>
            </View>
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    modal: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginTop: 20,
        backgroundColor: 'white',
        width: '90%',
        height: '50%',
        borderRadius: 10,
        
    },

    title: {
        fontSize: 20,
        padding: 12,
        margin: 0,
        color: 'black', 
        fontWeight: 'bold',
    },

    closeButton: {
        backgroundColor: '#6fcc57', 
        width: '40%',
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
        margin: 20,
    },
      buttonText: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    deleteButton : {
        backgroundColor: '#e04747', 
        width: '40%',
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
        margin: 20,
    },
    buttonContainer: {
        width: '80%',
        flex: 0, 
        flexDirection: 'row',
        justifyContent: 'space-around',

    }


})

export default DeleteScreen
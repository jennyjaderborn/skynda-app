import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';


const PaymentFailed = (props) => {


    return (
        <LinearGradient 
        colors={['rgba(235,43,70,1)', 'rgba(0,21,72,1)']}
        style={{flex: 1, justifyContent: 'center', alignItems:'center'
        }}>
        <View style={styles.content}>
        <Text style={styles.text}>Betalningen misslyckades.. </Text>
         
            <TouchableHighlight style={styles.button} onPress={()=> props.navigation.navigate('Profile')}>
                <Text style={styles.buttonText}>Gå tillbaka  <Ionicons name="md-arrow-round-forward" size={25}/>
</Text>
            </TouchableHighlight>
        </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    content: {
    borderRadius: 10,
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex:0, 
    flexDirection: 'column',
    marginBottom: 70, 
    }, 
    text : {
        fontWeight: 'bold',
        fontSize: 28,
    }, 
    buttonText: {
        fontSize: 21, 
        color: 'gray',
        fontWeight: 'bold',
        marginTop: '30%',
    },


})

export default PaymentFailed;
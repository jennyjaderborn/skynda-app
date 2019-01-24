import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import db from './firebaseConfig';


export default class PaymentSuccess extends React.Component {

    componentDidMount(){
        //payment is accepted and we can add coins to db 
    this.addCoins();
    }

addCoins = () => {
// funkar inte helt än. coins skrev över ett annat field i och med set. 
//add lägger på ett nytt field. ska det istället vara ett document o i där ligger 
//coins som olika fields. Måste sedan raderas mynt när man tagit tiden.. 
    const user = this.props.screenProps.currentUser

    db.collection('users').doc(user.uid).set({
        coins: 100
      })
      .then(function(docRef) {
        console.log("Document for coins written with ID: ", docRef.id);
    })
      .catch(function(error) {
        console.error("Error adding document: ", error);
    });

}

render(){
    return (
        <LinearGradient 
        colors={['rgba(235,43,70,1)', 'rgba(0,21,72,1)']}
        style={{flex: 1, justifyContent: 'center', alignItems:'center'
        }}>
        <View style={styles.content}>
        <Text style={styles.text}>Tack för din betalning!</Text>
         
            <TouchableHighlight style={styles.button} onPress={()=> props.navigation.navigate('Profile')}>
                <Text style={styles.buttonText}>Gå tillbaka  <Ionicons name="md-arrow-round-forward" size={25}/>
</Text>
            </TouchableHighlight>
        </View>
        </LinearGradient>
    )

    }
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


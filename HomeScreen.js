import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';


export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
    }

  
    onPressPlay = () => {
        this.props.navigation.navigate('play')
    }



    render() {
      
        const user = this.props.screenProps.currentUser
      return (

        <LinearGradient 
          colors={['rgba(235,43,70,1)', 'rgba(0,21,72,1)']}
          style={{flex: 1, justifyContent: 'center'
          
          }}>
           
            <View style={styles.container}>
            <Text style={[,styles.text, styles.undertext, styles.twoText]}>🏃‍♀️</Text>
            <Text style={[ styles.text, styles.title]}>SKYNDA!</Text>
            <Text style={[styles.text, styles.undertext, styles.oneText]}>{user && user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}</Text>
            
            
        <LinearGradient
            colors={['#62fc9d', '#47ef88']}
            style={{ width: '64%',
            height: 60,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: 'center',
            padding: 10,
            shadowColor: '#294434',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
            marginBottom: 50
    
        
        }}
          >
           
                <TouchableHighlight onPress={this.onPressPlay} style={styles.playButton}>
                    <Text style={[styles.buttonText]}>SPELA</Text>
                </TouchableHighlight>
    
         

            </LinearGradient>

            </View>

    </LinearGradient>
     
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },

    oneText: {
        marginBottom: 60
    },

    twoText: {
        marginBottom: 20,
        fontSize: 70
    },

    title: {
        marginBottom: 20,
        fontSize: 60,
        fontWeight: 'bold',
    },
    
    text: {
        color: '#ffffff',
        fontSize: 40,
        
  
    },
    undertext: {
        fontSize: 25,
        marginBottom: 10,
    },
    playButton: {
        backgroundColor: 'transparent',
        width: '60%',
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,

        
    },

    buttonText: {
        color: 'rgba(0,21,72,1)',
        fontSize: 20, 
        fontWeight: 'bold'
    }, 
   

});

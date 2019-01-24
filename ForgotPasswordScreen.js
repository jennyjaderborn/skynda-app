import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import MainVerify from './MainVerify';
import LoginScreen from './LoginScreen';
import App from './App.js'

class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            goBack: false,
        }
    }

    sendPass = () => {
        var auth = firebase.auth();
        var emailAddress = this.state.email;

        auth.sendPasswordResetEmail(emailAddress).then(() => {
            this.props.backToLogin()
        }).catch(function (error) {
            // An error happened.
        });
    }

    render() {

        return (

            this.state.goBack ? <App/> :
              <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={-80} enabled>
                              <Text style={styles.rubrik}>Återställ lösenord</Text>

                <Text style={styles.text}>Skriv in din registrerade email, så skickar vi en återställningslänk för lösenordet till din epost.</Text>
                <TextInput

                    style={styles.input}
                    placeholder="Tex. exempel@exempel.se"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    keyboardType="email-address"
                    autoFocus={false}
                    maxLength={40}
                    autoCapitalize='none'

                />


                <TouchableHighlight onPress={() => this.sendPass()} style={styles.button}>
                    <Text style={styles.buttonText}>Skicka</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.setState({ goBack: true})} style={styles.backButton}>
                    <Text style={styles.buttonTextBack}>Gå tillbaka</Text>
                </TouchableHighlight>
                </KeyboardAvoidingView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },

    text: {
        textAlign: 'center',
        fontSize: 22,
        margin: 20
    },
    rubrik: {
        textAlign: 'center',
        fontSize: 26,
        margin: 20,
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        backgroundColor: 'black',
        padding: 16, 
        borderRadius: 20
    },
    input: {
        width: '80%',
        height: 68,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: '#dddbdb',
        backgroundColor: '#f9f9f9',
        margin: 12,
        borderRadius: 14,
        padding: 5,

    },
    buttonTextBack: {
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold',

    },
    backButton: {
        marginTop: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
})

export default ForgotPasswordScreen
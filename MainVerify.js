import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import * as firebase from 'firebase';
import db from './firebaseConfig';
import ForgotPasswordScreen from './ForgotPasswordScreen';


class MainVerify extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          //  email: '',
            password: '',
            errors: false,
            loading: false,
            wantToSignup: false,
            items: [],
            verified: this.props.verified, 
            forgotPass: false
        
        }

    }

   
/*
    async componentDidMount(){
         const soundObject = new Expo.Audio.Sound();
        try {
            await soundObject.loadAsync(require('./assets/3265418_a-happy-camper_by_schwartzsound_preview.mp3'));
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }
    */
    

    signedUp = () => {
        this.props.isSignupRender()
        let user = firebase.auth().currentUser;
        let userId;
        if (user) {
            userId = user.uid;

            db.collection("users").doc(userId).set({
                roundes: 0,
            })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        }

        console.log('ny användare', userId)
    }

    loggedIn = () => {
        this.props.isLoginRender()
        console.log('exiterande användare')
    }



    openSignup = () => {
        this.setState({
            wantToSignup: true
        })
    }


    closeSignUp = () => {
        this.setState({
            wantToSignup: false
        })
    }

    openForgotPass = () => {
        this.setState({
            forgotPass: true
        })
    }

    closeForgotPass = () => {
        this.setState({
            forgotPass: false
        })
    }

    render() {
        if (this.state.wantToSignup == true) {
            return <SignupScreen isSignupRender={this.signedUp} closeSignUp={this.closeSignUp} />


        } else  {
            if(this.state.forgotPass == true){
                return <ForgotPasswordScreen backToLogin={this.closeForgotPass} />
            }else {
            return (
                <LoginScreen verified={this.state.verified} isLoginRender={this.loggedIn} viewForgotPass={this.openForgotPass} viewSignup={this.openSignup} />

            )
        }
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        
    },


    loginButton: {
        backgroundColor: 'transparent',
        width: '60%',
        height: 50,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,

    },

});

export default MainVerify
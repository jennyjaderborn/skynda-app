import React from 'react';
import { StyleSheet } from 'react-native';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import * as firebase from 'firebase';
import db from './firebaseConfig';
import ForgotPasswordScreen from './ForgotPasswordScreen';


class MainVerify extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            errors: false,
            loading: false,
            wantToSignup: false,
            items: [],
            verified: this.props.verified, 
            forgotPass: false
        
        }

    }

    

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
                })
                .catch(function (error) {
                });

        }

    }

    loggedIn = () => {
        this.props.isLoginRender()
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


export default MainVerify
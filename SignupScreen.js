import React from 'react';
import { StyleSheet, Text, Modal, View, Switch, TouchableHighlight, ActivityIndicator, TextInput, KeyboardAvoidingView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import PolicyScreen from './PolicyScreen';

import * as firebase from 'firebase';
import LoginScreen from './LoginScreen';
import VerifyEmailScreen from './VerifyEmailScreen';
import db from './firebaseConfig'

class SignupScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            displayName: "",
            loading: false,
            errors: '',
            emailError: null,
            passwordError: null,
            policyError: null,
            validatedEmail: false,
            validatedPassword: false,
            validatedPolicy: false,
            validatedName: false,
            goBackToMain: false,
            value: false,
            modalVisible: false,
            sentEmailLink: false
        }

        this.trySignup = this.trySignup.bind(this)
        this.onChangePolicy = this.onChangePolicy.bind(this)
        this.closeModalPolicy = this.closeModalPolicy.bind(this)
    }

    onPressBack = () => {
        this.props.closeSignUp()
        this.setState({
            goBackToMain: true
        })
    }

    verifyEmailLink = () => {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(() => {
            this.setState({
                sentEmailLink: true
            })
            // Email sent.
        }).catch(function (error) {
            // An error happened.
            console.log(error, 'erroren')
        });
    }


    validateSignUp = () => {

        db.collection("usernames").doc(this.state.displayName).set({
            name: this.state.displayName.toLowerCase()
        })
            .then(function (docRef) {
                console.log("Document written with displayname in usernames ", docRef);
            })
            .catch(function (error) {
                console.error("Error adding document to usernames: ", error);
            });

        const { email, password, displayName } = this.state
        displayName.toLowerCase()

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                let user = firebase.auth().currentUser;
                if (user) {
                    user.updateProfile({
                        displayName: displayName.toLowerCase(),
                    }).then(
                        () => this.verifyEmailLink()
                    )
                }
            })
            .catch(() => {
                this.setState({
                    validatedEmail: false,
                    validatedPassword: false,
                    validatedName: false,
                    errors: "Kunde inte skapa användare"
                })

            })
    }

    trySignup = () => {
        this.setState({
            loading: true,
        })

        const { email, password, value } = this.state
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        this.setState({
            errors: '',
        })

        if (value == false) {
            this.setState({
                policyError: '* Du måste godkänna vår policy',
                validatedPolicy: false,
                loading: false,
                errors: '',

            })
        } else {
            this.setState({
                policyError: '',
                validatedPolicy: true,
                errors: '',

            })
        }

        if (reg.test(email) == false) {
            console.log('email är inte correct')
            this.setState({
                emailError: '* Du måste fylla en giltlig email',
                loading: false,
                validatedEmail: false,
                errors: '',

            })
        } else {
            this.setState({
                emailError: null,
                validatedEmail: true,
                errors: ''
            })

        }

        if (password.length < 6) {
            console.log('fyll i lösen')
            this.setState({
                passwordError: '* Vänligen fyll i ett lösenord',
                validatedPassword: false,
                loading: false,
                errors: ''


            })
        } else {
            this.setState({
                passwordError: null,
                validatedPassword: true,
                errors: ''
            })
        }

        this.check();
    }


    check = async () => {
        let checkArray = []

        if(this.state.displayName == ""){
            this.setState({
	            validatedName: false,
                nameError: '* fyll i ett namn',
                loading: false,
	            errors: ''
	        })
        } else {
        await db.collection("usernames").where("name", "==", this.state.displayName.toLowerCase())
	    .get()
	    .then(function(querySnapshot) {
	        querySnapshot.forEach(function(doc) {
	
	            if(doc){
	                console.log('Namnet finns redan!!!')
	                checkArray.push(doc);
	
	            } else {
	                console.log('namnet är ledigt')
	            }
	        });
	    })
	    .catch(function(error) {
	        console.log("Error getting documents: ", error);
	    });
	
	    if(checkArray.length > 0){
	        this.setState({
	            validatedName: false,
                nameError: '* namnet upptaget',
                loading: false,
	            errors: ''
	        })
	    } else {
	        this.setState({
	            validatedName: true,
	            nameError: '',
	            errors: ''
	        })
        }
    }

    }


    openModalPolicy = () => {
        this.setState({
            modalVisible: true
        })
    }

    closeModalPolicy = () => {
        this.setState({
            modalVisible: false
        })
    }

    onChangePolicy = () => {
        this.setState(prevState => ({
            value: !prevState.value
        }));
    }

    render() {
        if (this.state.sentEmailLink == true) {
            return <VerifyEmailScreen goBack={this.onPressBack} />
        }
        else if (this.state.goBackToMain == true) {
            return <LoginScreen />
        } else {
            return (
                <LinearGradient
                    colors={['rgba(235,43,70,1)', 'rgba(0,21,72,1)']}
                    style={{
                        flex: 1/* justifyContent: 'center', alignItems: 'center'*/

                    }}>


                    <View style={styles.contentOne}>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                            }}>

                            <PolicyScreen modalClose={this.closeModalPolicy} />

                        </Modal>
                    </View>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={-80} enabled>
                        <View style={styles.content}>

                            <Text style={styles.screenLabel}>Registrera dig</Text>
                            <Text style={[styles.error, { textAlign: 'center' }]}>{this.state.errors == '' ? null : this.state.errors}</Text>

                            <Text style={styles.labelText}>Namn</Text>
                            {this.state.nameError ? <Text style={styles.error}>{this.state.nameError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Tex. spelkungen1"
                                required={true}
                                onChangeText={(displayName) => this.setState({ displayName })}
                                value={this.state.displayName}
                                autoFocus={false}
                                maxLength={30}
                                minLength={1}
                                autoCapitalize='none'
                            />

                            <Text style={styles.labelText}>Email</Text>
                            {this.state.emailError ? <Text style={styles.error}>{this.state.emailError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Tex. exempel@exempel.se"
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                autoFocus={false}
                                maxLength={60}
                                autoCapitalize='none'
                            />

                            <Text style={styles.labelText}>Lösenord</Text>
                            {this.state.passwordError ? <Text style={styles.error}>{this.state.passwordError}</Text> : null}
                            <TextInput
                                secureTextEntry={true}
                                style={styles.input}
                                placeholder="Lösenord"
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                autoFocus={false}
                                maxLength={30}
                            />

                            {this.state.validatedEmail & this.state.validatedPassword & this.state.validatedName? this.validateSignUp() : null}

                            <View style={styles.policy}>
                                <View style={styles.policyItem}>
                                    <Switch value={this.state.value} onValueChange={() => this.onChangePolicy()}></Switch>
                                </View>
                                <View style={styles.policyItem}>
                                    <TouchableHighlight onPress={() => this.openModalPolicy()}>
                                        <Text style={{ color: 'white' }}>Användar  villkor</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            {this.state.policyError ? <Text style={styles.error}>{this.state.policyError}</Text> : null}
                            <LinearGradient
                                colors={['#62fc9d', '#47ef88']}
                                style={{
                                    width: '60%',
                                    height: 48,
                                    borderRadius: 30,
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    padding: 10,
                                    shadowColor: '#294434',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    elevation: 1,
                                    marginTop: 6
                                }
                                } >

                                <TouchableHighlight onPress={() => this.trySignup()} underlayColor='transparent' style={styles.button}>
                                    {this.state.loading ? <ActivityIndicator size="small" color="white" animating={this.state.loading} />
                                        : <Text style={styles.btnText}>Registrera</Text>
                                    }
                                </TouchableHighlight>

                            </LinearGradient>
                            <Text style={{ color: 'white', margin: 10, fontSize: 17 }}></Text>

                            <TouchableHighlight onPress={() => this.onPressBack()} style={[styles.button, styles.reg]}>
                                <Text style={styles.regText}><Ionicons name="md-arrow-back" size={20}></Ionicons> Tillbaka</Text>
                            </TouchableHighlight>


                        </View>

                    </KeyboardAvoidingView>
                </LinearGradient>
            )

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
        alignItems: 'center'
    },

    screenLabel: {
        fontSize: 34,
        color: 'white',
        

    },

    contentOne: {
        height: 20,
        width: '100%'

    },

    content: {
        height: '40%',
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center',

    },



    labelText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'

    },

    error: {
        color: 'yellow',
        fontSize: 16
    },

    gobackBTN: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    input: {
        width: '75%',
        height: 47,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: '#dddbdb',
        backgroundColor: '#f9f9f9',
        margin: 4,
        borderRadius: 14,
        marginBottom: 6,

    },

    button: {
        backgroundColor: 'transparent',
        width: '60%',
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
        margin: 20,


    },

    policy: {
        width: 150,
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'

    },

    btnText: {
        fontSize: 18,
        color: 'rgba(0,21,72,1)',
        fontWeight: 'bold'

    },


    goback: {
        fontSize: 24,
        color: 'rgba(235,43,70,1)',
        fontWeight: 'bold',
        margin: 20,
        borderBottomWidth: 10,
        borderColor: 'blue'

    },


    reg: {
        backgroundColor: 'transparent',
        borderBottomColor: '#bbb',
        borderBottomWidth: 0.5,
        margin: -10

    },
    button: {
        backgroundColor: 'transparent',
        width: '60%',
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
        margin: 20

    },
    regText: {
        color: 'white',
        fontSize: 22,

    },
    policyItem: {
        height: 40,
        width: '50%',
        color: 'white'

    }

});

export default SignupScreen
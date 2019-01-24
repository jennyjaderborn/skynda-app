import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo';
import db from './firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class ScoreScreen extends React.Component {

    state = {
        score: this.props.navigation.state.params.userScore,
        message: '',
        upgrade: '',
    }

    async componentDidMount() {
        // Set state message depending on score
        if (this.state.score === 0) {
            this.setState({
                message: 'Bättre lycka nästa gång...'
            })
        }
        else if (this.state.score >= 1 && this.state.score <= 4) {
            this.setState({
                message: 'Du kan bättre!'
            })
        }
        else if(this.state.score >= 5 && this.state.score < 8){
            this.setState({
                message: 'Bra jobbat!'
            })
        }
        
        else {
            this.setState({
                message: 'Du är riktigt grym!'
            })
        }
        this.saveScore()
    }

    onPressContinue = () => {
        this.props.navigation.navigate('Home')
    }

    // Set the score in database depending on if data exists and if it's more or less for the currentUser
    saveScore = async () => {
        const user = this.props.screenProps.currentUser

        var docRef = db.collection("highscore").doc(user.uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                if(doc.data().score < this.state.score) {
                    db.collection("highscore").doc(user.uid).update({
                        score: this.state.score,
                    })
                    this.setState({ upgrade: 'ett nytt personligt highscore!' })
                }
            } else {
                db.collection("highscore").doc(user.uid).set({
                    name: user.displayName,
                    score: this.state.score,
                })
            }
        }).catch(function(error) {
        });


        //Lägger till document i subcollection "roundes", med points.
        db.collection('users').doc(user.uid).collection('roundes').add({
            points: this.state.score
        })
            .then(function (docRef) {
            })
            .catch(function (error) {
            });
    }

    render() {
        this.state.score > 5 ? this.saveScore : null
        return (
            <LinearGradient
                colors={['rgba(235,43,70,1)', 'rgba(0,21,72,1)']}
                style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center'

                }}>
                <View style={styles.starWrap}>
                    <Ionicons name="md-star" size={90} color={"#fff34f"} />
                </View>

                <View style={styles.container}>

                    <Text style={[styles.text, styles.message]}>{this.state.message}</Text>


                    <Text style={styles.text}>{`Du fick ${this.state.upgrade}`}</Text>


                    <Text style={[styles.text, styles.point]}>{`${this.state.score} rätt`}</Text>

                    <Text style={styles.text}>Vill du ha en revanch?</Text>

                </View>
                <LinearGradient
                    colors={['#fff796', '#fff34f']}
                    style={{
                        width: '90%',
                        marginLeft: '3%',
                        marginRight: '3%',
                        height: 48,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: 'center',
                        margin: 10
                    }
                    } >
                    <TouchableHighlight onPress={this.onPressContinue} style={styles.continue}>
                        <Text style={styles.buttonText}>Gå vidare</Text>
                    </TouchableHighlight>

                </LinearGradient>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '55%',
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 0,
        paddingBottom: 40,
        
    },
    text: {
        color: 'black',
        marginTop: 40,
        fontSize: 20
    },
    starWrap: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -40
    },

    buttonText: {
        fontSize: 20,
        color: 'rgba(0,21,72,1)',
        fontWeight: 'bold'

    },

    message: {
        fontSize: 32,
        marginTop: 50,
        fontWeight: 'bold'
    },
    continue: {
        backgroundColor: 'transparent',
        width: '80%',
        height: 54,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    point: {
        fontSize: 32,
        fontWeight: 'bold'
    }

});

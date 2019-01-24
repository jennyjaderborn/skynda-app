import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import HelpScreen from './HelpScreen';
import PlayScreen from './PlayScreen';
import ScoreScreen from './ScoreScreen';
import ProfileScreen from './ProfileScreen';
import MainVerify from './MainVerify';
import HighScoreScreen from './HighScoreScreen';
import PayScreen from './PayScreen';
import BeforePayScreen from './BeforePayScreen';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailed from './PaymentFailed';


import db from './firebaseConfig';
import * as firebase from 'firebase';

const HomeStack = createSwitchNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    play: {
      screen: PlayScreen,
    },

    score: {
      screen: ScoreScreen

    },
  }

)

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  console.log(navigation.state.index)
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const HelpStack = createSwitchNavigator(
  {
    Help: {
      screen: HelpScreen,
    },
  }
)

const ProfileStack = createSwitchNavigator(
  {
    Profile: {

      screen: ProfileScreen

    },
    pay: { screen: PayScreen },
    beforePay: { screen: BeforePayScreen },
    paymentSuccess: { screen: PaymentSuccess },
    paymentFailed: { screen: PaymentFailed }
  }

)

const HighScoreStack = createSwitchNavigator(
  {
    HighScore: {

      screen: HighScoreScreen

    },

  }
)


const Menu = createBottomTabNavigator(

  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => <View style={styles.outerCircle}><Ionicons name="md-play-circle" size={64} style={styles.icons} color={focused ? 'black': '#1f1e35'}
        /></View>,
        tabBarOptions: {
          showLabel: false,
          style: {

            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            left: 50,
            right: 50,
            bottom: 0,
            height: 70
          }
        }
      })
    },
    Help: {
      screen: HelpStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => <View style={styles.outerCircle}><Ionicons name="md-help-circle" style={styles.icons} size={64} color={focused ? 'black': '#1f1e35'} /></View>,
        tabBarOptions: {
          showLabel: false,
          style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            left: 50,
            right: 50,
            bottom: 0,
            height: 70
          }
        }
      })

    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => <View style={styles.outerCircle}><Ionicons name="md-contact" size={64} style={styles.icons} color={focused ?'black': '#1f1e35'} /></View>,
        tabBarOptions: {
          showLabel: false,
          style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            left: 50,
            right: 50,
            bottom: 0,
            height: 70
          }
        }
      })
    },


    HighScore: {
      screen: HighScoreStack,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => <Ionicons name="md-trophy" size={50} color={focused ?'#ffea4f': '#ffe389'} />,
        tabBarOptions: {
          showLabel: false,
          style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            position: 'absolute',
            left: 50,
            right: 50,
            bottom: 0,
            height: 70
          }
        }
      })
    },

  }
)

const AppContainer = createAppContainer(Menu)

export default class App extends React.Component {
  state = {
    allDocs: [], //questions from database in an array
    loggedIn: false,
    currentUser: null,
    roundes: [],

  }

  async componentWillMount() {
    //getting all questions from the database, push them to the array and set state
    let allDocsArray = [];
    await db.collection("questions").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allDocsArray.push(doc.data());
      });
    });

    this.setState({ allDocs: allDocsArray })
  }

  open = () => {
    this.setState({
      loggedIn: true
    })

   ///console.log(email)
    this.account()

  }

  close = () => {
    this.setState({
      loggedIn: false
    })

  }

  // Get current user and roundes
  account = async () => {
    const { currentUser } = firebase.auth()
    let roundesArray = [];
    /*
    await db.collection("users").doc(currentUser.uid)
      .onSnapshot(function (doc) {
        roundesArray.push(doc.data().roundes);
        console.log("Current data now changed: ", doc.data());
      });

      */

    this.setState({ currentUser })

  }

  render() {
    return (
      this.state.loggedIn == false ?

        <MainVerify isLoginRender={this.open}
          isSignupRender={this.open} />
        :
        <AppContainer screenProps={{
          allDocs: this.state.allDocs,
          currentUser: this.state.currentUser,
          loggingOut: this.close,
          roundes: this.state.roundes
        }} />

    )
  }
}



const styles = StyleSheet.create({
  icons: {
    marginTop: -5.5
  },

  outerCircle: {

    borderRadius: 40,
    width: 56,
    height: 56,
    backgroundColor: 'white',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,



  },
})
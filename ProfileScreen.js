import React from 'react';
import { StyleSheet, Text, ActivityIndicator, View, TouchableHighlight, Modal } from 'react-native';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import db from './firebaseConfig';
import PolicyScreen from './PolicyScreen';
import { LinearGradient } from 'expo';
import DeleteScreen from './DeleteScreen';
import SupportScreen from './SupportScreen';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalVisibleDelete: false,
      modalVisibleSupport: false,
      scores: [],
      loading: true,
    }

    this.onPressLogout = this.onPressLogout.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
    this.getRoundes = this.getRoundes.bind(this)
    this.openModalPolicy = this.openModalPolicy.bind(this)
    this.closeModalPolicy = this.closeModalPolicy.bind(this)
    this.closeModalDelete = this.closeModalDelete.bind(this)
    this.openModalDelete = this.openModalDelete.bind(this)
    this.openSupportModal = this.openSupportModal.bind(this)
    this.closeSupportModal = this.closeSupportModal.bind(this)
  }

  componentDidMount() {
    this.navs = [
      this.props.navigation.addListener('willFocus', () => this.getRoundes()),
      this.props.navigation.addListener('willBlur', () => this.getRoundes()),
      this.props.navigation.addListener('didFocus', () => this.getRoundes()),
    ]
  }

  componentWillUnmount() {
    this.navs.forEach((nav) => {
      nav.remove();
    });
  }

  getRoundes = async () => {
    const { currentUser } = firebase.auth()
    
    let score = [];
    await db.collection("users").doc(currentUser.uid).collection("roundes").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        score.push(doc.data())
      })
    });
    this.setState({ scores: score, loading: false })
  }


  onPressLogout = () => {
    firebase.auth().signOut()

      .then(() => {
        this.props.screenProps.loggingOut()
      })
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

  openModalDelete = () => {
    this.setState({
      modalVisibleDelete: true
    })
  }

  closeModalDelete = () => {
    this.setState({
      modalVisibleDelete: false
    })
  }

  openSupportModal = () => {
    this.setState({
      modalVisibleSupport: true,
    })
  }
  
  closeSupportModal = () => {
    this.setState({
      modalVisibleSupport: false,
    })
  }

  deleteAccount = async() => {
    var user = firebase.auth().currentUser;

    await user.delete().then(() => {
      this.props.screenProps.loggingOut()
    })
  .catch(function(error) {
    });
  }


  render() {

    let userinfo = this.state.scores
    let arrayOfUser = Object.values(userinfo)

    let user = firebase.auth().currentUser;
    let name;
    if (user != null) {
      name = user.displayName;
    }
    

    return (
      <LinearGradient
        colors={['rgba(235,43,70,1)', 'rgba(0,21,72,1)']}
        style={{
          flex: 1, justifyContent: 'center'

        }}>
        <View style={styles.container}>

        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisibleDelete}
            onRequestClose={() => {
            }}>

            <DeleteScreen modalClose={this.closeModalDelete} delete={this.deleteAccount}/>

          </Modal>


          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
            }}>

            <PolicyScreen modalClose={this.closeModalPolicy} />

          </Modal>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisibleSupport}
            onRequestClose={() => {
            }}>

            <SupportScreen modalClose={this.closeSupportModal} />

          </Modal>

          <View style={styles.whiteContainer}>
            <Ionicons name="md-contact" size={80} />
            <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
        
            <Text style={styles.rounds}>Antal spelade omgångar:
            </Text>
      
            {this.state.loading? 
            <ActivityIndicator size="small" color="black" animating={this.state.loading} />
            :  <Text style={[styles.rounds, {fontWeight: 'bold', fontSize: 24}]}>
                    {this.state.scores.length}
            </Text>
          }
            

          </View>
          <View style={styles.itemWrap}>

          <View style={styles.items}>
              <TouchableHighlight style={styles.button} onPress={this.openModalDelete}>
                <View style={styles.item}>
                  <Text style={styles.textP}>Ta bort mitt konto</Text><Ionicons name="md-arrow-dropright" size={20}></Ionicons>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.items}>
              <TouchableHighlight style={styles.button} onPress={this.openSupportModal}>
                <View style={styles.item}>
                  <Text style={styles.textP}>Support</Text><Ionicons name="md-arrow-dropright" size={20}></Ionicons>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.items}>
              <TouchableHighlight style={styles.button} onPress={() => this.openModalPolicy()}>
                <View style={styles.item}>
                  <Text style={styles.textP}>Privacy Policy</Text><Ionicons name="md-arrow-dropright" size={20}></Ionicons>
                </View>
              </TouchableHighlight>
            </View>
            <View style={[styles.items, styles.logoutButton]}>
              <TouchableHighlight style={styles.logout} onPress={this.onPressLogout}>
                <Text style={[styles.textP, styles.buttonP]} >
                  Logga ut
            </Text>
              </TouchableHighlight>
            </View>
          </View>
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
    height: '60%',
  },
  whiteContainer: {
    width: '90%',
    height: '40%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5

  },
  name: {
    color: 'black',
    margin: '4%',
    fontSize: 30,
    
  },
  rating: {
    color: 'grey',
    margin: '2%',

  },
  rounds: {
    color: 'black',
    margin: '4%',
    fontSize: 20

  },
  logoutButton: {
    backgroundColor: 'rgb(53, 157, 255)',
    borderWidth: 0
  },
  logout: {
    height: 50,
    width: '100%',
    flex: 0, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  items: {
    borderWidth: 0.5,
    borderColor: '#aeb0b7',
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    //padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

  },
  textP: {
    color: 'black',
    fontSize: 20, 
  },
  itemWrap: {
    width: '100%',
    marginBottom: 60,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
  buttonP: {
    fontWeight: 'bold'
  }

});
import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, View, TextInput, TouchableHighlight, ScrollView, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';



export default class PlayScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      allQandA: this.props.screenProps.allDocs,
      text: '', //text from userinput
      words: [],//all words you have written in the inputfield, both right and wrong
      timer: 50, // timer countdown
      score: 0,
      answers: [], //array with answers(in an array too) that belongs to the selected question.
      randomNumber: Math.floor(Math.random() * Math.floor(this.props.screenProps.allDocs.length)), //We need a randomNumber for later to random get a question from an array with questions
      progress: 1, //progressbar
      indeterminate: false, //progressbar
      animate: true,
    }
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
    this.animate();
  }

  componentWillUnmount() {
    clearInterval(this.clockCall);
    clearInterval(this.animating);

  }

  animateText() {
    let wordExists = this.state.words.filter(word => word.doAnimate === true);
    if (wordExists.length > 0) {
      this.animateTextAfter()
    }
  }

  animateTextAfter() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();

  }

  animate() {
    this.animating = setInterval(() => {
      // 1/156, varje omgång 39 sek vid nollan strecket fullt
      this.setState(prevState => ({
        progress: prevState.progress -= 0.00510204//0.00641026
      }))

    }, 250); //uppdateras var 1/4 sekund
  }

  decrementClock = () => {
    this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
    if (this.state.timer === 0) {
      this.props.navigation.navigate('score', { userScore: this.state.score, })
    }
  };


  onChangeT = (value) => {

    //ändrar tillbaka doAnimate till false. 
    let words = [...this.state.words];
    let index = words.findIndex(word => word.word === this.state.text);
    words[index] = { ...words[index], doAnimate: false };
    this.setState({ words })

    this.setState({
      text: value.toLowerCase()
    })
  }

  //when clicking on submit  
  onSave = () => {
    this.textInput.clear()

    let allAnswers = this.state.allQandA.filter(obj => obj.question === this.state.allQandA[this.state.randomNumber].question)[0].answers;

    this.correctThis(allAnswers)
  }


  correctThis = (allAnswers) => {
    const isItCorrect = allAnswers.includes(this.state.text);
    if (isItCorrect) {

      let wordExists = this.state.words.filter(word => word.word === this.state.text);
      if (wordExists.length > 0) {

        let words = [...this.state.words];
        let index = words.findIndex(word => word.word === this.state.text);
        words[index] = { ...words[index], doAnimate: true };
        this.setState({ words }, () => this.animateText());
      } else {
        this.setState(prevState => ({
          words: [
            ...prevState.words,
            {
              word: this.state.text,
              color: 'green',
              dec: 'none',
              point: 1,
              star: true,
            }
          ],

          score: prevState.score + 1

        }))
      }
    } else {
      this.setState(prevState => ({
        words: [
          ...prevState.words,
          {
            word: this.state.text,
            color: 'black',
            dec: 'line-through',
            point: 0,
            star: false

          }
        ]

      }))
    }
  }


  render() {
    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    })

    let progressColor;
    if (this.state.progress < 0.25) {
      progressColor = '#c92020';
    } else {
      progressColor = 'rgba(235,43,70,1)'
    }
    return (


      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <StatusBar
          hidden={true}
        />
        <View style={styles.questionBox}>
          <Text style={styles.text}>{this.state.allQandA[this.state.randomNumber].question}</Text>
          <Text style={styles.text}>{this.state.timer}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Progress.Bar
            unfilledColor={'none'}
            borderRadius={6}
            height={18}
            borderColor={'transparent'}
            color={progressColor}//{'#fff684'}
            width={null}
            animationType={'timing'}
            style={styles.progress}
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
          />

          <ScrollView
            contentContainerStyle={styles.contentContainer}

          >

            <ScrollView
              scrollEnabled={true}
              ref={ref => this.scrollView = ref}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.scrollView.scrollToEnd({ animated: true });
              }}
            >

              {this.state.words.map((obj, i) =>
                <View key={i} style={styles.inner}>
                  {obj.doAnimate ?
                    <Animated.Text
                      style={{
                        fontSize: textSize,
                        color: 'green'
                      }} >
                      {obj.word}
                    </Animated.Text> :
                    <Text style={{ fontSize: 20, color: obj.color, textDecorationLine: obj.dec }}>{obj.word}</Text>

                  }
                  {obj.star ? <Ionicons name="md-star-outline" color={'#f4df42'} size={23} />
                    : <Text style={{ marginRight: 2 }}><Ionicons name="md-close" color={'#bdc6cc'} size={22} /></Text>
                  }
                </View>
              )}
            </ScrollView>
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={input => { this.textInput = input }}
            onChangeText={this.onChangeT}
            style={styles.input}
            onSubmitEditing={this.onSave}
            autoFocus={true}
            placeholder={'Ditt svar..'}
          />
          <LinearGradient
            colors={['#9ffca6', '#68e872']}
            style={{
              width: '20%',
              margin: 2,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: 'center',
              height: 60



            }}
          >
            <TouchableHighlight
              style={styles.enterButton}
              onPress={this.onSave}>
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>


      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,21,72,1)',
  },

  text: {
    color: 'white',
    fontSize: 22,
    marginTop: 'auto',
    flexGrow: 1,
    padding: 10,
    marginLeft: '8%'
  },

  progress: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  input: {
    backgroundColor: 'white',
    width: '80%',
    height: 60,
    borderRadius: 5,
    margin: 2,
    paddingLeft: 8,
    fontSize: 18,
  },

  enterButton: {
    backgroundColor: 'transparent',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'transparent',
  },

  inputContainer: {
    flex: 0,
    flexDirection: 'row',
    width: '94%',
    justifyContent: 'center',
    marginLeft: '3%',
    marginRight: '3%',
  },

  contentContainer: {
    height: 250,
    marginLeft: '3%',
    marginRight: '3%',
    width: '94%',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#294434',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    flexGrow: 1,
    marginBottom: '2%',
    paddingBottom: '2%',
    alignItems: 'center',
  },
  inner: { //innuti scrollview där orden du skrivit skrivs ut
    flex: 1,
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
  },
  questionBox: {
    flexDirection: 'row',
    flex: 0,
    backgroundColor: 'rgba(0,21,72,1)',
    borderRadius: 5,
    height: '18%',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',

  },
  buttonText: {
    fontWeight: 'bold',
  }



})
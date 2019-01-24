import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import PlayScreen from './PlayScreen';
//import LinearGradient from 'react-native-linear-gradient';


export default class GradientScreen extends React.Component {

    
    render() {

        const  gradientHeight= 500;
        const gradientBackground  = '#152456';
        const data = Array.from({ length: gradientHeight });

      return (
        
        <View>

        {data.map((_, i) => (
                  <View
                      key={i}
                      style={{
                          position: 'absolute',
                          backgroundColor: gradientBackground,
                          height: 1,
                          bottom: (gradientHeight - i),
                          right: 0,
                          left: 0,
                         
                          opacity: (1 / gradientHeight) * (i + 2)
                      }}
                  />
              ))}

        </View>
     
      );
    }
  }

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native';


const VerifyEmailScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ett email med en verifieringslänk har nu skickats till din epost.</Text>
            <Text style={styles.text}>Hittar du inte mailet kan det ha hamnat i din skräppost.</Text>
            <TouchableHighlight onPress={()=> props.goBack()} style={styles.button}>
                <Text style={styles.buttonText}>Gå vidare och logga in</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40

    },
    text: {
        textAlign: 'center', 
        fontSize: 22,
        margin: 20
    },
    buttonText: {
        fontSize: 23,
        fontWeight: 'bold'
    },
    button: {
        borderBottomColor: 'black',
        borderBottomWidth: 1, 
    }
})

export default VerifyEmailScreen
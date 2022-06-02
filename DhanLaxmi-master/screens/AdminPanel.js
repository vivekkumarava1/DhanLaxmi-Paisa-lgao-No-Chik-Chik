import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

function AdminPanel() {

    const [crypto, setCrypto] = useState('');
    const [amount, setAmount] = useState('');

    return (
        <KeyboardAvoidingView style={styles.main}>
          <View>
          <Text style={styles.text}>Add Cryptos</Text>
          </View>
          <View style={styles.box2}>
            <TextInput
              mode="outlined"
              label="Crypto"
              value={crypto}
              onChangeText={(text) => setCrypto(text)}
              theme={{colors: {primary: '#2150f5'}}}
            />
            <TextInput
              mode="outlined"
              label="Amount"
              value={amount}
              onChangeText={(text) => setAmount(text)}
              theme={{colors: {primary: '#2150f5'}}}
            />
            </View>
            <View style = {styles.buttonStyle}>
            <Button mode="contained" 
              theme={{colors: {primary: '#2150f5'}}}>
              Add {crypto}
            </Button>
          </View>
        </KeyboardAvoidingView>
      );
    }
    
    const styles = StyleSheet.create({
      main: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "column",
        flex: 1,
        paddingTop:10,
        backgroundColor: "white"
      },
      box2: {
        paddingHorizontal:30,
        paddingTop:30
      },
      text: {
        fontSize: 22,
        textAlign: 'center',
      },
      buttonStyle: {
        marginHorizontal:30,
        marginTop:30,
      }
    });

export default AdminPanel

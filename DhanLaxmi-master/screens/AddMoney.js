import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Platform
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Constants from "expo-constants";

export default function AddMoney() {
  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Add Money</Text>
        <View style={styles.balanceContainer}>
          <Text>Current Balance : </Text>
          <Text style={{ fontWeight: "bold" }}>$0.00</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            theme={{ colors: { primary: "#0D68FE" } }}
            placeholder="Enter Amount"
          />
          <Text style={{textAlign:"center", color:"white", fontWeight: "bold"}}>Min $10  Max $10000</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Money</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
      <Image
            source={require('../assets/upi.png')}
            style={styles.image}
          />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 40
  },
  container: {
    flex: 4,
    backgroundColor: "#0D68FE",
    borderRadius: 40,
    margin: 20,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#E6E6E6",
    margin: 20,
    borderRadius: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  headerContainer: {
    justifyContent: "space-around",
    flex: 3,
  },
  inputContainer: {
    margin: 40,
    justifyContent: "space-between",
    flex: 1,
  },
  button: {
      backgroundColor: "white",
      borderRadius: 15,
      padding: 15,
      margin: 50,
  },
  buttonText: {
      textAlign: "center",
      color: "#0D68FE",
        fontWeight: "bold",
  },
  footer: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
  },
  image: {
      width:80,
      height: 80
  }
});

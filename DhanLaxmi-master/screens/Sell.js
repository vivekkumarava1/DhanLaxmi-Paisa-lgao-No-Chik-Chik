import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import Constants from "expo-constants";

export default function Sell() {
  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sell</Text>
        <View style={styles.balanceContainer}>
          <View style={styles.detailContainer}>
            <Text>Current Holding</Text>
            <Text style={{ fontWeight: "bold" }}>0.00</Text>
          </View>
          <View  style={styles.detailContainer}>
            <Text>Current Price</Text>
            <Text style={{ fontWeight: "bold" }}>$0.00</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            theme={{ colors: { primary: "#0D68FE" } }}
            placeholder="Enter Amount"
          />
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 4,
    backgroundColor: "#0D68FE",
    borderRadius: 40,
    margin: 20,
  },
  balanceContainer: {
    flexDirection: "column",
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
    flex: 4,
  },
  inputContainer: {
    margin: 40,
    justifyContent: "space-between",
    flex: 1,
  },
  detailContainer: {
      flexDirection:"row", 
      justifyContent:"space-between",
      padding:5
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
});

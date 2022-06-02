import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Image
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import firebase from "firebase";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignup = async () => {
    if (!email || !password || !name)
      Alert.alert("Please enter required fields!");
    else {
      if (password.length < 8) {
        Alert.alert("Please enter password of minimum 8 characters!");
      } else {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (result) => {
            var userNow = firebase.auth().currentUser;
            userNow.updateProfile({
              displayName: name,
            })
              .then(async() => {
                await firebase
                .database()
                .ref("watchList")
                .push({
                  watchArray: ["-", "btc", "eth"],
                  uid: firebase.auth().currentUser.uid,
                })
              })
          })
          .catch((error) => {
            Alert.alert("Something went wrong!");
          });
      }
    }
  };

 

  return (
    <KeyboardAvoidingView style={styles.main}>
      <Image
                  source={require("../assets/banner.jpeg")}
                  style={{
                    width: 350,
                    height: 100,
                  }}
                />
      <View>
        <Text style={styles.text}> SignUp to continue</Text>
      </View>
      <View style={styles.box2}>
        <TextInput
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          theme={{ colors: { primary: "#2150f5" } }}
        />
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          theme={{ colors: { primary: "#2150f5" } }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          theme={{ colors: { primary: "#2150f5" } }}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          mode="contained"
          onPress={userSignup}
          theme={{ colors: { primary: "#2150f5" } }}
        >
          Sign Up
        </Button>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", marginTop: 20 }}
          >
            Already have an account ? Log In !
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  box2: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
  },
  buttonStyle: {
    marginHorizontal: 30,
    marginTop: 30,
  },
});

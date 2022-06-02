// The intrest of people in Cryptos is increasing day by day
// and right now India has the largest number of crypto owners
// in the world. Cryptocurrency is basically a digital currency
// in which transactions are verified and records maintained by
// a decentralized system using cryptography, rather than by a
// centralized authority. I have made an application named
// DhanLaxmi.
// DhanLaxmi is a user friendly mobile application by which
// a user can take a watch on over 100+ trending
// cryptocurrencies in the world and know about each
// cryptocurrency by having a look at their historical data,
// general trend and news about each cryptocurrency. It also
// allows users to hold, buy and sell cryptocurrencies on the
// application and users can also track their portfolio in the
// Portfolio tracker.

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView
} from "react-native";

const About = () => {


  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={{paddingHorizontal:10, marginBottom:70}}>
      <Text style={{fontWeight: "bold", fontSize:40, textAlign:"center", paddingVertical:20, color:"#2150f5"}}>DhanLaxmi</Text>
      <Text style={{fontSize:25, textAlign: "center"}}>
        The intrest of people in Cryptos is increasing day by day and right now
        India has the largest number of crypto owners in the world.
      </Text>
      <Text style={{fontSize:25, textAlign: "center", paddingVertical:20}}>
        Cryptocurrency is basically a digital currency in which transactions are
        verified and records maintained by a decentralized system using
        cryptography, rather than by a centralized authority. I have made an
        application named DhanLaxmi. DhanLaxmi is a user friendly mobile
        application by which a user can take a watch on over 100+ trending
        cryptocurrencies in the world and know about each cryptocurrency by
        having a look at their historical data, general trend and news about
        each cryptocurrency. It also allows users to hold, buy and sell
        cryptocurrencies on the application and users can also track their
        portfolio in the Portfolio tracker.
      </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop:10,
  },
});

export default About;

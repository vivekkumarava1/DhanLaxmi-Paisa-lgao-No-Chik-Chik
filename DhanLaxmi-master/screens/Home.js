import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import HomeTopMovers from "./HomeTopMovers";
import HomeWatch from "./HomeWatch";
import axios from "axios";

const Home = ({navigation}) => {
  const [globalData, setGlobalData] = useState({});

  var SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

  function setNum(number) {
    var tier = (Math.log10(Math.abs(number)) / 3) | 0;

    if (tier == 0) return number;

    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    var scaled = number / scale;

    return scaled.toFixed(1) + suffix;
  }

  useEffect(() => {
    axios
      .get(
        `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=d0eb7019-5668-4cf2-810f-8f9f76239c9c`
      )
      .then(function (response) {
        setGlobalData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <ScrollView style={{ flex: 1, marginBottom:77 }}>
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 50,
            }}
          >
            <Image
              source={require("../assets/wallet.jpg")}
              style={{ width: 220, height: 220 }}
            />
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Welcome to DhanLaxmi
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#5d616d",
                paddingTop: 10,
              }}
            >
              Make your first investment today
            </Text>
            <View style={{ paddingTop: 30 }}>
              <TouchableOpacity style={styles.appButtonContainer} onPress={() => {navigation.push("AddMoney")}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                >
                  Fund Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
            <Text style={{fontWeight: "bold", fontSize:22, paddingBottom:7}}>Global Stats</Text>
            {globalData ? (
              <View
                style={{
                  borderColor: "#ddd",
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 25,
                }}
              >
                <TouchableOpacity style={styles.stats} onPress={() =>{navigation.push("ActiveCryptos")}}>
                  <Text style={styles.statsTitle}>Active Cryptos </Text>
                  <Text style={styles.statsData}>{globalData?.active_cryptocurrencies}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stats} onPress={() =>{navigation.push("ActiveExchanges")}}>
                  <Text style={styles.statsTitle}>Active Exchanges</Text>
                  <Text style={styles.statsData}>{globalData?.active_exchanges}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stats}>
                  <Text style={styles.statsTitle}>BTC Dominance </Text>
                  <Text style={styles.statsData}>
                    {String(globalData?.btc_dominance).substring(0, 5)}%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stats}>
                  <Text style={styles.statsTitle}>ETH Dominance </Text>
                  <Text style={styles.statsData}>
                    {String(globalData?.eth_dominance).substring(0, 5)}%
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stats}>
                  <Text style={styles.statsTitle}>Total Market Cap </Text>
                  <Text style={styles.statsData}>{setNum(globalData?.quote?.USD?.total_market_cap)} $</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stats}>
                  <Text style={styles.statsTitle}>Total Volume 24H </Text>
                  <Text style={styles.statsData}>{setNum(globalData?.quote?.USD?.total_volume_24h)}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={{textAlign:"center"}}>Loading</Text>
            )}
          </View>
          <View style={{ paddingTop: 50, marginBottom:10, marginLeft:5}}>
            <HomeWatch />
          </View>
          <View style={{ paddingTop: 50, marginBottom:10, marginLeft:5}}>
            <HomeTopMovers />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    backgroundColor: "#2150f5",
    borderRadius: 8,
    paddingVertical: 17,
    paddingHorizontal: 100,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:10,
    marginBottom:10
  },
  statsTitle: {
    color:"#2150f5",
    fontWeight: "bold",
    fontSize: 16,
  },
  statsData: {
    fontWeight: "bold",
  }
});

export default Home;

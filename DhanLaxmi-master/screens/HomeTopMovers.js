import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import axios from "axios";

const HomeTopMovers = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/search/trending`)
      .then(function (response) {
        setCoins(response.data.coins);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          paddingTop: 10,
          paddingHorizontal:20
        }}
      >
        Top Trending Coins
      </Text>
      {coins ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingTop: 10 }}
        >
          {coins.map((coin) => (
            <View key={coin.item.coin_id}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  borderWidth: 0.5,
                  borderColor: "#ddd",
                  borderRadius: 10,
                  marginRight: 15,
                  paddingHorizontal: 15,
                }}
              >
                <View style={{alignItems:"center"}}>
                  <Image
                    source={{ uri: coin.item.large }}
                    style={{ width: 35, height: 35, marginTop: 15 }}
                  />
                </View>

                <View
                  style={{
                    marginTop: 15,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                   #{coin.item.market_cap_rank} {coin.item.symbol}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      paddingTop: 10,
                    }}
                  >
                    {coin.item.name}
                  </Text>
                  <Text style={{fontSize:8}}>
                    {coin.item.price_btc} BTC
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={{fontWeight:"bold", fontSize:15, paddingLeft: 15 }}>Loading...</Text>
      )}
    </View>
  );
};

export default HomeTopMovers;

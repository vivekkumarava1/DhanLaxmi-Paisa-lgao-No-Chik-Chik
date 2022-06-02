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
import firebase from "firebase";

import { getMarketData } from "../services/cryptoService";

const HomeWatch = () => {
  const [starArray, setStarArray] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  
  useEffect(() => { 
    getData();
  },[])

  const getData = async () => {
    await firebase
    .database()
    .ref("watchList")
    .on("value", (snap) => {
      for (var id in snap.val()) {
        if(snap.val()[id].uid === firebase.auth().currentUser.uid){
          setStarArray(snap.val()[id].watchArray);
        }
      }
    })
  }

  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchMarketData = async () => {
        const marketData = await getMarketData();
        setData(marketData);
      };
      fetchMarketData();
  }, []);

  useEffect(() => {

  },[filteredCoins,starArray,data])
  
  useEffect(() => {
    const coinFilter = data?.filter((coin) =>
    starArray.includes(coin.symbol)
  );
    setFilteredCoins(coinFilter);
  },[starArray, data])

  const getColor = (value) => {
    if(value>=0){
      return "#34C759"
    }else{
      return "#FF3B30"
    }
  }

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
        Watchlist
      </Text>
      {filteredCoins.length!=0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingTop: 10 }}
        >
          {filteredCoins.map((coin) => (
    
              <View
                key={coin.id}
                style={{
                  width: 150,
                  height: 170,
                  borderWidth: 0.5,
                  borderColor: "#ddd",
                  borderRadius: 10,
                  marginRight: 15,
                }}
              >
                <View style={{alignItems:"center"}}>
                  <Image
                    source={{ uri: coin.image }}
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
                   #{coin.market_cap_rank} {coin.symbol.toUpperCase()}
                  </Text>
                  <Text style={{paddingTop:5, fontWeight: "bold", color: getColor(coin.price_change_percentage_7d_in_currency.toFixed(2))}}>
                    {coin.price_change_percentage_7d_in_currency.toFixed(2)>0 ? "+":""}{coin.price_change_percentage_7d_in_currency.toFixed(2)} %
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      paddingTop: 5,
                    }}
                  >
                    {coin.name}
                  </Text>
                  <Text style={{fontSize:13, fontWeight: "bold"}}>
                    $ {coin.current_price} 
                  </Text>
                </View>
              </View>
      
          ))}
        </ScrollView>
      ) : (
        <Text style={{fontWeight:"bold", fontSize:15, paddingLeft: 15 }}>Add You Favourites...</Text>
      )}
    </View>
  );
};

export default HomeWatch;

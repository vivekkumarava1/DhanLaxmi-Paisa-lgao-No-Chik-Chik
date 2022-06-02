import React, { useRef, useMemo, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Chart from "../component/Chart";
import { getMarketData } from "../services/cryptoService";
import Constants from "expo-constants";
import Loader from "../component/Loader";

import firebase from "firebase";

export default function Coin({route, navigation}) {
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  var SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

  function setNum(number) {
    // what tier? (determines SI symbol)
    var tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + " " + suffix;
  }

  useEffect(() => {
    const { coinData } = route.params;
    setSelectedCoinData(coinData);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      {selectedCoinData ? (
        <>
          <View style={{ width: "100%" }}>
            <Text
              style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
            >
              {selectedCoinData?.name}/{selectedCoinData?.symbol}
            </Text>
          </View>
          <View>
            {selectedCoinData ? (
              <Chart
                currentPrice={selectedCoinData.current_price}
                logoUrl={selectedCoinData.image}
                name={selectedCoinData.name}
                symbol={selectedCoinData.symbol}
                priceChangePercentage7d={
                  selectedCoinData.price_change_percentage_7d_in_currency
                }
                sparkline={selectedCoinData?.sparkline_in_7d.price}
                high={selectedCoinData?.high_24h}
                low={selectedCoinData?.low_24h}
              />
            ) : null}
          </View>
          <View style={{ flex: 4 }}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 4,
                marginTop: 5,
                justifyContent: "space-between",
                height: "75%",
              }}
            >
              <View
                style={{
                  width: "50%",
                  justifyContent: "space-evenly",
                  paddingRight: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 3,
                    backgroundColor: "#E6E6E6",
                    borderRadius: 8,
                    padding: 7,
                  }}
                >
                  <Text style={{ color: "grey" }}>Rank</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    #{selectedCoinData?.market_cap_rank}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 3,
                    backgroundColor: "#E6E6E6",
                    borderRadius: 8,
                    padding: 7,
                  }}
                >
                  <Text style={{ color: "grey" }}>Volume</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    $ {setNum(selectedCoinData?.total_volume)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 3,
                    backgroundColor: "#E6E6E6",
                    borderRadius: 8,
                    padding: 7,
                  }}
                >
                  <Text style={{ color: "grey" }}>ATH</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    $ {selectedCoinData?.ath}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "50%",
                  justifyContent: "space-evenly",
                  paddingLeft: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 3,
                    backgroundColor: "#E6E6E6",
                    borderRadius: 8,
                    padding: 7,
                  }}
                >
                  <Text style={{ color: "grey" }}>Market Cap</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {setNum(selectedCoinData?.market_cap)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 3,
                    backgroundColor: "#E6E6E6",
                    borderRadius: 8,
                    padding: 7,
                  }}
                >
                  <Text style={{ color: "grey" }}>Total Supply</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {setNum(selectedCoinData?.total_supply)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 3,
                    backgroundColor: "#E6E6E6",
                    borderRadius: 8,
                    padding: 7,
                  }}
                >
                  <Text style={{ color: "grey" }}>Max Supply</Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {setNum(selectedCoinData?.max_supply)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: "20%",
                flexDirection: "row",
                justifyContent: "space-between",
                padding:5
              }}
            >
              <TouchableOpacity
                style={{
                  width: "50%",
                  backgroundColor: "#0D68FE",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "white",
                  borderRadius:25,
                  paddingVertical:20
                }}
                onPress={() =>{navigation.push("Buy")}}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  BUY
                </Text>
                
              </TouchableOpacity>
              <View><Text> </Text></View>
              <TouchableOpacity
                style={{
                  width: "50%",
                  backgroundColor: "#0D68FE",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius:25,
                  paddingVertical:20
                }}
                onPress={() =>{navigation.push("Sell")}}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  SELL
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 89,
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

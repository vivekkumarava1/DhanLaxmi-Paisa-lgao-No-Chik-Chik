import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios";
import { TextInput } from "react-native-paper";
import Loader from "../component/Loader";

import { getMarketData } from "../services/cryptoService";

const Market = ({navigation}) => {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {

      const fetchMarketData = async () => {
        const marketData = await getMarketData();
        setData(marketData);
      };
      fetchMarketData();

  }, []);

  useEffect(() => {
    const filteredData = data?.filter((coin) =>
      coin.id.toLowerCase().includes(searchItem.toLowerCase())
    );
    setData(filteredData);
  }, [searchItem]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 20, flex: 1 }}>
        <TextInput
          mode="outlined"
          label="Search..."
          value={searchItem}
          onChangeText={(text) => setSearchItem(text)}
          theme={{ colors: { primary: "blue" } }}
        />
      </View>
      {data.length == 0 ? (
        <View style={{ flex: 9 }}>
          <Loader sizeParam={60} />
        </View>
      ) : (
        <View style={{ flex: 9, marginBottom:77 }}>
          <ScrollView style={{ paddingHorizontal: 20 }}>
            {data?.map((coin) => (
              <TouchableOpacity key={coin.id} onPress={() => navigation.push("Coin", { coinData :coin})}>
                <View
                  style={{
                    paddingVertical: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: coin.image }}
                      style={{
                        width: 32,
                        height: 32,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 15 }}>
                    <Text style={{ fontSize: 17, fontWeight: "400" }}>
                      {coin.name}
                    </Text>
                  </View>
                  <View style={{ paddingLeft: 15}}>
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>
                      ${coin.current_price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listTab: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  btntab: {
    width: Dimensions.get("window").width / 4,
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    borderRadius: 20,
  },
  btnTabActive: {
    backgroundColor: "#f3f7ff",
  },
});

export default Market;

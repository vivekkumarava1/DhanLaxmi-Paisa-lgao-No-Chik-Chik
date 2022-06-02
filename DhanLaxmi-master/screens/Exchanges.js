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
  Linking
} from "react-native";
import axios from "axios";
import Loader from "../component/Loader";


const Exchanges = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {

    axios
      .get(
        `https://api.coingecko.com/api/v3/exchanges`
      )
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 20, flex:0.6, alignItems: "center", justifyContent:"center", paddingTop:5}}>
        <Text style={{textAlign: "center", fontWeight: "bold", fontSize:30, }}>Top 100 Exchanges</Text>
      </View>
      {data.length == 0 ? (
    <View style={{ flex: 9.4 }}>
          <Loader sizeParam={60} />
        </View>
      ) : (
        <View style={{ flex: 9, marginBottom:77 }}>
          <ScrollView style={{ paddingHorizontal: 20 }}>
            {data?.map((exchange) => (
              <TouchableOpacity key={exchange.id} onPress={() =>{Linking.openURL(exchange.url)}}>
                <View
                  style={{
                    paddingVertical: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: exchange.image }}
                      style={{
                        width: 32,
                        height: 32,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 15 }}>
                    <Text style={{ fontSize: 17, fontWeight: "400" }}>
                      {exchange.name}
                    </Text>
                  </View>
                  <View style={{ paddingLeft: 15}}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      #{exchange.trust_score_rank}
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

export default Exchanges;


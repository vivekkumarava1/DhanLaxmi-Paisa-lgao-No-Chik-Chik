import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";
import firebase from "firebase";

const { width: SIZE } = Dimensions.get("window");

const Chart = ({
  currentPrice,
  logoUrl,
  name,
  symbol,
  priceChangePercentage7d,
  sparkline,
  high,
  low,
}) => {
  const latestCurrentPrice = useSharedValue(currentPrice);
  const [chartReady, setChartReady] = useState(false);

  const [starred, setStarred] = useState(false);
  const [starArray, setStarArray] = useState([]);

  const [id, setId] = useState(null);

  const priceChangeColor = priceChangePercentage7d > 0 ? "#34C759" : "#FF3B30";

  const starChangeColor = starred ? "yellow" : "white";
  const starChangeBorder = 0.4;


  useEffect(() => {
    latestCurrentPrice.value = currentPrice;
    setTimeout(() => {
      setChartReady(true);
    }, 0);
    return () => {};
  }, [currentPrice]);

  useEffect(() => {
    getData();
    return () => {};
  },[])

  const getData = async () => {
    await firebase
    .database()
    .ref("watchList")
    .on("value", (snap) => {
      for (var id in snap.val()) {
        if(snap.val()[id].uid === firebase.auth().currentUser.uid){
          setId(id);
          setStarArray(snap.val()[id].watchArray);
        }
      }
    })
  }

  useEffect(() => {
    if(starArray.includes(symbol)){
      setStarred(true);
    }
    return () => {};
  }, [starArray]);

  const checkStar = async () => {
    if (starred) {
      const newStarArray = starArray.filter((item) => item !== symbol);
      setStarArray(newStarArray);
      setStarred(false);
      await firebase.database().ref(`watchList/${id}/watchArray`).set(newStarArray);
    } else {
      const newStarArray = starArray;
      newStarArray.push(symbol);
      setStarArray(newStarArray);
      setStarred(true);
      await firebase.database().ref(`watchList/${id}/watchArray`).set(newStarArray);
    }
  };

  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      const formattedValue = `$${latestCurrentPrice.value.toLocaleString(
        "en-US",
        { currency: "USD" }
      )}`;
      return formattedValue;
    }

    const formattedValue = `$${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    return formattedValue;
  };

  if (sparkline.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: "bezier" }}
    >
      <View style={styles.chartWrapper}>
        <View>
          <View style={{ flexDirection: "row", margin: 20 }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1.5,
              }}
            >
              <View>
                <Image source={{ uri: logoUrl }} style={styles.image} />
              </View>
            </View>
            <View style={{ flex: 8.5, marginLeft: 10 }}>
              <View>
                <Text style={{ color: "grey" }}>Current Buy Price</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ChartYLabel format={formatUSD} style={styles.boldTitle} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: priceChangeColor,
                      borderRadius: 5,
                      padding: 5,
                    }}
                  >
                    <Text style={[styles.title, { color: "white" }]}>
                      {priceChangePercentage7d.toFixed(2)}%
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: starChangeColor,
                      marginLeft: 10,
                      borderRadius: 14,
                      borderWidth: starChangeBorder,
                    }}
                    onPress={() => checkStar()}
                  >
                    <Image
                      style={{ height: 25, width: 25, margin: 1 }}
                      source={require(`../assets/star.png`)}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "grey" }}>1D Lowest </Text>
              <Text style={{ fontWeight: "bold" }}>$ {low}</Text>
            </View>
            <Text>|</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "grey" }}>1D Highest </Text>
              <Text style={{ fontWeight: "bold" }}>$ {high}</Text>
            </View>
          </View>
        </View>

        {chartReady ? (
          <View style={styles.chartLineWrapper}>
            <ChartPath
              height={SIZE / 2}
              stroke={priceChangeColor}
              width={SIZE}
              strokeWidth={2}
              selectedStrokeWidth={4}
            />
            <ChartDot style={{ backgroundColor: "black" }} size={17} />
          </View>
        ) : null}
      </View>
    </ChartPathProvider>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  titlesWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 44,
    height: 44,
  },
  subtitle: {
    fontSize: 14,
    color: "#A9ABB1",
  },
  lowerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    fontSize: 15,
  },
  chartLineWrapper: {
    marginTop: 40,
  },
});

export default Chart;

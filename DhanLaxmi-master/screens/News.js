import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native'
import Constants from "expo-constants";
import axios from "axios"

import Loader from "../component/Loader";

const News = () => {

    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        axios
            .get(`https://newsapi.org/v2/everything?q=Crypto&sortBy=popularity&apiKey=1ff4ef8d1866448791baed85c13365f6`)
            .then(function (response) {
                setNewsData(response.data.articles);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function openNews(url){
        Linking.openURL(url);
    }

    return (
        <View style={styles.mainContainer}>
            {newsData.length === 0 ? <Loader /> :
                <>
                    <View style={styles.headingContainer}>
                        <Text style={styles.newsHeading}>News</Text>
                    </View>
                    <View style={styles.newsContainer}>
                    <ScrollView>
                        {newsData.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.newsItemContainer} onPress={()=>openNews(item.url)}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: item.urlToImage }} style={{ height: 65, width: 65, borderRadius: 35 }} />
                                </View>
                                <View style={styles.newsItemContent}>
                                    <View style={{paddingRight:70, paddingLeft: 15 }}><Text style={styles.titleStyle}>{item.title}</Text></View>
                                    <View style={{paddingRight:70, paddingLeft: 15 }}>
                                        <Text style={styles.descriptionStyle}>{item.description.substring(0, 80)}....</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    </View>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#F6FBFC",
        paddingBottom:77
    },
    headingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    newsContainer: {
        flex: 9,
    },
    newsHeading: {
        color: "black",
        fontSize: 40,
    },
    newsItemContainer: {
        margin: 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
    },
    titleStyle: {
        fontWeight: "bold",
        fontSize:15
    },
    descriptionStyle: {
        color: "grey",
    },

})

export default News

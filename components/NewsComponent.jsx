import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import NewsCard from './NewsCard';
import axios from 'axios';
import auth from '../firebase.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialNewsData = [
  { heading: 'Market Update', body: 'The market today saw a significant increase in trading volume...' },
  { heading: 'Tech Stocks Rally', body: 'Technology stocks have seen a considerable rise...' },
  { heading: 'Economic Outlook', body: 'Experts are predicting a stable economic growth for the next quarter...' },
  { heading: 'Cryptocurrency Trends', body: 'Bitcoin and other cryptocurrencies continue to show volatility...' },
  { heading: 'New IPOs', body: 'Several companies are planning to go public in the coming months...' },
  { heading: 'Regulatory Changes', body: 'New regulations in the financial sector are expected to come into effect...' },
];

const NewsComponent = () => {

  const [token, setToken] = useState();
  const [config, setConfig] = useState();
  const [newsData, setNewsData] = useState(initialNewsData)

  useEffect(() => {
    const checkUser = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const tok = await AsyncStorage.getItem('cookie');
          setToken(tok);
          setConfig({ headers: { Authorization: `Bearer ${token}` } })
        } else {
          auth.signOut();
          await AsyncStorage.clear();
          navigation.navigate("Login");
        }
      })
    }
    checkUser();

    axios.get('http://192.168.1.13:3000/api/get-best-news', config).then((res)=>{
      console.log(res.data.message);
      if(res.status === 200) setNewsData(res.data.bestNews);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])


  return (
    <ScrollView style={styles.container}>
      {newsData.map((news, index) => (
        <NewsCard key={index} heading={news.heading} body={news.body} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default NewsComponent;

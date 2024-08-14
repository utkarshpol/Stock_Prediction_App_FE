import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import StockCard from './StockCard';
import axios from 'axios';
import auth from '../firebase.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialstockData = [
  { stockName: 'Apple Inc.', stockSymbol: 'AAPL', currentStockValue: 145.32 },
  { stockName: 'Microsoft Corp.', stockSymbol: 'MSFT', currentStockValue: 298.56 },
  { stockName: 'Amazon.com Inc.', stockSymbol: 'AMZN', currentStockValue: 3342.88 },
  { stockName: 'Alphabet Inc.', stockSymbol: 'GOOGL', currentStockValue: 2725.60 },
  { stockName: 'Tesla Inc.', stockSymbol: 'TSLA', currentStockValue: 709.44 },
];

const Stocks = () => {
  const [token, setToken] = useState();
  const [config, setConfig] = useState();
  const [stockData, setStockData] = useState(initialstockData);

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

    axios.get('http://192.168.1.13:3000/api/get-best-stocks', config).then((res)=>{
      console.log(res.data.message);
      if(res.status === 200) setStockData(res.data.bestStocks);
    }).catch((err)=>{
      console.log(err);
    })
  }, [])
  
  return (
    <ScrollView style={styles.container}>
      {stockData.map((stock, index) => (
        <StockCard key={index} {...stock} />
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

export default Stocks;

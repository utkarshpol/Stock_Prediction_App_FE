import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import StockCard from './StockCard';

const stockData = [
  { stockName: 'Apple Inc.', stockSymbol: 'AAPL', currentStockValue: 145.32 },
  { stockName: 'Microsoft Corp.', stockSymbol: 'MSFT', currentStockValue: 298.56 },
  { stockName: 'Amazon.com Inc.', stockSymbol: 'AMZN', currentStockValue: 3342.88 },
  { stockName: 'Alphabet Inc.', stockSymbol: 'GOOGL', currentStockValue: 2725.60 },
  { stockName: 'Tesla Inc.', stockSymbol: 'TSLA', currentStockValue: 709.44 },
  // Add more stocks as needed
];

const Stocks = () => {
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

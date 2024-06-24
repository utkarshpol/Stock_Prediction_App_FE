import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import StockCard from './StockCard';

const TopPicks = () => {
  const stocks = [
    { stockName: 'AAPL', currentPrice: '$120', predictionDays: 7, predictedPrice: '$130' },
    { stockName: 'GOOGL', currentPrice: '$250', predictionDays: 30, predictedPrice: '$270' },
    // Add more stock items here
  ];

  return (
    <ScrollView style={styles.scrollView}>
      {stocks.map((stock, index) => (
        <StockCard 
          key={index} 
          stockName={stock.stockName} 
          currentPrice={stock.currentPrice} 
          predictionDays={stock.predictionDays} 
          predictedPrice={stock.predictedPrice} 
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
  },
});

export default TopPicks;

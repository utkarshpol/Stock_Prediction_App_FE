import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StockCard = ({ stockName, currentPrice, predictionDays, predictedPrice }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.stockName}>{stockName}</Text>
      <Text style={styles.currentPrice}>{currentPrice}</Text>
      <View style={styles.footer}>
        <Text style={styles.predictionDays}>{predictionDays} days</Text>
        <Text style={styles.predictedPrice}>{predictedPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  stockName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currentPrice: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  predictionDays: {
    color: '#ccc',
    fontSize: 16,
  },
  predictedPrice: {
    color: '#ccc',
    fontSize: 16,
  },
});

export default StockCard;

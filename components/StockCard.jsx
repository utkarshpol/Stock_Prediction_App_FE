import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StockCard = ({ stockName, stockSymbol, currentStockValue, predictedPriceArray }) => {
  const [predictedDays, setPredictedDays] = useState(1);

  // Ensure predictedPriceArray is defined and has enough elements
  const predictedPrice = (predictedPriceArray && predictedPriceArray[predictedDays - 1]) || 'N/A';

  const incrementDays = () => {
    if (predictedDays < 7) {
      setPredictedDays(predictedDays + 1);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.stockName}>{stockName}</Text>
      <Text style={styles.stockSymbol}>{stockSymbol}</Text>
      <Text style={styles.stockValue}>Current Value: ${currentStockValue}</Text>
      <Text style={styles.predictedPrice}>Predicted Price: ${predictedPrice}</Text>
      <TouchableOpacity style={styles.button} onPress={incrementDays}>
        <Text style={styles.buttonText}>Predicted Days: {predictedDays}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c3e',
    padding: 20,
    marginVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  stockName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stockSymbol: {
    color: '#888',
    fontSize: 16,
  },
  stockValue: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 10,
  },
  predictedPrice: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StockCard;

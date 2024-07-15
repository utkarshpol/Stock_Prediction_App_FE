import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Stocks from '../components/Stocks';
import NavigationComponent from '../components/NavigationComponent';

export default function TopStocks() {
  const [currentPage, setCurrentPage] = useState('Market Movers');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stocks />
      <NavigationComponent currentPage={currentPage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
});

import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView,StatusBar } from 'react-native';
import NewsComponent from '../components/NewsComponent';
import NavigationComponent from '../components/NavigationComponent';

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState('Daily Headlines');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />  
      <NewsComponent />
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

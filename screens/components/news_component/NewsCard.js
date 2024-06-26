import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const NewsCard = ({ heading, news }) => {
  const maxHeight = Dimensions.get('window').height / 2; // Half the screen height

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{heading}</Text>
      <ScrollView style={[styles.newsContainer, { maxHeight }]}>
        <Text style={styles.news}>{news}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newsContainer: {
    flexGrow: 1,
  },
  news: {
    color: '#ccc',
    fontSize: 16,
  },
});

export default NewsCard;

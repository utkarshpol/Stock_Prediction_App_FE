import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import NewsCard from './NewsCard';

const newsData = [
  { heading: 'Market Update', body: 'The market today saw a significant increase in trading volume...' },
  { heading: 'Tech Stocks Rally', body: 'Technology stocks have seen a considerable rise...' },
  { heading: 'Economic Outlook', body: 'Experts are predicting a stable economic growth for the next quarter...' },
  { heading: 'Cryptocurrency Trends', body: 'Bitcoin and other cryptocurrencies continue to show volatility...' },
  { heading: 'New IPOs', body: 'Several companies are planning to go public in the coming months...' },
  { heading: 'Regulatory Changes', body: 'New regulations in the financial sector are expected to come into effect...' },
];

const NewsComponent = () => {
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

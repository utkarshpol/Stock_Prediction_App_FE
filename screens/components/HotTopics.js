import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import NewsCard from './NewsCard';

const HotTopics = ({ currentSection, setCurrentSection }) => {
  const newsItems = [
    { heading: 'News Headline 1', news:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, minima placeat inventore dolorum expedita similique magnam reprehenderit dolores, officiis rerum modi et voluptatibus repellat earum provident perspiciatis ullam, ea distinctio!' },
    { heading: 'News Headline 2', news: 'This is the detail of the second news item.' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {newsItems.map((item, index) => (
          <NewsCard key={index} heading={item.heading} news={item.news} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    padding: 20,
  },
});

export default HotTopics;

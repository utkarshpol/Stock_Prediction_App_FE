import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HotTopics from '../components/news_component/HotTopics.js'; // Ensure the path is correct
import Navigation from '../components/common_components/Navigation.js'; // Ensure the path is correct

const TopNews = ({user}) => {
  const [currentSection, setCurrentSection] = useState('TopNews');

  return (
      <View style={styles.container}>
        <HotTopics currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <Navigation currentSection={currentSection}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
    paddingTop: 30
  },
});

export default TopNews;

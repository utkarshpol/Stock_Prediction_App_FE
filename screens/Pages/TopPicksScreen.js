import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TopPicks from '../components/TopPicks'; // Ensure the path is correct
import Navigation from '../components/Navigation'; // Ensure the path is correct

const TopPicksScreen = ({user}) => {
  const [currentSection, setCurrentSection] = useState('TopPicksScreen');

  return (
      <View style={styles.container}>
        <View style={styles.topPicksContainer}>
          <TopPicks />
        </View>
        <View style={styles.navigationMenuContainer}>
          <Navigation currentSection={currentSection}/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 30
  },
  topPicksContainer: {
    flex: 1,
  },
  navigationMenuContainer: {
    height: 60, // Adjust the height based on your navigation menu design
  },
});

export default TopPicksScreen;

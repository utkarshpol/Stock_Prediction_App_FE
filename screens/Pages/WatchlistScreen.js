import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Watchlist from '../components/watchlist_components/Watchlist.js';
import WatchlistContent from '../components/watchlist_components/WatchListContent.js';
import Navigation from '../components/common_components/Navigation.js';
import { WatchlistProvider } from '../context_providers/WatchlistProvider.js';

const WatchlistScreen = ({ user }) => {
  return (
    <WatchlistProvider user={user}>
      <View style={styles.container}>
        <Watchlist />
        <WatchlistContent />
        <Navigation currentSection={'Watchlist'} />
      </View>
    </WatchlistProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 30
  },
  noWatchlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWatchlistText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default WatchlistScreen;

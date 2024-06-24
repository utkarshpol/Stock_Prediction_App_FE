import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Watchlist from '../components/Watchlist.js';
import WatchListContent from '../components/WatchListContent.js';
import Navigation from '../components/Navigation.js';

const WatchlistScreen = ({user}) => {
  const [watchlists, setWatchlists] = useState(Array.from({ length: 10 }, (_, index) => `Watchlist${index + 1}`));
  const [selectedWatchlist, setSelectedWatchlist] = useState(watchlists[0]);

  const handleSelectWatchlist = (watchlist) => {
    setSelectedWatchlist(watchlist);
  };

  const handleDeleteWatchlist = (indexToDelete) => {
    const updatedWatchlists = watchlists.filter((_, index) => index !== indexToDelete);
    setWatchlists(updatedWatchlists);
    if (selectedWatchlist === watchlists[indexToDelete]) {
      setSelectedWatchlist(updatedWatchlists[0] || '');
    }
  };

  return (
      <View style={styles.container}>
        <Watchlist
          watchlists={watchlists}
          onSelectWatchlist={handleSelectWatchlist}
          onDeleteWatchlist={handleDeleteWatchlist}
        />
        {selectedWatchlist ? (
          <WatchListContent selectedWatchlist={selectedWatchlist} />
        ) : (
          <View style={styles.noWatchlistContainer}>
            <Text style={styles.noWatchlistText}>No watchlists available</Text>
          </View>
        )}
        <Navigation currentSection={'Watchlist'}/>
      </View>
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

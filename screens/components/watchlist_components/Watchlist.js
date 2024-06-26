import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WatchlistContext } from '../../context_providers/WatchlistProvider';

const Watchlist = () => {
  const { watchlists, setWatchlists, selectedWatchlist, setSelectedWatchlist } = useContext(WatchlistContext);

  const deleteWatchlist = (indexToDelete) => {
    const newWatchlists = watchlists.filter((_, index) => index !== indexToDelete);
    setWatchlists(newWatchlists);
  };

  const addWatchlist = () => {
    const newWatchlist = [...watchlists, []];
    setWatchlists(newWatchlist);
  };

  return (
    <View style={styles.topContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {watchlists.map((watchlist, index) => (
          <View key={index} style={styles.watchListBlock}>
            {watchlists.length > 1 && (
              <TouchableOpacity style={styles.crossButton} onPress={() => deleteWatchlist(index)}>
                <Icon name="close" size={16} color="#fff" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setSelectedWatchlist(index)}>
              <Text style={styles.watchListText}>{`Watchlist-${index + 1}`}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addWatchlist}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: 60,
    marginTop: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  watchListBlock: {
    marginRight: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  watchListText: {
    color: '#fff',
    textAlign: 'center',
  },
  crossButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    padding: 4,
    backgroundColor: '#444',
    borderRadius: 20,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
  },
});

export default Watchlist;

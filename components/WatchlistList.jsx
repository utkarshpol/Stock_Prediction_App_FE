import React from 'react';
import { FlatList, View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WatchlistList = ({ watchlists, selectedWatchlist, setSelectedWatchlist, handleDeleteWatchlist, handleAddWatchlist }) => (
  <View style={styles.watchlistContainer}>
    <FlatList
      data={watchlists}
      horizontal
      renderItem={({ item }) => (
        <LongPressGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === 4) { // ACTIVE state
              handleDeleteWatchlist(item.id);
            }
          }}
        >
          <View style={styles.watchlistItemContainer}>
            <TouchableOpacity
              onPress={() => setSelectedWatchlist(item.id)}
              style={[styles.watchlistItem, selectedWatchlist === item.id && styles.selectedWatchlist]}
            >
              <Text style={styles.watchlistText}>Watchlist {item.id}</Text>
            </TouchableOpacity>
          </View>
        </LongPressGestureHandler>
      )}
      keyExtractor={(item) => item.id}
    />
    <TouchableOpacity onPress={handleAddWatchlist} style={styles.addIcon}>
      <Icon name="add" size={30} color="#fff" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  watchlistContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    paddingTop: 50, // Adjust padding to avoid notification bar overlap
  },
  watchlistItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchlistItem: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#6A0DAD',
    borderRadius: 5,
  },
  selectedWatchlist: {
    backgroundColor: '#8A2BE2',
  },
  watchlistText: {
    color: '#fff',
  },
  addIcon: {
    marginLeft: 10,
  },
});

export default WatchlistList;
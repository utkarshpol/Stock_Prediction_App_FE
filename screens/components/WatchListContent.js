import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WatchlistContent = ({ selectedWatchlist }) => {
  const [items, setItems] = useState(Array.from({ length: 30 }, (_, index) => `${selectedWatchlist} Item ${index + 1}`));

  const addItem = () => {
    setItems([...items, `${selectedWatchlist} Item ${items.length + 1}`]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={styles.watchListItem}>
            <Text style={styles.watchListItemText}>{item}</Text>
            <TouchableOpacity style={styles.crossButton} onPress={() => deleteItem(index)}>
              <Icon name="close" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  watchListItem: {
    position: 'relative',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  watchListItemText: {
    color: '#fff',
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
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WatchlistContent;

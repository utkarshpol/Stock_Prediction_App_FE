import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import StockCard from '../top_stocks_components/StockCard';
import { WatchlistContext } from '../../context_providers/WatchlistProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NseIndia } from 'stock-nse-india';

const nseIndia = new NseIndia();

const WatchlistContent = () => {
  const { watchlists, selectedWatchlist, setWatchlists } = useContext(WatchlistContext);
  const [items, setItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [stocks, setStocks] = useState([]);

  const getStockList = async () => {
    try {
      const list = await AsyncStorage.getItem('stock-list');
      if (list) {
        setStocks(JSON.parse(list));
      } else {
        const res = await axios.get('http://192.168.1.13:3000/api/get-stocks');
        if (res.status === 200) {
          const fetchedList = res.data.list.map(symbol => ({ name: symbol }));
          await AsyncStorage.setItem('stock-list', JSON.stringify(fetchedList));
          setStocks(fetchedList);
        } else {
          Alert.alert("Some unexpected error occurred");
        }
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Some unexpected error occurred");
    }
  };

  useEffect(() => {
    if (watchlists && watchlists[selectedWatchlist]) {
      setItems(watchlists[selectedWatchlist]);
    }
  }, [watchlists, selectedWatchlist]);

  useEffect(() => {
    getStockList();
  }, []);

  const addItem = async (stock) => {
    try {
      if (!stock.name) {
        throw new Error('Stock name is undefined');
      }
      const details = await nseIndia.getEquityDetails(stock.name);
      if (!details || !details.priceInfo) {
        throw new Error('Invalid stock details response');
      }
      const stockPrice = details.priceInfo.lastPrice;
      const newItem = { name: stock.name, currPrice: stockPrice, targetDays: 1, targetPrice: 100 };
      const updatedItems = [...items, newItem];
      const updatedWatchlists = [...watchlists];
      updatedWatchlists[selectedWatchlist] = updatedItems;
      setItems(updatedItems);
      setWatchlists(updatedWatchlists);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Some unexpected error occurred");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    const updatedWatchlists = [...watchlists];
    updatedWatchlists[selectedWatchlist] = updatedItems;
    setItems(updatedItems);
    setWatchlists(updatedWatchlists);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={styles.watchListItem}>
            <StockCard
              stockName={item.name}
              currentPrice={item.currPrice}
              predictionDays={item.targetDays}
              predictedPrice={item.targetPrice}
            />
            <TouchableOpacity style={styles.crossButton} onPress={() => deleteItem(index)}>
              <Icon name="close" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </ScrollView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <FlatList
            data={stocks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => addItem(item)}>
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
  },
});

export default WatchlistContent;

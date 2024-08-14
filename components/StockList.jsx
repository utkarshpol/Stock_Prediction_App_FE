import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableHighlight, ScrollView, TextInput } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StockCard from './StockCard';

const StockList = ({ stocks, selectedWatchlist, handleDeleteStock, StockList, addStock }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedStockToDelete, setSelectedStockToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const showConfirmDeleteStock = (stockId) => {
    setSelectedStockToDelete(stockId);
    setConfirmVisible(true);
  };

  const handleConfirmDeleteStock = () => {
    handleDeleteStock(selectedWatchlist, selectedStockToDelete);
    setConfirmVisible(false);
  };

  const handleAddStock = (watchlistId, stock) => {
    addStock(watchlistId, stock);
    setModalVisible(false);
  };

  const filteredStocks = StockList.filter(stock => 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRightActions = (stockId) => (
    <TouchableOpacity onPress={() => showConfirmDeleteStock(stockId)}>
      <View style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={stocks[selectedWatchlist]}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <StockCard
              stockName={item.name}
              stockSymbol={item.symbol}
              currentStockValue={item.currentPrice}
              predictedPriceArray={item.predictedPrice}
            />
          </Swipeable>
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addStockButton}>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Stock to Add</Text>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search stocks..." 
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <ScrollView style={styles.modalScroll}>
              {filteredStocks.map(stock => (
                <TouchableOpacity key={stock.id} onPress={() => handleAddStock(selectedWatchlist, stock)}>
                  <Text style={styles.modalStockItem}>{stock.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={confirmVisible} transparent={true} animationType="fade">
        <View style={styles.confirmContainer}>
          <View style={styles.confirmContent}>
            <Text style={styles.confirmTitle}>Confirm Delete</Text>
            <Text style={styles.confirmMessage}>Are you sure you want to delete this stock?</Text>
            <View style={styles.confirmButtons}>
              <TouchableHighlight
                style={styles.confirmButton}
                onPress={handleConfirmDeleteStock}
                underlayColor="#DDDDDD">
                <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.confirmButton}
                onPress={() => setConfirmVisible(false)}
                underlayColor="#DDDDDD">
                <Text style={styles.confirmButtonText}>No</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: '#e53935',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '85%',
    borderRadius: 5,
    marginTop: '23.5%'
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addStockButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#1c1c3e',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  modalScroll: {
    width: '100%',
    maxHeight: 200, // Adjust as needed
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  modalStockItem: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  confirmContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StockList;

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationComponent from '../components/NavigationComponent';
import WatchlistList from '../components/WatchlistList';
import StockList from '../components/StockList';
import axios from 'axios';
import { NseIndia } from 'stock-nse-india';
import auth from '../firebase.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const nseIndia = new NseIndia();

const WatchlistPage = () => {
  const navigation = useNavigation();
  const [watchlists, setWatchlists] = useState([]);
  const [stocks, setStocks] = useState({});
  const [selectedWatchlist, setSelectedWatchlist] = useState();
  const [listOfStocks, setListOfStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [config, setConfig] = useState();

  const fetchStockDetails = async (stockList) => {
    const newStocks = {};
    for (const [key, list] of Object.entries(stockList)) {
      newStocks[key] = [];
      for (const stock of list) {
        try {
          const stockDetails = await nseIndia.getEquityDetails(stock.symbol);
          newStocks[key].push({
            id: stock.id,
            name: stock.name,
            symbol: stock.symbol,
            currentPrice: stockDetails.priceInfo.lastPrice,
            predictedPrice: stock.predictedPrice,
          });
        } catch (error) {
          console.error(`Error fetching details for ${stock.symbol}:`, error);
        }
      }
    }
    return newStocks;
  };

  useEffect(() => {
    // check if the user is present
    const checkUser = async ()=>{
      auth.onAuthStateChanged(async (user)=>{
        if(user){
          console.log("authenticated");
          const tok = await AsyncStorage.getItem('cookie');
          console.log(tok);
          setToken(tok);
          setConfig({headers:{Authorization: `Bearer ${token}`}})
        } else {
          auth.signOut();
          await AsyncStorage.clear();
          navigation.navigate("Login");
        }
      })
    }

    checkUser();

    const fetchData = async () => {
      try {
        const storedWatchlists = await AsyncStorage.getItem('watchlists');
        const storedListOfStocks = await AsyncStorage.getItem('listOfStocks');
        const storedStocks = await AsyncStorage.getItem('stocks');
    
        if (storedWatchlists && storedListOfStocks && storedStocks) {
          const tempWatchlists = JSON.parse(storedWatchlists);
          setWatchlists(tempWatchlists);
          setListOfStocks(JSON.parse(storedListOfStocks));
          setSelectedWatchlist(tempWatchlists[0]?.id)
          const updatedStocks = await fetchStockDetails(JSON.parse(storedStocks));
          setStocks(updatedStocks);
          setIsLoading(false);
        } else {
          // Handle case where AsyncStorage data is missing
          const watchlistResponse = await axios.get('http://192.168.246.8:3000/api/get-watchlist', config);
          console.log(watchlistResponse.data.message);
          if (watchlistResponse.status === 200) {
            setWatchlists(watchlistResponse.data.watchlists);
            await AsyncStorage.setItem('watchlists', JSON.stringify(watchlistResponse.data.watchlists));
            setSelectedWatchlist(watchlistResponse.data.watchlists[0]?.id || null);
    
            const stockListResponse = await axios.get('http://192.168.246.8:3000/api/all-stocks', config);
            console.log(stockListResponse.data.message);
            if (stockListResponse.status === 200) {
              setListOfStocks(stockListResponse.data.stock_list);
              await AsyncStorage.setItem('listOfStocks', JSON.stringify(stockListResponse.data.stock_list));
            }
    
            const stockList = watchlistResponse.data.stocks;
            await AsyncStorage.setItem('stocks', JSON.stringify(stockList));
    
            // Fetch current prices for fetched stocks
            const updatedStocks = await fetchStockDetails(stockList);
            setStocks(updatedStocks);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        // Handle error fetching data
      }
    };    

    fetchData();
    setIsLoading(false);
  }, []);

  const handleDeleteWatchlist = (id) => {
    // Delete watchlist from the backend by watchlist id
    axios.delete('http://192.168.1.13:3000/api/delete-watchlist', {...config, data: { watchlistId: id } })
      .then(async (res) => {
        if(res.status === 200){
          
          // Delete watchlist for the user from frontend
          const updatedWatchlists = watchlists.filter(watchlist => watchlist.id !== id);
          setWatchlists(updatedWatchlists);
          setSelectedWatchlist(updatedWatchlists.length > 0 ? updatedWatchlists[0].id : null);
          const updatedStocks = { ...stocks };
          delete updatedStocks[id];
          setStocks(updatedStocks);
          await AsyncStorage.setItem('watchlists', JSON.stringify(updatedWatchlists));
          await AsyncStorage.setItem('stocks', JSON.stringify(updatedStocks));
        }
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const handleAddWatchlist = () => {
    axios.put('http://192.168.1.13:3000/api/add-watchlist', config).then(async (res) => {
      if (res.status === 200) {
        const newWatchlistId = res.data.watchlistId;

        // set the list of watchlist and add the new id in frontend
        const updatedWatchlist = [...watchlists, { id: newWatchlistId }];
        const updatedStocks = { ...stocks };
        updatedStocks[newWatchlistId] = [];
        setWatchlists(updatedWatchlist);
        setStocks(updatedStocks);
        setSelectedWatchlist(newWatchlistId);
        await AsyncStorage.setItem('watchlists', JSON.stringify(updatedWatchlist))
        await AsyncStorage.setItem('stocks', JSON.stringify(updatedStocks));
      }
      console.log(res.data.message);
    }).catch((err) => {
      console.log(err);
    });
  };
  
 
  const handleDeleteStock = (watchlistId, stockId) => {
    // Delete the stock from the backend
    axios.delete('http://192.168.1.13:3000/api/delete-stock', { ...config, data: { watchlistId: watchlistId, stockId: stockId } })
      .then(async (res) => {
        if(res.status === 200){

          // Update the stock deletion in the frontend
          const updatedStocks = { ...stocks };
          updatedStocks[watchlistId] = updatedStocks[watchlistId].filter(stock => stock.id !== stockId);
          setStocks(updatedStocks);
          await AsyncStorage.setItem('stocks', JSON.stringify(updatedStocks));
        }
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const addStock = async (watchlistId, stock) => {
    const isPresent = stocks[watchlistId]?.find(s => s.id === stock.id);
    if (!isPresent) {
      try {
        const res = await axios.put('http://192.168.1.13:3000/api/add-stock', { ...config, watchlistId, stockId: stock.id });
        console.log(res.data.message);
        if (res.status === 200) {
          try {
            const stockDetails = await nseIndia.getEquityDetails(stock.symbol);
            const updatedAddedStock = {
              ...stock,
              currentPrice: stockDetails.priceInfo.lastPrice,
            };
  
            setStocks(prevStocks => ({
              ...prevStocks,
              [watchlistId]: [...prevStocks[watchlistId], updatedAddedStock],
            }));

            await AsyncStorage.setItem('stocks', JSON.stringify(stocks))
          } catch (error) {
            console.error(`Error fetching details for ${stock.symbol}:`, error);
          }
        }
      } catch (error) {
        console.error('Error adding stock:', error);
      }
    }
  };
  

  return (
    <GestureHandlerRootView style={styles.safeContainer}>
      <SafeAreaView style={styles.safeContainer}>
        <WatchlistList
          watchlists={watchlists}
          selectedWatchlist={selectedWatchlist}
          setSelectedWatchlist={setSelectedWatchlist}
          handleDeleteWatchlist={handleDeleteWatchlist}
          handleAddWatchlist={handleAddWatchlist}
        />
        {isLoading ? (
          <View style={[styles.loadingContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#8A2BE2" />
          </View>
        ) : (
          <StockList
            stocks={stocks}
            selectedWatchlist={selectedWatchlist}
            handleDeleteStock={handleDeleteStock}
            StockList={listOfStocks}
            addStock={addStock}
          />
        )}
        <NavigationComponent currentPage="Watchlist" style={styles.navigation} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default WatchlistPage;
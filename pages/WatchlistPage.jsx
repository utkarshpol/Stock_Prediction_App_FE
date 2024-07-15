import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationComponent from '../components/NavigationComponent';
import WatchlistList from '../components/WatchlistList';
import StockList from '../components/StockList';
import axios from 'axios';
import { NseIndia } from 'stock-nse-india';

const nseIndia = new NseIndia();

const dummyWatchlists = [
  { id: '1' },
  { id: '2' }
];

const dummyStocks = {
  '1': [
    { id: 'a', name: 'Apple Inc.', symbol: 'AAPL', currentPrice: 150, predictedPrice: [155,156,157,158,159,160,161] },
    { id: 'b', name: 'Google LLC', symbol: 'GOOGL', currentPrice: 2800, predictedPrice: [285,286,827,288,289,290,291] }
  ],
  '2': [
    { id: 'c', name: 'Microsoft Corp.', symbol: 'MSFT', currentPrice: 300, predictedPrice: [360,361,362,363,364,365,366] },
    { id: 'd', name: 'Amazon.com Inc.', symbol: 'AMZN', currentPrice: 3500, predictedPrice: [360,361,362,363,364,365,366] }
  ]
};

const dummyStockList = [
  { id: 'e', name: 'Facebook, Inc.', symbol: 'FB', predictedPrice: [360,361,362,363,364,365,366] },
  { id: 'f', name: 'Tesla, Inc.', symbol: 'TSLA', predictedPrice: [710,711,712,713,714,715,716] }
];

const WatchlistPage = () => {
  const [watchlists, setWatchlists] = useState(dummyWatchlists);
  const [stocks, setStocks] = useState(dummyStocks);
  const [selectedWatchlist, setSelectedWatchlist] = useState(dummyWatchlists[0]?.id || null);
  const [listOfStocks, setListOfStocks] = useState(dummyStockList);

  useEffect(() => {
    axios.get('http://192.168.1.13:3000/api/get-watchlist').then((res) => {
      console.log(res.data.message);
      if (res.status === 200) {
        setWatchlists(res.data.watchlists);
        setSelectedWatchlist(watchlists[0]?.id || null);
        const stockList = res.data.stocks;
        const fetchStockDetails = async () => {
          const newStocks = {};
          for (const [key, list] of Object.entries(stockList)) {
            newStocks[key] = [];
            for (const stock of list) {
              try {
                const stockDetails = await nseIndia.getEquityDetails(stock.symbol);
                newStocks[key].push({id: stock.id,name: stock.name,symbol: stock.symbol,
                  currentPrice: stockDetails.priceInfo.lastPrice,predictedPrice: stock.predictedPrice
                });
              } catch (error) {
                console.error(`Error fetching details for ${stock.symbol}:`, error);
              }
            }
          }
          setStocks(newStocks);
        };
        fetchStockDetails();
      }
    }).catch((err)=>{
      console.log(err);
    });

    axios.get('http://192.168.1.13:3000/api/all-stocks').then((res)=>{
      console.log(res.data.message);
      if(res.status === 200) setListOfStocks(res.data.stock_list);
    }).catch((err)=>{
      console.log(err);
    })

    console.log(watchlists);
    console.log(stocks);
  }, []);

  const handleDeleteWatchlist = (id) => {
    // Delete watchlist from the backend by watchlist id
    axios.delete('http://192.168.1.13:3000/api/delete-watchlist', { data: { watchlistId: id } })
      .then((res) => {
        if(res.status === 200){
          
          // Delete watchlist for the user from frontend
          const updatedWatchlists = watchlists.filter(watchlist => watchlist.id !== id);
          setWatchlists(updatedWatchlists);
          setSelectedWatchlist(updatedWatchlists.length > 0 ? updatedWatchlists[0].id : null);
          const updatedStocks = { ...stocks };
          delete updatedStocks[id];
          setStocks(updatedStocks);
        }
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const handleAddWatchlist = () => {
    axios.put('http://192.168.1.13:3000/api/add-watchlist').then((res) => {
      if (res.status === 200) {
        const newWatchlistId = res.data.watchlistId;

        // set the list of watchlist and add the new id in frontend
        const updatedWatchlist = [...watchlists, { id: newWatchlistId }];
        const updatedStocks = { ...stocks };
        updatedStocks[newWatchlistId] = [];
        setWatchlists(updatedWatchlist);
        setStocks(updatedStocks);
        setSelectedWatchlist(newWatchlistId);
      }
      console.log(res.data.message);
    }).catch((err) => {
      console.log(err);
    });
  };
  
 
  const handleDeleteStock = (watchlistId, stockId) => {
    // Delete the stock from the backend
    axios.delete('http://192.168.1.13:3000/api/delete-stock', { data: { watchlistId: watchlistId, stockId: stockId } })
      .then((res) => {
        if(res.status === 200){

          // Update the stock deletion in the frontend
          const updatedStocks = { ...stocks };
          updatedStocks[watchlistId] = updatedStocks[watchlistId].filter(stock => stock.id !== stockId);
          setStocks(updatedStocks);
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
        const res = await axios.put('http://192.168.1.13:3000/api/add-stock', { watchlistId, stockId: stock.id });
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
        <StockList
          stocks={stocks}
          selectedWatchlist={selectedWatchlist}
          handleDeleteStock={handleDeleteStock}
          StockList={listOfStocks}
          addStock={addStock}
        />
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
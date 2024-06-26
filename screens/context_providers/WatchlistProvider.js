import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children, user }) => {
  const [watchlists, setWatchlists] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedWatchlists = await AsyncStorage.getItem('watchlist');
        if (storedWatchlists) {
          setWatchlists(JSON.parse(storedWatchlists));
        } else {
          const res = await axios.get(`http://192.168.1.13:3000/api/${user.email}/get-watchlist`);
          if (res.status === 200) {
            const fetchedWatchlists = JSON.parse(res.data.watchlist);
            setWatchlists(fetchedWatchlists);
            await AsyncStorage.setItem('watchlist', JSON.stringify(fetchedWatchlists));
          } else {
            Alert.alert("Unexpected error occurred while fetching watchlists");
          }
        }
      } catch (error) {
        Alert.alert("Unexpected error occurred");
        console.error(error);
      }
    };
    // calling the fetchData function to fetch the data
    fetchData();
  }, [user.email]);

  // useEffect to update the watchlist in the backend everytime the watchlist is updated
  useEffect(()=>{
    updateWatchlists(watchlists);
  }, [watchlists])

  const updateWatchlists = async (newWatchlists) => {
    try {
      await AsyncStorage.setItem('watchlist', JSON.stringify(newWatchlists));
      console.log("Arrived here");
      const res = await axios.post(`http://192.168.1.13:3000/api/${user.email}/update-watchlist`, { watchlist: newWatchlists });
      if (res.status === 200) {
        Alert.alert("Watchlist updated successfully");
      } else {
        Alert.alert("Error occurred while updating watchlist");
      }
    } catch (error) {
      Alert.alert("Error occurred while updating watchlist");
      console.error(error);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlists, setWatchlists, selectedWatchlist, setSelectedWatchlist, updateWatchlists }}>
      {children}
    </WatchlistContext.Provider>
  );
};

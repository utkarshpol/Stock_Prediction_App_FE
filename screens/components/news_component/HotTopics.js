import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import NewsCard from './NewsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HotTopics = ({ currentSection, setCurrentSection }) => {
  const [newsItems, setNewsItems] = useState([]);
  
  useEffect(()=>{
    const getNews = async ()=>{
      const storedNews = await AsyncStorage.getItem('news');
      if(storedNews){
        setNewsItems(JSON.parse(storedNews));
      }
      else{
        axios.get("http://192.168.1.13:3000/api/get-news").then(async (res)=>{
          if(res.status === 200){
            const fetchedNews = JSON.parse(res.data.news);
            setNewsItems(fetchedNews);
            await AsyncStorage.setItem('news', JSON.stringify(fetchedNews));
          }
          else Alert.alert("Some unexpected error occored");
        }).catch((err)=>{
          console.log(err);
          Alert.alert("Some unexpected error occored");
        })
      }
    }

    getNews();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {newsItems.map((item, index) => (
          <NewsCard key={index} heading={item.heading} news={item.news} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    padding: 20,
  },
});

export default HotTopics;

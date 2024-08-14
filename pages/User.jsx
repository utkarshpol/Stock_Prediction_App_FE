import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import UserInfo from '../components/UserInfo';
import NavigationComponent from '../components/NavigationComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import auth from '../firebase.js';
import { useNavigation } from '@react-navigation/native';

export default function User() {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState('Account Info');
  const [token, setToken] = useState();
  const [config, setConfig] = useState();
  const [user, setUser] = useState({username: "Utkarsh", email: 'polutkarsh6@gmail.com'})

  useEffect(()=>{
    const checkUser = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const tok = await AsyncStorage.getItem('cookie');
          setToken(tok);
          setConfig({ headers: { Authorization: `Bearer ${token}` } });
          // setUser({username: user.email.split('@')[0], email: user.email})
        } else {
          auth.signOut();
          await AsyncStorage.clear();
          return navigation.navigate("Login");
        }
      })
    }
    checkUser();

    axios.get('http://192.168.1.13:3000/api/get-info', config).then((res)=>{
      if(res.status === 200){ 
        setUser({username: res.data.username, email: res.data.emailId})
      }
      console.log(res.data.message);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <UserInfo username={user.username} email={user.email} />
      <NavigationComponent currentPage={currentPage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
});

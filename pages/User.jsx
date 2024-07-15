import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import UserInfo from '../components/UserInfo';
import NavigationComponent from '../components/NavigationComponent';
import axios from 'axios';

export default function User() {
  const [currentPage, setCurrentPage] = useState('Account Info');

  let user = {username: "Utkarsh", email: 'polutkarsh6@gmail.com'};

  useEffect(()=>{
    axios.get('http://192.168.1.13:3000/api/get-info').then((res)=>{
      if(res.status === 200){
        user.username = res.data.username;
        user.email = res.data.emailId;
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

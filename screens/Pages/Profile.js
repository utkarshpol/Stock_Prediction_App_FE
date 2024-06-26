import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserData from '../components/user_components/UserData.js';
import Navigation from '../components/common_components/Navigation.js';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({user}) => {

  const navigation = useNavigation();

  const [currentSection, setCurrentSection] = useState('Profile');

  const handleLogout = async () => {
    await auth.signOut();
    await AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{name: "Login"}],
    });
    navigation.navigate("Login");
  };

  const handleChangePassword = () => {
    // Add your change password logic here
  };

  return (
      <View style={styles.container}>
        <UserData
          username={user.email}
          email={user.email}
          onChangePassword={handleChangePassword}
          onLogout={handleLogout}
        />
        <Navigation currentSection={currentSection} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
    paddingTop: 30
  },
});

export default Profile;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserData from '../components/UserData';
import Navigation from '../components/Navigation';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase.js';

const Profile = ({user}) => {

  const navigation = useNavigation();

  const [currentSection, setCurrentSection] = useState('Profile');

  const handleLogout = async () => {
    await auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{name: "Login"}]
    });
    navigation.navigate("Login");
  };

  const handleChangePassword = () => {
    // Add your change password logic here
  };

  return (
      <View style={styles.container}>
        <UserData
          username={user?.email}
          email={user?.email}
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

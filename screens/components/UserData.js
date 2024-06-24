import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const UserData = ({ username, email, onChangePassword, onLogout }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoCard}>
        <MaterialIcons name="account-circle" size={80} color="white" />
        <Text style={styles.userInfoText}>Username: {username}</Text>
        <Text style={styles.userInfoText}>Email: {email}</Text>
      </View>
      <TouchableOpacity style={styles.changePasswordButton} onPress={onChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  userInfoCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  userInfoText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  changePasswordButton: {
    backgroundColor: '#1c1c1c',
    borderRadius: 5,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#1c1c1c',
    borderRadius: 5,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
});

export default UserData;

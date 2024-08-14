import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import auth from '../firebase.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserInfo = ({ username, email }) => {
  const navigation = useNavigation();
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [changeUsernameVisible, setChangeUsernameVisible] = useState(false);

  const logout = async () => {
    auth.signOut();
    await AsyncStorage.clear();
    navigation.navigate("Login");
    alert('User logged out');
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <FontAwesome name="user" size={40} color="#fff" style={styles.icon} />
        <View>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.info}>{username}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <MaterialIcons name="email" size={40} color="#fff" style={styles.icon} />
        <View>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>{email}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setForgotPasswordVisible(true)}>
        <Text style={styles.buttonText}>Forgot Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setChangeUsernameVisible(true)}>
        <Text style={styles.buttonText}>Change Username</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Forgot Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={forgotPasswordVisible}
        onRequestClose={() => setForgotPasswordVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forgot Password</Text>
            <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="#888" />
            <Button title="Submit" onPress={() => setForgotPasswordVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Change Username Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={changeUsernameVisible}
        onRequestClose={() => setChangeUsernameVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Username</Text>
            <TextInput style={styles.input} placeholder="Enter new username" placeholderTextColor="#888" />
            <Button title="Submit" onPress={() => setChangeUsernameVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0B0B0B',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    color: '#888',
    fontSize: 16,
  },
  info: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#e53935',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
  input: {
    backgroundColor: '#444',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
});

export default UserInfo;

import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignin = async () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    if(password.length<8) return Alert.alert("minimum password length must be 8");
    if(password != confirmPassword) return Alert.alert("password not equal to comfirm password");
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    if(user){
      axios.post('http://192.168.1.13:3000/api/create-user',{emailId: email, password: password}).then((res)=>{
        if(res.status === 200) navigation.navigate("Login");
        console.log(res.data.message);
      }).catch((err)=>{
        console.log(err);
      })
    } else {
      Alert.alert("some unexpected error occored");
    }
  };

  const handleGoogleSignin = () => {
    // Handle Google sign-in logic here
    console.log('Sign in with Google');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Please sign up to continue</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleSignin}>
        <Text style={styles.buttonText}>Sign Up with Google</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Already have an account? <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}><Text style={styles.footerLink}>Login</Text></TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#161616',
    color: '#fff',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
  footerLink: {
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
});

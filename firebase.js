import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcBVTkrw8p8MiWWT3lM8ATZ2PDXbFCCew",
  authDomain: "stock-prediction-app-7ebe2.firebaseapp.com",
  projectId: "stock-prediction-app-7ebe2",
  storageBucket: "stock-prediction-app-7ebe2.appspot.com",
  messagingSenderId: "157604039223",
  appId: "1:157604039223:web:28e235142bc96b6f008db2",
  measurementId: "G-7KD34M9324"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default auth;
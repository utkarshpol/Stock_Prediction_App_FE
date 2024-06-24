import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDcBVTkrw8p8MiWWT3lM8ATZ2PDXbFCCew",
    authDomain: "stock-prediction-app-7ebe2.firebaseapp.com",
    projectId: "stock-prediction-app-7ebe2",
    storageBucket: "stock-prediction-app-7ebe2.appspot.com",
    messagingSenderId: "157604039223",
    appId: "1:157604039223:web:28e235142bc96b6f008db2",
    measurementId: "G-7KD34M9324"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login() {
    const navigation = useNavigation();

    const [loading, setLoading] =  useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            AsyncStorage.setItem('user', JSON.stringify(userCred.user));
            Alert.alert("Signin complete");
            navigation.navigate("Watchlist");
        } catch(err) {
            Alert.alert(err.code);
        }
        setLoading(false);
    }

    return (
        <View style={styles.parentContainer}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.input} 
                        placeholder='EMAIL' 
                        placeholderTextColor="#aaa"
                        value={email} 
                        onChangeText={setEmail} 
                        autoCorrect={false}
                        autoCapitalize='none' 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='PASSWORD' 
                        placeholderTextColor="#aaa"
                        secureTextEntry 
                        value={password} 
                        onChangeText={setPassword} 
                        autoCorrect={false}
                        autoCapitalize='none' 
                    />
                </View>
                <View style={styles.rememberView}>
                    <View style={styles.switch}>
                    </View>
                    <View>
                        <Pressable onPress={() => Alert.alert("Forget Password!")}>
                            <Text style={styles.forgetText}>Forgot Password?</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.buttonView}>
                    <Pressable style={styles.button} disabled={loading} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </Pressable>
                </View>
                <Text style={styles.footerText}>
                    Don't Have Account?
                    <Pressable onPress={()=> navigation.navigate("Signup")}><Text style={styles.signup}>  Sign Up</Text></Pressable>
                </Text>
            </SafeAreaView>
        </View>
    );
}

// navigation.navigate("Signup")

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
    container: {
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 40,
        color: "#fff",
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: "#444",
        borderWidth: 1,
        borderRadius: 7,
        color: '#fff',
        backgroundColor: '#333',
    },
    rememberView: {
        width: "100%",
        paddingHorizontal: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8
    },
    switch: {
        flexDirection: "row",
        gap: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    rememberText: {
        fontSize: 13,
        color: '#fff'
    },
    forgetText: {
        fontSize: 11,
        color: "#1e90ff"
    },
    button: {
        backgroundColor: "#1e90ff",
        height: 45,
        borderColor: "#444",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 50
    },
    optionsText: {
        textAlign: "center",
        paddingVertical: 10,
        color: "#aaa",
        fontSize: 13,
        marginBottom: 6
    },
    mediaIcons: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 23
    },
    icons: {
        width: 40,
        height: 40,
    },
    footerText: {
        textAlign: "center",
        color: "#aaa",
    },
    signup: {
        color: "#1e90ff",
        fontSize: 13
    }
});

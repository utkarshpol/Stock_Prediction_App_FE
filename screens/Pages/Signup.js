import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        if(confirmPassword !== password) {
            setLoading(false);
            return Alert.alert("Confirm Password and Password must be same");
        }
        if(password.length < 8) {
            setLoading(false);
            return Alert.alert("The Password must be at least 8 characters");
        }
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCred.user);
            Alert.alert("Verification link sent");
            const credentials = {
                email: email,
                password: password
            }
            axios.post('http://localhost:5000/auth/signup', credentials).then((res) => {
                Alert.alert(res.data.message);
            });
            setLoading(false);
            navigation.navigate('Login'); // Navigate to Login screen after successful signup
        } catch(err) {
            Alert.alert(err.code);
            setLoading(false);
        }
    }

    return (
        <View style={styles.parentContainer}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
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
                    <TextInput 
                        style={styles.input} 
                        placeholder='CONFIRM PASSWORD' 
                        placeholderTextColor="#aaa"
                        secureTextEntry 
                        value={confirmPassword} 
                        onChangeText={setConfirmPassword} 
                        autoCorrect={false}
                        autoCapitalize='none' 
                    />
                </View>
                <View style={styles.buttonView}>
                    <Pressable style={styles.button} disabled={loading} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>
                </View>
                <Text style={styles.footerText}>
                    Already have an account?{' '}
                    <Text style={styles.signup} onPress={() => navigation.navigate('Login')}>Login</Text>
                </Text>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
    container: {
        alignItems: "center",
        paddingTop: 70,
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
    footerText: {
        textAlign: "center",
        color: "#aaa",
        marginTop: 20,
    },
    signup: {
        color: "#1e90ff",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default Signup;

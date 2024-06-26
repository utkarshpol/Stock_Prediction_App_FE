import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProtectedComponent({ children }) {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }]
                    });
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [navigation]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Render children with user prop passed down
    return React.cloneElement(children, { user });
}

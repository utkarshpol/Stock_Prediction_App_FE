import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

export default function ProtectedComponent({ children }) {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                });
                navigation.navigate("Login");
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    return React.cloneElement(children, { user });
}

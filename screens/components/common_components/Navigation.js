import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navigation = ({ currentSection }) => {
    const navigation = useNavigation();
    const onSectionChange = (section) => {
        navigation.navigate(section);
    }

    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => onSectionChange('Watchlist')}>
                <Text style={[styles.menuText, currentSection === 'Watchlist' && styles.activeMenuText]}>Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => onSectionChange('TopNews')}>
                <Text style={[styles.menuText, currentSection === 'TopNews' && styles.activeMenuText]}>Top News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => onSectionChange('TopPicksScreen')}>
                <Text style={[styles.menuText, currentSection === 'TopPicksScreen' && styles.activeMenuText]}>Top Picks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => onSectionChange('Profile')}>
                <Text style={[styles.menuText, currentSection === 'Profile' && styles.activeMenuText]}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
        backgroundColor: '#1c1c1c',
        borderTopWidth: 1,
        borderTopColor: '#333',
        
    },
    menuItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuText: {
        color: '#fff',
        fontSize: 16,
    },
    activeMenuText: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default Navigation;

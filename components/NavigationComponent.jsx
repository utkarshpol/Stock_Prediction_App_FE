import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavigationComponent = ({ currentPage }) => {
  const navigation = useNavigation();

  const navItems = [
    { name: 'Watchlist',nav: 'WatchlistPage', icon: 'watch-later' },
    { name: 'Market Movers',nav: 'TopStocks', icon: 'trending-up' },
    { name: 'Daily Headlines',nav: 'NewsPage', icon: 'article' },
    { name: 'Account Info',nav: 'User', icon: 'account-circle' },
  ];

  const onSectionChange = (section) => {
    navigation.navigate(section);
  };

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.navItem} onPress={() => onSectionChange(item.nav)}>
          <MaterialIcons name={item.icon} size={30} color={currentPage === item.name ? '#bb86fc' : '#888'} />
          <Text style={[styles.navText, { color: currentPage === item.name ? '#bb86fc' : '#888' }]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0B0B0B',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: '#1c1c1e',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
  },
});

export default NavigationComponent;

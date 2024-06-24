// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './screens/Pages/Signup.js';
import Login from './screens/Pages/Login.js';
import StockDetails from './screens/components/StockDetails.js';
import WatchlistScreen from './screens/Pages/WatchlistScreen.js';
import Profile from './screens/Pages/Profile.js';
import TopNews from './screens/Pages/TopNews.js';
import TopPicksScreen from './screens/Pages/TopPicksScreen.js';
import ProtectedComponent from './screens/protected/ProtectedComponent.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Watchlist">
          {props => (
            <ProtectedComponent>
              <WatchlistScreen {...props} />
            </ProtectedComponent>
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {props => (
            <ProtectedComponent>
              <Profile {...props} />
            </ProtectedComponent>
          )}
        </Stack.Screen>
        <Stack.Screen name="TopPicksScreen">
          {props => (
            <ProtectedComponent>
              <TopPicksScreen {...props} />
            </ProtectedComponent>
          )}
        </Stack.Screen>
        <Stack.Screen name="TopNews">
          {props => (
            <ProtectedComponent>
              <TopNews {...props} />
            </ProtectedComponent>
          )}
        </Stack.Screen>
        <Stack.Screen name="StockDetails">
          {props => (
            <ProtectedComponent>
              <StockDetails {...props} />
            </ProtectedComponent>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

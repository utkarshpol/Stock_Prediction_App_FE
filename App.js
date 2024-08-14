import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Signin from './pages/Signin';
import NewsPage from './pages/NewsPage';
import TopStocks from './pages/TopStocks';
import User from './pages/User';
import WatchlistPage from './pages/WatchlistPage';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="NewsPage"
          component={NewsPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="TopStocks"
          component={TopStocks}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="WatchlistPage"
          component={WatchlistPage}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

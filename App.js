import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './homescreen';
import SearchPage from './searchPage';
import WishingCorner from './wishingcorner';
import Main from './main';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={{colors:{background:"#edf2fb"}}}>
      <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={Main} options={{ headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown:true,title:"חיפוש מוצרים"}}/>
        <Stack.Screen name="WishingCorner" component={WishingCorner} options={{ headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
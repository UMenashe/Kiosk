import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './homescreen';
import SearchPage from './searchPage';
import StartScreen from './startscreen';
const Stack = createNativeStackNavigator();
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isIOS ? 
        (
         <Stack.Screen name="StartScreen" component={StartScreen} options={{headerShown:false}} />
        )
        :
        (
          <>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
          <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown:true,title:"חיפוש מוצרים"}}/>
          </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
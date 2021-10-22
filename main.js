import React ,{useState} from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import HomeScreen from './homescreen';
import WishingCorner from './wishingcorner';
import SearchPage from './searchPage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  return (
  <Tab.Navigator labeled={true} initialRouteName="בית"
  activeColor="black"
  
  barStyle={{ backgroundColor: '#ffffff'}}>
    
     <Tab.Screen name="פינת המשאלות" component={WishingCorner} options={{tabBarIcon: ({color,size}) =>(
      <MaterialCommunityIcons name="star-circle-outline" color={color} size={25}/>
    )}}/>
    <Tab.Screen name="חיפוש" component={SearchPage} options={{tabBarIcon: ({color,size}) =>(
      <MaterialCommunityIcons name="magnify" color={color} size={25}/>
    )}}/>
    <Tab.Screen name="בית" component={HomeScreen} options={{tabBarIcon: ({color,size}) =>(
      <MaterialCommunityIcons name="home" color={color} size={25}/>
    )}}/>
    </Tab.Navigator>
  );
}

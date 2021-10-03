import React,{useEffect, useState} from 'react';
import { FlatList,StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import { linear } from 'react-native/Libraries/Animated/src/Easing';
import googleBadge from './assets/google-play-badge.png';
import icon from './assets/icon.png';
export default function StartScreen() {

    return (
      <View style={styles.container}>
        <img style={{borderRadius:100,margin:20}} width="120" height="120" src={icon}></img> 
       <Text style={{fontSize:20,fontWeight:"600",direction:'rtl',textAlign:"center"}}>מוזמנים להוריד את האפליקציה{"\n"} מ- Google play</Text>
       <a href="">
          <img width="277" height="100" src={googleBadge}></img> 
       </a>
       
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
     backgroundColor: "#8BC6EC",
     backgroundImage: linear("135deg", "#8BC6EC 0%", "#9599E2 100%"),
     justifyContent:"space-around",
     alignItems:"center",
     flex:1
    }
  });

import React,{useEffect, useState} from 'react';
import {  StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
export default function MessageItem(props) {
  
    return (
      <View style={styles.container3}>
        <View style={{flexDirection:"column",margin:10}}>
         <Text style={{margin:10,fontWeight:"bold",fontSize:18}}>{props.item.title}</Text>
         <Text style={{fontSize:17}}>{props.item.content}</Text>
        </View>
         <Text style={{marginLeft:20,marginTop:30,alignSelf:"flex-start"}}>{props.item.time}</Text>
      </View>
    )
}
 const styles = StyleSheet.create({
    container3:{
        width:normalize(285),
        height:170,
        margin:5,
        alignSelf:"center",
        borderRadius:20,
        backgroundColor: '#d8f3dc',
       },
});
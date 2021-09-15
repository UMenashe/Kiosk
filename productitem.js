import React,{useEffect, useState} from 'react';
import { Headline } from 'react-native-paper';
import {  StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import productData from './prodactObj.json';
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
export default function ProductItem(props) {
  
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={(e)=> {}}> 
        <View >
        <Image
        style={styles.logo}
        source={{uri:props.pic}}
        />
          <View style={{alignItems:"flex-end",marginRight:30}}>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={{fontSize:17}}>{props.price}₪</Text>
          </View>
          {props.inStock ? <Text style={{fontSize:17,color:"green",marginHorizontal:25}}>במלאי</Text>:
          <Text style={{fontSize:17,color:"red",marginHorizontal:25}}>אזל מהמלאי</Text>
          }
         </View>
        </TouchableOpacity>
    )
}
 const styles = StyleSheet.create({
    container: {
        width:250,
        height:290,
        borderRadius:25,
        backgroundColor: '#ffffff',
        margin:15,
        justifyContent:"center",
        shadowRadius:3,
        shadowOpacity:0.1,
       },
       text:{
           marginVertical:30,
           fontSize:19,
           fontWeight:"bold"
       },logo: {
        alignSelf:"center",
        width: 120,
        height: 140,
      },
});
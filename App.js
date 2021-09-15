import React,{useEffect, useState} from 'react';
import { Headline } from 'react-native-paper';
import {  StyleSheet, Text, View,TouchableOpacity,ImageBackground , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import productData from './prodactObj.json';
import ProductItem from './productitem';
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
export default function Container() {
  
    return (
        <SafeAreaView style={{flex:1,paddingTop: StatusBar.currentHeight,backgroundColor:"#efeff7"}}>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <Headline style={styles.head}>ממתקים</Headline>
        <ScrollView horizontal={true} contentContainerStyle={{paddingBottom: 10}}>
         {productData.product["ממתקים"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        <Headline style={styles.head}>שוקולדים</Headline>
        <ScrollView horizontal={true} contentContainerStyle={{paddingBottom: 10}}>
         {productData.product["שוקולדים"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        <Headline style={styles.head}>חטיפים</Headline>
        <ScrollView horizontal={true} contentContainerStyle={{paddingBottom: 10}}>
         {productData.product["חטיפים"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        <Headline style={styles.head}>שתיה</Headline>
        <ScrollView horizontal={true} contentContainerStyle={{paddingBottom: 10}}>
         {productData.product["שתיה"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        </ScrollView>
        </SafeAreaView>
    )
}
 const styles = StyleSheet.create({
    container: {
        width:150,
        height:150,
        borderRadius:15,
        backgroundColor: '#06d6a0',
        margin:15,
        justifyContent:"center",
        shadowRadius:3,
        shadowOpacity:0.1,
       },
       text:{
         textAlign:"center",
           fontSize:17,
           fontWeight:"bold"
       },
       head:{
        fontSize:25,
        marginTop:60,
        direction:"rtl",
        borderBottomColor: '#d6d6d6',
        fontWeight:"bold",
        borderBottomWidth: 2,
        marginStart:20,
        padding:10
      }
});
import React,{useEffect, useState} from 'react';
import { Headline,Avatar } from 'react-native-paper';
import {  StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';

export default function MessageItem(props) {
  
    return (
      <View style={styles.container3}>
        <View style={{flexDirection:"column",margin:10}}>
         <Headline style={{margin:10,fontWeight:"bold",fontSize:18,textAlign:"right"}}>{props.item.title}</Headline>
         <Text style={{fontSize:17}}>{props.item.content}</Text>
        </View>
         <Text style={{marginTop:20,marginLeft:20}}>{props.item.time}</Text>
      </View>
    )
}
 const styles = StyleSheet.create({
    container3:{
        width:330,
        height:170,
        margin:5,
        borderRadius:20,
        backgroundColor: '#d8f3dc',
       },
});
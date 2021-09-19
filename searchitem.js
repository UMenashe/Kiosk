import React,{useEffect, useState} from 'react';
import { Headline } from 'react-native-paper';
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
export default function SearchItem(props) {
  
    let item = props.item;
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={(e)=> {}}> 
        <View style={{flexDirection:"row-reverse",justifyContent:"space-between",marginHorizontal:10,alignItems:"baseline",direction:"rtl"}}>
        <View>
        <Image
        style={styles.logo}
        source={{uri:item.pic}}
        />
        {item.inStock ? <Text style={{fontSize:17,color:"green",margin:5}}>במלאי</Text>:
          <Text style={{fontSize:17,color:"red",margin:5}}>אזל מהמלאי</Text>
          }  
         </View>
        <View style={{flexDirection:"column"}}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={{fontSize:17,textAlign:"justify"}}>{item.price}₪</Text>
        </View>
         </View>
        </TouchableOpacity>
    )
}
 const styles = StyleSheet.create({
        container:{
         backgroundColor:"#fff",
         width:"100%",
         height:100,
         padding:10,
         marginVertical:1
        },
       text:{
           fontSize:16,
           fontWeight:"bold"
       },logo: {
        width: 50,
        alignSelf:"flex-end",
        height: 50
      },
});
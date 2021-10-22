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
export default function ProductItem(props) {
  
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={(e)=> {}}> 
        <View >
        <Image
        style={styles.logo}
        source={{uri:props.pic}}
        />
          <View style={{flexDirection:"column"}}>
          <Text style={styles.text}>{props.name}</Text>
          <View style={{flexDirection:"row",margin:15,justifyContent:"space-between"}}>
          <Text style={{fontSize:17}}>{props.price}₪</Text>
          {props.inStock ? <Text style={{fontSize:17,color:"green"}}>במלאי</Text>:
          <Text style={{fontSize:17,color:"red"}}>אזל מהמלאי</Text>
          }
          </View>
          </View>
         </View>
        </TouchableOpacity>
    )
}
 const styles = StyleSheet.create({
    container: {
        width:250,
        height:330,
        borderRadius:18,
        backgroundColor: '#fff',
        margin:15,
        justifyContent:"center",
        shadowRadius:6,
        shadowOpacity:0.1,
       },
       text:{
           fontSize:19,
           marginHorizontal:15,
           fontWeight:"bold"
       },logo: {
        alignSelf:"center",
        marginBottom:60,
        width: 150,
        height: 150,
        resizeMode: 'contain',
      },
});
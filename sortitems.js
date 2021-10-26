import React,{useEffect, useState} from 'react';
import {  StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
export default function SortItems(props) {
     let [sum,setSum] = useState(1);
    return (
        <View style={styles.container}>
          <View style={styles.SortView}>
            <Text style={{fontSize:18,fontWeight:"bold"}}>כמה כסף יש לך?</Text>
            <Text style={{fontSize:18}}>{sum}₪</Text>
            <Slider
                style={{width: 220, height: 60}}
                minimumValue={1}
                step={0.5}
                value={sum}
                inverted={true}
                maximumValue={20}
                onValueChange={(v)=>setSum(v.toFixed(1))}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#000000"
            />
            
            <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={(e)=> {props.sort(sum)}}> 
            <Text style={styles.text}>חפש לי</Text>
            </TouchableOpacity> 
          </View>
         
        </View>
    )
}
 const styles = StyleSheet.create({
        container:{
         justifyContent:"center",
         alignItems:"center",
        },
        btn:{
        width:85,
        height:37,
        borderRadius:30,
        backgroundColor: 'green',
        alignSelf:"center",
        justifyContent:"center",
        },
        text:{
            textAlign:"center",
              color:'#fff',
              fontSize:15,
              fontWeight:"bold"
          },
          SortView:{
            backgroundColor:"#fff",
            width:300,
            height:260,
            justifyContent:"space-evenly",
            alignItems:"center",
            borderRadius:20
        }
});
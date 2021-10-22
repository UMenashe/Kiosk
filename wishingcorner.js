import React,{useEffect, useState,useRef} from 'react';
import { FlatList,StyleSheet, Text, View,TouchableOpacity,Animated,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard,Image , SafeAreaView, ScrollView,TextInput,Dimensions, Platform,PixelRatio} from 'react-native';
import firebase from './firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
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
export default function WishingCorner() {
    const [text, SetText] = React.useState("");
    let changeText = (newtext)=>{
        if(checkStr(text) >= 20 && checkStr(text) < checkStr(newtext)){
          return;
        }
      SetText(newtext);
    }
    let sendWish = ()=>{
      if(!text.trim().length){
        return;
      }
      let time = new Date();
      time = `${time.toDateString()},${time.toLocaleTimeString()}`;
      let obj = {wish:text.trim(),timeSend:time};
      console.log(obj);
      firebase.database().ref('Wishings').push(obj);
    }

    let checkStr = (text2)=>{
      let str = text2.split(' ').join('');
      return str.length;
    }

    return (
      <LinearGradient colors={['#ffadad',"#ffd6a5","#bdb2ff","#9bf6ff"]} start={{x:0.1 ,y: 2}} end={{x: 1, y: 0}} style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
      <SafeAreaView style={styles.container}>
        <View style={{borderWidth:2.5,backgroundColor:"#fff",borderStyle:"dotted",padding:10,width:"70%",alignSelf:"center",borderRadius:10}}>
             <Text style={styles.title}>פינת המשאלות</Text>
        </View>
       <Text style={styles.content}>שלחו לנו רעיון למוצר שתרצו לראות בקיוסק</Text>
       <View style={{flexDirection:"column",alignItems:"stretch"}}>
       <Text style={{textAlign:"right",marginHorizontal:40,marginBottom:10}}>{checkStr(text)}/20</Text>
        <TextInput
        style={styles.input}
        onChangeText={(e)=>changeText(e)}
        value={text}
        />
       </View>
       
      <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={(e)=> {sendWish()}}> 
       <View >
         <Text style={styles.text}>שלח הצעה</Text>
        </View>
       </TouchableOpacity>
      </SafeAreaView>
      </TouchableWithoutFeedback>
      </LinearGradient>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 55,
        fontSize:19,
        marginHorizontal:30,
        padding:10,
        borderWidth: 1,
        backgroundColor:"#f6f8fa",
        shadowRadius:4,
        shadowColor:"#000",
        shadowOpacity:0.9,
        borderRadius:15,
      },
    container: {
     justifyContent:"space-evenly",
     flex:1,
    },
    title:{
      textAlign:"center",
      fontSize:30,
      fontWeight:"bold"
    } ,text:{
      textAlign:"center",
        color:'#fff',
        fontSize:17,
        fontWeight:"bold"
    },btn: {
      width:115,
      height:45,
      borderRadius:25,
      backgroundColor: '#000',
      alignSelf:"center",
      justifyContent:"center",
     },content:{
       fontSize:17,
       textAlign:"center",
       direction:"rtl",
       
     }
  });

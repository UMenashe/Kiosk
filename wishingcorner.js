import React,{useEffect, useState} from 'react';
import { FlatList,StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,TextInput,Dimensions, Platform,PixelRatio} from 'react-native';
import firebase from './firebaseConfig';
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
    let [firebaseData,setData] = useState();
    const [text, onChangeText] = React.useState("");

    let sendWish = ()=>{
      console.log(text);
      if(!text.length){
        return;
      }
      firebase.database().ref('Wishings').push(text);
    }
    return (
      <SafeAreaView style={styles.container}>
       <Text style={styles.title}>פינת המשאלות</Text>
       <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={(e)=> {sendWish()}}> 
       <View >
         <Text style={styles.text}>שלח הצעה</Text>
        </View>
       </TouchableOpacity>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 55,
        fontSize:19,
        margin:30,
        padding:10,
        borderWidth: 1,
        backgroundColor:"#f6f8fa",
        shadowRadius:4,
        shadowColor:"#000",
        shadowOpacity:0.9,
        borderRadius:15,
      },
    container: {
     justifyContent:"space-around",
     backgroundColor:"#fff",
     flex:1
    },
    title:{
      textAlign:"center",
      fontSize:30,
      fontWeight:"bold"
    } ,text:{
      textAlign:"center",
        fontSize:17,
        fontWeight:"bold"
    },btn: {
      width:115,
      height:45,
      borderRadius:25,
      backgroundColor: '#f4b860',
      alignSelf:"center",
      justifyContent:"center",
     }
  });

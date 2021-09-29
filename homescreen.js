import React,{useEffect, useState,useRef} from 'react';
import { Headline,Searchbar,IconButton,Avatar  } from 'react-native-paper';
import {  StyleSheet, Text, View,TouchableOpacity,ImageBackground , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import firebase from './firebaseConfig';
import ProductItem from './productitem';
import MessageItem from './messageitem';
import image from './assets/splash.png';

export default function HomeScreen({navigation }) {

  const [MessageActive,setMessageActive] = useState(0);
  let [firebaseData,setData] = useState();

  let getHour = ()=>{
    let txt = "";
    let date = new Date();
    date = date.getHours();
    if(date < 12){
     txt = "בוקר טוב";
    }else if (date >= 12 && date <= 17){
      txt = "צהריים טובים";
    } else if (date >= 18 && date <= 24){
      txt = "ערב טוב"
    }else{
      txt = "לילה טוב";
    }
    return txt;
    }

    let onChange = (nativeEvent)=>{
     if(nativeEvent){
     const slide =  Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
     if(slide != MessageActive){
       setMessageActive(slide);
     }
     }
    }

    let getData = (data)=>{
      setData(data.val());
    }
    let errData = (err)=>{
     console.log(err);
    }

    useEffect(()=>{
        firebase.database().ref(`/`).on('value',getData,errData);
    },[]);

    return (
        <SafeAreaView style={{flex:1,paddingTop: StatusBar.currentHeight,backgroundColor:"#edf2fb"}}>
          {firebaseData ? 
            <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <View style={{width:"100%",height:200,backgroundColor:"#000",justifyContent:"center",backgroundColor:"#edf2fb",marginTop:80}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",margin:20,direction:"rtl"}}>
            <Headline style={styles.head2}>היי, {getHour()}</Headline>
            <IconButton
              icon="magnify"
              color="#000"
              style={{backgroundColor:"#fff",borderRadius:10}}
              size={26}
              onPress={()=>{navigation.push("SearchPage")}}
            /> 
            </View>
          
        <View style={styles.container2}>
          {firebaseData.messages.length === 0 ?
          <View style={styles.container3}>
          <View style={{alignItems:"center"}}><Avatar.Icon color="black" style={{backgroundColor:"#f2f2f2"}} size={45} icon="message-bulleted-off" />
          <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold"}}>אין הודעות</Text>
         </View>
          </View>
          :
          <View>
            <ScrollView showsHorizontalScrollIndicator={false} 
          onScroll={({nativeEvent}) => onChange(nativeEvent)}
          scrollEventThrottle={0.1}
          pagingEnabled
          horizontal
          >
          {firebaseData.messages.map((item,id)=>{
            return <MessageItem key={id}  item={item}></MessageItem>
            })}
            
          </ScrollView>
          <View style={styles.warpDot}>
          {
           firebaseData.messages.map((e,index)=>{
           return <Text key={index} style={MessageActive === index ? styles.dotActive : styles.dot}>●</Text>
           })}
         </View>
          </View>
          }  
        </View>
        
        </View>
        <Headline style={styles.head}>ממתקים</Headline>
        <ScrollView style={{direction:"rtl"}} showsHorizontalScrollIndicator={false}  horizontal={true} contentContainerStyle={{paddingBottom: 5}}>
         {firebaseData.product["ממתקים"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        <Headline style={styles.head}>שוקולדים</Headline>
        <ScrollView style={{direction:"rtl"}} showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{paddingBottom: 5}}>
         {firebaseData.product["שוקולדים"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        <Headline style={styles.head}>חטיפים</Headline>
        <ScrollView style={{direction:"rtl"}} showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{paddingBottom: 5}}>
         {firebaseData.product["חטיפים"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        <Headline style={styles.head}>שתיה</Headline>
        <ScrollView style={{direction:"rtl"}} showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{paddingBottom: 5}}>
         {firebaseData.product["שתיה"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        </ScrollView>
          :<View style={{backgroundColor:"#000"}}>
            <ImageBackground source={image} resizeMode="cover" style={{width:"100%",height:"100%"}}>
            </ImageBackground>
          </View>
        }
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
       container2: {
        width:"90%",
        position:"relative",
        height:180,
        borderRadius:20,
        backgroundColor: '#00000014',
        margin:10,
        alignSelf:"center",
        justifyContent:"center",
        shadowRadius:3,
        shadowOpacity:0.1,
       },
       container3:{
        width:285,
        height:170,
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:20,
        backgroundColor: '#d8f3dc',
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
        textAlign:"right",
        fontWeight:"bold",
        marginStart:30,
        padding:10
      },
      head2:{
        fontSize:26,
        direction:"rtl",
        fontWeight:"bold",
      },
      warpDot:{
        position:"absolute",
        bottom:0,
        flexDirection:"row",
        alignSelf:"center"
      },
      dot:{
        margin:3,
        color:"white"
      },
      dotActive:{
        margin:3,
        color:"#888"
      }
});
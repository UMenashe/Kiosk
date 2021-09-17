import React,{useEffect, useState} from 'react';
import { Headline,Searchbar,IconButton,Avatar  } from 'react-native-paper';
import {  StyleSheet, Text, View,TouchableOpacity,ImageBackground , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import productData from './prodactObj.json';
import ProductItem from './productitem';
import MessageItem from './messageitem';
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
  
  const [searchQuery, setSearchQuery] = useState('');
  const [MessageActive,setMessageActive] = useState(0);

  const onChangeSearch = query => setSearchQuery(query);

  let getHour = ()=>{
    let txt = "";
    let date = new Date();
    console.log(date.getHours());
    if(date >= 5 && date <= 11){
     txt = "בוקר טוב"
    }else if (date >= 12){
      txt = "צהריים טובים"
    }else if (date >= 17 && date <= 23){
      txt = "ערב טוב"
    }else if (date >= 0 && date <=4){
     txt = "לילה טוב"
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

    return (
        <SafeAreaView style={{flex:1,paddingTop: StatusBar.currentHeight,backgroundColor:"#edf2fb"}}>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <View style={{width:"100%",height:200,backgroundColor:"#000",justifyContent:"center",backgroundColor:"#edf2fb",marginTop:80}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",margin:20}}>
            <IconButton
              icon="magnify"
              color="#000"
              style={{backgroundColor:"#fff",borderRadius:10}}
              size={24}
              onPress={()=>{}}
            /> 
             <Headline style={styles.head2}>היי, {getHour()}</Headline>
            </View>
          
           {/* <Searchbar
          style={{margin:25,borderRadius:25,justifyContent:"center"}}
          iconColor="green"
          inputStyle={{textAlign:"right"}}
          placeholder="חפש מוצרים"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />  */}
        <View style={styles.container2}>
          {productData.messages.length === 0 ?
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
          {productData.messages.map((item,id)=>{
            return <MessageItem key={id}  item={item}></MessageItem>
            })}
            
          </ScrollView>
          <View style={styles.warpDot}>
          {
           productData.messages.map((e,index)=>{
           return <Text key={index} style={MessageActive === index ? styles.dotActive : styles.dot}>●</Text>
           })}
         </View>
          </View>
          }  
        </View>
        
        </View>
        <Headline style={styles.head}>ממתקים</Headline>
        <ScrollView showsHorizontalScrollIndicator={false}  horizontal={true} contentContainerStyle={{paddingBottom: 5}}>
         {productData.product["ממתקים"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        <Headline style={styles.head}>שוקולדים</Headline>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{paddingBottom: 5}}>
         {productData.product["שוקולדים"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        <Headline style={styles.head}>חטיפים</Headline>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{paddingBottom: 5}}>
         {productData.product["חטיפים"].map((item)=>{
         return <ProductItem key={item.id} name={item.name} pic={item.pic} price={item.price} inStock={item.inStock}></ProductItem>
         }
         )}
        </ScrollView>
        <Headline style={styles.head}>שתיה</Headline>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{paddingBottom: 5}}>
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
       container2: {
        width:normalize(295),
        height:180,
        borderRadius:20,
        backgroundColor: '#00000014',
        margin:15,
        justifyContent:"center",
        shadowRadius:3,
        shadowOpacity:0.1,
       },
       container3:{
        width:normalize(285),
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
        borderBottomColor: '#d6d6d6',
        fontWeight:"bold",
        borderBottomWidth: 2,
        marginStart:20,
        padding:10
      },
      head2:{
        fontSize:26,
        direction:"rtl",
        borderBottomColor: '#d6d6d6',
        fontWeight:"bold",
        borderBottomWidth: 2,
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
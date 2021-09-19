import React,{useEffect, useState} from 'react';
import { Headline,Searchbar,IconButton,Avatar  } from 'react-native-paper';
import { FlatList,StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import productData from './prodactObj.json';
import SearchItem from './searchitem';
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
export default function SearchPage() {
  
    const [searchQuery, setSearchQuery] = useState('');
    let [datafound,setFound] = useState([]);
    let [allProduct,setAllProduct] = useState([]);

    const onChangeSearch = query => {
        let arr = [];
        if(allProduct.length != 0){
            for(let item of allProduct){
                if(item["name"].search(query) != -1){
                    arr.push(item);
                }
            }
            setFound(arr);
        }
    };

    useEffect(()=>{
        console.log("test");
        let val = Object.values(productData.product);
        let newArr = [];
        for(let i in val){
            for(let x of val[i]){
                newArr.push(x);
            }
        }
        setAllProduct(newArr);
    },[])
    return (
      <View>
       <Searchbar
          style={{margin:25,borderRadius:25,justifyContent:"center"}}
          iconColor="green"
          inputStyle={{textAlign:"right"}}
          placeholder="חפש מוצר"
          onChangeText={onChangeSearch}
        /> 
        <FlatList
        style={{marginBottom:100,padding:2}}
        data={datafound}
        renderItem={({item,index}) => <SearchItem key={index} item={item}></SearchItem>}
      />
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
     paddingTop: 22
    }
  });

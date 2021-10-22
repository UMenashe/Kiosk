import React,{useEffect, useState} from 'react';
import { Headline,Searchbar,IconButton,Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList,StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import firebase from './firebaseConfig';
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
    let [firebaseData,setData] = useState();

    const onChangeSearch = query => {
      setSearchQuery(query);
      if(!query.length){
        setFound([]);
        return;
      }
          
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

    let getData = (data)=>{
      setData(data.val());
    }
    let errData = (err)=>{
     console.log(err);
    }

    useEffect(()=>{
      if(!firebaseData){
        firebase.database().ref(`/`).on('value',getData,errData);
      }else{
         let val = Object.values(firebaseData.product);
        let newArr = [];
        for(let i in val){
            for(let x of val[i]){
                newArr.push(x);
            }
        }
        setAllProduct(newArr);
      }
    },[firebaseData])
    return (
      <View>
       <Searchbar
          style={{margin:25,marginTop:50,borderRadius:25,justifyContent:"center"}}
          iconColor="green"
          inputStyle={{textAlign:"right"}}
          placeholder="חפש מוצר"
          onChangeText={onChangeSearch}
        />
        {datafound.length === 0 && searchQuery.length > 0 ?
        <View style={{alignItems:"center",justifyContent:"center",marginVertical:20}}>
          <MaterialCommunityIcons  name="magnify-close" color="#ef233c" size={29}/>
          <Text style={{fontWeight:"bold",fontSize:19,marginHorizontal:5}}>לא נמצאו מוצרים</Text>
          
        </View>
        :
        <FlatList
        style={{marginBottom:120,padding:2}}
        data={datafound}
        renderItem={({item,index}) => <SearchItem key={index} item={item}></SearchItem>}
      />
        } 
        
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
     paddingTop: 22
    }
  });

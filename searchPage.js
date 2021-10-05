import React,{useEffect, useState} from 'react';
import { Headline,Searchbar,IconButton,Avatar  } from 'react-native-paper';
import { FlatList,StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import firebase from './firebaseConfig';
import SearchItem from './searchitem';

export default function SearchPage() {
  
    const [searchQuery, setSearchQuery] = useState('');
    let [datafound,setFound] = useState([]);
    let [allProduct,setAllProduct] = useState([]);
    let [firebaseData,setData] = useState();

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
          style={{margin:25,borderRadius:25,justifyContent:"center"}}
          iconColor="green"
          inputStyle={{textAlign:"right",outline:"none"}}
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

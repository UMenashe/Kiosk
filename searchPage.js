import React,{useEffect, useState} from 'react';
import { Headline,Searchbar,IconButton,Avatar,Chip} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList,StyleSheet, Text, View,TouchableOpacity,Image , SafeAreaView, ScrollView,StatusBar,Dimensions, Platform,PixelRatio} from 'react-native';
import firebase from './firebaseConfig';
import SearchItem from './searchitem';
import SortItems from './sortitems';
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
    let [sum,setSum] = useState(1);
    let [shouldSort,SetSort] = useState(false);
    let [select,setSelect] = useState(false);
    let [placeholderTxt,setTxt] = useState("חפש מוצר");
    let [rotate,setRotate] = useState(true);
    const onChangeSearch = query => {
      if(select)
        return;
      setSearchQuery(query);
      buildArr(query,false);
    };

    let buildArr = (query,sort)=>{
      if(sort){
        setFound(allProduct);
        return;
      }
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
    }

   let onSort = (newSum)=>{
     setSum(newSum);
     SetSort(true);
     buildArr(searchQuery,true);
     setTxt(`מסנן מוצרים עד ${newSum} שקל`);
     setSelect(true);
    }

    let changeSort = ()=>{
      setSelect(!select);
      SetSort(!shouldSort);
      if(select){
        setFound([]);
        setTxt("חפש מוצר");
      }
    }
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
    },[firebaseData]);
    
    return (
      <View>
       <Searchbar
          style={{margin:25,marginTop:50,borderRadius:25,justifyContent:"center"}}
          iconColor="green"
          inputStyle={{textAlign:"right"}}
          placeholder={placeholderTxt}
          onFocus={()=>setRotate(false)}
          onChangeText={onChangeSearch}
        />
        {shouldSort ?
        <Chip selected={select} mode="outlined" selectedColor="green" style={{width:110,backgroundColor:"#fff",alignSelf:"center",marginBottom:10}} onPress={changeSort}><Text style={{fontSize:15}}>סינון מחיר</Text></Chip>
         :
         null
        }

        {datafound.length === 0 && searchQuery.length > 0 ?
        <View style={{alignItems:"center",justifyContent:"center",marginVertical:20}}>
          <MaterialCommunityIcons  name="magnify-close" color="#ef233c" size={29}/>
          <Text style={{fontWeight:"bold",fontSize:19,marginHorizontal:5}}>לא נמצאו מוצרים</Text>
        </View>
        :
        <>
        {shouldSort ?
        <FlatList
                style={{marginBottom:170,padding:2}}
                data={datafound}
                initialNumToRender={datafound.length}
                renderItem={({item,index}) => {return Number(item.price) <= sum ? <SearchItem key={item.id} item={item}></SearchItem> : null}}
              />
              :
         <FlatList
                style={{marginBottom:120,padding:2}}
                data={datafound}
                renderItem={({item,index}) => <SearchItem key={item.id} item={item}></SearchItem>}
              />     
        }
       {datafound.length === 0 && !shouldSort?
         <SortItems rotate={rotate} sort={onSort}></SortItems>
         :
         null
       }
      
      </>
        } 
        
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
     paddingTop: 22
    }
  });

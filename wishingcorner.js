import React,{useEffect, useState,useRef} from 'react';
import { FlatList,StyleSheet, Text, View,TouchableOpacity,Animated,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard,Image , SafeAreaView, ScrollView,TextInput,Dimensions, Platform,PixelRatio,Modal} from 'react-native';
import firebase from './firebaseConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import {Snackbar } from 'react-native-paper';

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
    const [visible, setVisible] = React.useState(false);
    let [snackText,setSnack] = useState({text:"",showBtn:false});
    const [modalVisible, setModalVisible] = useState(false);
    let input = useRef();
    let changeText = (newtext)=>{
        if(checkStr(text) >= 25 && checkStr(text) < checkStr(newtext)){
          return;
        }
      SetText(newtext);
    }

    let showSnackbar = (newText,display)=>{
      setSnack({text:newText,showBtn:display});
      setVisible(true);
    }
    let sendWish = ()=>{
      if(!text.trim().length){
        showSnackbar("הכנס טקסט",true);
        return;
      }
      let time = new Date();
      time = `${time.toDateString()},${time.toLocaleTimeString()}`;
      let obj = {wish:text.trim(),timeSend:time};
      console.log(obj);
      firebase.database().ref('Wishings').push(obj).then(()=>{
        setModalVisible(true);
        setTimeout(()=>{
        setModalVisible(false);
        SetText("");
        },3000);
      }).catch((error)=>{
        showSnackbar("אירעה שגיאה בשליחה, נסה שנית!",false);
      });
      
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
       <Text style={styles.content}>כתבו לנו בכמה מילים רעיון למוצר שאתם רוצים, ואולי תזכו לראות אותו בקיוסק!</Text>
       <View style={{flexDirection:"column",alignItems:"stretch"}}>
       <Text style={{textAlign:"right",marginHorizontal:40,marginBottom:10}}>{checkStr(text)}/25</Text>
        <TextInput
        ref={input}
        style={styles.input}
        onChangeText={(e)=>changeText(e)}
        value={text}
        />
       </View>
       
      <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={(e)=> {sendWish()}}> 
       <View style={{flexDirection:"row-reverse"}}>
       <MaterialCommunityIcons style={{marginHorizontal:7,transform: [{ scaleX:  -1 }]}} name="send" color="#fff" size={22}/>
         <Text style={styles.text}>שלח משאלה</Text>
        </View>
       </TouchableOpacity>
       <Snackbar
        visible={visible}
        style={{borderRadius:10,marginHorizontal:40,justifyContent:"center"}}
        duration={4000}
        onDismiss={()=>{setVisible(false)}}
        action={snackText.showBtn ?{
          label: 'אוקיי',
          labelStyle:{fontWeight:"bold"},
          onPress: () => {
            input.current.focus();
          },
        }:{}}
        >
          <Text style={{textAlign:"right",fontWeight:"bold"}}>{snackText.text}</Text>
      </Snackbar>
      <Modal
        animationType="slide"
        transparent={true}
        onDismiss={()=>{setModalVisible(false)}}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
       <View style={styles.centeredView}>
       <View style={styles.modalView}>
         <Text style={{fontSize:18,fontWeight:"bold"}}>המשאלה שלך נשלחה!</Text>
         <MaterialCommunityIcons style={{textAlign:"center",margin:20}} name="comment-check-outline" color="#38b000" size={60}/>
       </View>
       </View>
      </Modal>
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
      width:150,
      height:44,
      borderRadius:25,
      backgroundColor: '#1f1f1f',
      alignSelf:"center",
      justifyContent:"center",
     },content:{
       fontSize:18,
       color:"#000",
       margin:10,
       textAlign:"center",
       direction:"rtl",
       
     },centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding:40,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },btn2: {
      width:80,
      height:34,
      borderRadius:7,
      backgroundColor: '#000',
      alignSelf:"center",
      justifyContent:"center",
     },text2:{
      textAlign:"center",
      color:'#fff',
      fontSize:16,
      fontWeight:"bold"
     }
  });

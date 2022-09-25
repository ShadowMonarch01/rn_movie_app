import { StyleSheet, Text, View, Image } from 'react-native'
import React,{useEffect, useContext,useState} from 'react';
import { AuthContext } from '../../theauth/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {

  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const {actType,setActType,actDuration,duserName,dEmail} = useContext(AuthContext)
  const Pic = require('../imgs/avatar.jpg')
  useEffect(()=>{
    getData()

    if(actDuration){
      setActType('Paid')
    }else{
      setActType('Free')
    }
  },[actDuration])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('duserName')
      const ids = await AsyncStorage.getItem('dEmail')
      // const abt = await AsyncStorage.getItem('about')
      // const fne = await AsyncStorage.getItem('phone')
      // const pic = await AsyncStorage.getItem('propic')
      if(value !== null) {
        // value previously stored
        setUserName(value)
      }
      if(ids !== null) {
        // value previously stored
        setEmail(ids)
      }
      
      
    } catch(e) {
      // error reading value
    }
  }



  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <View style={{marginTop:8}}>
        <Image
            source={Pic}
            resizeMode={'stretch'}
            style={{ height: 180,width:180, borderRadius: 300,margin:5,alignSelf:'center',aspectRatio:1}}
          />
      </View>
      
      <View style={{flexDirection:'row', marginTop:20}}>
        <Text style={styles.text}>Name: </Text>
        {/* <Text style={styles.text}>Developer</Text> */}
        <Text style={styles.text}>{userName}</Text>
      </View>

      <View style={{flexDirection:'row', marginTop:40}}>
        <Text style={styles.text}>Email: </Text>
        {/* <Text style={styles.text}>developer@gmail.com</Text> */}
        <Text style={styles.text}>{email}</Text>
      </View>

      <View style={{flexDirection:'row', marginTop:40}}>
        <Text style={styles.text}>AccountType: </Text>
        <Text style={styles.text}>{actType}</Text>
      </View>

      <View style={{flexDirection:'row', marginTop:40}}>
        <Text style={styles.text}>Duration: </Text>
        <Text style={styles.text}>{actDuration}</Text>
      </View>

    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        // justifyContent:'center',
        backgroundColor:'black'
    },
    text:{
      color:'white',
      fontSize:24
    }
})
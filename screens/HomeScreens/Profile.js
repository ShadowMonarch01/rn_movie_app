import { StyleSheet, Text, View, Image } from 'react-native'
import React,{useEffect, useContext} from 'react';
import { AuthContext } from '../../theauth/context';

const Profile = () => {

  const {actType,setActType,actDuration,duserName,dEmail} = useContext(AuthContext)
  const Pic = require('../imgs/FB_IMG_3.jpg')
  useEffect(()=>{
    if(actDuration){
      setActType('Paid')
    }else{
      setActType('Free')
    }
  },[actDuration])
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
        <Text style={styles.text}>{duserName}</Text>
      </View>

      <View style={{flexDirection:'row', marginTop:40}}>
        <Text style={styles.text}>Email: </Text>
        {/* <Text style={styles.text}>developer@gmail.com</Text> */}
        <Text style={styles.text}>{dEmail}</Text>
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
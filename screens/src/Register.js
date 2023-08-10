import React, {useState,useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import  Icon  from 'react-native-vector-icons/Ionicons';

// import { windowWidth, windowHeight } from '../components/Dimensions';
import { AuthContext } from '../../theauth/context';

import { api } from '../data';

const Register = ({navigation}) => {
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [conPassword,setConPassword] = useState('');

  const [pIcon,setPIcon] = useState(true);

  const [conIcon,setConIcon] = useState(true);

  const {signIn,setDuserName,setDemail,setAdmStats,setAuthFavorites_id,setUser_id} = useContext(AuthContext)



  const handleSubmitPress = async () => {
    // setMerror('')
    // setErrortext('');
    

    if (!userName) {
      alert('Please enter a UserName');
      return;
    }

    if (!email) {
      alert('Please enter your Email');
      return;
    }
    if (!password) {
      alert('Please enter a Password');
      return;
    }

    if (password !== conPassword) {
      alert('Please confirm your password');
      return;
    }
    //setLoading(true);
  //   var dataToSend = {
  //     email: email,
  //     password: password,
  //   };
  //   setSta({isVis: true})
    fetch(`${api}/register`, {
      method: 'POST',
      headers: {
        //Header Defination
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name":userName
      })
    })
      .then((response) => response.json())
      .then((response) => {
        //Hide Loader
        //setLoading(false);
        console.log(response);
        // If server response message same as Data Matched
        if (response.status === 'success') {
          setDemail(response.email)
          setDuserName(response.name)
          setUser_id(response.user_id)
          setAdmStats(response.adm)
          setAuthFavorites_id(response.favories_id)

          AsyncStorage.setItem('user_id', response.user_id)
          AsyncStorage.setItem('token', response.status)
          AsyncStorage.setItem('duserName', response.name)
        //  AsyncStorage.setItem('propic', response.propic)
          AsyncStorage.setItem('dEmail', response.email)
          AsyncStorage.setItem('authFavorites_id', response.favories_id)
          AsyncStorage.setItem('admStats', response.adm)


          // "status": 'success',
          //   "name": name,
          //   "email": email,
          //   "favories_id":str(favorite_id),
          //   "user_id": str(user_id),
          //   "adm": '',
          //   "profilepic": ''




          //AsyncStorage.setItem('user_id', responseJson.data.email);
          // console.log(response.name);
          
          //  AsyncStorage.setItem('id', response.id)
          //  AsyncStorage.setItem('token', response.token)
          //  AsyncStorage.setItem('name', response.name)
          //  AsyncStorage.setItem('propic', response.propic)
          //  AsyncStorage.setItem('about', response.about)
          //  AsyncStorage.setItem('phone', response.phone)
          //  AsyncStorage.setItem('adm', response.adm)
          // setSta({isVis: false})
          //navigation.navigate('ElHome');
          signIn()
        } else {
          // setErrortext(response.msg);
          // setSta({isVis: false})
          // setMerror(response.msg)
          alert(response.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        // setSta({isVis: false})
        //Hide Loader
        //setLoading(false);
        console.error(error);
        
      });
  };


  
  return (
    <View style={styles.container}>
      <Image source={require('../imgs/LOGO1.png')} style={{ marginTop:20, height:100, width:100}}/>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:44}}>
          <Icon name="person-sharp" size={25} color={'#C0C0C0'}/>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          onChangeText={(UserName) => setUserName(UserName)}
          placeholder="User name"
          placeholderTextColor="#C0C0C0"
          value={userName}
          /> 
      </View>

      <View style={{flexDirection:'row'}}> 
        <TouchableOpacity style={{marginTop:44}}>
          <Icon name={"mail"} size={25} color={'#C0C0C0'}/>
        </TouchableOpacity>  
        <TextInput
          style={styles.input}
          onChangeText={(Email) => setEmail(Email)}
          value={email}
          placeholder="Email Address"
          keyboardType="email-address"
          placeholderTextColor="#C0C0C0"
        />
        </View>

      <View style={{flexDirection:'row'}}>  
        <TouchableOpacity style={{marginTop:44}}
          // onPress={()=>{setPword(!pword)}}
          onPress={()=>setPIcon(!pIcon)}
          >
          <Icon name={pIcon ?"eye-off":"eye-sharp"} size={25} color={'#C0C0C0'}/>
        </TouchableOpacity> 
            <TextInput
              style={styles.input}
              onChangeText={(Password) => setPassword(Password)}
              value={password}

              // secureTextEntry={pword}
              secureTextEntry={pIcon}
              placeholder="Password"
              placeholderTextColor="#C0C0C0"
              //keyboardType="numeric"
            />
        </View>
      
      <View style ={{flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:44}}
          onPress={()=>setConIcon(!conIcon)}
        >
          <Icon name={conIcon ?"eye-off":"eye-sharp"} size={25} color={'#C0C0C0'}/>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          placeholderTextColor="#C0C0C0"
          value={conPassword}
          secureTextEntry={conIcon}
          onChangeText={(Password) => setConPassword(Password)}
        />
      </View>

      <TouchableOpacity style={styles.btn}
        onPress={()=>handleSubmitPress()}
      >
        <Text style={{fontSize:18}}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login}
        onPress={()=>navigation.navigate('SignIn')}
      >
        <Text style={{fontSize:16,color:"#C0C0C0"}}>LOGIN</Text>
      </TouchableOpacity>
      

      

    </View>
  )
}

export default Register;

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:`-webkit-gradient(to bottom, ${color1} 5%,${color2})`
        // backgroundColor:'rgb(2,50,10)',
        backgroundColor:'black',
        // backgroundColor:`linear-gradient(#e66465, #9198e5)`
        alignItems:'center',
        paddingLeft:'6%',
        paddingRight:'6%',
        // paddingLeft:20,
        // paddingRight:20
    },
    input: {
      height: 40,
      marginTop:30,
      marginBottom:6,
      margin: 12,
      borderWidth: 0,
      borderBottomWidth:1,
      borderBottomColor:'#a9a9a9',
      padding: 20,
      paddingBottom:2,
      width:"80%",
      fontSize:18,
      // width:windowWidth/1.5,
      color:"#FFFFFF",
      
    },

    input1: {
      height: 40,
      marginTop:30,
      marginBottom:6,
      margin: 12,
      borderWidth: 0,
      borderBottomWidth:1,
      borderBottomColor:'#a9a9a9',
      padding: 20,
      width:"80%",
      // width:windowWidth/1.5,
      color:"#FFFFFF",
      
    },
    btn:{
      marginTop:'26%',
      backgroundColor:'#a9a9a9',
      height: 40,
      // width:windowHeight/2,
      width:'50%',
      // padding: 20,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
    },
    login:{
      marginTop:30,
    }
})
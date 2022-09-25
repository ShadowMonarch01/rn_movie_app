import React, {useState,useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import  Icon  from 'react-native-vector-icons/Ionicons';

// import { windowWidth, windowHeight } from '../components/Dimensions';
import { AuthContext } from '../../theauth/context';


const Login = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [pIcon,setPIcon] = useState(true);

    const {signIn,setDuserName,setDemail,setAdmStats,setAuthFavorites_id,setUser_id} = useContext(AuthContext);


    const handleSubmitPress = async () => {
        // setMerror('')
        // setErrortext('');
        if (!email) {
          alert('Please enter your Email');
          return;
        }
        if (!password) {
          alert('Please enter your Password');
          return;
        }
        //setLoading(true);
        // var dataToSend = {
        //   email: email,
        //   password: password,
        // };
        // setSta({isVis: true})
        fetch('http://rnflaskmongoapi-env.eba-xpzve2yf.us-east-1.elasticbeanstalk.com/login', {
          method: 'POST',
          headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            "email": email,
            "password": password
          })
        })
          .then((response) => response.json())
          .then((response) => {
            //Hide Loader
            //setLoading(false);
            console.log(response);
            // If server response message same as Data Matched
            if (response.status === 'success') {
              //AsyncStorage.setItem('user_id', responseJson.data.email);
              console.log(response.name);
              setDemail(response.info.email)
              setDuserName(response.info.name)
              setUser_id(response.info._id)
              setAdmStats(response.info.adm)
              setAuthFavorites_id(response.info.favories_id)
              
               AsyncStorage.setItem('user_id', response.info._id)
               AsyncStorage.setItem('token', response.status)
               AsyncStorage.setItem('duserName', response.info.name)
              //  AsyncStorage.setItem('propic', response.propic)
               AsyncStorage.setItem('dEmail', response.info.email)
               AsyncStorage.setItem('authFavorites_id', response.info.favories_id)
               AsyncStorage.setItem('admStats', response.info.adm)
              // setSta({isVis: false})
              //navigation.navigate('ElHome');
              signIn()
            } else {
              // setErrortext(response.msg);
              // setSta({isVis: false})
              // setMerror(response.msg)
              alert(response.msg);
              console.log('Please check your email id or password');
              console.log(response.msg)
            }
          })
          .catch((error) => {
            // setSta({isVis: false})
            //Hide Loader
            //setLoading(false);
            console.error(error);
            
          });
      };
    const padlogin = ()=>{

    }  
  
  return (
    <View style={styles.container}>
      <Image source={require('../imgs/LOGO1.png')} style={{ marginTop:20, height:100, width:100}}/>

      <View style={{flexDirection:'row', marginTop:80}}> 
        <TouchableOpacity style={{marginTop:35}}>
          <Icon name={"mail"} size={25} color={'#C0C0C0'}/>
        </TouchableOpacity>  
        <TextInput
          style={styles.input}
          onChangeText={(Email) => setEmail(Email)}
          //value={number}
          placeholder="Email Address"
          keyboardType="email-address"
          placeholderTextColor="#C0C0C0"
        />
        </View>

      <View style={{flexDirection:'row',marginTop:24}}>  
        <TouchableOpacity style={{marginTop:35}}
          onPress={()=>setPIcon(!pIcon)}
          >
          <Icon name={pIcon ?"eye-off":"eye-sharp"} size={25} color={'#C0C0C0'}/>
        </TouchableOpacity> 
            <TextInput
              style={styles.input}
              onChangeText={(Password) => setPassword(Password)}
              //value={number}

              // secureTextEntry={pword}
              secureTextEntry={pIcon}
              placeholder="Password"
              placeholderTextColor="#C0C0C0"
              //keyboardType="numeric"
            />
        </View>

      <TouchableOpacity style={styles.btn}
        onPress={()=>handleSubmitPress()}
      >
        <Text style={{fontSize:18}}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login}
        onPress={()=>navigation.navigate('SignUp')}
      >
        <Text style={{fontSize:16,color:"#C0C0C0"}}>SIGN UP</Text>
      </TouchableOpacity>
      

      

    </View>
  )
}

export default Login;

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
      marginTop:20,
      marginBottom:6,
      margin: 12,
      borderWidth: 0,
      borderBottomWidth:1,
      borderBottomColor:'#a9a9a9',
      padding: 20,
      paddingBottom:2,
      width:"80%",
      // width:windowWidth/1.5,
      color:"#FFFFFF",
      
      
    },

    input1: {
      height: 40,
      marginTop:20,
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
      marginTop:'24%',
      backgroundColor:'#a9a9a9',
      height: 40,
      // width:windowHeight/2,
      width:'50%',
      // padding: 20,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
    },
    login:{
      marginTop:40,
    }
})
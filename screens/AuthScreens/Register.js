import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState,useContext} from 'react';

import  Icon  from 'react-native-vector-icons/Ionicons';

import { windowWidth, windowHeight } from '../components/Dimensions';
import { AuthContext } from '../../theauth/context';


const Register = ({navigation}) => {
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {signIn,setDuserName,setDemail,setAdmStats} = useContext(AuthContext)



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
    //setLoading(true);
  //   var dataToSend = {
  //     email: email,
  //     password: password,
  //   };
  //   setSta({isVis: true})
    fetch('http://127.0.0.1:5000/register', {
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
          //AsyncStorage.setItem('user_id', responseJson.data.email);
          // console.log(response.name);
          setDemail(response.email)
          setDuserName(response.name)
          setAdmStats(response.adm)
          
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
        <TouchableOpacity style={{marginTop:35}}>
          <Icon name={"person-sharp"} size={25} color={'#C0C0C0'}/>
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
        <TouchableOpacity style={{marginTop:35}}>
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
        <TouchableOpacity style={{marginTop:35}}
          // onPress={()=>{setPword(!pword)}}
          >
          <Icon name={"eye-sharp"} size={25} color={'#C0C0C0'}/>
        </TouchableOpacity> 
            <TextInput
              style={styles.input}
              onChangeText={(Password) => setPassword(Password)}
              value={password}

              // secureTextEntry={pword}
              placeholder="Password"
              placeholderTextColor="#C0C0C0"
              //keyboardType="numeric"
            />
        </View>
      
      <View style ={{flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:35}}>
          <Icon name={"eye-sharp"} size={25} color={'#C0C0C0'}/>
        </TouchableOpacity>
        <TextInput
          style={styles.input1}
          placeholder='Confirm Password'
          placeholderTextColor="#C0C0C0"
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
        // backgroundColor:`linear-gradient(#e66465, #9198e5)`
        alignItems:'center',
        backgroundColor:'black'
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
      marginTop:20,
      backgroundColor:'#a9a9a9',
      height: 40,
      // width:windowHeight/2,
      width:'46%',
      padding: 20,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
    },
    login:{
      marginTop:20,
    }
})
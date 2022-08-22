import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../components/Dimensions';

const Login1 = () => {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'gray'}}>
            <View style={styles.overlay}>
                <View style={styles.wrapper}>
                    <View style ={styles.formView}>
                        <Text>Login</Text>
                        <TextInput
                            // style={styles.input}
                            placeholder='Email'
                        />
                        <TextInput
                            // style={styles.input}
                            placeholder='Password'
                        />
                        <TouchableOpacity
                            style={styles.loginBtn}
                        >
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Login1;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    wrapper:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        height:'80%'
    },
    
    formView:{
        height:'400px',
        width:'90',
        backgroundColor:'black',
        flexDirection:'column',
        borderRadius:'20px',
        padding:'20px',
        justifyContent:'center'
    },
    
    input:{
        width:'95%',
        height:'50px',
        borderWidth:'-1',
        padding:'10px',
        borderRadius:'15px',
        backgroundColor:'#333',
        color:'white',
        marginTop:'10px',
        // borderStyle:'none'
    },

    signInText:{
        fontSize:'30px',
        fontWeight:'bold',
        color:'white',
        margin:'10px',
        textAlign:'left'
    },
    newToNetflixView:{
        width:'100%'
    },
    newToNetflixText:{
        fontSize:'15px',
        fontWeight:'500',
        textAlign:'center',
        color:'#ccc',
        margin:'15px'
    },
    loginBtn:{
        width:'95%',
        height:'50px',
        borderWidth:0,
        borderRadius:'15px',
        backgroundColor:'#e7442e',
        color:'white',
        marginTop:'20px',
        justifyContent:'center',
        alignItems:'center',
    },
    overlay:{
        backgroundColor:'rgba(0,0,0,0.5)'
    }

    // backgroundColor:'blue',
        // height:windowHeight/2 +50,
        // width:windowWidth/2 +10,
        // marginTop:'48px'

        // login button
        // width:'95%',
        // height:'50px',
        // borderWidth:0,
        // borderRadius:'15px',
        // backgroundColor:'#e7442e',
        // color:'white',
        // marginTop:'20px',
        // justifyContent:'center',
        // alignItems:'center',

    // marginTop: 5,
    // marginBottom: 10,
    // width: '100%',
    // height: windowHeight / 15,
    // borderColor: '#ccc',
    // borderRadius: 3,
    // borderWidth: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: '#fff',
})
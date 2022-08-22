import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import React,{useContext,useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Login from './screens/src/Login';
import Register from './screens/src/Register';
// import Home from './src/HomeScreens/Home';
import HomeNavs from './screens/HomeScreens/Navigation';
import Payment from './screens/HomeScreens/Payment';
import SettingsScreen from './screens/HomeScreens/Settings';

import { AuthContext, AuthProvider } from './theauth/context';


const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeDrawer = createDrawerNavigator();

const LoginScreens = () =>{
  return(
    <RootStack.Navigator headerMode='none'>
      <RootStack.Screen name='SignIn' component={Login}/>
      <RootStack.Screen name='SignUp' component={Register}/>
    </RootStack.Navigator>
  )
}

// const HomeScreens = () =>{
//   return(
//     <HomeStack.Navigator headerMode='none'>
//       <HomeStack.Screen name='Home' component={HomeNavs}/>
//     </HomeStack.Navigator>
//   )
// }

const CustomDrawer = (props) =>{
  const Pic = require('./screens/imgs/FB_IMG_3.jpg')
  const {signOut} = useContext(AuthContext);
  
  return(
    <View style={{flex:1,backgroundColor:'black'}}>
      <DrawerContentScrollView {...props}>
        <View>
          <View>
            <Text>kjgkudgi</Text>
            <Image
              source={Pic}
              resizeMode={'stretch'}
              style={{ height: 60,width:60, borderRadius: 30,margin:5,alignSelf:'center',aspectRatio:1}}
            />
          </View>
        </View>
        <DrawerItemList {...props}/>
     </DrawerContentScrollView>
     
     <TouchableOpacity style={{position:'absolute',right:0,left:0, bottom:50, padding:20}}
      onPress={()=>{
                    // navigation.closeDrawer()
                    signOut()
                  }}
     >
      <Text style={{color:'white',fontWeight:"bold"}}>Log Out</Text>
     </TouchableOpacity>
    </View>
  );
}


const HomeScreens = ({navigation}) =>{
  return(
    <HomeDrawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>
    }
    drawerStyle={{backgroundColor:'blur'}}
  >
    <HomeDrawer.Screen component={HomeNavs} name='Home'
      options={{
        drawerLabel: () => {return <Text style={{color:'white',fontWeight:"bold"}}>HOME</Text>},
        title:null ,
      }}
    />
    <HomeDrawer.Screen component={Payment} name='Make Payment'
      options={{
        drawerLabel: () => {return <Text style={{color:'white',fontWeight:"bold"}}>MAKE PAYMENT</Text>},
        title:null ,
      }}
    />
    <HomeDrawer.Screen component={SettingsScreen} name='Settings'
      options={{
        drawerLabel: () => {return <Text style={{color:'white',fontWeight:"bold"}}>SETTINGS</Text>},
        title:null ,
      }}
    />
  </HomeDrawer.Navigator>
  )
}

const Navs = () =>{
  const {status, setUser} = useContext(AuthContext);
  return(
    <NavigationContainer>
    {status?<HomeScreens/> : <LoginScreens/>}
      {/* <LoginScreens/> */}

   </NavigationContainer>
  )
}


const App = () => {
  return (
   <AuthProvider>
      <Navs/>
   </AuthProvider>
   
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

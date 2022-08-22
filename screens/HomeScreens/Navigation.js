import React, {useContext,useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeStacker from './Home/HomeStacker';
import FavoriteStacker from './Favorite/FavoriteStacker';
import Profile from './Profile';
import Download from './Download';
import Upload from './Upload';
import Home from './Home/Home';
import Favorite from './Favorite/Favorite';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../theauth/context';

const UiTab = createBottomTabNavigator();

const HomeNavs = ({navigation}) => {
    const {dLoad,setDload,admStats} = useContext(AuthContext)

    useEffect(()=>{
        if(admStats){
            setDload(true)
        }else{
            setDload(false)
        }
    },[admStats])

    
  return (
    <View style={{flex:1, backgroundColor:'red'}}>
        {/* <UiTab.Navigator tabBarOptions={{
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#5b5b5b',
            style:{
                backgroundColor:'#141414',
                borderTopWidth:0,
                elevation:0,
                shadowOffset:{
                    width:0, height:0
                },
                height:60,
                paddingBottom:10,
            }
        }}
            screenOptions={{
                tabBarItemsStyle:{flexDirection:'row'}
            }}
        >
            <UiTab.Screen name='HOME' component={Home} options ={{
                tabBarIcon:({color}) => <Icon name='home' size={24} color={color} style={{marginBottom:-10}}/>
            }}/>
            <UiStack.Screen name='PROFILE' component={Profile} options ={{
                tabBarIcon:({color}) => <Icon name='md-person' size={24} color={color} style={{marginBottom:-10}}/>
            }}/>
            <UiStack.Screen name='UPLOAD' component={Upload} options ={{
                tabBarIcon:({color}) => <Icon name='ios-cloud-upload' size={24} color={color} style={{marginBottom:-10}}/>
            }}/>
        </UiTab.Navigator> */}
        
    <UiTab.Navigator
        tabBarOptions={{ 
            style:{ 
                backgroundColor:'#141414'
            }
        }}
        screenOptions={({ route }) => ({
            tabBarLabel: () => null,
            title:null,
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HOME') {
                iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'FAVORITE') {
                iconName = focused ? 'heart' : 'heart-outline';
            }  else if (route.name === 'PROFILE') {
                iconName = focused ? 'md-person' : 'md-person-outline';
            } else if (route.name === 'DOWNLOAD') {
                iconName = focused ? 'ios-cloud-download' : 'ios-cloud-download-outline';
            }else if (route.name === 'UPLOAD') {
                iconName = focused ? 'ios-cloud-upload' : 'ios-cloud-upload-outline';
            } 

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#00BFFF',
            tabBarInactiveTintColor: 'gray',
        })}
    >
        <UiTab.Screen name='HOME' component={HomeStacker}/>
        <UiTab.Screen name='FAVORITE' component={FavoriteStacker}/>
        <UiTab.Screen name='PROFILE' component={Profile}/>
        {dLoad?(<UiTab.Screen name='DOWNLOAD' component={Download}/>) : (<></>)}
        {admStats?(<UiTab.Screen name='UPLOAD' component={Upload}/>):(<></>)} 
    </UiTab.Navigator>

    </View>
  )
}

export default HomeNavs;
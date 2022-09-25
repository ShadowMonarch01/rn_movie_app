import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import MovieScreen from '../Movie/MovieScreen';
import VideoScreen from '../Movie/VideoScreen';

const HomeStack1 = createStackNavigator();



const HomeStacker = () => {
  return (
    <HomeStack1.Navigator headerMode='none'>
        <HomeStack1.Screen name='Home1' component={Home}/>
        <HomeStack1.Screen name='MovieS' component={MovieScreen}/>
        <HomeStack1.Screen name='VideoS' component={VideoScreen}/>
    </HomeStack1.Navigator>
  )
}

export default HomeStacker;

const styles = StyleSheet.create({})
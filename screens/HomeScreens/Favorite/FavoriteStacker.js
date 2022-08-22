import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favorite from './Favorite';
import MovieScreen from '../Movie/MovieScreen'

// const RootStack = createStackNavigator();
const FavoriteStack1 = createStackNavigator();



const FavoriteStacker = () => {
  return (
    <FavoriteStack1.Navigator headerMode='none'>
        <FavoriteStack1.Screen name='Favorite1' component={Favorite}/>
        <FavoriteStack1.Screen name='MovieS' component={MovieScreen}/>
    </FavoriteStack1.Navigator>
  )
}

export default FavoriteStacker;

const styles = StyleSheet.create({})
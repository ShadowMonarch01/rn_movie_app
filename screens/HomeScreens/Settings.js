import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';



const SettingsScreen = ({navigation}) => {
  
  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row',backgroundColor:'black', padding:4}}>
        <TouchableOpacity 
          onPress={() => navigation.openDrawer()}
        >
          <Icon name={'ios-menu'} size={30} color={'white'} />
        </TouchableOpacity>        
      </View>
      <View style={styles.container}>
          <Text>Settings</Text>
        </View>
    </View>
    
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
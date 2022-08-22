import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const MovieScreen = ({route,navigation}) => {
  const {pic} = route.params;
  return (
    <View style={{flex:1,backgroundColor:'#171717'}}>
      <View style={{flexDirection:'row',backgroundColor:'#000000', padding:4}}>
        <TouchableOpacity 
          // onPress={() => navigation.openDrawer()}
          onPress={()=>navigation.navigate('Home1')}
        >
          {/* <Icon name={'ios-menu'} size={24} color={'white'} /> */}
          <Icon name={'backspace-outline'} size={24} color={'white'} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft:'auto'}}>
          <Icon name={'search-sharp'} size={24} color={'white'} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
      
      {/* <Text>MovieScreen</Text> */}
      <View style={{marginTop:15}}>
        <Image
            source={pic}
            resizeMode={'stretch'}
            style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1}}
          /> 
      </View>
    </View>
      <View>
        <Text style={{color:'white',textAlign:'center',fontSize:26}}>Movie Name</Text>
        <Text style={{color:'white',textAlign:'center',fontSize:26}}>Movie Genera</Text>
        <Text style={{color:'white',textAlign:'center',fontSize:26}}>Movie Details</Text>
      </View>
    </View>
  )
}

export default MovieScreen;

const styles = StyleSheet.create({
    container:{
        // flex:1,
        alignItems:'center',
        backgroundColor:'#171717'
        // justifyContent:'center'
    }
})
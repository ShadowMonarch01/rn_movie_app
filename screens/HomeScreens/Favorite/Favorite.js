import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import movieList from '../../data';

const Favorite = () => {

  const renderItem = ({item}) => {
    return(
      <TouchableOpacity
        // onPress={() => navigation.navigate('Fdetails',{name:item.id, details:item.details,proname:item.name })}
        style={{marginBottom:5,marginTop:5}}
      >
        <View style={{flexDirection:'row', backgroundColor:'gray'}}>
          <Image
              source={item.img}
              resizeMode={'stretch'}
              style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1}}
            />
          <View style ={{flexDirection:'column',marginLeft:5}}>
            <Text>Name</Text>
            <Text>Release Date</Text>
            <Text>Details</Text> 
          </View>
            
        </View>
    </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <Text>Favorite</Text>
      <FlatList
          // horizontal
          // showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={movieList}
          renderItem={renderItem}
          keyExtractor={item=>item.id}
        />
    </View>
  )
}

export default Favorite;

const styles = StyleSheet.create({
    container:{
        flex:1,
        // alignItems:'center',
        // justifyContent:'center',
        backgroundColor:'black'
    }
})
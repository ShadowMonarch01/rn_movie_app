import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import movieList from '../../data';
import Icon from 'react-native-vector-icons/Ionicons';


const Home = ({navigation}) => {

  const renderItem = ({item}) => {
    return(
      <TouchableOpacity
        // onPress={() => navigation.navigate('Fdetails',{name:item.id, details:item.details,proname:item.name })}
        onPress={()=>navigation.navigate('MovieS',{pic:item.img})}
      >
         <Image
            source={item.img}
            resizeMode={'stretch'}
            style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1}}
          /> 
    </TouchableOpacity>
    )
  }
  return (
    <View style={[{flex: 1}, styles.container]}>
      <View style={{flexDirection:'row',backgroundColor:'black', padding:4}}>
        <TouchableOpacity 
          onPress={() => navigation.openDrawer()}
        >
          <Icon name={'ios-menu'} size={30} color={'white'} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft:'auto'}}>
          <Icon name={'search-sharp'} size={30} color={'white'} />
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={{flexDirection:'row',height:50,padding:5}}>
        <ScrollView horizontal ={true} showsVerticalScrollIndicator={false}>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Action</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Scifi</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Drama</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Comedy</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Action</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Scifi</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Drama</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Comedy</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Action</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Scifi</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Drama</Text>
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>Comedy</Text>
        </ScrollView>
      </View>
      <View style={{height:200,padding:5}}>
        <Text style={{color:'white',fontSize:24,marginLeft:10}}>New Movies</Text>
        <ScrollView horizontal ={true} showsVerticalScrollIndicator={false}>
          {movieList.map(item =>(
            <TouchableOpacity key={item.id}
            onPress={()=>navigation.navigate('MovieS',{pic:item.img})}
            >
              <Image
                source={item.img}
                resizeMode={'stretch'}
                style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1}}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{height:200}}>
        <Text style={{color:'white',fontSize:24,marginLeft:10}}>Popular Movies</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movieList}
          renderItem={renderItem}
          keyExtractor={item=>item.id}
        />
      </View>
      <View style={{height:200}}>
        <Text style={{color:'white',fontSize:24,marginLeft:10}}>Action</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movieList}
          renderItem={renderItem}
          keyExtractor={item=>item.id}
        />
      </View>
      <View style={{height:200}}>
        <Text style={{color:'white',fontSize:24,marginLeft:10}}>Scifi</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movieList}
          renderItem={renderItem}
          keyExtractor={item=>item.id}
        />
      </View>
      <View style={{height:200}}>
        <Text style={{color:'white',fontSize:24,marginLeft:10}}>Kids</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movieList}
          renderItem={renderItem}
          keyExtractor={item=>item.id}
        />
      </View>
      </ScrollView>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
    container:{
        flex:1,
        // alignItems:'center',
        // justifyContent:'center',
        backgroundColor:'black'
    }
})
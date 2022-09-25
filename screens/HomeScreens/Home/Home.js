import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React,{useEffect,useState,useContext} from 'react';
import movieList from '../../data';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../../theauth/context';


const Home = ({navigation}) => {

  const [newMovies,setNewMovies] = useState([]);
  // const [popularMovies,setPopularMovies] = useState(null);
  // const [collection,setCollection] = useState(null);
  const [actionMovies,setActionMovies] = useState([]);
  const [cartoons,setCartoons] = useState([]);
  const [sifiMovies,setSifiMovies] = useState([]);

  const [reload,setReload] = useState(false)

  const {favoriteAdded,setFavoriteAdded,authFavorites_id,user_id} = useContext(AuthContext)

  useEffect(()=>{
    getCollectionMovies()
  },[reload]);

  const addToFavorites = async (item) => {
    console.log(item)
    fetch('http://rnflaskmongoapi-env.eba-xpzve2yf.us-east-1.elasticbeanstalk.com/addfavorite', {
      method: 'POST',
      headers: {
        //Header Defination
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        "favorite_id": authFavorites_id,
        "mv_details": item
      })
    })
      .then((response) => response.json())
      .then((response) => {
        //Hide Loader
        //setLoading(false);
        console.log(response);
        // If server response message same as Data Matched
        if (response.status === 'success') {
          // setFavorite(response.users_favorites)
          setFavoriteAdded(!favoriteAdded)
          showToastMsg()
          
        } 
      })
      .catch((error) => {
        
        console.error(error);
        
      });
  };

  

  

  const getCollectionMovies = async () =>{
    
    fetch('http://rnflaskmongoapi-env.eba-xpzve2yf.us-east-1.elasticbeanstalk.com/getrefreshhome', {
      method: 'POST',
      headers: {
        //Header Defination
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        // "id": user_id
        "id":"6306c1bb932761bbddaadfc8"
      })
    })
    .then((response) => response.json())
    .then((response) => {
       setNewMovies(response.newMovies)
       setActionMovies(response.actionMovies)
       setCartoons(response.cartoonMovies)
       setSifiMovies(response.scifiMovies)
      //  setRefreshing(false)
    })
    .catch((error) => {
        console.error(error);
    });
   
}

  // const renderItem = ({item}) => {
  //   return(
  //     <TouchableOpacity
  //       // onPress={() => navigation.navigate('Fdetails',{name:item.id, details:item.details,proname:item.name })}
  //       onPress={()=>navigation.navigate('MovieS',{pic:item})}
  //       onLongPress={()=>addToFavorites(item)}
  //     >
  //        <Image
  //           // source={item.img}
  //           resizeMode={'stretch'}
  //           style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1,backgroundColor:'blue'}}
  //         /> 
  //         <Text style={{color:'white', textAlign:'center',fontSize:24}}>{item.movieName}</Text>
  //   </TouchableOpacity>
  //   )
  // }


// const renderCItems = ({item}) => {
//   return(
//     <TouchableOpacity
//       // onPress={() => navigation.navigate('Fdetails',{name:item.id, details:item.details,proname:item.name })}
//       onPress={()=>navigation.navigate('MovieS',{pic:item})}
//       // onPress={()=>navigation.navigate('MovieS',{mvdata:item})}
//     >
//         <Image
//           source={item.img}
//           resizeMode={'stretch'}
//           style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1}}
//         /> 
//         {/* <Text style={{color:'white', textAlign:'center',fontSize:24}}>{item.name}</Text> */}
//   </TouchableOpacity>
//   )
// }

const renderOItems = ({item}) => {
  return(
    <TouchableOpacity
      // onPress={() => navigation.navigate('Fdetails',{name:item.id, details:item.details,proname:item.name })}
      onPress={()=>navigation.navigate('MovieS',{pic:item,nav:'Home1'})}
      onLongPress={()=>addToFavorites(item)}
    >
        <Image
          source={{uri:item.movieImage}}
          resizeMode={'stretch'}
          style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1}}
        />
  </TouchableOpacity>
  )
}

const showToastMsg = () =>{
  console.log('Toast message')
  ToastAndroid.show(
    "Added to Favorites",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  )
}

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

        <TouchableOpacity style={{marginRight:10,marginLeft:10}}
          onPress={()=>{
            setReload(!reload)
          }}
        >
          <Icon name={'ios-reload'} size={30} color={'white'} />
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
          {newMovies.map(item =>(
            <TouchableOpacity key={item._id}
            onPress={()=>navigation.navigate('MovieS',{pic:item,nav:'Home1'})}
            onLongPress={()=>addToFavorites(item)}
            >
              <Image
                source={{uri:item.movieImage}}
                resizeMode={'stretch'}
                style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1}}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{height:200}}>
        <Text style={{color:'white',fontSize:24,marginLeft:10}}>Action</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={actionMovies}
          renderItem={renderOItems}
          keyExtractor={item=>item._id}
        />
      </View>
      <View style={{height:200}}>
        <Text style={{color:'white',fontSize:24,marginLeft:10}}>Sci-Fi</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sifiMovies}
          renderItem={renderOItems}
          keyExtractor={item=>item._id}
        />
      </View>
      <View style={{height:200}}>
        <Text style={{color:'white',fontSize:24,marginLeft:10}}>Anime/Cartoon</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={cartoons}
          renderItem={renderOItems}
          keyExtractor={item=>item._id}
        />
      </View>
      {/* <View style={{height:200}}>
        <Text style={{color:'white',fontSize:24,marginLeft:10}}>Kids</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movieList}
          renderItem={renderItem}
          keyExtractor={item=>item.id}
        />
      </View> */}
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
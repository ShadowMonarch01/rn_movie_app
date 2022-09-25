import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native'
import React ,{useEffect, useState, useContext}from 'react';
import movieList from '../../data';
import { AuthContext } from '../../../theauth/context';

const Favorite = ({navigation}) => {

  const [favorite,setFavorite] = useState([])

  const [vsdelete,setvsDelete] = useState({isVis:false})

  const [movieToDelete_id,setMovieToDelete_id] = useState('')

  const {authFavorites_id,favoriteAdded} = useContext(AuthContext)

  


  const handleSubmitPress = async () => {
    
    fetch('http://rnflaskmongoapi-env.eba-xpzve2yf.us-east-1.elasticbeanstalk.com/getfavorite', {
      method: 'POST',
      headers: {
        //Header Defination
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        "favorite_id": authFavorites_id
      })
    })
      .then((response) => response.json())
      .then((response) => {
        //Hide Loader
        //setLoading(false);
        console.log(response);
        // If server response message same as Data Matched
        if (response.status === 'success') {
          setFavorite(response.favorites)
          console.log('favorites array gotten: '+response.favorites)

        } 
      })
      .catch((error) => {
        
        console.error(error);
        console.log('hehehe')
        
      });
  };




  const deleteMovie = async () => {
    
    fetch('http://rnflaskmongoapi-env.eba-xpzve2yf.us-east-1.elasticbeanstalk.com/rmvfavorite', {
      method: 'POST',
      headers: {
        //Header Defination
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        "favorite_id": authFavorites_id,
        "mv_id":movieToDelete_id
      })
    })
      .then((response) => response.json())
      .then((response) => {
        //Hide Loader
        //setLoading(false);
        console.log(response);
        onDeletePress(false)

        // If server response message same as Data Matched
        if (response.status === 'success') {
          handleSubmitPress()
          // setFavorite(response.favorites)
          // console.log('favorites array gotten: '+response.favorites)

        } 
      })
      .catch((error) => {
        
        console.error(error);
        
      });
  };



  const onDeletePress=(show)=>{
    setvsDelete({isVis: show})
  }

  // UNCOMMENT WHEN ITS TIME TO TEST
  useEffect(()=>{
    handleSubmitPress()
  },[favoriteAdded])


  const renderItem = ({item}) => {
    let newArr = [];
    item.movieGenera.forEach(element => {
      newArr.push(element.cat)
    });
    return(
      <TouchableOpacity
        onPress={() => navigation.navigate('MovieS',{pic:item,nav:'Favorite1'})}
        onLongPress={()=>{
          onDeletePress(true)
          setMovieToDelete_id(item._id)
        }}
        style={{marginBottom:5,marginTop:5}}
      >
        <View style={{flexDirection:'row', backgroundColor:'gray'}}>
          <Image
              source={{uri:item.movieImage}}
              resizeMode={'stretch'}
              style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1}}
            />
          <View style ={{flexDirection:'column',marginLeft:5}}>
            <Text>{item.movieName}</Text>

            {/* <View style={{flexDirection:'row',flexWrap:'wrap',flexShrink:1}}>
            {item.movieGenera.map(ttt =>(
              <Text style={{flexShrink:1}} key={ttt.id}>{ttt.cat}{'            '}</Text>
            ))}
            </View> */}
            <View style={{width:'50%'}}>
            <Text b style={{}}>{newArr.toString()}</Text>

            </View>
            {/* <Text>{JSON.stringify(item.movieGenera)}</Text> */}
            
            <Text>{item.movieDetails}</Text> 
          </View>
            
        </View>
    </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>

        <Modal
            animationType = {"none"}
            transparent={true}
            visible={vsdelete.isVis}
            onRequestClose={() => {
              setvsDelete({isVis: false})
              // Alert.alert('Modal has now been closed.');
            }}>

             <TouchableOpacity style={{flex:1}}
                onPress={()=>setvsDelete({isVis: false})}
              >
                <View 
                // style={{flexDirection:'column',backgroundColor:'white',width:'40%',position:'absolute',right:0,marginRight:2,marginTop:4,borderRadius:4}}
                style={{backgroundColor:'#171717',width:'40%',borderRadius:4,alignSelf:'center',marginTop:'50%'}}
                >
                  <TouchableOpacity
                    onPress={()=>{
                            // setMainCategoryName('Action')
                            // showCategories(false)
                            deleteMovie()
                          }}
                  >
                    <Text style={{fontSize:20,padding:5,margin:4,color:'white'}}>Delete</Text>
                  </TouchableOpacity>

                  

                  <TouchableOpacity
                    onPress={()=>{
                            onDeletePress(false)
                          }}
                  >
                    <Text style={{fontSize:20,padding:5,margin:4,color:'white',marginTop:12}}>Cancel</Text>
                  </TouchableOpacity>

                </View>

             </TouchableOpacity>
        </Modal>
      <Text>Favorite</Text>
      <FlatList
          // horizontal
          // showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={favorite}
          renderItem={renderItem}
          keyExtractor={item=>item._id}
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
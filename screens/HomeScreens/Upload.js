import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Button, PermissionsAndroid, Modal, TextInput  } from 'react-native'
import React,{useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import * as ImagePicker from 'react-native-image-picker'
import VideoPlayer from 'react-native-video-player';

const Upload = () => {

  const [image,setImage] = useState({img:null})
  const [upimage,setupImage] = useState({img:null})
  const [video,setVideo] = useState({vdo:null})

  const [vsinfo,setvsInfo] = useState({isVis:false})

  const [info,setInfo] = useState('')



  const [Genera,setGenera] = useState([
    {
      id:1,
      cat:'Action'
    },
    {
      id:2,
      cat:'Animation'
    },
    {
      id:3,
      cat:'Drama'
    },
    {
      id:4,
      cat:'Comedy'
    },
    {
      id:5,
      cat:'Isekai'
    },
    {
      id:6,
      cat:'Martial Arts'
    },
    {
      id:7,
      cat:'Horror'
    },
    {
      id:8,
      cat:'Mystery'
    },
    {
      id:9,
      cat:'Scifi'
    },
    {
      id:10,
      cat:'Dark'
    },
    {
      id:11,
      cat:'History'
    },
    {
      id:12,
      cat:'Cartoon'
    },
    {
      id:13,
      cat:'Mid'
    },
    {
      id:14,
      cat:'Light'
    },
    {
      id:15,
      cat:'Science'
    },
    {
      id:16,
      cat:'Music'
    },
  ]);

  const [uploadG,setUploadG] = useState([]);
  const pressHandler = (id,itm) =>{
    setGenera((prevGenera) =>{
      return prevGenera.filter(Genera => Genera.id != id)
    });
    uploadG.push({id:id,cat:itm.cat})
  }

  const pressHandler2 = (id,itm) =>{
    setUploadG((prevUploadG) =>{
      return prevUploadG.filter(uploadG => uploadG.id != id)
    });
    Genera.push({id:id,cat:itm.cat})
  }


  const renderItem = ({item}) => {
    return(
      <TouchableOpacity
        // onPress={() => navigation.navigate('Fdetails',{name:item.id, details:item.details,proname:item.name })}
        onPress={()=>pressHandler(item.id,item)}
      >
          <Text style={{color:'white',backgroundColor:'blue',padding:12,borderRadius:5,marginRight:4}}>{item.cat}</Text>
    </TouchableOpacity>
    )
  }


  const renderItem2 = ({item}) => {
    return(
      <TouchableOpacity
        // onPress={() => navigation.navigate('Fdetails',{name:item.id, details:item.details,proname:item.name })}
        onPress={()=>pressHandler2(item.id,item)}
      >
          <Text style={{color:'white',backgroundColor:'green',padding:12,borderRadius:5,marginRight:4}}>{item.cat}</Text>
    </TouchableOpacity>
    )
  }


  const displayModalInfo=(show)=>{
    setvsInfo({isVis: show})
  }


//   const selectFile = async () => {
//     // setId(ids)

//   try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           'title': 'Example App',
//           'message': 'Example App access to your location '
//         }
//       )
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           try {
//               const res = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.images],
//               });

//               const e = res[0].uri
//               setImage({img:e})
//               //converting...

//               const result = await RNFetchBlob.fs.readFile(e,'base64')
              
//               setupImage({img:result})
//                console.log('URI : ' + result);
              
//               console.log(
//                e,
//                JSON.stringify(res)
//               )
//             } catch (err) {
//               if (DocumentPicker.isCancel(err)) {
//                 // User cancelled the picker, exit any dialogs or menus and move on
//               } else {
//                 throw err
//               }
//             }
//       } else {
//         console.log("location permission denied")
//         alert("Location permission denied");
//       }
//     } catch (err) {
//       console.warn(err)
//     }

// }

const selectVideo = async () =>{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try{
        // ImagePicker.launchImageLibrary({mediaType:'video', includeBase64:true}, (response)=>{
        //   console.log(response);
        //   const e = response.assets[0].uri
        //   console.log("URI: "+e)
          
          
        //   // console.log("OUTPUT URI: "+RNFetchBlob.fs.readFile(e,'base64'))
        //   setImage({img:e})
        //   setVideo({vdo:e})
        // })
        const res = await ImagePicker.launchImageLibrary({mediaType:'video', includeBase64:true})
        console.log(res);
        const e = res.assets[0].uri
        console.log("URI: "+e)
        setVideo({vdo:e})
        RNFetchBlob.fs.readFile(e,'base64')
        .then(res =>{
          console.log(res)
        })
        // console.log(result)
      }catch(eer){
        console.warn(err)
      }
    } else {
      console.log("location permission denied")
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }



  // try{
  //   // ImagePicker.launchImageLibrary({mediaType:'video', includeBase64:true}, (response)=>{
  //   //   console.log(response);
  //   //   const e = response.assets[0].uri
  //   //   console.log("URI: "+e)
      
      
  //   //   // console.log("OUTPUT URI: "+RNFetchBlob.fs.readFile(e,'base64'))
  //   //   setImage({img:e})
  //   //   setVideo({vdo:e})
  //   // })
  //   const res = await ImagePicker.launchImageLibrary({mediaType:'video', includeBase64:true})
  //   console.log(res);
  //   const e = res.assets[0].uri
  //   console.log("URI: "+e)
  //   setVideo({vdo:e})
  //   RNFetchBlob.fs.readFile(e,'base64')
  //   .then(res =>{
  //     console.log(res)
  //   })
  //   // console.log(result)
  // }catch(eer){
  //   console.warn(err)
  // }
  
}


  return (
    <View style={{flex:1,backgroundColor:'black'}}>
    <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.container}>
      
      <View style={{marginTop:30}}>
        <Text style={styles.text}>Upload</Text>
      </View>

      <View style={{height: 160,width:140, backgroundColor:'gray',marginTop:20}}>
        {}
      </View>
      

      <View style={{flexDirection:'column', marginTop:20}}>
        <Text style={{color:'white',fontSize:24,textAlign:'center'}}>Name</Text>
        <Text style={styles.text}>Movie Name</Text>
      </View>

      <TouchableOpacity style={{flexDirection:'column', marginTop:20}}
        onPress={()=>{displayModalInfo(true)}}
      >
        <Text style={{color:'white',fontSize:24,textAlign:'center'}}>Details</Text>
        <Text style={{color:'white',fontSize:20}}>{info}</Text>
      </TouchableOpacity>

      

              {/* PROFILE MODAL */}
              <Modal
            animationType = {"fade"}
            transparent={true}
            visible={vsinfo.isVis}
            onRequestClose={() => {
              // Alert.alert('Modal has now been closed.');
              setvsInfo({isVis: false})
            }}>

             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                 <View style={{width:'80%',backgroundColor:'#171717',borderRadius:20, alignItems: 'center', justifyContent: 'center',padding:12,paddingBottom:18}}>
                 <TextInput
                    multiline
                    style={{width:'100%',borderWidth:1,borderRadius:10,borderColor:'#a9a9a9'}}
                    //onChangeText={onChangeText}
                    onChangeText={(tt) => setInfo(tt)}
                    value={info}
                   
                  />

                  <TouchableOpacity
                  style={{marginTop:40,backgroundColor:"blue",borderRadius: 6,padding:8}}
                  // onPress={handleSubmitDetailsePress}
                  onPress={()=>setvsInfo({isVis: false})}
                  >
                    <Text style={{color:'white'}}>Done</Text>
                  </TouchableOpacity>
                  </View>          
              </View>
          </Modal>
           {/* END DETAILS MODAL */}

      <View style={{flexDirection:'row', marginTop:20}}>
        <Text style={styles.text}>Main Category: </Text>
        <Text style={styles.text}>Action</Text>
      </View>

      <View style={{flexDirection:'row', marginTop:20}}>
        <Text style={styles.text}>Release Date: </Text>
        <Text style={styles.text}>...</Text>
      </View>

      <View style={{height:50, width:'80%',backgroundColor:'black', marginTop:20,padding:2}}>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Genera}
            renderItem={renderItem}
            keyExtractor={item=>item.id}
          />
      </View>
      <Text style={styles.text}>Sub Categories </Text>

      <View style={{height:50, width:'80%',backgroundColor:'black', marginTop:30,padding:2}}>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={uploadG}
            renderItem={renderItem2}
            keyExtractor={item=>item.id}
          />
      </View>

      <View>
        <VideoPlayer
          video={{uri:video.vdo}}
          // video={{uri:'content://media/external/video/media/4622'}}
          autoplay={false}
          defaultMuted={true}
          videoWidth={1500}
          videoHeight={1500} 
        />
      </View>


      <View style={{marginTop:30, marginBottom:30}}>
        <TouchableOpacity
          style={{padding:5,backgroundColor:'blue', borderRadius:5}}
          onPress={selectVideo}
        >
          <Text style={{color:'white',fontSize:24}}>Upload Movie</Text>
        </TouchableOpacity>
      </View>



    </View>
    </ScrollView>
    </View>
  )
}

export default Upload;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        // justifyContent:'center',
        backgroundColor:'black'
    },
    text:{
      color:'white',
      fontSize:24
    }
})
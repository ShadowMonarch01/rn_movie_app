import { StyleSheet, Text, View, ScrollView, FlatList,
   TouchableOpacity, Button, PermissionsAndroid, Modal, TextInput,
    Image, Alert, ActivityIndicator  } from 'react-native'
import React,{useState,useEffect} from 'react';
import DocumentPicker from 'react-native-document-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
import * as ImagePicker from 'react-native-image-picker'
import VideoPlayer from 'react-native-video-player';
import storage from '@react-native-firebase/storage';
import { api } from '../data';
// import RNFS from 'react-native-fs'


// "movieName":"Ready Player One",
//     "movieImage":"ready_player_one_img",
//     "movieGenera":["Action","Scifi","Love"],
//     "movieDetails":"When the  world goes into an era of vr-gaming the legacy of the games creator must be found",
//     "movieCategory":"Scifi",
//     "video":"ready_player_one_vid",
//     "whoPosted":"Trust"


const Upload = () => {

  const [image,setImage] = useState({img:null})

  const [upimage,setupImage] = useState({});
  const [upVideo,setupVideo] = useState({});
  const [transferred,setTransferred] = useState(0);

  const [sending,setSending] = useState(false);
  


  const [movieName,setMovieName] = useState('')
  const [movieDetails,setMovieDetails] = useState('')
  const [movieDate,setMovieDate] = useState('')

  const [video,setVideo] = useState({vdo:null})

  const [vsinfo,setvsInfo] = useState({isVis:false})

  const [info,setInfo] = useState('')

  const [vsname,setvsName] = useState({isVis:false})

  const [mainCategoryName,setMainCategoryName] = useState('')

  const [stepsuploaded,setStepsUploaded] = useState('(0/3)')

  const [restart,setRestart]=useState(true)





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

const selectImage = async () =>{
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
        // height: 220,width:180,
        const res = await ImagePicker.launchImageLibrary({mediaType:'image',maxHeight:220,maxWidth:180,})
        console.log(res);
        const e = res.assets[0].uri
        console.log("URI: "+e)
        setImage({img:e})
        setupImage(res.assets[0])
        // const imageurl = res.
        // RNFetchBlob.fs.readFile(e,'base64')
        // .then(res =>{
        //   setImage({img:e})
        //   console.log(res)
        // })
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
  
}





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

        const res = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.allFiles],
          copyTo:'cachesDirectory'
        });

        console.log(res)
        setupVideo(res);
        // const e = res[0].uri
      }catch(error){
        console.log(error)
        setupVideo({});
        alert(
          DocumentPicker.isCancel(error)
        ? 'Cancel'
        : 'Unknown Error: '+ JSON.stringify(error),
        )
      }
    } else {
      console.log("location permission denied")
      alert("Location permission denied");
    }
  } catch (e) {
    console.warn(e)
  }

}

const uploadVideoFireBase = async () => {
  if (!movieName) {
    alert('Please Enter The Movie Name');
    return;
  }
  if (!movieDetails) {
    alert('Please Enter The Movie Details');
    return;
  }
  if (!upVideo) {
    alert('Please add a video file');
    return;
  }
  if (!upimage) {
    alert('Please add an image file');
    return;
  }
  setTransferred(0);
  setSending(true);
  console.log(upVideo.fileCopyUri);
  console.log(upVideo.name);

  const extension = upVideo.name.split('.').pop();
  const name = upVideo.name.split('.').slice(0,-1).join('.');
  const videoName = movieName + Date.now() + name + '.' + extension;

  const refrence = storage().ref(`/movies/${videoName}`);
  const task = refrence.putFile(upVideo.fileCopyUri, {
    cacheControl: 'no-store', // disable caching
  });
  task.on('state_changed', taskSnapshot => {
    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    setTransferred(
      Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    )
    setStepsUploaded('(1/3)')
  });
  try{
    await task;

    const url = await refrence.getDownloadURL()

    

    return url;

    
    
  } catch(e){
    console.log(e);
    setSending(false);

    return null;
  }
}

const uploadImageFireBase = async () => {
  if (!movieName) {
    alert('Please Enter The Movie Name');
    return;
  }
  if (!movieDetails) {
    alert('Please Enter The Movie Details');
    return;
  }
  if (!upVideo) {
    alert('Please add a video file');
    return;
  }
  if (!upimage) {
    alert('Please add an image file');
    return;
  }
  setTransferred(0);
  setSending(true);
  console.log(upimage.uri);
  console.log(upVideo.fileName);

  const extension = upimage.fileName.split('.').pop();
  // const name = upVideo.name.split('.').slice(0,-1).join('.');
  const imageName = movieName + Date.now() + '.' + extension;

  const refrence = storage().ref(`/images/${imageName}`);
  const task = refrence.putFile(upimage.uri, {
    cacheControl: 'no-store', // disable caching
  });
  task.on('state_changed', taskSnapshot => {
    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    setTransferred(
      Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    )
    setStepsUploaded('(2/3)')

  });
  try{
    await task;

    const url = await refrence.getDownloadURL()

    

    return url;

    
    
  } catch(e){
    setSending(false);
    console.log(e);

    return null;
  }
}

const uploadVideoDetails = async () =>{
  const videoUrl = await uploadVideoFireBase();
  console.log('Video Url: ',videoUrl)

  const imageUrl = await uploadImageFireBase()

  setStepsUploaded('(3/3)')
  // setTransferred(0)

  fetch(`${api}/movieupload`, {
        method: 'POST',
        headers: {
          //Header Defination
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          "movieName":movieName,
          "movieImage":imageUrl,
          "movieGenera":uploadG,
          "movieDetails":movieDetails,
          "movieCategory":mainCategoryName,
          "video":videoUrl,
          "whoPosted":"Trust"
        })
      })
        .then((response) => response.json())
        .then((response) => {
          //Hide Loader
          //setLoading(false);
          console.log(response);
          // If server response message same as Data Matched
          if (response.status === 'success') {

            setSending(false);
            Alert.alert(
              'Upload Successful!',
              'Your movie has been uploaded successfully!'
            )

            resetAll()
          }
        })
        .catch((error) => {
          // setSta({isVis: false})
          //Hide Loader
          //setLoading(false);
          setSending(false);
          console.error(error);
          
        });
  
}


const showCategories=(show)=>{
  setvsName({isVis: show})
}

// const resetAll = async() =>{
  
  
// }

useEffect(()=>{
  setMovieName('')
  setImage({img:null})
  setMovieDetails('')
  setMovieDate('')
  setVideo({vdo:null})
  setvsInfo({isVis:false})
  setInfo('')
  setvsName({isVis:false})
  setMainCategoryName('')
  setStepsUploaded('(0/3)')
  setUploadG([])
},[restart])

var tss ='data:image/png;base64,'
var oss = tss.concat(image.img)


  return (
    <View style={{flex:1,backgroundColor:'black'}}>
    <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.container}>

    <TouchableOpacity 
        style={{padding:3,backgroundColor:'blue', borderRadius:5,marginTop:5,marginRight:5,position:'absolute',right:0}}
        onPress={()=>setRestart(!restart)}
        >
        <Text style={styles.text}>Reset</Text>
      </TouchableOpacity>
      
      <View style={{marginTop:30}}>
        <Text style={styles.text}>Upload</Text>
      </View>

      <TouchableOpacity 
        style={{height: 220,width:180, backgroundColor:'gray',marginTop:20}}
        onPress={()=>selectImage()}
      >
        
        <Image
          
          // source={{uri:`data:image/png;base64,${image.img}`}}
          source={{uri:image.img}}
          resizeMode={'stretch'}
          style={{ height: 220,width:180,alignSelf:'center'}}
        />
      </TouchableOpacity>
      

      <View style={{flexDirection:'row', marginTop:20}}>
        <Text style={styles.textn}>Name: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(moviename) => setMovieName(moviename)}
          //value={number}
          placeholder="Movie Name"
          placeholderTextColor="#C0C0C0"
          multiline={true}
        />
      </View>

      {/* <TouchableOpacity style={{flexDirection:'column', marginTop:20}}
        onPress={()=>{displayModalInfo(true)}}
      >
        <Text style={{color:'white',fontSize:24,textAlign:'center'}}>Details</Text>
        <Text style={{color:'white',fontSize:20}}>{info}</Text>
      </TouchableOpacity> */}

      <View style={{flexDirection:'column', marginTop:20}}>
        <Text style={{color:'white',fontSize:24,textAlign:'center'}}>Details</Text>
        <TextInput
          style={styles.input2}
          onChangeText={(moviedetails) => setMovieDetails(moviedetails)}
          //value={number}
          placeholder="Movie Details"
          placeholderTextColor="#C0C0C0"
          multiline={true}
        />
      </View>

      

              {/* Details MODAL */}
              {/* <Modal
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
          </Modal> */}
           {/* END DETAILS MODAL */}

      <TouchableOpacity style={{flexDirection:'row', marginTop:20}}
        onPress={()=>showCategories(true)}
      >
        <Text style={styles.text}>Main Category: </Text>
        <Text style={styles.text}>{mainCategoryName}</Text>
      </TouchableOpacity>


      <Modal
            animationType = {"none"}
            transparent={true}
            visible={vsname.isVis}
            onRequestClose={() => {
              setvsName({isVis: false})
              // Alert.alert('Modal has now been closed.');
            }}>

             <TouchableOpacity style={{flex:1}}
                onPress={()=>setvsName({isVis: false})}
              >
                <View 
                // style={{flexDirection:'column',backgroundColor:'white',width:'40%',position:'absolute',right:0,marginRight:2,marginTop:4,borderRadius:4}}
                style={{backgroundColor:'#171717',width:'50%',position:'absolute',borderRadius:4,alignSelf:'center',marginTop:'50%',height:'10%'}}
                >
                  <TouchableOpacity
                    onPress={()=>{
                            setMainCategoryName('Action')
                            showCategories(false)
                          }}
                  >
                    <Text style={{fontSize:20,padding:5,margin:4,color:'white'}}>Action</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={()=>{
                            setMainCategoryName('Cartoon')
                            showCategories(false)
                          }}
                  >
                    <Text style={{fontSize:20,padding:5,margin:4,color:'white'}}>Cartoon</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={()=>{
                            setMainCategoryName('Scifi')
                            showCategories(false)
                          }}
                  >
                    <Text style={{fontSize:20,padding:5,margin:4,color:'white'}}>Scifi</Text>
                  </TouchableOpacity>

                </View>

             </TouchableOpacity>
          </Modal>








      <View style={{flexDirection:'row', marginTop:20,marginRight:18,marginLeft:18}}>
        <Text style={styles.textn}>ReleaseDate: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(moviedate) => setMovieDate(moviedate)}
          //value={number}
          placeholder="Date"
          placeholderTextColor="#C0C0C0"
        />
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
          // video={{uri:video.vdo}}
          // video={{uri:`data:video/mp4;base64,${video.vdo}`}}
          video={{uri:upVideo.uri}}
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
          <Text style={{color:'white',fontSize:24}}>Add Movie</Text>
        </TouchableOpacity>
      </View>

      {sending ? 

        (
        <View style={{marginTop:50, marginBottom:30}}>
          <Text style={styles.textn}>{transferred} % Completed!{stepsuploaded}</Text>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
        )
                              :
        (<View style={{marginTop:50, marginBottom:30}}>
          <TouchableOpacity
            style={{padding:5,backgroundColor:'blue', borderRadius:5}}
            // onPress={selectVideo}
            onPress={uploadVideoDetails}
          >
            <Text style={{color:'white',fontSize:24}}>Upload Movie</Text>
          </TouchableOpacity>
        </View>)
      }

      
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
    },
    textn:{
      color:'white',
      fontSize:24,
      marginTop:16
    },
    input: {
      // height: 30,
      borderWidth: 1,
      borderBottomColor:'#a9a9a9',
      width:"60%",
      color:"#FFFFFF",
      fontSize:18,
      paddingBottom:-5
      // marginTop:5
    },
    input2: {
      height: 80,
      borderWidth: 1,
      borderColor:'#a9a9a9',
      width:300,
      color:"#FFFFFF",
      padding:4,
      borderRadius:5
    },
})
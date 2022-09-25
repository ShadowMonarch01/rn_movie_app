import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, PermissionsAndroid, ToastAndroid,ActivityIndicator,Modal } from 'react-native';
import React,{useContext,useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../../theauth/context';
// import RNFetchBlob from 'react-native-fetch-blob';
import RNFetchBlob from 'rn-fetch-blob';
import { selectDirectory } from 'react-native-directory-picker';
import { ScrollView } from 'react-native-gesture-handler';


const MovieScreen = ({route,navigation}) => {
  const {pic,nav} = route.params;
  const {dLoad} = useContext(AuthContext)
  const [vLink,setVLink] = useState("");
  const [loading,setLoading] = useState(false)

  const ext ='.mp4';
  const {config,fs}= RNFetchBlob;
  let downloadingpath = fs.dirs.MovieDir

  // const vv= RNFetchBlob.fs.
  useEffect(()=>{
    setVLink("")
  },[pic])
  

  let newArr = [];
    pic.movieGenera.forEach(element => {
      newArr.push(element.cat)
    });


  const startDownload = async () =>{
    setLoading(true)
    let options = {
      fileCache:true,
      addAndroidDownloads:{
        useDownloadManager:true,
        notification:true,
        // mediaScannable:true,
        // mime: "text/plain",
        // mime:"video/mp4",
        path: downloadingpath+"/UiApp/"+pic.movieName+ext
      }
    }

    // config(options).fetch('GET',videoLink)
    // // .progress((received,total)=>{
    // //   console.log('progress', received/total)
    // // })
    // .then((res)=>{
    //   Alert.alert("Download Complete!")
    // })
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
        config(options)
        .fetch('GET','https://firebasestorage.googleapis.com/v0/b/rn-movie-ui-storage.appspot.com/o/movies%2FATTACK(2022)1661911351898Marshmello_-_Silence_Ft._Khalid_(Official_Music_Video)(240p).mp4?alt=media&token=0d7da10c-e3bf-4c15-a74b-ec51541ca9ff')
        .progress({count:10},(received,total)=>{
            console.log('progress', received/total)
          })
        .then((res)=>{
          setLoading(false)
          console.log(res)
          Alert.alert("Download Complete!")
        })
        
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
      console.warn(err)
    }
    
    
    
    
   
  }

  const starter = async () =>{
    // selectDirectory().then((path)=>{
    //   console.log(`This is the path ${path}`)
    // })

    await fetch('http://rnflaskmongoapi-env.eba-xpzve2yf.us-east-1.elasticbeanstalk.com/getvideo', {
          method: 'POST',
          headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            "id": pic.videoId
          })
        })
          .then((response) => response.json())
          .then((response) => {
            //Hide Loader
            
            //setLoading(false);
            setVLink(response.video)
            console.log(response);
            // If server response message same as Data Matched
            if (response.token === 'Upload succesful' && vLink) {
             
              
              // alert('Video link gotten')
              startDownload()
              
              // setSta({isVis: false})
              //navigation.navigate('ElHome');
              // signIn()
            }else{
              ToastAndroid.show(
                "Your Link is Ready Click to Download",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              )
            } 
          })
          .catch((error) => {
            // setSta({isVis: false})
            //Hide Loader
            //setLoading(false);
            console.error(error);
            
          });
  }
  return (
    <View style={{flex:1,backgroundColor:'#171717'}}>
      <ScrollView>
      <View style={{flexDirection:'row',backgroundColor:'#000000', padding:4}}>
        <TouchableOpacity 
          // onPress={() => navigation.openDrawer()}
          style={{marginLeft:5}}
          onPress={()=>navigation.navigate(`${nav}`)}
        >
          {/* <Icon name={'ios-menu'} size={24} color={'white'} /> */}
          <Icon name={'ios-chevron-back-sharp'} size={30} color={'white'} />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft:'auto'}}>
          <Icon name={'search-sharp'} size={24} color={'white'} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
      
      {/* <Text>MovieScreen</Text> */}
      <View style={{marginTop:15}}>
        <Image
            source={{uri:pic.movieImage}}
            resizeMode={'stretch'}
            style={{ height: 160,width:140, borderRadius: 5,margin:5,alignSelf:'center',aspectRatio:1}}
          /> 
      </View>
    </View>
      <View>
        <Text style={{color:'white',textAlign:'center',fontSize:26}}>{pic.movieName}</Text>
        <Text style={{color:'white',textAlign:'center',fontSize:20,marginRight:6,marginLeft:6}}>MovieGeners: {newArr.toString()}</Text>
        <Text style={{color:'white',textAlign:'center',fontSize:20,marginRight:6,marginLeft:6}}>{pic.movieDetails}</Text>
      </View>

      {dLoad ?
  
  (<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>

      <TouchableOpacity
          style={{padding:5,backgroundColor:'blue', borderRadius:5,marginRight:6,marginLeft:24}}
          // onPress={()=>makePayment()} 
          onPress={()=>navigation.navigate('VideoS',{vid:pic.videoId})}
        >
          <Text style={{color:'white',fontSize:24}}>Play Movie</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={{padding:5,backgroundColor:'blue', borderRadius:5,marginLeft:6,marginRight:24}}
          onPress={()=>starter()} 
        >
          <Text style={{color:'white',fontSize:24}}>Download</Text>
      </TouchableOpacity>

    </View>)
      :
      (<View style={{marginTop:15}}>
        <TouchableOpacity
          style={{padding:5,backgroundColor:'blue', borderRadius:5,alignSelf:'center'}}
          // onPress={()=>makePayment()} 
          onPress={()=>navigation.navigate('VideoS',{vid:pic.videoId})}
        >
          <Text style={{color:'white',fontSize:24,textAlign:'center'}}>Play Movie</Text>
        </TouchableOpacity>
      </View>)
  }

      <Modal
          animationType = {"fade"}
          transparent={true}
          visible={loading}
          onRequestClose={() => {
            // Alert.alert('Modal has now been closed.');
            setLoading(false)
          }}
        >
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <Text style={{color:'white'}}>Downloading</Text>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        </Modal>
     
        </ScrollView>

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
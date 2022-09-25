import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions } from 'react-native'
import React,{useState,useEffect,useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import MediaControls,{ PLAYER_STATES } from 'react-native-media-controls';
import Orientation from 'react-native-orientation-locker';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const VideoScreen = ({route,navigation}) => {
  const {vid} = route.params;

  const [videoLink,setVideoLink] = useState('');

  useEffect(()=>{
    fetch('http://rnflaskmongoapi-env.eba-xpzve2yf.us-east-1.elasticbeanstalk.com/getvideo', {
          method: 'POST',
          headers: {
            //Header Defination
            'Accept':'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            "id": vid
          })
        })
          .then((response) => response.json())
          .then((response) => {
            //Hide Loader
            //setLoading(false);
            console.log(response);
            // If server response message same as Data Matched
            if (response.token === 'Upload succesful') {
             
              setVideoLink(response.video)
              alert('Video link gotten')
              
              // setSta({isVis: false})
              //navigation.navigate('ElHome');
              // signIn()
            } else {
              // setErrortext(response.msg);
              // setSta({isVis: false})
              // setMerror(response.msg)
              // alert(response.msg);
              console.log('Please check your email id or password');
              console.log(response)
            }
          })
          .catch((error) => {
            // setSta({isVis: false})
            //Hide Loader
            //setLoading(false);
            console.error(error);
            
          });
  },[vid])


  // const video = require('../assets/video.mp4');
  // We will use this hook to get video current time and change it throw the player bar.
  const videoPlayer = useRef(null);
  /**
   * The following useState hooks are created to control the vide duration, if the video
   * is paused or not, the current time video, if the player is PLAYING/PAUSED/ENDED and if the video
   * is loading.
   */
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);

  // This function is triggered when the user released the player slider.
  const onSeek = (seek) => {
      videoPlayer?.current.seek(seek);
  };

  // This function is triggered when the user interact with the player slider.
  const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

  // This function is triggered when the play/pause button is pressed.
  const onPaused = (newState) => {
      setPaused(!paused);
      setPlayerState(newState);
  };

  /**
   * This function is triggered when the replay button is pressed.
   * There is a minmial bug on Android devices that does not allow the player to replay the video if changing the state to PLAYING, so we have to use the 'Platform' to fix that.
   */
  const onReplay = () => {
      videoPlayer?.current.seek(0);
      setCurrentTime(0);
      if (Platform.OS === 'android') {
          setPlayerState(PLAYER_STATES.PAUSED);
          setPaused(true);
      } else {
          setPlayerState(PLAYER_STATES.PLAYING);
          setPaused(false);
      }
  };

  // This function is triggered while the video is playing.
  const onProgress = (data) => {
      if (!isLoading) {
          setCurrentTime(data.currentTime);
      }
  };

  /**
   * This function and the next one allow us doing something while the video is loading.
   * For example we could set a preview image while this is happening.
   */
  const onLoad = (data) => {
      setDuration(Math.round(data.duration));
      setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  // This function is triggered when the player reaches the end of the media.
  const onEnd = () => {
      setPlayerState(PLAYER_STATES.ENDED);
      setCurrentTime(duration);
  };

  // useState hook to check if the video player is on fullscreen mode

  const [isFullScreen, setIsFullScreen] = useState(false);

  // This function is triggered when the user press on the fullscreen button or to come back from the fullscreen mode.
  const onFullScreen = () => {
      if (!isFullScreen) {
          Orientation.lockToLandscape();
      } else {
          if (Platform.OS === 'ios') {
              Orientation.lockToPortrait();
          }
          Orientation.lockToPortrait();
      }
      setIsFullScreen(!isFullScreen);
  };


  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: isFullScreen ? 50 : 0 }}>
          <Video
              onEnd={onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              posterResizeMode={'cover'}
              onProgress={onProgress}
              paused={paused}
              ref={(ref) => (videoPlayer.current = ref)}
              resizeMode={'cover'}
              source={{uri:videoLink}}
              style={styles.backgroundVideo}
          />
          <MediaControls
              isFullScreen={isFullScreen}
              duration={duration}
              isLoading={isLoading}
              progress={currentTime}
              onFullScreen={onFullScreen}
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              mainColor={'red'}
              playerState={playerState}
              style={isFullScreen ? styles.backgroundVideoFullScreen : styles.backgroundVideo}
              sliderStyle={isFullScreen ? { containerStyle: styles.mediaControls, thumbStyle: {}, trackStyle: {} } : { containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
          />
      </View>
    </View>
  );


  // return (
  //   <View style={{flex:1,backgroundColor:'#171717'}}>
  //       <View style={{flexDirection:'row',backgroundColor:'#000000', padding:4}}>
  //       <TouchableOpacity 
  //         // onPress={() => navigation.openDrawer()}
  //         onPress={()=>navigation.navigate('MovieS')}
  //       >
  //         {/* <Icon name={'ios-menu'} size={24} color={'white'} /> */}
  //         <Icon name={'backspace-outline'} size={24} color={'white'} />
  //       </TouchableOpacity>

  //       <TouchableOpacity style={{marginLeft:'auto'}}>
  //         <Icon name={'search-sharp'} size={24} color={'white'} />
  //       </TouchableOpacity>
  //     </View>
  //     <Text>VideoScreen</Text>
  //     <View>
  //       <VideoPlayer
  //         // video={{uri:video.vdo}}
  //         // video={{uri:`data:video/mp4;base64,${video.vdo}`}}
  //         // fullscreen={true}
  //         video={{uri:videoLink}}
  //         autoplay={false}
  //         defaultMuted={true}
  //         videoWidth={1500}
  //         videoHeight={1500} 
  //       />
  //     </View>
  //   </View>
  // )
}

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    height: 250,
    width: '100%',
},
mediaControls: {
    width: screenHeight - 170,
    height: '100%',
    flex: 1,
    alignSelf: Platform.OS === 'android' ? screenHeight < 800 ? 'center' : 'flex-start' : 'center',
},
backgroundVideoFullScreen: {
    height: screenHeight,
    width: screenWidth,
},
})
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../theauth/context';

const Payment = ({navigation}) => {

  const {setDload,setActDuration} = useContext(AuthContext);
  const [planDuration,setPlanDuration] = useState(null);
  const [planPrice,setPlanPrice] = useState(null);
  const [vsimage,sevstupImage] = useState({isVis:false})
  const [isLiked, setIsLiked] = useState([
    {id:1,name:"2 WEEK",details:'600'},
    {id:2,name:"1 MONTHS",details:'1200'},
    {id:2,name:"2 MONTHS",details:'2000'},
    {id:2,name:"3 MONTHS",details:'2500'},
    {id:2,name:"4 MONTHS",details:'3000'},
    {id:2,name:"5 MONTHS",details:'4000'},
  ])

  const onRadioBtnClick = (item) =>{
    let updateState = isLiked.map((isLikedItem)=>
    isLikedItem.id === item.id
      ? {...isLikedItem, selected: true}
      : {...isLikedItem, selected:false}
    );
    setIsLiked(updateState);
  };

  const choosePlan = (item) =>{
    setPlanDuration(item.name)
    setPlanPrice(item.details)
  }

  const makePayment = () =>{
    if(planPrice && planDuration){
      sevstupImage({isVis: true})
      setDload(true);
      setActDuration(planDuration);
    }
  }

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
        <Text style={{fontSize:24,fontWeight:"bold",marginTop:5,marginBottom:5,color:'black'}}>Payment Plan</Text>
        {isLiked.map((item)=>(
          <TouchableOpacity key={item.id} style={{flexDirection:'row',padding:12,backgroundColor:'gray',width:'45%',marginTop:5,marginBottom:5,borderRadius:5}}
            onPress={()=>choosePlan(item)}
          >
            <Text style={{color:'black'}}>{item.name}</Text>
            <Text style={{marginLeft:40,color:'black'}}>{item.details}</Text>
          </TouchableOpacity>
        ))}

        

        {/* {isLiked.map((item)=>(
          <View style={styles.radioButtonContainer}>
          <TouchableOpacity onPress={()=>onRadioBtnClick(item)} style={styles.radioButton}>
            {item.selected ? <View style={styles.radioButtonIcon}/>:null}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}}>
            <Text style={styles.radioButtonText}>{item.name}</Text>
          </TouchableOpacity>
        </View>
        ))} */}

        

      </View>
      <View>
          <View style={{flexDirection:'row', marginTop:20,width:'40%',alignSelf:'center'}}>
            <View style={{flexDirection:'column',alignContent:'flex-start'}}>
              <Text style={styles.textstyle}>Plan Choosen</Text>
              <Text style={styles.textstyle}>{planDuration}</Text>
            </View>

            <View style={{flexDirection:'column',margin:'auto'}}>
              <Text style={styles.textstyle}>Price</Text>
              <Text style={styles.textstyle}>{planPrice}</Text>
            </View>
          </View>

          <View style={{alignSelf:'center',marginTop:50}}>
          <TouchableOpacity
              style={{padding:5,backgroundColor:'blue', borderRadius:5}}
              onPress={()=>makePayment()} 
            >
              <Text style={{color:'white',fontSize:24}}>Make Payment</Text>
          </TouchableOpacity>
          </View>
        </View>
        <Modal
            animationType = {"fade"}
            transparent={true}
            visible={vsimage.isVis}
            onRequestClose={() => {
              // Alert.alert('Modal has now been closed.');
              sevstupImage({isVis: false})
            }}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style={{alignSelf:'center',backgroundColor:'white',padding:15,borderRadius:5,alignItems:'center',width:'45%'}}>
                      <Icon name={'checkmark-circle-outline'} size={90} color={'green'} />
                      <Text style={{textAlign:'center', fontSize:30,color:'green',marginBottom:5}}>Approved!</Text>
                      <TouchableOpacity style={{padding:5,backgroundColor:'green', borderRadius:5}}
                        onPress={()=>sevstupImage({isVis: false})} 
                      >
                        <Text style={{color:'white',fontSize:24,padding:5,paddingLeft:15,paddingRight:15}}>OK</Text>
                      </TouchableOpacity>
                    </View>        
               </View>
            </Modal>
    </View>
    
  )
}

export default Payment;

const styles = StyleSheet.create({
    container:{
        // flex:1,
        alignItems:'center',
        // justifyContent:'center'
    },
    radioButtonContainer:{
      flexDirection:'row',
      alignItems:'center',
      marginRight:45
    },
    radioButton:{
      height:20,
      width:20,
      backgroundColor:'#F8F8F8',
      borderRadius:10,
      borderWidth:1,
      borderColor:'#E6E6E6',
      alignItems:'center',
      justifyContent:'center'
    },
    radioButtonIcon:{
      height:14,
      width:14,
      borderRadius:7,
      backgroundColor:'#98CFB6'
    },
    radioButtonText:{
      fontSize:16,
      marginLeft:16
    },
    textstyle:{
      fontSize:16,
      color:'black',
      fontWeight:"500"
    }
})
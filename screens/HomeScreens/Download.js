import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Download = () => {
  return (
    <View style={styles.container}>
      <Text>Download</Text>
    </View>
  )
}

export default Download;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
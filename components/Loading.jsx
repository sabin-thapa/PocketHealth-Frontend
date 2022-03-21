import React from 'react'
import { View, StyleSheet} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
const Loading = () => {
  return (
    <View style = {styles.loadingContainer}>
      <ActivityIndicator 
        size='large'
        color='#6646ee'
      />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
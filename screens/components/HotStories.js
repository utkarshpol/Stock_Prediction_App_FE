import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HotStories({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>HotStories</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 70,
        justifyContent: 'center'
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function StockDetails({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>StockDetails</Text>
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
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Explore() {
  function swipeYes() {

  }

  function swipeNo() {

  }
  
  return (
    <View style={styles.container}>
      <Text>Explore</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

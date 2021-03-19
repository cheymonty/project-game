import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import {Appbar} from 'react-native-paper';

export default function MyGames() {
  return (
    <View style={styles.container}>
      <Appbar.Header statusBarHeight={Constants.statusBarHeight} style={{backgroundColor: "transparent", elevation: 0}}>
        <Appbar.Content title="My Games" titleStyle={{fontSize: 30, color: "black"}}/>
      </Appbar.Header>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

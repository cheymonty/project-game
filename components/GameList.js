import React from 'react';
import {Text, View, FlatList, Image, StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';
import AnimatedLoader from 'react-native-animated-loader';

export default function GameList({games, loading}) {
    return (
      <FlatList 
        data={games}
        renderItem={({item}) => {
          return (
            <View>
                <Image style={{height: 374, width: 264}} source={{uri: `http:${item.cover.url.replace("t_thumb", "t_cover_big")}`}}/>
                <Text>{item.name}</Text>

                <AnimatedLoader
                    visible={loading}
                    overlayColor="rgba(255,255,255,0)"
                    source={require("../assets/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                >
                </AnimatedLoader>
            </View>
          )
        }}
      
        ListEmptyComponent={_ => {
            return (
                <AnimatedLoader
                    visible={loading}
                    overlayColor="rgba(255,255,255,0)"
                    source={require("../assets/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                >
                    <Headline>Loading...</Headline>
                </AnimatedLoader>
            )
        }}
        keyExtractor={item => item.id.toString()}/>
  )
}

const styles = StyleSheet.create({
    lottie: {
      width: 100,
      height: 100
    }
})

import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import getAccessToken from '../api';
import {CLIENT_ID} from '../config';
import GameList from '../components/GameList';
import Constants from 'expo-constants';
import {Appbar, Chip} from 'react-native-paper'

export default function Home() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState("all")

  var one_month_ago = new Date()
  one_month_ago.setMonth(one_month_ago.getMonth() - 1)
  const [body, setBody] = useState(`fields name,cover.url; where release_dates.date > ${Math.floor(one_month_ago.getTime() / 1000)} & release_dates.date < ${Math.floor(new Date().getTime() / 1000)} & release_dates.region = 8; limit 50;`)
  const SWITCH = 130
  const PC = 6
  const PS4 = 48
  

  // release_dates.platform = ${SWITCH}
  

  async function getGames(platform=null) {
    setLoading(true)
    if (platform === "switch") {
      setBody(`fields name,cover.url; where release_dates.platform = ${SWITCH} & release_dates.date > ${Math.floor(one_month_ago.getTime() / 1000)} & release_dates.date < ${Math.floor(new Date().getTime() / 1000)} & release_dates.region = 8; limit 50;`)
      setSelected("switch")
    } else if (platform === "pc") {
      setBody(`fields name,cover.url; where release_dates.platform = ${PC} & release_dates.date > ${Math.floor(one_month_ago.getTime() / 1000)} & release_dates.date < ${Math.floor(new Date().getTime() / 1000)} & release_dates.region = 8; limit 50;`)
      setSelected("pc")
    } else if (platform === "all" || platform === null) {
      setBody(`fields name,cover.url; where release_dates.date > ${Math.floor(one_month_ago.getTime() / 1000)} & release_dates.date < ${Math.floor(new Date().getTime() / 1000)} & release_dates.region = 8; limit 50;`)
      setSelected("all")
    } else if (platform === "ps4") {
      setBody(`fields name,cover.url; where release_dates.platform = ${PS4} & release_dates.date > ${Math.floor(one_month_ago.getTime() / 1000)} & release_dates.date < ${Math.floor(new Date().getTime() / 1000)} & release_dates.region = 8; limit 50;`)
      setSelected("ps4")
    }

    const access_token = await getAccessToken()
    const url = "https://api.igdb.com/v4/games"
    var data = await fetch(url, {
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${access_token}` 
      },
      body: body
    }).then(response => response.json()).then(data => data) 

    console.log(data)
    setLoading(false)
    setGames(data)
  }

  //on load
  useEffect(() => {
    getGames()    
  }, [])

  return (
    <View style={styles.container}>
      <Appbar.Header statusBarHeight={Constants.statusBarHeight} style={{backgroundColor: "transparent", elevation: 0}}>
        <Appbar.Content title="Project Game" titleStyle={{fontSize: 30, color: "black"}}/>
      </Appbar.Header>


      <ScrollView style={styles.chips} horizontal showsHorizontalScrollIndicator={false}>
        <Chip mode="outlined" icon="infinity" selected={selected === "all"? true: false} onPress={() => getGames("all")}>All</Chip>
        <Chip mode="outlined" icon="microsoft-xbox" onPress={() => console.log('Pressed')}>Xbox X/S</Chip>
        <Chip mode="outlined" icon="sony-playstation" selected={selected === "ps4"? true: false} onPress={() => getGames("ps4")}>Playstation 4</Chip>
        <Chip mode="outlined" icon="nintendo-switch" selected={selected === "switch"? true: false} onPress={() => getGames("switch")}>Nintendo Switch</Chip>
        <Chip mode="outlined" icon="desktop-classic" selected={selected === "pc"? true: false} onPress={() => getGames("pc")}>PC</Chip>
      </ScrollView>

      <GameList games={games} loading={loading}/>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  chips: {
    height: 40
  }
})

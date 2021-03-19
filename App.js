import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './screens/Home';
import MyGames from './screens/MyGames';
import Explore from './screens/Explore';

const BottomTab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <BottomTab.Navigator
        tabBarOptions={{
          style: {backgroundColor: "#ffffff", borderTopWidth: 0, elevation: 0},
          activeTintColor: "#00ff00",
          showLabel: false,
        }}>
          <BottomTab.Screen 
            name="Home" 
            component={Home}
            options={{
              tabBarIcon: ({focused}) => (
                <AntDesign name="home" size={25} style={{color: focused? "#00ff00" : "#000000"}}/>
              ),
            }}
          />

          <BottomTab.Screen 
            name="Explore" 
            component={Explore}
            options={{
              tabBarIcon: ({focused}) => (
                <AntDesign name="search1" size={25} style={{color: focused? "#00ff00" : "#000000"}}/>
              ),
            }}
          />

          <BottomTab.Screen 
            name="My Games" 
            component={MyGames}
            options={{
              tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="gamepad-variant-outline" size={30} style={{color: focused? "#00ff00" : "#000000"}}/>
              ),
            }}
          />
        </BottomTab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
}



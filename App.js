import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { Text,SafeAreaView, View, TextInput, Button,Image } from "react-native";
import {createStackNavigator,createAnimatedSwitchNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { useFonts, Montserrat_400Regular,Montserrat_700Bold,Montserrat_500Medium } from "@expo-google-fonts/dev";
import Main from "./screens/Main";
import Home from "./screens/Home";
import Temples from "./screens/Temples";
import TeerthState from "./screens/TeerthState";
import TeerthCity from "./screens/TeerthCity";
import TeerthGeneral from "./screens/TeerthGeneral";
import TeerthNearMe from "./screens/TeerthNearMe";
import { getData } from './utils/functions';
import Stuti from './screens/Stuti';
import PathGeneral from './screens/PathGeneral';
import ViewPath from './screens/ViewPath';

export default function App() {
  const Stack = createStackNavigator();
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium
  });
  const [state, setState] = useState({
    gotData : false,
    timer : false,
  });

  if(!state.gotData){
    getData(state,setState);
  }



  if(fontsLoaded && state.gotData){
    return (
      <NavigationContainer>
        <StatusBar/>
        <Stack.Navigator screenOptions={{header:()=> null}} >

        
          <Stack.Screen name="Main" component={Main}></Stack.Screen>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Temples" component={Temples}></Stack.Screen>
          <Stack.Screen name="ViewPath" component={ViewPath}></Stack.Screen>
          <Stack.Screen name="Stuti" component={Stuti}></Stack.Screen>
          <Stack.Screen name="PathGeneral" component={PathGeneral}></Stack.Screen>
          <Stack.Screen name="TeerthState" component={TeerthState}></Stack.Screen>
          <Stack.Screen name="TeerthCity" component={TeerthCity}></Stack.Screen>
          <Stack.Screen name="TeerthGeneral" component={TeerthGeneral}></Stack.Screen>
          <Stack.Screen name="TeerthNearMe" component={TeerthNearMe}></Stack.Screen>

         
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }else{
    return(<Main isLoaderView={true}></Main>);
  }
}


import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import { Text,SafeAreaView, View, TextInput, Button,Image } from "react-native";
import {createStackNavigator,createAnimatedSwitchNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { useFonts, Montserrat_400Regular,Montserrat_700Bold,Montserrat_500Medium } from "@expo-google-fonts/dev";
import Login from "./screens/Login";
import EmailLogin from "./screens/EmailLogin";

export default function App() {
  const Stack = createStackNavigator();
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium
  });
  if(fontsLoaded){
    return (
      <NavigationContainer>
        <StatusBar barStyle='dark-content' backgroundColor="transparent"/>
        <Stack.Navigator screenOptions={{header:()=> null}} >
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="EmailLogin" component={EmailLogin}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }else{
    return(<Login isLoaderView={true}></Login>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from "react";
import {Animated,ActivityIndicator, useWindowDimensions,Button,Text, View, ScrollView,Image ,ImageBackground, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState,useRef,useEffect } from "react";
import styles from "../utils/styles";
import ImageWithText from "../components/ImageWithText";
import Icons from "../icons/icons";
import { TextInput } from "react-native-gesture-handler";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { navigateTo } from "../utils/functions";
import GLOBAL from "../utils/global.js";

export default function Main(props) {
    const [state, setState] = useState({
        isLoaderView: typeof(props.isLoaderView) !== "undefined" ? props.isLoaderView : false,
        isButtonLoading : {email : false, gmail : false},
    });

    
    const { height, width } = useWindowDimensions();
    const scaleLogo = useRef(new Animated.Value(350)).current;
    const showbuttons = useRef(new Animated.Value(height)).current;
  
    useEffect(()=>{
            if(!state.isLoaderView){
                navigateTo(props,'Home',{},true);
            }
            Animated.timing(scaleLogo,{
                toValue: 300,
                duration: 1000,
                useNativeDriver :false,
            }).start();
            Animated.timing(showbuttons,{
                toValue: height - 250,
                duration: 1000,
                useNativeDriver :false,
            }).start();
        
    },[])


    return ( 
        <KeyboardAwareScrollView contentContainerStyle={styles.masterContainer}>
            <ImageBackground source={Icons.stuti} 
                    style={styles.mainBG} imageStyle={{opacity : 0.6}}>
            </ImageBackground>
            <View>
                <View style={{width:"100%",alignItems:"center",position:"absolute",top:height - 350}}>
                    <Animated.Image
                        source={Icons.logo}
                        style={{width:scaleLogo, height:scaleLogo}}
                    ></Animated.Image>
                    <ActivityIndicator animating={state.isLoaderView} size="large" style={{opacity:1,marginTop:-100}} color="#ffffff" /> 
                </View>
                
     
            </View>
        </KeyboardAwareScrollView>
    );
}
import React from "react";
import {Animated,ActivityIndicator,BackHandler, useWindowDimensions,Button,Text, View, ScrollView,Image ,ImageBackground, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState,useRef,useEffect } from "react";
import styles from "../utils/styles";
import ImageWithText from "../components/ImageWithText";
import Icons from "../icons/icons";
import { TextInput } from "react-native-gesture-handler";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { loguserOut } from "../utils/functions";
import ButtonWithImage from "../components/ButtonWithImage";
import ButtonWithImageOnTop from "../components/ButtonWithImageOnTop";
import { navigateTo } from "../utils/functions";
export default function Temples(props) {
    const [state, setState] = useState({
       
    });

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', (() => handleBackButtonClick(props)));
    },[])
    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }

    return ( 
        <KeyboardAwareScrollView contentContainerStyle={styles.masterContainer}>
            <View style={[styles.container]}>
                <ImageBackground source={Icons.templesHeader} 
                        style={styles.homeHeader} imageStyle={{opacity : 0.4}}>
                </ImageBackground>
                <View>
                    <Text style={{marginTop:150,fontSize:35,color:'white',fontFamily:"Montserrat_700Bold"}}>
                        JAIN TEMPLES
                    </Text>
                </View>
                
 
                <View style={{width :"100%", marginHorizontal:"0%", flexDirection:"row", marginTop:200,justifyContent:"space-around"}}>
                    <View style={{flex : 1,alignItems:"center"}}>
                        <ButtonWithImageOnTop
                            onClick={()=> {navigateTo(props,'TeerthGeneral',{},false);}}
                            src = {Icons.templeSearch}
                            text= "General Search"
                            height = {60}
                            buttonColor = "#8AD8E2"
                            width = {60}
                        ></ButtonWithImageOnTop>
                    </View>
                    <View style={{flex : 1,alignItems:'center'}}>
                        <ButtonWithImageOnTop
                            onClick={()=> {navigateTo(props,'TeerthState',{},false);}}
                            src = {Icons.templeInState}
                            text= "Teerth in a state"
                            height = {60}
                            buttonColor = "#8AD8E2"
                            width = {60}
                        ></ButtonWithImageOnTop>
                    </View>
                    <View style={{flex : 1,alignItems:'center'}}>
                        <ButtonWithImageOnTop
                            onClick={()=> {navigateTo(props,'TeerthCity',{},false);}}
                            src = {Icons.templeInState}
                            text= "Temples in a city"
                            height = {60}
                            buttonColor = "#8AD8E2"
                            width = {60}
                        ></ButtonWithImageOnTop>
                    </View>
                </View>
                <View style={{width :"100%", marginHorizontal:"0%", flexDirection:"row",marginTop:40}}>
                    <View style={{flex : 1,alignItems:"center"}}>
                        <ButtonWithImageOnTop
                            onClick={()=> {navigateTo(props,'TeerthNearMe',{},false);}}
                            src = {Icons.templeNearMe}
                            text= "Near Me"
                            height = {50}
                            buttonColor = "#8AD8E2"
                            width = {60}
                        ></ButtonWithImageOnTop>
                    </View>
                    <View style={{flex : 1,alignItems:"center"}}>
                    </View>
                    <View style={{flex : 1,alignItems:"center"}}>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}
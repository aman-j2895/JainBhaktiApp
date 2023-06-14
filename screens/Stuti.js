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
export default function Stuti(props) {
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
                <ImageBackground source={Icons.stuti} 
                        style={styles.homeHeader} imageStyle={{opacity : 0.4}}>
                </ImageBackground>
                <View>
                    <Text style={{marginTop:150,fontSize:35,color:'white',fontFamily:"Montserrat_700Bold"}}>
                        JAIN STUTI
                    </Text>
                </View>
                
 
                <View style={{width :"100%", marginHorizontal:"0%", flexDirection:"row", marginTop:200,justifyContent:"space-around"}}>
                    <View style={{flex : 1,alignItems:"center"}}>
                        <ButtonWithImageOnTop
                            onClick={()=> {navigateTo(props,'PathGeneral',{value : 0, name : "Nitya Path"},false);}}
                            src = {Icons.book}
                            text= "Nitya Path"
                            height = {60}
                            buttonColor = "#8AD8E2"
                            width = {60}
                        ></ButtonWithImageOnTop>
                    </View>
                    <View style={{flex : 1,alignItems:'center'}}>
                        <ButtonWithImageOnTop
                            onClick={()=> {navigateTo(props,'PathGeneral',{value : 1, name : "Chalisa"},false);}}
                            src = {Icons.pray}
                            text= "Chalisa"
                            height = {60}
                            buttonColor = "#8AD8E2"
                            width = {60}
                        ></ButtonWithImageOnTop>
                    </View>
                    <View style={{flex : 1,alignItems:'center'}}>
                        <ButtonWithImageOnTop
                            onClick={()=> {navigateTo(props,'PathGeneral',{value : 2, name :"Poojan" },false);}}
                            src = {Icons.swastika}
                            text= "Poojan"
                            height = {60}
                            buttonColor = "#8AD8E2"
                            width = {60}
                        ></ButtonWithImageOnTop>
                    </View>
                </View>
                <View style={{width :"100%", marginHorizontal:"0%", flexDirection:"row",marginTop:40}}>
                    <View style={{flex : 1,alignItems:"center"}}>
                        <ButtonWithImageOnTop
                            onClick={()=> {navigateTo(props,'PathGeneral',{value : 3, name : "Aarti"},false);}}
                            src = {Icons.incense}
                            text= "Aarti"
                            height = {60}
                            buttonColor = "#8AD8E2"
                            width = {60}
                        ></ButtonWithImageOnTop>
                    </View>
                    <View style={{flex : 1,alignItems:"center"}}>
                        <ButtonWithImageOnTop
                            onClick={()=> {navigateTo(props,'PathGeneral',{value : 4, name : "Bhajan"},false);}}
                            src = {Icons.dholak}
                            text= "Bhajan"
                            height = {60}
                            buttonColor = "#8AD8E2"
                            width = {60}
                        ></ButtonWithImageOnTop>
                    </View>
                    <View style={{flex : 1,alignItems:"center"}}>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}
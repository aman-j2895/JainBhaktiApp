import React from "react";
import {Animated,ActivityIndicator,BackHandler, useWindowDimensions,Button,Text, View, ScrollView,Image ,ImageBackground, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState,useRef,useEffect } from "react";
import styles from "../utils/styles";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import ImageWithText from "../components/ImageWithText";
import Icons from "../icons/icons";
import ButtonWithImage from "../components/ButtonWithImage";
import { encodeBody, navigateTo } from "../utils/functions";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import Temples from "../components/Temples";
import ExpandableList from "../components/ExpandableList";


export default function PathGeneral(props) {
    const [state, setState] = useState({
        isLoading : true,
        selectedValue : "",
        paths : [],
    });
    useEffect(()=>{
        getPathList(state,setState);
    },[])

    function getPathList(state,setState){
        fetch(Icons.Endpoint+ 'getPathList.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: encodeBody({
                Type : props.route.params.value
            })
        })
        .then(res => res.json())
        .then(response => {
            if(!response.isError){
            setState({...state,paths: response.paths,isLoading:false});   
            }else{
            setState({...state,paths:[],isLoading:false});   
            }
        })
        .catch(error =>{ setState({...state,paths:[],isLoading :false}) 
        });   
    }

    function viewPath(id){
        navigateTo(props,'ViewPath', {value : id},false);
    }

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', (() => handleBackButtonClick(props)));
    },[])
    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }
    
    return ( 
        !state.isLoading ?
            <KeyboardAwareScrollView contentContainerStyle={styles.masterContainer}>
                <View style={[styles.container]}>
                    <View style={{position:'absolute',left:"5%",top:60,zIndex:10}}>
                        <TouchableOpacity onPress={() =>{handleBackButtonClick()}}>
                        <Image source={Icons.backbutton} style={{width:30,height:30}}></Image>
                        </TouchableOpacity>
                        <Text style={{fontFamily : 'Montserrat_500Medium',fontSize:16,marginTop:-25,marginLeft:40}}>{props.route.params.name}</Text>
                    </View>
                

                    <ExpandableList 
                     data={state.paths} 
                     onClick={viewPath}
                     isLoading={state.isLoading}
                    ></ExpandableList>
                    
                </View>
            </KeyboardAwareScrollView>
        : <View style={{alignItems:'center',marginTop:vh(40),opacity:0.7}}>
            <Image source={Icons.loading} style={{width:70,height:70}}></Image>
            <Text style={{fontFamily : 'Montserrat_400Regular',fontSize:16,marginTop:20}}>Loading ...</Text>
          </View>
    );
}
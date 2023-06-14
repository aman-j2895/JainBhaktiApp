import React from "react";
import {Animated,ActivityIndicator,BackHandler, useWindowDimensions,Button,Text, View, ScrollView,Image ,ImageBackground, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState,useRef,useEffect } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import styles from "../utils/styles";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import ImageWithText from "../components/ImageWithText";
import Icons from "../icons/icons";
import ButtonWithImage from "../components/ButtonWithImage";
import { encodeBody } from "../utils/functions";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import Temples from "../components/Temples";
import ExpandableList from "../components/ExpandableList";


export default function ViewPath(props) {
    const [state, setState] = useState({
        isLoading : true,
        selectedValue : "",
        path : {},
    });
    useEffect(()=>{
        getPathList(state,setState);
    },[])

    function getPathList(state,setState){
        fetch(Icons.Endpoint+ 'getPathDetails.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: encodeBody({
                Id : props.route.params.value
            })
        })
        .then(res => res.json())
        .then(response => {
            if(!response.isError){
            setState({...state,path: response.paths[0],isLoading:false});   
            }else{
            setState({...state,path:{},isLoading:false});   
            }
        })
        .catch(error =>{ setState({...state,paths:{},isLoading :false}) 
        });   
    }



    useEffect(()=>{
        if(state.selectedValue != ""){
            //expand that Path
        }
    },[state.selectedValue])

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
                        <Text style={{fontFamily : 'Montserrat_700Bold',fontSize:16,marginTop:-30,marginLeft:40}}>{state.path.Name}</Text>
                    </View>
                
                    <ScrollView style={{marginTop:150,width:"100%"}}>
                    <YoutubePlayer
                        style={{width:"100%"}}
                        height={300}
                        play={true}
                        videoId={state.path.YTLink}
                    />
                    <Text style={{alignSelf:"center",fontFamily : 'Montserrat_700Bold',fontSize:18}}>{state.path.Name}</Text>
                    <Text style={{alignSelf:"center",fontFamily : 'Montserrat_500Medium',fontSize:12,color:"grey",marginTop:10}}>{state.path.Info}</Text>
                    <Text style={{alignSelf:"center",fontFamily : 'Montserrat_500Medium',fontSize:14,color:"black",marginTop:20}}>{state.path.Misc}</Text>
                    <Text style={{alignSelf:"center",width:"80%",fontFamily : 'Montserrat_500Medium',fontSize:16,color:"black",marginTop:50,justifyContent:"center",alignContent:"center"}}>{state.path.Text.replace("\\r\\n","\r")}</Text>
                 
                    </ScrollView>
                    
                    
                </View>
            </KeyboardAwareScrollView>
        : <View style={{alignItems:'center',marginTop:vh(40),opacity:0.7}}>
            <Image source={Icons.loading} style={{width:70,height:70}}></Image>
            <Text style={{fontFamily : 'Montserrat_400Regular',fontSize:16,marginTop:20}}>Loading ...</Text>
          </View>
    );
}
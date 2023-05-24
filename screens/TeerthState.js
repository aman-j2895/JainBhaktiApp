import React from "react";
import {Animated,ActivityIndicator,BackHandler, useWindowDimensions,Button,Text, View, ScrollView,Image ,ImageBackground, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState,useRef,useEffect } from "react";
import styles from "../utils/styles";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import ImageWithText from "../components/ImageWithText";
import Icons from "../icons/icons";
import ButtonWithImage from "../components/ButtonWithImage";
import { encodeBody } from "../utils/functions";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import Temples from "../components/Temples";


export default function TeerthState(props) {
    const [state, setState] = useState({
        isLoading : true,
        selectedValue : "",
        isTempleLoading : false,
        states : [],
        temples : [],
    });
    useEffect(()=>{
        getStateNames(state,setState);
    },[])

    function getStateNames(state,setState){
        fetch(Icons.Endpoint+ 'getStateNames.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        })
        .then(res => res.json())
        .then(response => {
            if(!response.isError){
            setState({...state,states : response.states,isLoading:false});   
            }else{
            setState({...state,states:[],isLoading:false});   
            }
        })
        .catch(error =>{ setState({...state,isLoading :false,states : []}) 
        });   
    }



    function getTemplesByState(state,setState){
        fetch(Icons.Endpoint+ 'getTemplesByState.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: encodeBody({
              keyword : state.selectedValue
            })
        })
        .then(res => res.json())
        .then(response => {
            if(!response.isError){
            setState({...state,temples : response.temples,isTempleLoading:false});   
            }else{
            setState({...state,temples:[],isTempleLoading:false});   
            }
        })
        .catch(error =>{ setState({...state,isTempleLoading :false,temples : []}) 
        });   
    }

    useEffect(()=>{
        if(state.selectedValue != ""){
            getTemplesByState(state,setState);
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
                        <Text style={{fontFamily : 'Montserrat_500Medium',fontSize:16,marginTop:-25,marginLeft:40}}>Teerth in a state</Text>
                    </View>
                    <View style={{width: "90%",marginHorizontal:"5%"}}>
                        <Text style={{fontFamily : 'Montserrat_500Medium',fontSize:14,marginLeft:10,marginTop:120,marginBottom:5}}>Select State :</Text>
                    </View>
                    <View style={{width: "90%",paddingHorizontal:20,marginHorizontal:"5%",borderColor:"#C5C5C5",overflow:"hidden",borderWidth:1,borderRadius:50}}>
                    
                        <Picker
                             style={{width:"100%" ,height:50,width:"100%",borderWidth:0,fontFamily : 'Montserrat_400Regular'}}
                            selectedValue={state.selectedValue}
                            onValueChange={(itemValue, itemIndex) => {
                                setState({...state,selectedValue : itemValue, isTempleLoading:true})
                            }}
                        >
                            <Picker.Item style={{fontFamily : 'Montserrat_400Regular'}} label="Select State" value="notSelected" />
                            { 
                                state.states.map(function(item,index){
                                    return <Picker.Item key={"state-option"+index} style={{fontFamily : 'Montserrat_400Regular'}} label={item} value={item} />
                                }) 
                            }
                        </Picker>
                    </View>

                    <Temples 
                        temples={state.temples} 
                        showDistance={false} 
                        isLoading={state.isTempleLoading}
                    ></Temples>


                    
                </View>
            </KeyboardAwareScrollView>
        : <View style={{alignItems:'center',marginTop:vh(40),opacity:0.7}}>
            <Image source={Icons.loading} style={{width:70,height:70}}></Image>
            <Text style={{fontFamily : 'Montserrat_400Regular',fontSize:16,marginTop:20}}>Loading ...</Text>
          </View>
    );
}
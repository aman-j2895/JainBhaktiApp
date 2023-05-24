import React,{useCallback} from "react";
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
import SearchableDropDown from "react-native-searchable-dropdown";
import {debounce} from 'lodash';
import * as Location from 'expo-location';

export default function TeerthNearMe(props) {
    const [state, setState] = useState({
        isLoading : false,
        isTempleLoading : true,
        lat : "",
        long : "",
        city : "",
        temples : [],
    }); 
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
    }, []);

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', (() => handleBackButtonClick(props)));
    },[])
    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }


    useEffect(()=>{
        if(state.city !=""){
            getTemplesNearMe(state,setState);    
        } 
    },[state.city])

    function getTemplesNearMe(state,setState){
        fetch(Icons.Endpoint+ 'getTemplesNearMe.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: encodeBody({
              city : state.city,
              lat : state.lat,
              long: state.long
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

    if (location && state.city == "") {
      var long = (location.coords.longitude);
      var lat = (location.coords.latitude);
        fetch("https://api.geoapify.com/v1/geocode/reverse?lat="+lat+"&lon="+long+"&apiKey=ee342d60bbfb42b2b013102f8ca2b613", {
            method: 'GET',
        })
        .then(res => res.json())
        .then(response => {
            setState({...state, city : response.features[0].properties.city,lat : lat,long:long,isTempleLoading:true})
        })
        .catch(error =>{ setState({...state,isTempleLoading :false,temples : []}) 
        }); 
    }
    
    return ( 
            <KeyboardAwareScrollView contentContainerStyle={styles.masterContainer}>
                <View style={[styles.container]}>
                    <View style={{position:'absolute',left:"5%",top:60,zIndex:10}}>
                        <TouchableOpacity  onPress={() =>{handleBackButtonClick()}}>
                            <Image source={Icons.backbutton} style={{width:30,height:30}}></Image>
                        </TouchableOpacity>
                        <Text style={{fontFamily : 'Montserrat_500Medium',fontSize:16,marginTop:-25,marginLeft:40}}>Temples near me ({state.city}) </Text>
                    </View>
                    

                    {errorMsg ?
                    <View style={{marginTop:140,alignItems:"center"}}>
                        <Image source={Icons.templegrey} style={{width:150,height:150}}></Image>
                        <Text style={{fontFamily : 'Montserrat_500Medium',color:"#C5C5C5",textAlign:"center"}}>
                            {errorMsg}
                        </Text>
                    </View>
                    : 
                    <View style={{marginTop:100,width:"100%"}}>
                    <Temples 
                        temples={state.temples} 
                        showDistance={true} 
                        isLoading={state.isTempleLoading}
                    ></Temples>
                    </View>
                    }

                
                </View>
            </KeyboardAwareScrollView>
    
    );
}
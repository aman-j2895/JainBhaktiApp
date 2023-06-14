import React,{useCallback} from "react";
import {Animated,ActivityIndicator,BackHandler, useWindowDimensions,Button,Text, View, ScrollView,Image ,ImageBackground, TouchableOpacity, Keyboard} from "react-native";
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

export default function TeerthCity(props) {
    const [state, setState] = useState({
        isLoading : false,
        isTempleLoading : false,
        showSuggestion : true,
        searchText : [],
        temples : [],
    });
    const [showSuggestion, setshowSuggestion] = useState(true);
    useEffect(()=>{
        if(state.searchText != ""){
            const delayDebounceFn = setTimeout(() => {
                getTemplesByName(state,setState);
              }, 1500)
          
              return () => clearTimeout(delayDebounceFn)
            
        }else{
            setState({...state, temples:[]})
        }
    },[state.searchText])

    const hideSuggestion = debounce((value) => {
        setshowSuggestion(false);
      }, 300);


    function getTemplesByName(state,setState){
        fetch(Icons.Endpoint+ 'getTemplesByName.php/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: encodeBody({
              keyword : state.searchText
            })
        })
        .then(res => res.json())
        .then(response => {
            console.log("response>>>>",response);
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
        BackHandler.addEventListener('hardwareBackPress', (() => handleBackButtonClick(props)));
    },[])
    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }
    
    return ( 
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.masterContainer}>
                <View style={[styles.container]}>
                    <View style={{position:'absolute',left:"5%",top:60,zIndex:10}}>
                        <TouchableOpacity  onPress={() =>{handleBackButtonClick()}}>
                            <Image source={Icons.backbutton} style={{width:30,height:30}}></Image>
                        </TouchableOpacity>
                        <Text style={{fontFamily : 'Montserrat_500Medium',fontSize:16,marginTop:-25,marginLeft:40}}>General Search</Text>
                    </View>
                    <View style={{width: "90%",marginHorizontal:"5%"}}>
                        <Text style={{fontFamily : 'Montserrat_500Medium',fontSize:14,marginLeft:10,marginTop:120,marginBottom:5}}>Select for temple / city :</Text>
                    </View>
                    <View style={{width: "90%",paddingHorizontal:20,marginHorizontal:"5%",borderColor:"#C5C5C5",overflow:"hidden",borderWidth:1,borderRadius:50}}>
                        <TextInput
                            style={{height:50}}
                            placeholder="Search for temples ..."
                            onFocus={() => {setshowSuggestion(true)}}
                            onBlur={() => hideSuggestion(state.searchText)}
                            value={state.searchText}
                            onChangeText={(text)=>setState({...state,searchText:text})}
                        >
                        </TextInput>
                    </View>
                    {showSuggestion ?
                    <View style={{width:"80%",maxHeight:215,overflow:"scroll",zIndex:10}}>
                        {state.temples.map(function(item,index){
                            return(
                                <TouchableOpacity key={"suggestion-"+index} onPress={() => {Keyboard.dismiss(); setState({...state,searchText :item.temple_name, showSuggestion:false});} }>
                                    <View style={{borderWidth:1,borderColor:"#c5c5c5",paddingVertical:10,paddingHorizontal:20}}>
                                        <Text style={{fontSize:16 ,fontFamily : 'Montserrat_700Bold',maxWidth:"90%",color:"#000000"}} >{item.temple_name}</Text>
                                        <Text style={{fontSize:14 ,fontFamily : 'Montserrat_500Medium',maxWidth:"90%",color:"#c5c5c5"}}>{item.temple_address}</Text>
                                        <Text style={{fontSize:14 ,fontFamily : 'Montserrat_500Medium',maxWidth:"90%",color:"#c5c5c5"}}>{item.temple_town}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    : null}

                    <Temples 
                        temples={state.temples} 
                        showDistance={false} 
                        isLoading={state.isTempleLoading}
                    ></Temples>


                    
                </View>
            </KeyboardAwareScrollView>
    
    );
}
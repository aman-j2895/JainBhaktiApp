
import React from 'react';
import {View,Text,Image,TouchableOpacity,ImageBackground} from 'react-native';
import styles from '../utils/styles'
import Icons from "../icons/icons";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { useState,useRef,useEffect } from "react";

export default function Temples(props) {
    const [state, setState] = useState({
      temples : applySort(props.temples,""),
      sortType : "",
      showFilter : false
    });

    useEffect(() => {
      setState({...state,temples : applySort(props.temples,state.sortType)});
    }, [props.temples,state.sortType]);

    useEffect(() => {
      setState({...state,temples : applySort(props.temples,state.sortType),sortType:""});
    }, [props.temples]);

    function applySort(temples,sortType){
      switch(sortType){
        case "":
          return temples;
          break;
        case "Atishay":
          var temp = [];
          for(let i=0;i<temples.length;i++){
            if(temples[i].temple_teerth_info == "1"){
              temp.push(temples[i]);
            }
          }
          return temp;
          break;
        case "Sidhh":
          var temp = [];
          for(let i=0;i<temples.length;i++){
            if(temples[i].temple_teerth_info == "2"){
              temp.push(temples[i]);
            }
          }
          return temp;
          break;
        default : 
          return temples;
          break;
      }
    }


    function setSortType(sortType){
      setState({...state,sortType : sortType,showFilter:false})
    }



    function getTeerthInfo(info){
      switch(info){
        case "0":
          return "Temple";
          break;
        case "1":
          return "Atishay kshetra";
          break;
        case "2":
          return "Sidhh kshetra";
          break;
        default : 
          return "Temple";
          break;
      }

    }

    if (props.isLoading){
      return (
        <View style={{alignItems:'center',marginTop:vh(20),opacity:0.7}}>
          <Image source={Icons.loading} style={{width:70,height:70}}></Image>
          <Text style={{fontFamily : 'Montserrat_400Regular',fontSize:16,marginTop:20}}>Loading ...</Text>
        </View>
      )
    }

    return(
        
        <View style={{width:"100%",marginTop:30}}>
          <View style={{display: props.temples.length > 0 ? "flex" : "none"}}>
          <Text style={{fontFamily : 'Montserrat_700Bold',marginLeft:"5%"}}>Found {state.temples.length} Results</Text>
          <TouchableOpacity style={{position:"absolute",right:"5%",top:0}} onPress={() => {setState({...state, showFilter: !state.showFilter})}}>
            <Image source={Icons.filter} style={{width:20,height:20}}></Image>
          </TouchableOpacity>
          </View>
          <View style={{marginTop:15}}>
          {state.showFilter ?
          <View>
            <TouchableOpacity onPress={() =>setSortType("")}>
              <Text style={{fontFamily : state.sortType == "" ? 'Montserrat_700Bold' : 'Montserrat_500Medium',paddingVertical:15,paddingHorizontal:"5%",borderColor:"#c5c5c5",borderWidth:1,color:"#000000"}}>Sort By Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>setSortType("Atishay")}>
              <Text style={{fontFamily : state.sortType == "Atishay" ? 'Montserrat_700Bold' : 'Montserrat_500Medium',paddingVertical:15,paddingHorizontal:"5%",borderColor:"#c5c5c5",borderWidth:1,color:"#000000"}}>Atishay Kshetra</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>setSortType("Sidhh")}>
              <Text style={{fontFamily : state.sortType == "Sidhh" ? 'Montserrat_700Bold' : 'Montserrat_500Medium',paddingVertical:15,paddingHorizontal:"5%",borderColor:"#c5c5c5",borderWidth:1,color:"#000000"}}>Sidhha Kshetra</Text>
            </TouchableOpacity>
          </View>:null}


          {state.temples.map(function(item,index){
            return(
            <View>
            <View style={{flexDirection:'row', borderTopWidth:1,borderBottomWidth:1,borderColor:"#C5C5C5",marginTop:0}}>
              <View style={{padding:10,paddingLeft:15}}>
                <Image source={Icons.temple} style={{width:50,height:50}}></Image>
              </View>
              <View style={{padding:10}}>
                <Text style={{fontSize:16 ,fontFamily : 'Montserrat_700Bold',maxWidth:"80%",color:"#000000"}}>{item.temple_name}</Text>
                <Text style={{fontSize:12,marginTop:5,fontFamily : 'Montserrat_500Medium',maxWidth:"80%",color:"#C5C5C5"}}>{getTeerthInfo(item.temple_teerth_info)}</Text>
                <Text style={{fontSize:12,fontFamily : 'Montserrat_500Medium',maxWidth:"80%",color:"#C5C5C5"}}>{item.temple_address}{item.temple_town}</Text>
             </View>
            </View>
            {props.showDistance ? 
              <View style={{position:"absolute",bottom:20,right:40,zIndex:10,flexDirection:"row"}}>
                <Image source={Icons.distance} style={{width:20,height:20}}></Image>
                <Text style={{fontSize:12,paddingHorizontal:10,fontFamily : 'Montserrat_500Medium',maxWidth:"80%",color:"#000000"}}>{item.distance}</Text>
              </View> : null
            }
            </View>
            )
          })}
        </View>
          
        {state.temples.length == 0 ?
        <View style={{marginTop:40,alignItems:"center"}}>
          <Image source={Icons.templegrey} style={{width:150,height:150}}></Image>
          <Text style={{fontFamily : 'Montserrat_500Medium',color:"#C5C5C5",textAlign:"center"}}>
            No temples found
          </Text>
          <Text style={{fontFamily : 'Montserrat_500Medium',color:"#C5C5C5",textAlign:"center"}}>
            for your search
          </Text>
        </View> : null}
        </View>
        
        
         

      

  );

}

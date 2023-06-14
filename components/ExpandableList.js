
import React from 'react';
import {View,Text,Image,TouchableOpacity,ImageBackground,Platform} from 'react-native';
import styles from '../utils/styles'
import Icons from "../icons/icons";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { useState,useRef,useEffect } from "react";


export default function ExpandableList(props) {
    const [state, setState] = useState({
      data : props.data,
    });


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
          <View style={{marginTop:80}}>


          {state.data.map(function(item,index){
            return(
            <TouchableOpacity onPress={() => props.onClick(item.Id)}>
            <View style={{flexDirection:'row', borderTopWidth:1,borderBottomWidth:1,borderColor:"#C5C5C5",marginTop:0}}>
              <View style={{padding:10,paddingLeft:15}}>
                <Image source={Icons.book} style={{width:50,height:50}}></Image>
              </View>
              <View style={{padding:10}} >
                <Text style={{fontSize:16 ,fontFamily : 'Montserrat_700Bold',color:"#000000"}}>{item.Name}</Text>
                <Text style={{fontSize:12,marginTop:5,fontFamily : 'Montserrat_500Medium',maxWidth:"80%",color:"#C5C5C5"}}>{item.Info}</Text>
             </View>
            </View>
            </TouchableOpacity>
            )
          })}
        </View>
          
        {state.data.length == 0 ?
        <View style={{marginTop:40,alignItems:"center"}}>
          <Image source={Icons.templegrey} style={{width:150,height:150}}></Image>
          <Text style={{fontFamily : 'Montserrat_500Medium',color:"#C5C5C5",textAlign:"center"}}>
            No Data found
          </Text>
          <Text style={{fontFamily : 'Montserrat_500Medium',color:"#C5C5C5",textAlign:"center"}}>
            for your search
          </Text>
        </View> : null}
        </View>
        
        
         

      

  );

}

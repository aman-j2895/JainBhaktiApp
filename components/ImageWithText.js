
import React from 'react';
import {View,Text,Image} from 'react-native';
import styles from '../utils/styles'

export default function ImageWithText(props) {
    //props
      //src
      // text
      // subtext
      //height
      // borderRadius
      // width
      
    return(
        <View style={{alignItems:'center', paddingVertical : props.paddingVertical}}>
            <View style={{padding:30, backgroundColor :"#37abfb", borderRadius:100}}>
            <Image
            style={{width : props.width,height : props.height, borderRadius : props.borderRadius}}
            source={props.src}
            />
            </View>
            <Text style={{fontSize:18,paddingTop:10,fontFamily : 'Montserrat_400Regular',color:'white'}}>{props.text}</Text>
            <Text style={{fontSize:12,paddingTop:10,fontFamily : 'Montserrat_400Regular', color:'white'}}>{props.subtext}</Text>
        </View>

  );

}


import React from 'react';
import {View,Text,Image,TouchableOpacity,ImageBackground} from 'react-native';
import styles from '../utils/styles'

export default function ButtonWithImageOnTop(props) {
    //props
      // src
      // text
      // subtext
      // height
      // width
      
    return(
        <TouchableOpacity 
          onPress={props.onClick}
          style={{alignItems:'center',width : props.width,justifyContent:"center"}}
        >
          
            <Image source={props.src}
                        style={{height: props.height,
                          width: props.height}}>
            </Image>
            <Text style={{fontSize:12,zIndex:1,paddingTop:10,textAlign:"center",fontFamily : 'Montserrat_500Medium',color:'#000000'}}>{props.text}</Text>
            
          
        </TouchableOpacity>

  );

}

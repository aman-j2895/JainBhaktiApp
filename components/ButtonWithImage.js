
import React from 'react';
import {View,Text,Image,TouchableOpacity,ImageBackground} from 'react-native';
import styles from '../utils/styles'

export default function ButtonWithImage(props) {
    //props
      // src
      // text
      // subtext
      // height
      // width
      
    return(
        <TouchableOpacity 
          onPress={props.onClick}
          style={{alignItems:'center',width : props.width,height : props.height,borderRadius:10, overflow:"hidden"}}
        >
          <View style={{width : props.width, backgroundColor :"#37abfb"}}>
            <Text style={{fontSize:18,zIndex:1,paddingTop:10,paddingLeft:10,fontFamily : 'Montserrat_700Bold',color:'white'}}>{props.text}</Text>
            <Text style={{fontSize:12,zIndex:1,paddingTop:10,paddingLeft:10,fontFamily : 'Montserrat_500Medium', color:'white'}}>{props.subtext}</Text>
            <ImageBackground source={props.src}
                        style={{height: props.height,
                          position:"absolute",
                          backgroundColor : props.buttonColor,
                          width: props.width}} imageStyle={{opacity : 0.3}}>
            </ImageBackground>
            
           
          </View>
        </TouchableOpacity>

  );

}

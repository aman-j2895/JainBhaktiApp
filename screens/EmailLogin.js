import React from "react";
import {Animated,BackHandler, useWindowDimensions,Button,Text, View, ScrollView,Image ,ImageBackground, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState,useRef,useEffect } from "react";
import styles from "../styles";
import ImageWithText from "../components/ImageWithText";
import Icons from "../icons/icons";
import { TextInput } from "react-native-gesture-handler";

export default function EmailLogin(props) {
    const [state, setState] = useState({
       
    });
    const { height, width } = useWindowDimensions();
    const scaleLogo = useRef(new Animated.Value(300)).current;
    const marginTop = useRef(new Animated.Value(height)).current;
    const topPosition = useRef(new Animated.Value(100)).current;
    const showbuttons = useRef(new Animated.Value(height)).current;
    
  
    useEffect(()=>{
        Animated.timing(scaleLogo,{
            toValue: 250,
            duration: 1000,
            useNativeDriver :false,
        }).start();
        Animated.timing(topPosition,{
            toValue: 50,
            duration: 1000,
            useNativeDriver :false,
        }).start();
        Animated.timing(marginTop,{
            toValue:  height - 450,
            duration: 1000,
            useNativeDriver :false,
        }).start();
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    },[])

    function handleBackButtonClick(){
      //props.navigation.replace('Login', {}) 
    }
   
    
    
    


    return ( 
        <KeyboardAwareScrollView contentContainerStyle={styles.masterContainer}>
            <ImageBackground source={Icons.mainbg} 
                    style={styles.mainBG} imageStyle={{opacity : 0.2}}>
            </ImageBackground>
            <View>
                <Animated.View style={{width:"100%",alignItems:"center",position:"absolute",top:topPosition}}>
                    <Animated.Image
                        source={Icons.logo}
                        style={{width:scaleLogo, height:scaleLogo}}
                    ></Animated.Image>
        
                </Animated.View>
                
             
                <Animated.View style={{width:"100%",marginTop:marginTop}}>
                
                    <View style={{marginHorizontal:"10%"}}>
                        <Text style={{fontFamily:styles.COLORS.fontBold,fontSize:12,marginLeft:20,color:styles.COLORS.bgPrimary,marginBottom:10}}>Email</Text>
                        <TextInput 
                            style={{padding:15,paddingLeft:25, width: '100%',fontSize:12,backgroundColor:styles.COLORS.bgSecondary,fontFamily : styles.COLORS.fontReg,borderRadius:40,color:"white" }}
                            placeholder = 'Email Address'
                            placeholderTextColor="#fff" 
                        /> 
                    </View>
                    <View style={{marginHorizontal:"10%",marginTop:20}}>
                        <Text style={{fontFamily:styles.COLORS.fontBold,fontSize:12,marginLeft:20,color:styles.COLORS.bgPrimary,marginBottom:5}}>Password</Text>
                        <TextInput 
                            style={{padding:15,paddingLeft:25, width: '100%',fontSize:12,backgroundColor:styles.COLORS.bgSecondary,fontFamily : styles.COLORS.fontReg,borderRadius:40,color:"white" }}
                            placeholder = 'Password'
                            placeholderTextColor="#fff" 
                        /> 
                    </View>

                    {/* Main Content */}
                    
                    <TouchableOpacity style={{alignItems:"center",marginTop:20,marginHorizontal:"10%"}}>
                        <View style={{
                            backgroundColor:styles.COLORS.bgPrimary,
                            borderRadius:50,
                            paddingVertical:15,
                            width:"100%",
                            alignItems:"center",
                        }}>
                            <Text style={{
                                color:"white",
                                fontFamily:styles.COLORS.fontBold
                            }}>
                                    Sign in Using Email
                            </Text>
                            <Image 
                                source={Icons.email}
                                style={{position:"absolute",left:20,top:15,width:20, height:20}}
                            ></Image>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </KeyboardAwareScrollView>
    );
}
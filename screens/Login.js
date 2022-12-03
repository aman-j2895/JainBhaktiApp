import React from "react";
import {Animated,ActivityIndicator, useWindowDimensions,Button,Text, View, ScrollView,Image ,ImageBackground, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState,useRef,useEffect } from "react";
import styles from "../styles";
import ImageWithText from "../components/ImageWithText";
import Icons from "../icons/icons";
import { TextInput } from "react-native-gesture-handler";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

export default function Login(props) {
    const [state, setState] = useState({
        isLoaderView: typeof(props.isLoaderView) !== "undefined" ? props.isLoaderView : false
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '444043554706-55pag2vpgosu36bo5ph5knlkfs0r6jle.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    });
    
    React.useEffect(() => {
    if (response?.type === 'success') {
        const { authentication } = response;
        console.log(authentication);
    }
    }, [response]);

    const { height, width } = useWindowDimensions();
    const scaleLogo = useRef(new Animated.Value(350)).current;
    const showbuttons = useRef(new Animated.Value(height)).current;
    
  
    useEffect(()=>{
        if (!state.isLoaderView){
            Animated.timing(scaleLogo,{
                toValue: 300,
                duration: 1000,
                useNativeDriver :false,
            }).start();
            Animated.timing(showbuttons,{
                toValue: height - 250,
                duration: 1000,
                useNativeDriver :false,
            }).start();
        }
    },[])
    
    
    


    return ( 
        <KeyboardAwareScrollView contentContainerStyle={styles.masterContainer}>
            <ImageBackground source={Icons.mainbg} 
                    style={styles.mainBG} imageStyle={{opacity : 0.2}}>
            </ImageBackground>
            <View>
                <View style={{width:"100%",alignItems:"center",position:"absolute",top:100}}>
                    <Animated.Image
                        source={Icons.logo}
                        style={{width:scaleLogo, height:scaleLogo}}
                    ></Animated.Image>
                    <ActivityIndicator animating={state.isLoaderView} size="large" style={{opacity:1}} color="#999999" /> 
                </View>
                
                {!state.isLoaderView ? 
                <Animated.View style={{width:"100%", position: "absolute", top:showbuttons}}>

                    {/* Main Content */}
                    <TouchableOpacity 
                        onPress={()=>promptAsync()}
                        style={{alignItems:"center",marginHorizontal:"10%",width:"80%",marginTop:20}}
                    >
                        <Animated.View style={{
                            backgroundColor:"white",
                            borderRadius:50,
                            paddingVertical:15,
                            width:"100%",
                            alignItems:"center",
                        }}>
                            <Text style={{
                                fontFamily:styles.COLORS.fontBold
                            }}>
                                    Sign in Using Google
                            </Text>
                            <Image 
                                source={Icons.google}
                                style={{position:"absolute",left:20,top:15,width:20, height:20}}
                            ></Image>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{alignItems:"center",marginTop:20,marginHorizontal:"10%"}}
                        onPress={()=>{props.navigation.navigate('EmailLogin',{})}}
                    >
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
                    <TouchableOpacity style={{alignItems:"center",marginHorizontal:"20%",marginTop:20}}>
                        <Text style={{color:"white",fontFamily:styles.COLORS.fontBold,fontSize:12}}>
                            New User? Sign up <Text style={{textDecorationLine:"underline"}}>here</Text>
                        </Text>
                    </TouchableOpacity>
                </Animated.View> : React.null}
            </View>
        </KeyboardAwareScrollView>
    );
}
import React from "react";
import {Animated,ActivityIndicator,BackHandler, useWindowDimensions,Button,Text, View, ScrollView,Image ,ImageBackground, TouchableOpacity} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState,useRef,useEffect } from "react";
import styles from "../utils/styles";
import ImageWithText from "../components/ImageWithText";
import Icons from "../icons/icons";
import ButtonWithImage from "../components/ButtonWithImage";
import { navigateTo } from "../utils/functions";

export default function Home(props) {
    const [state, setState] = useState({
    });

    const scalePage = useRef(new Animated.Value(1000)).current;
  
    useEffect(()=>{
            Animated.timing(scalePage,{
                toValue: 0,
                duration: 700,
                useNativeDriver :false,
            }).start();
            BackHandler.addEventListener('hardwareBackPress', (() => handleBackButtonClick(props)));
    },[])

    const goToTemples = () => {
        navigateTo(props,'Temples',{},false);
    }

    const goToStuti = () => {
        navigateTo(props,'Stuti',{},false);
    }
    


    return ( 
        <KeyboardAwareScrollView contentContainerStyle={styles.masterContainer}>
            <Animated.View style={[styles.container, {marginTop:scalePage}]}>
                <ImageBackground source={Icons.homeHeader} 
                        style={styles.homeHeader} imageStyle={{opacity : 0.5}}>
                </ImageBackground>
                <View>
                    <Image
                        source={Icons.logo}
                        style={{width:250, marginTop:20, height:250}}
                    ></Image>
                </View>
                

                <View style={{width :"90%", marginHorizontal:"5%",flexDirection:"row", marginTop:100}}>
                    <View style={{flex : 1,marginHorizontal:10}}>
                        <ButtonWithImage
                            src = {Icons.button1}
                            onClick={goToTemples}
                            text= "Temples"
                            subtext = "Locate temples around the world"
                            height = {120}
                            buttonColor = "#8AD8E2"
                            width = "100%"
                        ></ButtonWithImage>
                    </View>
                    <View style={{flex : 1,marginHorizontal:10}}>
                        <ButtonWithImage
                            src = {Icons.button2}
                            onClick={goToStuti}
                            text= "Stuti"
                            subtext = "Puja, Nitya Path, Chalisa and more ..."
                            height = {120}
                            buttonColor = "#FF9D9D"
                            width = "100%"
                        ></ButtonWithImage>
                    </View>
                </View>

                <View style={{width :"90%", marginHorizontal:"5%",flexDirection:"row"}}>
                    <View style={{marginTop:20,flex : 1,marginHorizontal:10}}>
                        <ButtonWithImage
                            src = {Icons.button3}
                            text= "Learn Jainism"
                            subtext = "Shivirs, Higher education, Scholarships and more ..."
                            height = {100}
                            buttonColor = "#F9AFF1"
                            width = "100%"
                        ></ButtonWithImage>
                    </View>
                </View>
                <View style={{width :"90%", marginHorizontal:"5%",flexDirection:"row", marginTop:20}}>
                    <View style={{flex : 1,marginHorizontal:10}}>
                        <ButtonWithImage
                            src = {Icons.button1}
                            text= "Kids Section"
                            subtext = "Bal Bodh, Animations, Stories and more ..."
                            height = {140}
                            buttonColor = "#8AD8E2"
                            width = "100%"
                        ></ButtonWithImage>
                    </View>
                    <View style={{flex : 1,marginHorizontal:10}}>
                        <ButtonWithImage
                            src = {Icons.button2}
                            text= "Creative Corner"
                            subtext = "Learn bhaktamar, Disease free life and more ..."
                            height = {140}
                            buttonColor = "#FF9D9D"
                            width = "100%"
                        ></ButtonWithImage>
                    </View>
                </View>

                
            </Animated.View>
        </KeyboardAwareScrollView>
    );
}
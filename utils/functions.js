
import { Platform } from "react-native";
import GLOBAL from "./global.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

function encodeBody(json){
    var formBody = [];
    for (var property in json) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(json[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody
}

function navigateTo(props,location,value,noback=false){
  if (noback) {
    props.navigation.replace(location,value);
  }else{
    props.navigation.navigate(location,value);
  }
 
}

function loguserOut(props){
  setValues({'token': "", 'email' : "", 'username': ""});
  GLOBAL.TOKEN = ""
  GLOBAL.EMAIL = ""
  GLOBAL.USERNAME = ""
  props.navigation.replace('Login', {}) //go to home screen
}

const getData = async (state,setState) => {
  if (Platform.OS !== 'web') {
    try {
      
      const value = await AsyncStorage.getItem('session-token');
      if(value !== null) {
        var resp= JSON.parse(value);
        GLOBAL.TOKEN = resp.token
        GLOBAL.EMAIL = resp.email
        GLOBAL.USERNAME = resp.username
      }
      setState({...state,gotData : true})

    } catch(e) {
      setState({...state,gotData : true})
    }
  }else{
    try {
      const value = localStorage.getItem('session-token');
      var resp= JSON.parse(value);
      GLOBAL.TOKEN = resp.token
      GLOBAL.EMAIL = resp.email
      GLOBAL.USERNAME = resp.username      
      setState({...state,gotData : true})
    }
    catch(e) {
      setState({...state,gotData : true})
    }
  }
}

const setValues = async (value) => {
  if (Platform.OS !== 'web') {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('session-token', jsonValue)
    } catch (e) {
      // saving error
    }
  }else{
    const jsonValue = JSON.stringify(value);
    localStorage.setItem('session-token',jsonValue);
  }
}



export {encodeBody,navigateTo,getData,setValues,loguserOut}
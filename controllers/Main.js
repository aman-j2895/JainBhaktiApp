import Icons from "../icons/icons";
import { encodeBody, navigateTo, setValues } from "../utils/functions";
import GLOBAL from "../utils/global.js";

function googleLogin(state,setState,props,authToken){
    setState({...state,isLoaderView : true});
    fetch(Icons.Endpoint+ 'googleLogin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: encodeBody({
        authtoken : authToken
      })
    })
    .then(res => res.json())
    .then(response => {
      setState({...state,isLoaderView : false});
      if(!response.isError){
        GLOBAL.TOKEN = response.token
        GLOBAL.EMAIL = response.email
        GLOBAL.USERNAME = response.userName

        setValues({'token': response.token, 'email' : response.email, 'username': response.userName}); 
        if(response.doesAccountExist){
            navigateTo(props,'Home',{},true);
        }else{
            navigateTo(props,'Home',{},true);
        }
      }else{

      }
    })
    .catch(error =>{  });
}

export {googleLogin}
import GLOBAL from "../src/Controller/global.js";

function getStrings(){
var strings ={};
var language = GLOBAL.LANGUAGE;
strings = {
   googleSignIn : "Sign in Using Google",
   emailSignIn : "Sign in Using Email",
   newUser : "New User? Sign up",
   here: "here",
   email : "Email",
   emailPlaceholder : "Email Address",
   password : "Password",
}
return strings
}

export {getStrings};

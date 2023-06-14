import {StyleSheet} from 'react-native'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const COLORS = {
    bgPrimary: '#FF6160',
    bgSecondary: '#292B3A',
    bgTertiary:'#ffffff',
    bgHeader: '#1B1B1D',
    bgHeaderTemp: '#2C3265', 
    fontBold : 'Montserrat_700Bold',
    fontMed : 'Montserrat_500Medium',
    fontReg : 'Montserrat_400Regular',
    white : "white"
  };

export default StyleSheet.create({
  masterContainer : {
    backgroundColor : COLORS.bgTertiary,
    height : "100%",
    overflow:"hidden",
    width: "100%",
    flex:1,
    display:'flex'
  },
  container: {
    padding:0,
    backgroundColor: COLORS.bgTertiary,
    width: '100%',
    borderTopLeftRadius : 50,
    alignItems: 'center',
  },
  mainBG : {
    height: vh(100) + Constants.statusBarHeight + 2,
    position:"absolute",
    backgroundColor : "#000000",
    width: "100%",
  },
  homeHeader:{
    height: 300 + Constants.statusBarHeight + 2,
    position:"absolute",
    backgroundColor : COLORS.bgSecondary,
    width: "100%",
  },
  header:{
    width:"100%",
    backgroundColor:COLORS.bgHeader,
    padding: (Platform.OS !== 'web') ? 50 : 0,
    flex : 1,
    flexDirection:"row",
    justifyContent: "space-evenly"
  },
  headerImage:{
    position:'relative',
    bottom:  (Platform.OS !== 'web') ? 20 : 0
  },
  bottomImage:{
    borderTopColor:COLORS.bgPrimary,
    padding:20,
    alignItems:'center'
  },
  bottomButtonText:{
    fontFamily:COLORS.fontReg,
    fontSize:10,
    marginTop:6
  },
  bottomButtons:{
    width:"100%",
    position:"absolute",
    top: (Platform.OS !== 'web') ? vh(100)-40 : vh(100) - 70, 
    height:100,
    backgroundColor:COLORS.bgHeader,
    flex : 1,
    flexDirection:"row",
    justifyContent: "space-around"
  },
  COLORS
   
});


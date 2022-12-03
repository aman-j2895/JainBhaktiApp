import {StyleSheet} from 'react-native'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import Constants from 'expo-constants'

const COLORS = {
    bgPrimary: '#FF6160',
    bgSecondary: '#292B3A',
    bgTertiary:'#141515',
    bgHeader: '#1B1B1D',
    fontBold : 'Montserrat_700Bold',
    fontMed : 'Montserrat_500Medium',
    fontReg : 'Montserrat_400Regular',
    white : "white"
  };

export default StyleSheet.create({
  masterContainer : {
    backgroundColor : COLORS.bgPrimary,
    height : "100%",
    overflow:"hidden",
    width: "100%",
    flex:1,
    display:'flex'
  },
  container: {
    padding:0,
    backgroundColor: COLORS.bgSecondary,
    width: '100%',
    borderTopLeftRadius : 50,
    alignItems: 'center',
  },
  mainBG : {
    height: vh(100) + Constants.statusBarHeight + 2,
    position:"absolute",
    backgroundColor : COLORS.bgTertiary,
    width: "100%",
  },
  COLORS
   
});


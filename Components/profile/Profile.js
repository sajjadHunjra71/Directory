import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import EditProfile from './EditProfile'
import {path} from '../BaseUrl';

import ChangePassword from './ChangePassword'
import { COLORS, SIZES, images, icons } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Feather, Ionicons } from 'react-native-vector-icons';
import { Overlay } from 'react-native-elements';
import Login from '../Login';
import Splash from '../Splash'
export default function Profile({ navigation }) {
  
  const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const expireSeesion=async()=>{
      await AsyncStorage.clear();
      let v = await AsyncStorage.getItem('session')
      let c = JSON.parse(v)
      console.log(c)
      navigation.navigate('Splash')
    }
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.headCurve}>
        <View style={styles.logview}>
          <Text style={styles.logtxt}>Profil</Text>
        </View>
        <View style={styles.logview}>
          <Text style={styles.lowerTXt}>Bearbeite dein Profil</Text>
        </View>
      </View>


      <View style={styles.box}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.innerBox}>
          <View style={styles.smallIcon}>
            <Image source={icons.user} style={styles.pic} />

          </View>
          <View style={styles.largIcon}>
            <Text style={styles.text}>Benutzerdetail</Text>
          </View>
          <View style={styles.smallIcon}>
            <Ionicons name='chevron-forward-outline' size={20} />
          </View>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} style={styles.innerBox}>
          <View style={styles.smallIcon}>
            <Image source={icons.changePassword} style={styles.pic} />
          </View>
          <View style={styles.largIcon}>
            <Text style={styles.text}>Kennwort ändern</Text>
          </View>
          <View style={styles.smallIcon}>
            <Ionicons name='chevron-forward-outline' size={20} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleOverlay} style={styles.innerBox}>
          <View style={styles.smallIcon}>
            <Image source={icons.exit} style={styles.pic} />
          </View>
          <View style={styles.largIcon}>
            <Text style={styles.text}>Ausloggen</Text>
          </View>
          <View style={styles.smallIcon}>
            <Ionicons name='chevron-forward-outline' size={20} />
          </View>
        </TouchableOpacity>

      </View>

      <Overlay overlayStyle={styles.over}  isVisible={visible} >
        <View style={styles.in1}>
          <Text style={styles.txtIn}>Sind Sie sicher, dass Sie sich abmelden möchten</Text>
        </View>
        <View style={styles.in1}>
          <TouchableOpacity onPress={toggleOverlay} style={styles.btnLog}>
            <Text style={styles.txtIn}>NEIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={expireSeesion} style={styles.btnLog}>
            <Text style={styles.txtIn}>Ja</Text>
          </TouchableOpacity>

        </View>

      </Overlay>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  btnLog:{
    width:70,
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:0.3
  },
  txtIn:{
    fontWeight:'700',
    fontSize:SIZES.body3
  },
  in1:{
    width:'100%',
    height:'50%',
    // backgroundColor:'gray',
    borderWidth:0.5,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    height: '40%',
    borderWidth: 0.5
    , marginTop: '10%',
    alignSelf: 'center',
    justifyContent: 'space-evenly'
    , alignItems: 'center',
    borderRadius: 15
  },
  pic: {
    width: 18,
    height: 18
  },
  over: {
    width: '90%',
    height: 150,
    borderRadius: 15
  },
  text: {
    fontWeight: '700',

  },
  smallIcon: {
    width: '13%',
    height: '100%',
    // borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largIcon: {
    width: '63%',
    // , borderWidth: 0.5,
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'center',

  },
  innerBox: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'

  },
  headCurve: {
    width: SIZES.width,
    height: SIZES.height / 3.8,
    borderBottomLeftRadius: 145,
    borderBottomRightRadius: 145,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  logview: {
    width: '90%',
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: COLORS.darkgray,

  },
  logtxt: {
    fontSize: SIZES.h1 + 10,
    color: COLORS.white,
    fontWeight: '700'
  },
  lowerTXt: {
    fontSize: SIZES.h4, color: COLORS.white
  }

})
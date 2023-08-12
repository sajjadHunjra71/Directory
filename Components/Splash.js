import React, { useState } from 'react'
import { COLORS, SIZES, icons, images } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import Login from './Login';
import TabNavigator from './Navigation/TabNavigator';
export default function Splash({ navigation }) {
    const [flag, setFlage] = useState(true);
    if (SIZES.width > 412) {
        setFlage(false);
    }


    const check_login_status=async()=>{
        var sessionparse= await AsyncStorage.getItem('session');
        console.log(sessionparse)
          if(sessionparse){
              navigation.navigate('TabNavigator')
          }
          else{
              navigation.navigate('Login')

          }
  
      }

    return (
        <View style={styles.container}>
            <StatusBar />
            <Image source={images.frame} style={[styles.headC,  styles.tr ]} />

            <Image source={icons.logo} style={styles.logoStyle} />
            <View style={styles.headingText}>
                <Text style={styles.textStyle}>HEINE & GERLACH</Text>
            </View>
            <View style={styles.loewrView} >
                <Text style={styles.lowerText}>Eine Plattform für eine neue Arbeitsweise</Text>
            </View>
            <TouchableOpacity onPress={check_login_status} style={styles.btn}>
                <Text style={styles.btntxt}>Loslegen</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    headC: {
        width: SIZES.width,

    },
    fal: {
        height: '43%'
    },
    tr: {
        height: '50%'
    },

    btn: {
        width: 185,
        height: 43,
        bottom: 0,
        position: 'absolute',
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius: 31,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    btntxt: {
        color: COLORS.white,
        fontSize: SIZES.h4
    },
    logoStyle: {
        width: 152,
        height: 152,
        marginTop: -75,
        alignSelf: 'center'
    },
    loewrView: {
        marginTop: 9,
        alignSelf: 'center'

    },
    textStyle: {
        fontSize: SIZES.h1 + 5,
        fontWeight: '700',
    },
    lowerText: {
        fontWeight: '400'
    },
    headingText: {
        width: '80%',
        height: 40,
        alignSelf: 'center',
        marginTop: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:COLORS.darkgray,
    },
    headCurve: {
        height: 345,
        width: SIZES.width,
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        backgroundColor: COLORS.primary,
    }



})
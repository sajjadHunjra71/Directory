import { StatusBar, StyleSheet, Text, View, Image, Platform, TouchableWithoutFeedback, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, images } from '../constants'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Signup from './Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {path} from './BaseUrl'
import TabNavigator from './Navigation/TabNavigator';
import ForgotPass from './ForgotPass';
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [id, setID] = useState(111)
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');


  const getDataUsingGet = () => {
    setIsLoading(true);
    console.log(path)
    console.log(isLoading);
    const formData = new FormData()
    formData.append('email', email);
    formData.append('password', password);
    try {
      fetch(path+'api/login', {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData
      })
        .then((response) => response.json())
        .then((responseJson) => {

          if (responseJson.error) {
            alert(responseJson.error_msg);
            setIsLoading(false)



          } else {
            AsyncStorage.setItem('session', JSON.stringify('true'))

            try {
              AsyncStorage.setItem('data', JSON.stringify(responseJson));
              console.log(responseJson)

              navigation.navigate('TabNavigator')
              setIsLoading(false)

            } catch (error) {
              console.log(error)
              setIsLoading(false)

            }

          }

        })
        .catch((error) => {
          setIsLoading(false)
          alert(error + " error")
          console.log("Here 1")

        });
    } catch (e) {
      setIsLoading(false)
      console.log("Here 2")
      alert(e + ' ee')
    }
    // setIsLoading(false)

  };


  const validation = () => {
    //Check for the Name TextInput
    if (!email.trim()) {
      alert('Bitte E-Mail eingeben');
      return;
    }
    //Check for the Email TextInput
    if (!password.trim()) {
      alert('Bitte Passwort eingeben');
      return;
    }
    getDataUsingGet();
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <StatusBar />
      <ScrollView>
        <SafeAreaView style={styles.container} >

          <View style={styles.headCurve}>
            <View style={styles.logview}>
              <Text style={styles.logtxt}>Anmeldung</Text>
            </View>
            <View style={styles.logview}>
              <Text style={styles.lowerTXt}>Arbeiten ohne Grenzen</Text>
            </View>
          </View>

          <View style={styles.inputBox}>
            <View style={styles.inp}>
              <Text style={styles.inpTxt}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="john@gmail.com"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inp}>
              <Text style={styles.inpTxt}>Passwort</Text>
              <View style={styles.ext}>
                <TextInput
                  style={styles.input1}
                  onChangeText={setPassword}
                  secureTextEntry={hidePass ? true : false}
                  value={password}
                  placeholder="Enter Passwort"

                />
                <TouchableOpacity onPress={() => setHidePass(!hidePass)} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, flex: 1 }}>
                 
                  <MaterialCommunityIcons name="eye" size={30} color="#900" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('ForgotPass')} style={styles.forgotV}>
              <Text style={styles.forgotTxt}>Passwort vergessen</Text>
            </TouchableOpacity>
            <>
              {
                isLoading == true ?
                  <TouchableOpacity onPress={validation} style={styles.loginBtn}>
                    <Image source={images.loading} style={{ width: 60, height: 60 }} />
                  </TouchableOpacity>
                  :

                  <TouchableOpacity onPress={validation} style={styles.loginBtn}>
                    <Text style={styles.loginTxt} >Weitermachen</Text>
                  </TouchableOpacity>
              }
            </>


          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.bottom}>
            <Text style={styles.signupTxt}>Hatten Sie kein Konto?</Text>
            <Text style={styles.signupTxt1}> Anmeldung</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  loginTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,


  },
  signupTxt: {
    fontSize: SIZES.body4,
    color: COLORS.secondary,

  },
  signupTxt1: {
    fontSize: SIZES.body4,
    color: COLORS.primary,

  },
  bottom: {
    // bottom: 0,
    width: '50%',
    height: 30,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    flexDirection: 'row'

  },
  forgotV: {
    width: '100%',
    height: 20,
    marginTop: 10,
    alignItems: 'flex-end',
    // backgroundColor:COLORS.darkgray
  },
  forgotTxt: {
    color: COLORS.primary,

  },
  loginBtn: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
  },
  ext: {
    flexDirection: 'row',
    height: 50,
    marginTop: 12,
    borderWidth: 1,
    // padding: 10,
    borderRadius: 21,


  },
  inpTxt: {
    fontSize: SIZES.body3
  },
  input: {
    height: 50,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 21,

  },
  input1: {
    height: 50,
    // marginTop: 12,
    // borderWidth: 1,
    borderRadius: 21,
    padding: 10,

    width: '85%',
    // backgroundColor:'red'

  },
  inp: {
    width: '100%',
    height: '30%',
    // backgroundColor: COLORS.darkgray,
    marginTop: 10,

  },
  inputBox: {
    width: '90%',
    height: 290,
    // borderWidth: 1,
    alignSelf: 'center',
    marginTop: '10%'
  },
  logview: {
    width: '90%',
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: COLORS.darkgray,

  },
  headCurve: {
    width: SIZES.width,
    height: SIZES.height / 3,
    borderBottomLeftRadius: 145,
    borderBottomRightRadius: 145,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  logtxt: {
    fontSize: SIZES.h1 + 10,
    color: COLORS.white,
    fontWeight: '700'
  },
  lowerTXt: {
    fontSize: SIZES.h3, color: COLORS.white
  }


})





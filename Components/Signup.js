import { StatusBar, StyleSheet, Text, View, Image, Keyboard, Platform, TouchableWithoutFeedback, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, images } from '../constants'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Login from './Login'
import { path } from './BaseUrl';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [password, setPassword] = useState('');


  const getDataUsingGet = () => {
    setIsLoading(true);
    console.log(isLoading)
    const formData = new FormData()
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('phone', phone);

    try {
      fetch(path +'api/signup', {
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

            try {
              console.log('Signup SuccessFull');
              alert('Anmeldung erfolgreich')
              navigation.navigate('Login')
              setIsLoading(false)

            } catch (error) {
              console.log(error)
            }

          }

        })
        .catch((error) => {
          alert(error)
          setIsLoading(false)
        });
    } catch (e) {
      alert(e)
      setIsLoading(false)
    }

  };

  const validation = () => {
    //Check for the Name TextInput
    if (!email.trim()) {
      alert('Please Enter Email');
      return;
    }
    //Check for the Email TextInput
    if (!password.trim()) {
      alert('Please Enter password');
      return;
    }
    if (!name.trim()) {
      alert('Please Enter Name');
      return;
    }
    if (!phone.trim()) {
      alert('Please Enter Contact');
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

          {/* <Image source={images.loginFrame}  /> */}
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
              <Text style={styles.inpTxt}>Vollständiger Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="john Paul"
                keyboardType="default"
              />
            </View>

            <View style={styles.inp}>
              <Text style={styles.inpTxt}>Telefonnummer</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="000000000000"
                keyboardType="numeric"
              />
            </View>



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
                  placeholder="Passwort eingeben"

                />
                <TouchableOpacity onPress={() => setHidePass(!hidePass)} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, flex: 1 }}>
                  <MaterialCommunityIcons name="eye" size={30} color="#900" />
                </TouchableOpacity>
              </View>
            </View>

           

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

          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.bottom}>
            <Text style={styles.signupTxt}>Sie haben bereits ein Konto?</Text>
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
    marginTop: 4,
    borderWidth: 1,
    // padding: 10,
    borderRadius: 21,


  },
  inpTxt: {
    fontSize: SIZES.body3
  },
  input: {
    height: 50,
    marginTop: 4,
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
    height: '16.5%',

    // backgroundColor: COLORS.darkgray,
    marginTop: 10,

  },
  inputBox: {
    width: '90%',
    height: SIZES.height / 1.6,
    // borderWidth: 1,
    alignSelf: 'center',
    marginTop: '5%',
    // backgroundColor:'yellow'
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
    height: SIZES.height / 3.8,
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





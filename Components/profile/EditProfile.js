import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES, images, icons } from "../../constants";
import { EvilIcons } from "react-native-vector-icons";
import TabNavigator from '../Navigation/TabNavigator';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {path} from '../BaseUrl';

import { Feather, Ionicons } from 'react-native-vector-icons';
import * as DocumentPicker from 'expo-document-picker';


export default function EditProfile({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [contact, setContact] = useState("");
  const [isPicking, setIsPicking] = useState(false);
  const [imgCheck, setimgCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [uId, setUid] = useState('');
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState("");
  const [id_card, setId_card] = useState("");
  const [data, setData] = useState('')
  const [dumImg, setDumIng] = useState('');
  const [file, setFile] = useState('')

  useEffect(() => {
    async function func() {
      let v = await AsyncStorage.getItem('data')
      let c = JSON.parse(v)
      let d = c.data;
      console.log(d)
      setData(d);
      setName(d.name)
      setSurName(d.surname)
      setContact(d.contact)
      setEmail(d.email)
      setAddress(d.address)
      setDescription(d.description)
      setId_card(d.id_card)
      setDumIng(d.image);
      setUid(d.id);
    }

    func();
  }, [count])

  const handleFilePick = async () => {

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        multiple: true,
        copyToCacheDirectory: true
      });

      if (result.type === 'success') {
        setFile(result);
        setimgCheck(true)
        console.log(result);

      } else {
        console.log("User cancelled or didn't pick a file.");

      }
    } catch (error) {
      console.log('Error picking file:', error);
    }

  };

  const getDataUsingGet = () => {
    setIsLoading(true);
    console.log(isLoading)

    const formData = new FormData()
    formData.append('email', email);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('contact', contact);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('id_card', id_card);
    formData.append('id', uId);
    
      if(imgCheck==true){
        formData.append('image', {
          uri: file.uri,
          name: file.uri.split('/').pop(),
          type: file.mimeType
        });
        
    }
    try {
      fetch(path+'api/edit_profile', {
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
              console.log('Erfolgreich bearbeitet');
              console.log(responseJson)
              AsyncStorage.setItem('data', JSON.stringify(responseJson));
              setIsLoading(false)
              setCount(count + 1)
              navigation.navigate('TabNavigator')
            } catch (error) {
              console.log(error)
              setIsLoading(false)

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


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headCurve}>
          <View style={styles.logview}>
            <Text style={styles.logtxt}>Profil</Text>
          </View>
          <View style={styles.logview}>
            <Text style={styles.lowerTXt}>Bearbeite dein Profil</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{ width: '100%', height: '100%', }}>
            <View style={styles.box}>
            

              <View style={styles.inp}>
                <Text style={styles.nameTxt}>Vollständiger Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setName}
                  value={name}
                  placeholder="john Paul"
                  keyboardType="default"
                />
              </View>


              <View style={styles.inp}>
                <Text style={styles.nameTxt}>Nachname</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setSurName}
                  value={surname}
                  placeholder="john Paul"
                  keyboardType="default"
                />
              </View>


              <View style={styles.inp}>
                <Text style={styles.nameTxt}>Kontakt</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setContact}
                  value={contact}
                  placeholder="john Paul"
                  keyboardType="default"
                />
              </View>

              <View style={styles.inp}>
                <Text style={styles.nameTxt}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="john Paul"
                  keyboardType="default"
                />
              </View>

              <View style={styles.inp}>
                <Text style={styles.nameTxt}>Beschreibung</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setDescription}
                  value={description}
                  placeholder="john Paul"
                  keyboardType="default"
                />
              </View>

              <View style={styles.inp}>
                <Text style={styles.nameTxt}>Ausweis</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setId_card}
                  value={id_card}
                  placeholder="john Paul"
                  keyboardType="default"
                />
              </View>


              <View style={styles.inp}>
                <Text style={styles.nameTxt}>Adresse</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setAddress}
                  value={address}
                  placeholder="john Paul"
                  keyboardType="default"
                />
              </View>

              <View style={styles.inp1}>

                <Text style={styles.nameTxt}>Datei hochladen</Text>

                <TouchableOpacity onPress={handleFilePick} style={styles.ext}>
                  <View style={styles.inner}>
                    {
                      file != '' ?
                        <Text style={styles.input1} >{file.name}</Text>
                        :
                        <Text style={styles.input1} >Datei hochladen</Text>
                    }
                  </View>
                  <TouchableOpacity onPress={handleFilePick} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, flex: 1 }}>
                    <Ionicons name="cloud-upload-outline" size={30} color="#900" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>




            </View>


          </View>



        </ScrollView>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

          <TouchableOpacity onPress={getDataUsingGet} style={styles.loginBtn}>
            {isLoading == true ? (
              <Image
                source={images.loading}
                style={{ width: 60, height: 60 }}
              />
            ) : (
              <Text style={styles.loginTxt}>Weitermachen</Text>
            )}
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ext: {
    flexDirection: 'row',
    height: 50,
    marginTop: 6,
    borderWidth: 1,
    // padding: 10,
    borderRadius: 21,

  },
  input1: {
    color: COLORS.lightGray,
    padding: 10,

    // width: '85%',
    // backgroundColor:'red'

  },
  inner: {
    width: '80%',
    justifyContent: 'center',

  },
  loginBtn: {
    width: "90%",
    height: 50,
    borderRadius: 20,
    // marginTop: 30,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,

  },
  inp: {
    width: "100%",
    height: "11%",
    marginTop: 4,
  },
  inp1: {
    width: "100%",
    // height: "10%",
    marginBottom: 10,
    marginTop: 4,
  },
  inpTxt: {
    fontSize: SIZES.body3,
  },
  input: {
    height: 50,
    marginTop: 4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 21,
  },
  loginTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,
  },
  headCurve: {
    width: SIZES.width,
    height: SIZES.height / 3.8,
    borderBottomLeftRadius: 145,
    borderBottomRightRadius: 145,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  logview: {
    width: "90%",
    // height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // backgroundColor: COLORS.darkgray,
  },
  logtxt: {
    fontSize: SIZES.h1 + 10,
    color: COLORS.white,
    fontWeight: "700",
  },
  lowerTXt: {
    fontSize: SIZES.h4,
    color: COLORS.white,
  },
  box: {
    width: "90%",
    height: "100%",

    // borderWidth: 0.5,
    marginTop: "4%",
    alignSelf: "center",
    // justifyContent: 'space-evenly'
    alignItems: "center",
    borderRadius: 15,
  },
  innerBox: {
    width: "100%",
    height: "16%",
    // borderWidth:0.5,
    borderRadius: 10,
    justifyContent: "center",
  },
  upperTxt: {
    width: "90%",
    height: 30,
    // borderWidth:0.5,
    flexDirection: "row",
  },
  lowerBox: {
    width: "95%",
    height: 50,
    borderWidth: 0.5,
    alignSelf: "center",
    borderRadius: 23,
    flexDirection: "row",
  },
  nameTxt: {
    fontWeight: "500",
    fontSize: SIZES.body3,
  },
  rightBox: {
    width: "13%",
    height: "100%",
    // borderWidth:0.3,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  leftBox: {
    width: "82%",
    height: "100%",
    flexDirection: "row",
  },
});

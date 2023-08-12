import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, ScrollView, TextInput, Image, SafeAreaView, Linking, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { COLORS, images, SIZES } from '../../constants'
import { Overlay } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {path} from '../BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome, Feather, AntDesign, Fontisto } from 'react-native-vector-icons';

export default function FileScreen({ route }) {
  const [name, setName] = useState('');
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState('');
  const [file, setFile] = useState(null);
  const [visible1, setVisible1] = useState(false);
  const [count, setCount] = useState(0);
  const [dellId, setDellId] = useState('');
  const [data, setData] = useState('')
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible2, setVisible2] = useState(false);

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleOverlay2 = () => {
    setVisible2(!visible2);
  };
  const toggleOverlay1 = () => {
    setVisible1(!visible1);
  };
  const openFileInChrome = (filePath) => {
    Linking.openURL(`googlechrome://navigate?url=${path+"storage/app/" + filePath}`);
  }
  const openFileInChrome1 = (filePath) => {
    Linking.openURL(`googlechrome://navigate?url=${filePath}`);
  }

  const add_query = () => {
   setIsLoading(true)
    console.log(isLoading)
    const formData = new FormData()
    formData.append('name', name);
    formData.append('directory_id', route.params.directory_id);
    formData.append('file', {
      uri: file.uri,
      name: 'file',
      type: 'application/octet-stream',
    });

    try {
      fetch(path+'api/add_document', {
        method: 'POST',
        // headers: {
        //   // Accept: "application/json",
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error) {
            setIsLoading(false)
            alert(responseJson.error_msg);
            console.log("err")



          } else {
            try {
              setIsLoading(false)
              alert("Erfolgreich hinzugefügt")
              setVisible(false)
              setVisible2(false)
              setCount(count + 1)
            } catch (error) {
              console.log(error)
              setIsLoading(false)
            }

          }

        })
        .catch((error) => {
          setIsLoading(false)
          alert(error)
          console.log("here is error")
          console.log("here " + error)
        });
    } catch (e) {
      setIsLoading(false)
      alert(e)

      console.log(" here in 2 " + e)
    }

  };

  const view_file = (dId) => {
    setIsLoading(true);
    const formData = new FormData()
    formData.append('directory_id', dId);

    try {
      fetch(path+'api/view_document', {
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

          } else {

            try {
              // console.log(responseJson.data);
              setIsLoading(false)
              setDataSource(responseJson.data)

            } catch (error) {
              console.log(error)
            }

          }

        })
        .catch((error) => {
          alert(error)
        });
    } catch (e) {
      alert(e)
    }
    setIsLoading(false)
    console.log("false");

  };

  const download_directory = () => {
    setIsLoading(true);
    const formData = new FormData()
    formData.append('directory_id', route.params.directory_id);

    try {
      fetch(path+'api/download_directory', {
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

          } else {

            try {
              console.log(responseJson.data);
              setIsLoading(false)
              openFileInChrome1(responseJson.data)



            } catch (error) {
              console.log(error)
            }

          }

        })
        .catch((error) => {
          alert(error)
        });
    } catch (e) {
      alert(e)
    }
    setIsLoading(false)
    console.log("false");

  };

  const delete_file = () => {
    setIsLoading(true);
    console.log(dellId)
    const formData = new FormData()
    formData.append('id', dellId);

    try {
      fetch(path+'api/delete_document', {
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

          } else {

            try {
              setIsLoading(false)
              alert("Erfolgreich löschen")
              toggleOverlay1()
              setCount(count + 1)
            } catch (error) {
              console.log(error)
            }

          }

        })
        .catch((error) => {
          alert(error)
        });
    } catch (e) {
      alert(e)
    }
    setIsLoading(false)
    console.log("false");

  };

  const handleFilePick = async () => {

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true
      });

      if (result.type === 'success') {
        setFile(result);
        console.log(result);

      } else {
        console.log("User cancelled or didn't pick a file.");

      }
    } catch (error) {
      console.log('Error picking file:', error);
    }

  };

  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

  
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };



  const validation = () => {
    //Check for the Name TextInput
    if (!name.trim()) {
      alert('Bitte Namen eingeben');
      return;
    }
    if (file == null) {
      alert('Bitte wählen Sie Datei');
      return;
    }

    add_query();
  };

 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      async function func() {
        let v = await AsyncStorage.getItem('data')
        let c = JSON.parse(v)
        let d = c.data;
        setData(d);
        console.log(d)
        view_file(route.params.directory_id);
      }
      func();

    }, 200);
    setRefreshing(false);

  }, []);
  useEffect(() => {
    // view_file(route.params.directory_id)
    async function func() {
      let v = await AsyncStorage.getItem('data')
      let c = JSON.parse(v)
      let d = c.data;
      setData(d);
      // console.log(d)
      view_file(route.params.directory_id);
    }
    func();
  }, [count]);


  return (
    <SafeAreaView style={styles.container}   >
      <StatusBar hidden={false} />

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <View style={styles.picView}>
            <TouchableOpacity>
            {
              data.image!=null?
              <Image source={{ uri: path+'storage/app/' + data.image }} style={styles.pic} />
              :
              <Image source={images.userNull} style={styles.pic} />

            }
            </TouchableOpacity>
            <Text style={styles.txt1}>{data.name}</Text>
            <Text style={styles.txt2}>Willkommen bei HEINE & GERLACH </Text>
          </View>
          <Image source={require('../../assets/images/dots.png')} style={{ borderBottomLeftRadius: 150, width: 150, height: 150 }} />
        </View>

        <View style={{ width: '90%', height: 40, alignSelf: 'center', justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 10 }}>
          {
            dataSource != '' ?
              <TouchableOpacity onPress={download_directory}>
                <Fontisto name='download' size={23} />
              </TouchableOpacity>
              :
              null
          }
        </View>

        {
          dataSource != '' ?
            <View style={styles.flat}>
              <FlatList
                data={dataSource}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        // width: 110,
                        width: '30%',
                        height: 140,
                        marginTop: 10,
                        marginLeft: 10,
                        // justifyContent:'space-evenly',
                      }}
                    // onPress={()=>openFileInChrome(item.file)}
                    >

                      <View style={{ width: '100%', height: 97, borderWidth: 0.5, borderRadius: 10, }}>
                        <View style={{ width: '30%', alignSelf: 'flex-end', height: '30%', justifyContent: "center", alignItems: 'center', padding: 5 }}>
                          <TouchableOpacity onPress={() => setDellId(item.id) & toggleOverlay1()}>
                            <FontAwesome name='trash-o' size={18} />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => openFileInChrome(item.file)} style={{ width: '100%', height: '68%', alignItems: 'center', }} >
                          <Image source={images.fileLogo} />
                        </TouchableOpacity>
                      </View>

                      <Text style={{ marginTop: 4, alignSelf: 'center' }}>{item.name}</Text>
                    </View>
                  );
                }}
                //Setting the number of column
                numColumns={3}
                keyExtractor={(item, index) => index}
              />
            </View>
            :


            <TouchableOpacity onPress={toggleOverlay} style={styles.addV}>
              <Feather name='plus-square' size={30} color={COLORS.lightGray} />
              <Text style={styles.txt}>Fügen Sie Ihr erstes Verzeichnis hinzu </Text>
            </TouchableOpacity>

        }
      </ScrollView>
      <TouchableOpacity onPress={toggleOverlay} style={styles.btn}>
        <AntDesign name='addfile' size={27} color={'#ffffff'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleOverlay2} style={styles.btn1}>
        <AntDesign name='camera' size={27} color={'#ffffff'} />
      </TouchableOpacity>


      <Overlay overlayStyle={styles.over} isVisible={visible} onBackdropPress={toggleOverlay}>

        <View style={styles.inp}>

          <Text style={styles.inpTxt}>Dateinamen</Text>

          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Utelity Bill"

          />

        </View>

        <TouchableOpacity onPress={handleFilePick} style={styles.inp}>

          <Text style={styles.inpTxt}>Weitere Datei hochladen</Text>

          <View style={styles.ext}>
            <View style={styles.inner}>
              {
                file != null ?
                  <Text style={styles.input1} >{file.name}</Text>
                  :
                  <Text style={styles.input1} >Datei hochladen</Text>

              }
            </View>
            <TouchableOpacity onPress={handleFilePick} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, flex: 1 }}>
              <Ionicons name="cloud-upload-outline" size={30} color="#900" />
            </TouchableOpacity>
          </View>
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


      </Overlay>

      <Overlay overlayStyle={styles.over} isVisible={visible2} onBackdropPress={toggleOverlay2}>

        <View style={styles.inp}>

          <Text style={styles.inpTxt}>Dateinamen</Text>

          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Utelity Bill"

          />

        </View>


        <TouchableOpacity onPress={takeImage} style={styles.inp}>

          <Text style={styles.inpTxt}>Klicken Sie hier, um die Datei hochzuladen</Text>

          <View style={styles.ext}>
            <View style={styles.inner}>
              {
                file != null ?
                  <Text style={styles.input1} >{file.name}Bild angeklickt!</Text>
                  :
                  <Text style={styles.input1} >Kamera öffnen</Text>

              }
            </View>
            <TouchableOpacity onPress={takeImage} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, flex: 1 }}>
              <Ionicons name="camera" size={30} color="#900" />
            </TouchableOpacity>
          </View>
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


      </Overlay>

      <Overlay overlayStyle={styles.over1} isVisible={visible1} >
        <View style={styles.in1}>
          <Text style={styles.txtIn}>Sind Sie sicher, dass Sie löschen möchten</Text>
        </View>
        <View style={styles.in1}>
          <TouchableOpacity onPress={toggleOverlay1} style={styles.btnLog}>
            <Text style={styles.txtIn}>NEIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={delete_file} style={styles.btnLog}>
            <Text style={styles.txtIn}>Ja</Text>
          </TouchableOpacity>

        </View>

      </Overlay>




    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  btnLog: {
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3
  },
  flat: {
    width: '90%',
    // backgroundColor:'red',
    height: '70%',
    alignSelf: 'center',
    // padding:10,
    // backgroundColor: COLORS.lightGrayq
  },
  txtIn: {
    fontWeight: '700',
    fontSize: SIZES.body3
  },
  in1: {
    width: '100%',
    height: '50%',
    // backgroundColor:'gray',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  over1: {
    width: '90%',
    height: 150,
    borderRadius: 15
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 65,
    width: 65,
    borderRadius: 35,
    marginBottom: 40,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
  },
  btn1: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 65,
    width: 65,
    borderRadius: 35,
    marginBottom: 110,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
  }
  , ext: {
    flexDirection: 'row',
    height: 50,
    marginTop: 6,
    borderWidth: 1,
    // padding: 10,
    borderRadius: 21,


  },
  inner: {
    width: '80%',
    justifyContent: 'center',

  },
  inpTxt: {
    fontSize: SIZES.body3
  },
  input: {
    height: 50,
    marginTop: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 21,

  },
  input1: {
    color: COLORS.lightGray,
    padding: 10,

    // width: '85%',
    // backgroundColor:'red'

  },
  inp: {
    width: '100%',
    height: '30%',
    // backgroundColor: COLORS.darkgray,
    marginTop: 10,

  },
  over: {
    width: '90%',
    height: 250,
    borderRadius: 15
  },
  txt: {
    fontWeight: '400',
    color: COLORS.lightGray,
    fontSize: SIZES.body3
  },
  addV: {
    width: '90%',
    height: '30%',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    alignSelf: 'center',
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
    // backgroundColor:COLORS.darkgray
  },
  loginBtn: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
  },
  loginTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,


  },
  txt1: {
    fontSize: SIZES.body3,
    fontWeight: '700',

  },
  txt2: {
    fontSize: SIZES.body5,
    fontWeight: '500',
    color: COLORS.lightGray
  },
  pic: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 10,
    resizeMode: 'contain',
  },
  picView: {
    width: '60%',
    height: '100%',
    // alignSelf:'center',
    justifyContent: 'center',
    padding: 20
  },
  header: {
    width: '100%',
    height: 120,
    flexDirection: 'row'
  },
})
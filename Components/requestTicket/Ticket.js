import { StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../Header'
import InnerTicket from './InnerTicket'
import { COLORS, images, SIZES } from '../../constants'
import * as DocumentPicker from 'expo-document-picker';
import { path } from '../BaseUrl';
import { Overlay } from 'react-native-elements';
import { Feather, Ionicons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Ticket({ navigation }) {
  const [dataSource, setDataSource] = useState('');
  const [subject, setSubject] = useState('');
  const [uId, setUid] = useState('');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [file, setFile] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState('')

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPicking, setIsPicking] = useState(false);



  const add_query = () => {
    setIsLoading(true);
    console.log("calling Api");
    const formData = new FormData()
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('user_id', uId);
    if (selectedFile != null) {
      formData.append('file', {
        uri: selectedFile.uri,
        name: 'file',
        type: 'application/octet-stream',
      });
    }


    try {
      fetch( path+'api/add_query', {
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
            console.log("1")
            setIsLoading(false)

          } else {
            console.log("2")

            try {
              alert("Successfully Sended")
              setIsLoading(false)
              toggleOverlay()
              setCount(count + 1)
            } catch (error) {
              console.log(error)

            }

          }

        })
        .catch((error) => {
          alert(error)
          console.log("3")
          setIsLoading(false)
        });
    } catch (e) {
      alert(e)
      console.log("4")
      setIsLoading(false)
    }

  };

  const view_query = (id) => {
    setIsLoading(true);
    console.log("inside View APi")
    const formData = new FormData()
    formData.append('user_id', id);


    try {
      fetch(path + 'api/view_query', {
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


  const validation = () => {
    //Check for the Name TextInput
    if (!subject.trim()) {
      alert('Please Enter subject');
      return;
    }
    //Check for the Email TextInput
    if (!message.trim()) {
      alert('Please Enter message');
      return;
    }

    add_query();
  };



  const handleFilePick = async () => {
    if (isPicking) return;
    setIsPicking(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true
      });

      if (result.type === 'success') {
        setSelectedFile(result);

      } else {
        console.log("User cancelled or didn't pick a file.");
        setIsPicking(false);

      }
    } catch (error) {
      console.log('Error picking file:', error);
    }
    setIsPicking(false);
  };


  const renderFunc = (item) => {
    let v = item.created_at;
    let c = v.slice(0, 19);
    return (
      <View style={[styles.card, styles.shadowProp]}>
        <View style={styles.upper}>
          <View style={styles.upper1}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text>{c}</Text>
          </View>
          <View style={styles.upper2}>
            {
              item.status == '1' ?
                <Text style={styles.status}>Ausstehend</Text>
                :
                <Text style={styles.status}>Genehmigt</Text>
            }
          </View>

        </View>
        <View style={styles.middle}>
          <Text numberOfLines={3} ellipsizeMode='tail'>
            {
              item.message
            }
          </Text>
        </View>
        <View style={styles.lower}>
          <TouchableOpacity onPress={() => navigation.navigate('InnerTicket', { message: item.message, f: item.query_docs[0], st: item.status, t: c })}>
            <Text style={styles.readMore}>
            Weiterlesen
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      async function func() {
        let v = await AsyncStorage.getItem('data')
        let c = JSON.parse(v)
        let d = c.data;
        setUid(d.id);
        setData(d);
      
        view_query(d.id);
      }
      func();

    }, 200);
    setRefreshing(false);

  }, []);
  useEffect(() => {

    async function func() {
      let v = await AsyncStorage.getItem('data')
      let c = JSON.parse(v)
      let d = c.data;
      setData(d);
      setUid(d.id);
      view_query(d.id);
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
                data.image != null ?
                  <Image source={{ uri: path + 'storage/app/' + data.image }} style={styles.pic} />
                  :
                  <Image source={images.userNull} style={styles.pic} />

              }
            </TouchableOpacity>
            <Text style={styles.txt1}>{data.name}</Text>
            <Text style={styles.txt2}>Willkommen bei HEINE & GERLACH </Text>
          </View>
          <Image source={require('../../assets/images/dots.png')} style={{ borderBottomLeftRadius: 150, width: 150, height: 150 }} />
        </View>


        {
          dataSource.length > 0 ?
            <FlatList

              data={dataSource}
              renderItem={({ item }) => renderFunc(item)}

              keyExtractor={(item, index) => index}

            />
            :
            <TouchableOpacity onPress={toggleOverlay} style={styles.addV}>
              <Feather name='plus-square' size={30} color={COLORS.lightGray} />
              <Text style={styles.txt}>Fügen Sie Ihre erste Abfrage hinzu</Text>
            </TouchableOpacity>

        }

      </ScrollView>

      <TouchableOpacity onPress={toggleOverlay} style={styles.btn}>
        <Feather name='plus' size={27} color={'#ffffff'} />
      </TouchableOpacity>

      <Overlay overlayStyle={styles.over} isVisible={visible} onBackdropPress={toggleOverlay}>

        <View style={styles.inp}>

          <Text style={styles.inpTxt}>Thema</Text>


          <TextInput
            style={styles.input}
            onChangeText={setSubject}
            value={subject}
            placeholder="Thema"

          />

        </View>


        <View style={styles.inp2}>

          <Text style={styles.inpTxt}>Nachricht</Text>

          <TextInput
            style={styles.message}
            onChangeText={setMessage}
            value={message}
            multiline={true}
            placeholder="Geben Sie eine Nachricht ein"

          />

        </View>



        <View style={styles.inp}>

          <Text style={styles.inpTxt}>Datei hochladen</Text>

          <TouchableOpacity onPress={handleFilePick} style={styles.ext}>
            <View style={styles.inner}>
              {
                selectedFile != null ?
                  <Text style={styles.input1} >{selectedFile.name}</Text>
                  :
                  <Text style={styles.input1} >Datei hochladen</Text>
              }
            </View>
            <TouchableOpacity onPress={handleFilePick} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, flex: 1 }}>
              <Ionicons name="cloud-upload-outline" size={30} color="#900" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>



        <TouchableOpacity onPress={validation} style={styles.loginBtn}>
          {
            isLoading == true ?
              <Image source={images.loading} style={{ width: 60, height: 60 }} />
              :
              <Text style={styles.loginTxt} >Nachricht senden</Text>
          }
        </TouchableOpacity>


      </Overlay>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  card: {
    // backgroundColor: 'white',
    borderRadius: 2,
    // height: 140,
    borderWidth: 0.3,
    alignSelf: 'center',


    width: '90%',
    marginVertical: 10,
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
  txt: {
    fontWeight: '400',
    color: COLORS.lightGray,
    fontSize: SIZES.body3
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 65,
    width: 65,
    borderRadius: 35,
    marginBottom: 120,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
  },
  upper: {
    width: '100%',
    // height: '30%',
    height: 50,
    // backgroundColor:'red',
    flexDirection: 'row',
  },
  middle: {
    width: '100%',
    // height: '55%',
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  lower: {
    width: '100%',
    // height: '15%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
  ,
  upper1: {
    width: '78%',
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',

    // backgroundColor:'red'

  },
  upper2: {
    width: '22%',
    height: '100%',
    // padding:10,
    justifyContent: 'center',
    // backgroundColor:'yellow'

  },
  subject: {
    fontSize: SIZES.body3,
    fontWeight: '500'
  },
  status: {
    fontSize: SIZES.body3,
    color: '#EEAF51',
    alignSelf: 'center'
  },
  readMore: {
    color: '#0A1DA8',
    fontSize: SIZES.body3,
    marginBottom: 4

  },
  inp: {
    width: '100%',
    height: '20%',
    // backgroundColor: COLORS.darkgray,
    marginTop: 10,

  },
  inp2: {
    width: '100%',
    height: '35%',
    // backgroundColor: COLORS.secondary,
    marginTop: 10,

  },
  input: {
    height: 50,
    marginTop: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 21,

  },
  message: {
    height: '80%',
    marginTop: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 21,

  },
  over: {
    width: '90%',
    height: 380,
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
  loginTxt: {
    fontSize: SIZES.body3,
    color: COLORS.white,


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
  inpTxt: {
    fontSize: SIZES.body3
  },
  ext: {
    flexDirection: 'row',
    height: 50,
    marginTop: 6,
    borderWidth: 1,
    // padding: 10,
    borderRadius: 21,


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
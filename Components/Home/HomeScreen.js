import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, TextInput, RefreshControl, Image, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../Header'
import FileScreen from './FileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, images, SIZES } from '../../constants'
import {path} from'../BaseUrl';
import { Overlay } from 'react-native-elements';
import { Ionicons, EvilIcons, FontAwesome, Feather, AntDesign } from 'react-native-vector-icons';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [uId, setUid] = useState('');
  const [check, setCheck] = useState(false);
  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState('');
  const [dellId,setDellId]=useState('');

  const [count, setCount] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleOverlay1 = () => {
    setVisible1(!visible1);
  };

  const add_Directory = () => {
    setIsLoading(true);
    console.log("calling Api");
    const formData = new FormData()
    formData.append('name', name);
    formData.append('user_id', uId);

    try {
      fetch(path+'api/add_directory', {
        method: 'POST',
        headers: {
          // Accept: "application/json",
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
              alert("Erfolgreich hinzugefügt")
              setIsLoading(false)
              toggleOverlay()
              setCount(count + 1)

            } catch (error) {
              console.log(error)
              setIsLoading(false)

            }

          }

        })
        .catch((error) => {
          alert(error)
          setIsLoading(false)
          console.log("here " + error)
        });
    } catch (e) {
      alert(e)
      setIsLoading(false)
      console.log(" here in 2 " + e)
    }

  };

  const view_query = (id) => {
    setIsLoading(true);
    console.log("inside View APi")
    const formData = new FormData()
    formData.append('user_id', id);


    try {
      fetch(path+'api/view_directory', {
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
  const delete_document = () => {
    setIsLoading(true);
    const formData = new FormData()
    formData.append('id',dellId );

    try {
      fetch(path+'api/delete_directory', {
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


  const validation = () => {
    //Check for the Name TextInput
    if (!name.trim()) {
      alert('Bitte Namen eingeben');
      return;
    }
    add_Directory();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      async function func() {
        let v = await AsyncStorage.getItem('data')
        let c = JSON.parse(v)
        let d = c.data;
        console.log(d.id)
        setUid(d.id);
        setData(d);
        console.log("yes im here")
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
      console.log(d.id)
      setUid(d.id);
      setData(d);
      console.log("yes im here")
      view_query(d.id);
    }
    func();

  },[count]);


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
            <Text style={styles.txt1}>{data.name} </Text>
            <Text style={styles.txt2}>Willkommen bei HEINE & GERLACH </Text>
          </View>
          <Image source={require('../../assets/images/dots.png')} style={{ borderBottomLeftRadius: 150, width: 150, height: 150 }} />
        </View>

        {
          isLoading == 'true' ?
            <Text>Wird geladen</Text>
            :
            <>
              {
                dataSource != '' ?
                  <View style={styles.flat}>
                    <FlatList
                      data={dataSource}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={{
                            // width: 110,
                            width: '30%',
                            height: 140,
                            marginTop: 10,
                            marginLeft: 10,
                            // borderWidth: 0.5

                          }}
                         
                        >

                          <View style={{ width: '100%', height: 97, borderWidth: 0.5, borderRadius: 10, }}>
                            <View style={{ width: '100%', height: '30%', justifyContent: "center", alignItems: 'flex-end', padding: 5 }}>
                              <TouchableOpacity onPress={()=>setDellId(item.id)& toggleOverlay1()} >
                                <FontAwesome name='trash-o' size={18} />
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('FileScreen', { directory_id: item.id })} style={{ width:'100%', height:'68%', alignItems: 'center' }} >
                              <FontAwesome name='folder-open' size={35} color={'#F8D775'} />
                            </TouchableOpacity>
                          </View>

                          <Text style={{ marginTop: 4, alignSelf: 'center' }}>{item.name}</Text>
                        </TouchableOpacity>
                      )}
                      //Setting the number of column
                      numColumns={3}
                      keyExtractor={(item, index) => index}
                    />
                  </View>
                  :
                  <TouchableOpacity onPress={toggleOverlay} style={styles.addV}>
                    <Feather name='plus-square' size={30} color={COLORS.lightGray} />
                    <Text style={styles.txt}>Fügen Sie Ihr erstes Verzeichnis hinzu</Text>
                  </TouchableOpacity>
              }
            </>

        }

      </ScrollView>
      <TouchableOpacity onPress={toggleOverlay} style={styles.btn}>
        <FontAwesome name='folder-open-o' size={27} color={'#ffffff'} />
      </TouchableOpacity>


      <Overlay overlayStyle={styles.over} isVisible={visible} onBackdropPress={toggleOverlay}>

        <View style={styles.inp}>
          <Text style={styles.inpTxt}>Verzeichnisname</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Utelity Bill"

          />

        </View>

        <>
              {
                isLoading == true ?
                  <TouchableOpacity onPress={validation} style={styles.loginBtn}>
                    <Image source={images.loading} style={{ width: 60, height: 60 }} />
                  </TouchableOpacity>
                  :

                  <TouchableOpacity onPress={validation} style={styles.loginBtn}>
                    <Text style={styles.loginTxt} >Verzeichnis hochladen</Text>
                  </TouchableOpacity>
              }
            </>


      </Overlay>

              
      <Overlay overlayStyle={styles.over1}  isVisible={visible1} >
        <View style={styles.in1}>
          <Text style={styles.txtIn}>Sind Sie sicher, dass Sie löschen möchten</Text>
        </View>
        <View style={styles.in1}>
          <TouchableOpacity onPress={toggleOverlay1} style={styles.btnLog}>
            <Text style={styles.txtIn}>NEIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={delete_document} style={styles.btnLog}>
            <Text style={styles.txtIn}>Ja</Text>
          </TouchableOpacity>

        </View>

      </Overlay>


    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  over1: {
    width: '90%',
    height: 150,
    borderRadius: 15
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
  txtIn:{
    fontWeight:'700',
    fontSize:SIZES.body3
  },
  btnLog:{
    width:70,
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:0.3
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
  flat: {
    width: '90%',
    // backgroundColor:'red',
    height: '75%',
    alignSelf: 'center',
    // padding:10,
    // backgroundColor: COLORS.lightGrayq
  },
  header: {
    width: '100%',
    height: 120,
    flexDirection: 'row'
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
    height: '50%',
    marginTop: 10,

  },
  over: {
    width: '90%',
    height: 180,
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
  // container: {
  //   width: '100%',
  //   height: 120,
  //   flexDirection: 'row'
  //   // backgroundColor: 'red'
  // },
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
})
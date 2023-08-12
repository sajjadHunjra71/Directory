import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView,SafeAreaView, RefreshControl,Image,} from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../Header'
import {path} from '../BaseUrl'
import { COLORS, images, SIZES } from '../../constants'
import { Ionicons, EvilIcons, FontAwesome, Feather, AntDesign } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Calender() {

  const openFileInChrome = () => {
    Linking.openURL(`googlechrome://navigate?url=${'https://calendly.com/heine-gerlach'}`);
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState('')

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      async function func() {
        let v = await AsyncStorage.getItem('data')
        let c = JSON.parse(v)
        let d = c.data;
        setData(d);
        // console.log(d)
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
      // console.log(d)
    }
    func();
  }, []);


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

        {/* <View style={styles.v}> */}
        <TouchableOpacity onPress={openFileInChrome} style={styles.addV}>
          <Feather name='plus-square' size={30} color={COLORS.lightGray} />
          <Text style={styles.txt}>Buchen Sie Ihr Meeting </Text>
        </TouchableOpacity>
        {/* </View> */}

      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  v1: {
    width: '90%',
    height: 600,
    alignSelf: 'center'
  },
  v: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
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
import { Image, StyleSheet, Text, View, TouchableOpacity,SafeAreaView} from 'react-native'
import React,{useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, images } from '../constants'

export default function Header() {
    const [data,setData]=useState('')
    useEffect(() => {
        async function func() {
          let v = await AsyncStorage.getItem('data')
          let c = JSON.parse(v)
          let d = c.data;
          setData(d);
          console.log(d)
        }
        func();
    
      }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.picView}>
                <TouchableOpacity>
                <Image source={{uri:'http://client.qubitars.com/storage/app/'+data.image}} style={styles.pic} />
                </TouchableOpacity>
                <Text style={styles.txt1}>{data.name} !</Text>
                <Text style={styles.txt2}>Willkommen bei HEINE & GERLACH </Text>
            </View>
            <Image source={require('../assets/images/dots.png')}  style={{borderBottomLeftRadius:150,width:150,height:150}} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: 120,
        flexDirection:'row'
        // backgroundColor: 'red'
    },
    txt1: {
        fontSize: SIZES.body3,
        fontWeight: '700',

    },
    txt2: {
        fontSize: SIZES.body5,
        fontWeight: '500',
        color:COLORS.lightGray
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
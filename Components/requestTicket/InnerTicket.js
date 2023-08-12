import { StyleSheet, Text, View, TouchableOpacity, RefreshControl, StatusBar, SafeAreaView, ScrollView, Image, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { path } from '../BaseUrl';

import { COLORS, images, SIZES } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons, EvilIcons, FontAwesome, Feather, AntDesign } from 'react-native-vector-icons';



export default function InnerTicket({ route, navigation }) {
    const num = route.params.f;
    const [isLoading, setIsLoading] = useState('');
    const [data, setData] = useState('')
    const [refreshing, setRefreshing] = React.useState(false);


    console.log(route.params.f)
    const openFileInChrome = (filePath) => {
        console.log(filePath)
        Linking.openURL(`googlechrome://navigate?url=${path + "storage/app/" + filePath}`);
    }

    const clickApi = () => {
        setIsLoading(true);
        console.log(isLoading);
        const formData = new FormData()
        formData.append('id', route.params.f.query_id);

        try {
            fetch(path + 'api/change_status', {
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
                            setIsLoading(false)
                            alert("Erfolgreich genehmigt")
                            navigation.navigate('TabNavigator')

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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            async function func() {
                let v = await AsyncStorage.getItem('data')
                let c = JSON.parse(v)
                let d = c.data;

                setData(d);

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


                <View style={styles.mainBox}>
                    {/* <ScrollView> */}
                    <View style={styles.upper}>
                        <View style={styles.upper1}>
                            <Text style={styles.subject}>Thema</Text>
                            <Text>{route.params.t}</Text>
                        </View>
                        <View style={styles.upper2}>
                            {
                                route.params.st == '1' ?
                                    <Text style={styles.status}>Ausstehend</Text>
                                    :
                                    <Text style={styles.status}>Approved</Text>
                            }
                        </View>

                    </View>
                    <View style={{ width: '100%', }}>
                        <ScrollView>
                            <View style={styles.textBox}>
                                <Text style={styles.txt}>
                                    {route.params.message}
                                </Text>
                            </View>
                        </ScrollView>

                    </View>

                    <View style={styles.flat}>
                       
                        {
                            num != null ?

                                <TouchableOpacity
                                    style={{
                                        // width: 110,
                                        width: '30%',
                                        height: 100,
                                        // marginTop: 10,
                                        marginLeft: 8,
                                        // borderWidth: 0.5

                                    }}
                                    onPress={() => openFileInChrome(route.params.f.file)}
                                >

                                    <View style={{ width: '100%', height: 97, borderWidth: 0.5, borderRadius: 10, }}>
                                        <View style={{ width: '100%', height: '30%', justifyContent: "center", alignItems: 'flex-end', padding: 5 }}>
                                            <FontAwesome name='trash-o' size={18} />
                                        </View>
                                        <TouchableOpacity onPress={() => openFileInChrome(num.file)} style={{ flex: 1, alignItems: 'center' }} >
                                            <Image source={images.fileLogo} />
                                        </TouchableOpacity>
                                    </View>

                                </TouchableOpacity>
                                :
                                <Text>lskndlswd</Text>
                        }

                    </View>


                    <View style={styles.footer}>
                        <Text style={styles.txt1}>Ihr Problem wurde gelöst? </Text>
                        <TouchableOpacity onPress={clickApi}>
                            <Text style={styles.txt2}> Klick mich!</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    txt1: {
        color: '#8A8989',
        fontWeight: '500',
        fontSize: SIZES.body4
    },
    txt2: {
        fontWeight: '700',
        color: COLORS.primary
    },
    footer: {
        width: '90%',
        // height: '5%',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: COLORS.darkgray

    },
    mainBox: {
        width: '90%',
        // height: '70%',
        borderWidth: 0.2,
        // padding:10,
        marginVertical: 20,
        borderColor: 'gray',
        alignSelf: 'center',
    },
    status: {
        fontSize: SIZES.body3,
        color: '#EEAF51',
        alignSelf: 'center'
    },
    flat: {
        width: '100%',
        height: 110,
        alignSelf: 'center',
        paddingTop: 10,
        marginTop: 10,
    },
    subject: {
        fontSize: SIZES.body3,
        fontWeight: '500'
    }, upper1: {
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

    }, upper: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        marginTop: 10,
        // backgroundColor: COLORS.lightGray
    },
    textBox: {
        width: '95%',
        alignSelf: 'center',
        marginTop: 10
    },
    txt: {
        fontWeight: '400',
        textAlign: 'justify'
    }, fileBOx: {
        width: '100%',

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
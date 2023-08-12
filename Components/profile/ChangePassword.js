import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, StatusBar, ScrollView, SafeAreaView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, images, icons } from '../../constants'
import { EvilIcons, } from 'react-native-vector-icons';
import {path} from '../BaseUrl';



export default function ChangePassword() {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const getDataUsingGet = () => {
        setIsLoading(true);
        const formData = new FormData()
        formData.append('oldpassword', oldPass);
        formData.append('newpassword', newPass);
        formData.append('confirmpassword', confirmPass);

        try {
            fetch(path+'api/change_password', {
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
                           alert("Erfolgreich geändert ")
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

                });
        } catch (e) {
            setIsLoading(false)
            alert(e + ' ee')

        }
        // setIsLoading(false)

    };


    const validation = () => {
        //Check for the Name TextInput
        if (!oldPass.trim()) {
            alert('Bitte altes Passwort eingeben');
            return;
        }
        //Check for the Email TextInput
        if (!newPass.trim()) {
            alert('Bitte neues Passwort eingeben');
            return;
        }
        if (!confirmPass.trim()) {
            alert('Bitte Passwort bestätigen');
            return;
        }
        getDataUsingGet();
    };


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1, }}
        >
            <StatusBar />
            <ScrollView>
                <SafeAreaView style={styles.container} >
                    <View style={styles.headCurve}>
                        <View style={styles.logview}>
                            <Text style={styles.logtxt}>Profil</Text>
                        </View>
                        <View style={styles.logview}>
                            <Text style={styles.lowerTXt}>Ändern Sie Ihr Passwort</Text>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.innerBox}>
                            <View style={styles.upperTxt}>
                                <Text style={styles.nameTxt} >Aktuelles Passwort</Text>
                            </View>
                            <View style={styles.lowerBox}>
                                <View style={styles.leftBox}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={setOldPass}
                                        value={oldPass}
                                        placeholder="*****************"
                                    />
                                </View>
                                <TouchableOpacity style={styles.rightBox}>
                                    <EvilIcons name='pencil' size={28} />
                                </TouchableOpacity>

                            </View>

                        </View>


                        <View style={styles.innerBox}>
                            <View style={styles.upperTxt}>
                                <Text style={styles.nameTxt} >Neues Kennwort</Text>
                            </View>
                            <View style={styles.lowerBox}>
                                <View style={styles.leftBox}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={setNewPass}
                                        value={newPass}
                                        placeholder="*****************"
                                    />
                                </View>
                                <TouchableOpacity style={styles.rightBox}>
                                    <EvilIcons name='pencil' size={28} />
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={styles.innerBox}>
                            <View style={styles.upperTxt}>
                                <Text style={styles.nameTxt} >Bestätige das Passwort</Text>
                            </View>
                            <View style={styles.lowerBox}>
                                <View style={styles.leftBox}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={setConfirmPass}
                                        value={confirmPass}
                                        placeholder="*****************"
                                    />
                                </View>
                                <TouchableOpacity style={styles.rightBox}>
                                    <EvilIcons name='pencil' size={28} />
                                </TouchableOpacity>

                            </View>

                        </View>


                        <View style={styles.innerBox}>
                            <TouchableOpacity onPress={validation} style={styles.loginBtn}>

                                {
                                    isLoading == true ?
                                        <Image source={images.loading} style={{ width: 60, height: 60 }} />
                                        :
                                        <Text style={styles.loginTxt} >Weitermachen</Text>
                                }
                            </TouchableOpacity>
                        </View>

                    </View>



                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: SIZES.height,
    },
    headCurve: {
        width: SIZES.width,
        height: SIZES.height / 3.8,
        borderBottomLeftRadius: 145,
        borderBottomRightRadius: 145,
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
    },
    loginBtn: {
        width: '90%',
        height: 50,
        borderRadius: 20,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.primary
    },
    loginTxt: {
        fontSize: SIZES.body3,
        color: COLORS.white,
    },
    logview: {
        width: '90%',
        // height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: COLORS.darkgray,

    },
    logtxt: {
        fontSize: SIZES.h1 + 10,
        color: COLORS.white,
        fontWeight: '700'
    },
    lowerTXt: {
        fontSize: SIZES.h4, color: COLORS.white
    },
    box: {
        width: '90%',
        height: '60%',
        // borderWidth: 0.5,
        marginTop: '10%',
        alignSelf: 'center',
        // justifyContent: 'space-evenly'
        alignItems: 'center',
        borderRadius: 15
    },
    innerBox: {
        width: '100%',
        height: '20%',
        // borderWidth: 0.5,
        borderRadius: 10,
        justifyContent: 'center',

    },
    upperTxt: {
        width: '90%',
        height: 30,
        // borderWidth:0.5,
        flexDirection: 'row'
    },
    nameTxt: {

        marginLeft: 10,
        fontWeight: '700',
        alignSelf: 'center',
        fontSize: SIZES.body4
    },
    rightBox: {
        width: '13%',
        height: '100%',
        // borderWidth:0.3,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    leftBox: {
        width: '82%',
        height: '100%',
        flexDirection: 'row'

    },
    upperTxt: {
        width: '90%',
        height: 30,
        // borderWidth:0.5,
        flexDirection: 'row'
    },
    lowerBox: {
        width: '95%',
        height: 50,
        borderWidth: 0.5,
        alignSelf: 'center',
        borderRadius: 23,
        flexDirection: 'row'
    },
    input: {
        height: '100%',
        // borderWidth: 1,
        width: '100%',
        padding: 10,
        borderRadius: 21,

    },
})
import React, { useState,useEffect } from 'react'
import { View, Text } from 'react-native'
import Splash from '../Splash';
import Login from '../Login';
import Signup from '../Signup';
import TabNavigator from './TabNavigator';
import HomeScreen from '../Home/HomeScreen'
import Header from '../Header';
import ForgotPass from '../ForgotPass';
import FileScreen from '../Home/FileScreen';
import Ticket from '../requestTicket/Ticket'
import InnerTicket from '../requestTicket/InnerTicket';
import Calender from '../calender/Calender'
import Profile from '../profile/Profile'
import EditProfile from '../profile/EditProfile';
import ChangePassword from '../profile/ChangePassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function stackScreens() {
    const Stack = createNativeStackNavigator();
    const [session,setSession]=useState('')
   
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Splash" component={Splash}  />
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="TabNavigator" component={TabNavigator}  />
        <Stack.Screen name="ForgotPass" component={ForgotPass}  />
        <Stack.Screen name="FileScreen" component={FileScreen}  />
        <Stack.Screen name="Signup" component={Signup}  />
        <Stack.Screen name="InnerTicket" component={InnerTicket}  />
        <Stack.Screen name="EditProfile" component={EditProfile}  />
        <Stack.Screen name="ChangePassword" component={ChangePassword}  />
        <Stack.Screen name="HomeScreen" component={HomeScreen}  />
        <Stack.Screen name="Ticket" component={Ticket}  />
        <Stack.Screen name="Calender" component={Calender}  />
        <Stack.Screen name="Header" component={Header}  />
        <Stack.Screen name="Profile" component={Profile}  />



      </Stack.Navigator>
  )
}
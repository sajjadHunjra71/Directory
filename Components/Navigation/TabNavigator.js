// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import HomeScreen from '../Home/HomeScreen'
// import Ticket from '../requestTicket/Ticket'
// import { Platform } from 'react-native';
// import Calender from '../calender/Calender'
// import { COLORS, SIZES, images } from '../../constants'
// import { Octicons, FontAwesome, Fontisto, Feather,Ionicons } from 'react-native-vector-icons'
// import Profile from '../profile/Profile'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// export default function TabNavigator() {
//     const Tab = createBottomTabNavigator();
//     const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';
//     const TabIcon = ({ name }) => (
//         <Ionicons name={`${iconPrefix}-${name}`} size={24} />
//     );
//     return (
//         <Tab.Navigator

//             screenOptions={{
//                 tabBarShowLabel: false,
//                 tabBarActiveTintColor: '#ffffff',
//                 headerShown: false,
//                 tabBarStyle: {
//                     position: 'absolute',
//                     bottom: 25,
//                     left: 20,
//                     right: 20,
//                     backgroundColor: COLORS.primary,
//                     borderRadius: 23,
//                     height: 50,

//                 }
//             }}


//         >
//             <Tab.Screen name="HomeScreen" component={HomeScreen}

//                 options={{

//                     tabBarIcon: ({ color }) => (
//                         // <Octicons name={`${iconPrefix}-$'home'`} color={color} size={24} />
//                         <TabIcon name="home" />
//                     ),
//                 }}
//             />
//             <Tab.Screen name="Calender" component={Calender}

//                 options={{
//                     tabBarLabel: 'Reward',
//                     tabBarIcon: ({ color }) => (
//                         <FontAwesome name="calendar" size={24} color={color} />

//                     ),
//                 }}

//             />
//             <Tab.Screen name="Ticket" component={Ticket}

//                 options={{
//                     tabBarLabel: 'Reward',
//                     tabBarIcon: ({ color }) => (
//                         <Fontisto name="hipchat" size={24} color={color} />

//                     ),
//                 }}

//             />
//             <Tab.Screen name="Profile" component={Profile}

//                 options={{
//                     tabBarLabel: 'Reward',
//                     tabBarIcon: ({ color }) => (
//                         <Feather name="user" size={26} color={color} />

//                     ),
//                 }}

//             />

//         </Tab.Navigator>
//     )
// }

// const styles = StyleSheet.create({})













import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../Home/HomeScreen'
import Calender from '../calender/Calender'
import Ticket from '../requestTicket/Ticket';
import Profile from '../profile/Profile';
import { COLORS } from '../../constants';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';
  const TabIcon = ({ name, size, color }) => (
    <Ionicons name={`${iconPrefix}-${name}`} size={size} color={color} />
  );

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: COLORS.primary, // Change this to your desired background color
          borderRadius: 23,
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calender"
        component={Calender}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={Ticket}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="hipchat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

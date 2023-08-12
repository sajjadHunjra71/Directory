import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './Components/Splash';
import StackScreens from './Components/Navigation/StackScreens';

import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  return (
    <NavigationContainer>
      <StackScreens />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

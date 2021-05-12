import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import User from './screens/User';

const Stack = createStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator>       
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen}/>
      <Stack.Screen name="Chat" component={ChatScreen}/>
      <Stack.Screen name="User" component={User}/>
     </Stack.Navigator>
   </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/Login';
import Register from './screen/Register';
import Home from './screen/Home';
import DetailPost from './screen/DetailPost';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Facebook' }} />
        <Stack.Screen name="DetailPost" component={DetailPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

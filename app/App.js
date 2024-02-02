import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home';
import CreatePost from './screen/CreatePost';
import Profile from './screen/Profile';
import Login from './screen/Login';
import Register from './screen/Register';
import DetailPost from './screen/DetailPost';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pencil" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ title: 'Facebook',
          headerRight: () => (
            <Button
              onPress={() => alert('Are you sure?')}
              title="Logout"
              color="#1877f2"
            />
          ), }} />
        <Stack.Screen name="DetailPost" component={DetailPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home';
import CreatePost from './screen/CreatePost';
import Profile from './screen/Profile';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Alert, Button } from 'react-native';
import AuthProvider, { AuthContext } from './context/AuthContext';
import MainStack from './navigators/MainStack';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './config/apolloClient';
import * as SecureStore from 'expo-secure-store';


const Tab = createBottomTabNavigator();

export function TabNavigator() {
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

export function HomeScreen() {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {


    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await SecureStore.deleteItemAsync('accessToken');
            authContext.setIsSignedIn(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Button
      onPress={handleLogout}
      title="Logout"
      color="#1877f2"
    />
  );
}

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;

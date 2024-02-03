import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screen/Login';
import Register from '../screen/Register';
import DetailPost from '../screen/DetailPost';
import { AuthContext } from '../context/AuthContext';
import { HomeScreen, TabNavigator } from '../App';

const Stack = createNativeStackNavigator();

const MainStack = () => {
const authContext = useContext(AuthContext);
console.log(authContext, 'authContext');
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!authContext.isSignedIn ? (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={TabNavigator}
                            options={{
                                title: 'Facebook',
                                headerRight: () => <HomeScreen />,
                            }}
                        />
                        <Stack.Screen name="DetailPost" component={DetailPost} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStack;

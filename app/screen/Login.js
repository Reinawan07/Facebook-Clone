import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { gql, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

const LOGIN_MUTATION = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    access_token
  }
}
`;

function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authContext = useContext(AuthContext);

    const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
        onCompleted: async (data) => {
          console.log('Login successful. Access Token:', data.login?.access_token);
          if (data.login?.access_token) {
            await SecureStore.setItemAsync('accessToken', data.login.access_token);
            authContext.setIsSignedIn(true);
          } else {
            console.error('Invalid access token received during login.');
          }
        },
      });
    

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://cdn.icon-icons.com/icons2/832/PNG/512/fb_icon-icons.com_66689.png' }}
                style={styles.logo}
            />

            <Text style={styles.title}>Login to Facebook</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    login({ variables: { username, password } });
                }}>

                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.separator} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Create New Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#1877f2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    forgotPassword: {
        color: '#1877f2',
        marginTop: 10,
    },
    separator: {
        height: 1,
        width: '80%',
        backgroundColor: '#ddd',
        marginVertical: 16,
    },
    registerLink: {
        color: '#1877f2',
        textDecorationLine: 'underline',
    },
});

export default Login;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://cdn.icon-icons.com/icons2/832/PNG/512/fb_icon-icons.com_66689.png' }}
                style={styles.logo}
            />

            <Text style={styles.title}>Login to Facebook</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
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

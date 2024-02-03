import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register($user: UserInput!) {
    register(user: $user) {
      _id
      name
      username
      email
      password
    }
  }
`;
function Register({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

    const handleRegister = async () => {
        try {
            const response = await register({
                variables: {
                    user: {
                        name,
                        username,
                        email,
                        password,
                    },
                },
            });
            console.log(response.data.register);

            // Navigasi ke halaman login setelah pendaftaran berhasil
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://cdn.icon-icons.com/icons2/832/PNG/512/fb_icon-icons.com_66689.png' }}
                style={styles.logo}
            />
            <Text style={styles.title}>Sign Up for Facebook</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.separator} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Already have an account? Log in.</Text>
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
    separator: {
        height: 1,
        width: '80%',
        backgroundColor: '#ddd',
        marginVertical: 16,
    },
    loginLink: {
        marginTop: 16,
        color: '#1877f2',
        textDecorationLine: 'underline',
    },
});

export default Register;

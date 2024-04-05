import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Perfil({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [apellidoPat, setApellidoPat] = useState('');
    const [apellidoMat, setApellidoMat] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const storedNombre = await AsyncStorage.getItem('nombre');
                const storedApellidoPat = await AsyncStorage.getItem('apellido_pat');
                const storedApellidoMat = await AsyncStorage.getItem('apellido_mat');
                const storedUsername = await AsyncStorage.getItem('username');
                const storedEmail = await AsyncStorage.getItem('email');

                if (storedNombre) setNombre(storedNombre);
                if (storedApellidoPat) setApellidoPat(storedApellidoPat);
                if (storedApellidoMat) setApellidoMat(storedApellidoMat);
                if (storedUsername) setUsername(storedUsername);
                if (storedEmail) setEmail(storedEmail);
            } catch (error) {
                console.log("Error al cargar los datos del perfil", error);
            }
        };

        loadProfileData();
    }, []);

    const updateProfile = async () => {
        if (newPassword !== confirmNewPassword) {
            alert('Las contraseñas nuevas no coinciden.');
            return;
        }

        // Comprobar que la contraseña actual coincida con la almacenada
        const storedPassword = await AsyncStorage.getItem('password');
        if (currentPassword !== storedPassword) {
            alert('La contraseña actual no es correcta.');
            return;
        }

        try {
            const response = await axios.post('http://192.168.100.23:8081/api/Proyecto_Integrador/personal/actualizar', {
                nombre,
                apellido_pat: apellidoPat,
                apellido_mat: apellidoMat,
                username,
                email,
                currentPassword,
                newPassword,
            });

            console.log(response.data);
            alert('Perfil actualizado correctamente.');

            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('nombre', nombre);
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('apellido_pat', apellidoPat);
            await AsyncStorage.setItem('apellido_mat', apellidoMat);
            if (newPassword) {
                await AsyncStorage.setItem('password', newPassword);
            }

        } catch (error) {
            console.error(error);
            alert('Error al actualizar el perfil.');
        }
    };

    const signOut = async () => {
        try {
            await AsyncStorage.clear();
            navigation.replace('login');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
            alert('Error al cerrar sesión.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Perfil</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#666"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido Paterno"
                    placeholderTextColor="#666"
                    value={apellidoPat}
                    onChangeText={setApellidoPat}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido Materno"
                    placeholderTextColor="#666"
                    value={apellidoMat}
                    onChangeText={setApellidoMat}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#666"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña Actual"
                    placeholderTextColor="#666"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nueva Contraseña"
                    placeholderTextColor="#666"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Nueva Contraseña"
                    placeholderTextColor="#666"
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.button} onPress={updateProfile}>
                    <Text style={styles.buttonText}>Actualizar Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonLogout]} onPress={signOut}>
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F1EFDB', // Fondo general
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F59456', // Color de encabezado
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        height: 50,
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F59456', // Borde del input
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: 'white', // Fondo del input
        color: '#000', // Color del texto
        shadowColor: '#F59456', // Sombra del input
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonGroup: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#F59456', // Botón principal
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonLogout: {
        backgroundColor: '#d9534f', // Botón de cerrar sesión
    },
    buttonText: {
        color: 'white', // Texto de los botones
        fontSize: 16,
        fontWeight: 'bold',
    },
});
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//////////SOLO CAMBIEN SU IP/////////////
const IP = '192.168.100.23'
/////////////////////////////////////////

export default function Perfil({ navigation }) {

    const [nombre, setNombre] = useState('');
    const [apellidoPat, setApellidoPat] = useState('');
    const [apellidoMat, setApellidoMat] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
        if (newPassword && newPassword !== confirmNewPassword) {
            alert('Las contraseñas nuevas no coinciden.');
            return;
        }
        try {
            const token = await AsyncStorage.getItem('token');
            const idPersonal = await AsyncStorage.getItem('id_personal');
            if (!idPersonal) {
                console.error("No se encontró el ID del personal en el almacenamiento local.");
                alert("Error al actualizar el perfil: No se encontró el ID del usuario.");
                return;
            }
            const updatePayload = {
                id_personal: idPersonal,
                nombre,
                apellido_pat: apellidoPat,
                apellido_mat: apellidoMat,
                email,
                rol: "Mesero",
                username,
                password: newPassword
            };

            if (newPassword) {
                updatePayload.password = newPassword;
            }

            const response = await fetch(`http://${IP}:8081/api/Proyecto_Integrador/personal/actualizar`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatePayload)
            });

            const responseData = await response.json();

            if (response.ok && responseData.status === 'OK') {
                console.log('Perfil actualizado correctamente.');
                alert('Perfil actualizado correctamente.');
                await AsyncStorage.multiSet([
                    ['token', token]
                    ['id_personal', idPersonal]
                    ['nombre', nombre],
                    ['apellido_pat', apellidoPat],
                    ['apellido_mat', apellidoMat],
                    ['email', email],
                    ['username', username],
                ]);

                navigation.replace('tab');
            } else {
                console.error('Error al actualizar el perfil: ', responseData.message);
                alert('Error al actualizar el perfil: ' + responseData.message);
            }
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el perfil. Por favor, intente de nuevo.');
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
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido Paterno"
                    placeholderTextColor="#666"
                    value={apellidoPat}
                    onChangeText={setApellidoPat}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido Materno"
                    placeholderTextColor="#666"
                    value={apellidoMat}
                    onChangeText={setApellidoMat}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#666"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
        backgroundColor: '#F1EFDB',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F59456',
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
        borderColor: '#F59456',
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: 'white',
        color: '#000',
        shadowColor: '#F59456',
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
        backgroundColor: '#F59456',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonLogout: {
        backgroundColor: '#d9534f',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
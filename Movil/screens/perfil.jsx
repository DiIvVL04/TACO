import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

async function updateProfile(data) {
    try {
        const response = await fetch('https://tuapi.com/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Algo salió mal al actualizar el perfil');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default function Perfil() {
    const navigation = useNavigation();
    const [image, setImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    const [nombre, setNombre] = useState('Kevin David Rodríguez Zúñiga');
    const [correo, setCorreo] = useState('20223tn108@utez.edu.mx');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] = useState(false);

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const UpdateProfile = async () => {
        if (newPassword !== confirmNewPassword) {
            Alert.alert("Error", "Las nuevas contraseñas no coinciden.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await updateProfile({ nombre, correo, image, currentPassword, newPassword });
            setIsLoading(false);
            Alert.alert("Éxito", "Perfil actualizado correctamente.");
        } catch (error) {
            setIsLoading(false);
            Alert.alert("Error", error.message);
        }
    };

    const closeSession = () => {
        navigation.replace('splash');
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }}
                style={styles.circulito}
                onPress={selectImage} />
            <TextInput
                style={styles.input}
                onChangeText={setNombre}
                value={nombre}
                placeholder="Usuario"
            />
            <TextInput
                style={styles.input}
                onChangeText={setCorreo}
                value={correo}
                placeholder="Correo Electronico"
                keyboardType="email-address"
            />

            <Text>CONTRASEÑA</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCurrentPassword}
                value={currentPassword}
                placeholder="Contraseña Actual"
                secureTextEntry
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    onChangeText={setNewPassword}
                    value={newPassword}
                    placeholder="Nueva Contraseña"
                    secureTextEntry={!isNewPasswordVisible}
                />
                <TouchableOpacity onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)} style={styles.eyeIcon}>
                    <Ionicons name={isNewPasswordVisible ? "eye-off" : "eye"} size={24} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.input, styles.passwordInput]}
                    onChangeText={setConfirmNewPassword}
                    value={confirmNewPassword}
                    placeholder="Confirmar Nueva contraseña"
                    secureTextEntry={!isConfirmNewPasswordVisible}
                />
                <TouchableOpacity onPress={() => setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible)} style={styles.eyeIcon}>
                    <Ionicons name={isConfirmNewPasswordVisible ? "eye-off" : "eye"} size={24} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'orange' }]}
                    onPress={UpdateProfile}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>GUARDAR</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red', marginTop: 10 }]}
                    onPress={closeSession}
                >
                    <Text style={styles.buttonText}>CERRAR SESIÓN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F1EFDB',
    },
    circulito: {
        borderRadius: 100,
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    passwordInput: {
        flex: 1,
    },
    buttonsContainer: {
        // Puedes ajustar esto para que se alinee como desees
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%', // Ajusta el ancho según necesites
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
});

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { Image } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';



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

    const closesession = () => {
        navigation.navigate('splash')
    };


    const [image, setImage] = useState('https://randomuser.me/api/portraits/men/36.jpg');
    const [nombre, setNombre] = useState('Kevin David Rodríguez Zúñiga');
    const [correo, setCorreo] = useState('20223tn108@utez.edu.mx');
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        try {
            const result = await updateProfile({ nombre, correo, image });
            setIsLoading(false);
            Alert.alert("Éxito", "Perfil actualizado correctamente.");
        } catch (error) {
            setIsLoading(false);
            Alert.alert("Error", error.message);
        }
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
                placeholder="Nombre"
            />
            <TextInput
                style={styles.input}
                onChangeText={setCorreo}
                value={correo}
                placeholder="Correo"
                keyboardType="email-address"
            />

            {isLoading ? (
                <Text>Cargando...</Text>
            ) : (
                <Button buttonStyle={{ borderRadius: 10 }}
                    color={'orange'}
                    title="Guardar"
                    onPress={UpdateProfile} />
            )}


            <Button
                buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                color={"red"}
                title="Cerrar Sesión"
                onPress={closesession}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    circulito: {
        borderRadius: 100,
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
});

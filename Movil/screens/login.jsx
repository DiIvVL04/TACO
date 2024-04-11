import React, { useState } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Modal,
    Text,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
} from "react-native";
import { Button, Card, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////SOLO CAMBIEN SU IP/////////////
const IP = '192.168.100.23'
/////////////////////////////////////////

const CustomAlert = ({ visible, title, message, onDismiss }) => (
    <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{title}</Text>
                <Text style={styles.modalText}>{message}</Text>
                <TouchableOpacity style={styles.button} onPress={onDismiss}>
                    <Text style={styles.textStyle}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

export default function Login() {
    const urlPersonal = `http://${IP}:8081/api/Proyecto_Integrador/personal/obtener`;
    const urlSignin = `http://${IP}:8081/api/Proyecto_Integrador/auth/signin`;
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigation = useNavigation();
    const [tries, setTries] = useState(0);
    const [alertInfo, setAlertInfo] = useState({ visible: false, title: "", message: "" });
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showCountdown, setShowCountdown] = useState(false);

    const showAlert = (title, message) => {
        setAlertInfo({ visible: true, title, message });
    };

    const validateUser = async () => {
        if (tries >= 2) {
            setCountdown(40);
            setShowCountdown(true);
            setIsLoginButtonDisabled(true);
            let interval = setInterval(() => {
                setCountdown((currentCountdown) => {
                    if (currentCountdown <= 1) {
                        clearInterval(interval);
                        setIsLoginButtonDisabled(false);
                        setShowCountdown(false);
                        setTries(0);
                        return 0;
                    }
                    return currentCountdown - 1;
                });
            }, 1000);
            return;
        }

        if (!userName || !password) {
            showAlert('Error', 'Por favor, ingresa un username y contraseña', 'error');
            return;
        }

        try {
            const response = await axios.get(urlPersonal);
            const usuarios = response.data.data;

            if (usuarios && usuarios.length > 0) {
                const usuarioValido = usuarios.find(user => user.username === userName);

                if (usuarioValido) {
                    console.log(`Rol: ${usuarioValido.rol} de ${usuarioValido.nombre}`);
                    console.log(usuarioValido);

                    const loginResponse = await axios.post(urlSignin, {
                        "username": usuarioValido.username,
                        "password": password
                    });

                    if (loginResponse.data.status === 'OK') {
                        await AsyncStorage.setItem('token', loginResponse.data.data);
                        await AsyncStorage.setItem('nombre', usuarioValido.nombre);
                        await AsyncStorage.setItem('apellido_pat', usuarioValido.apellido_pat);
                        await AsyncStorage.setItem('apellido_mat', usuarioValido.apellido_mat || '');
                        await AsyncStorage.setItem('email', usuarioValido.email)
                        await AsyncStorage.setItem('username', usuarioValido.username)
                        await AsyncStorage.setItem('id_personal', String(usuarioValido.idPersonal));

                        console.log("Guardando id_personal:", (usuarioValido.idPersonal));

                        navigation.replace("Tab");
                    } else {
                        setTries(tries + 1);
                        showAlert(
                            "Acceso Denegado",
                            `Usuario y/o Contraseña Incorrectos,
    o no cuentas permisos de MESERO.
    Intentos restantes: ${3 - tries - 1}`
                        );
                    }
                } else {
                    showAlert('Error', 'Username y/o contraseña incorrectos', 'error');
                }
            } else {
                showAlert('Error', 'No se encontraron usuarios', 'error');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            showAlert('Error', 'Ocurrió un error inesperado durante el proceso de inicio de sesión', 'error');
        } finally {
            setIsLoginButtonDisabled(false);
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground source={require("../assets/fondopho.gif")} style={styles.backgroundGIF}>
                <Card containerStyle={styles.card}>
                    <Image style={styles.image} source={require("../assets/LogoTACO.png")} />
                    <TextInput
                        style={styles.input}
                        value={userName}
                        onChangeText={setUserName}
                        placeholder="Ingresa tu Usuario"
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Ingresa tu Contraseña"
                            secureTextEntry={!isPasswordVisible}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eye}>
                            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="grey" />
                        </TouchableOpacity>
                    </View>
                    <Button
                        buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                        color={"orange"}
                        title="Iniciar Sesión"
                        onPress={validateUser}
                        disabled={isLoginButtonDisabled}
                    />
                    {showCountdown && (
                        <Text style={{ color: 'red', marginTop: 10 }}>
                            Demasiados intentos. Espera {countdown} segundos.
                        </Text>
                    )}
                    <CustomAlert
                        visible={alertInfo.visible}
                        title={alertInfo.title}
                        message={alertInfo.message}
                        onDismiss={() => setAlertInfo({ ...alertInfo, visible: false })}
                    />
                </Card>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    card: {
        backgroundColor: "rgba(0,0,0,1)",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    image: {
        height: 150,
        width: 290,
        borderRadius: 10,
    },
    input: {
        height: 40,
        width: 250,
        margin: 15,
        marginLeft: 20,
        borderRadius: 10,
        backgroundColor: "white",
        paddingHorizontal: 10,
        fontSize: 18,
    },
    eye: {
        position: "absolute",
        right: 30,
        top: 22,
    },
    backgroundGIF: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },

});

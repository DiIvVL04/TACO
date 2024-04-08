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
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigation = useNavigation();
    let [tries, setTries] = useState(0);
    const [alertInfo, setAlertInfo] = useState({ visible: false, title: "", message: "" });
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showCountdown, setShowCountdown] = useState(false);

    const showAlert = (title, message) => {
        setAlertInfo({ visible: true, title, message });
    };

    const validateUser = async () => {
        if (tries >= 3) {
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

        try {
            const response = await axios.get(
                "http://192.168.100.23:8081/api/Proyecto_Integrador/personal/obtener"
            );
            console.log(response);

            const meseros = response.data.data.filter(
                (personal) => personal.rol === "Mesero"
            );
            const meseroValido = meseros.find(
                (mesero) => mesero.username === userName && mesero.password === password
            );

            if (meseroValido) {
                await AsyncStorage.setItem('nombre', meseroValido.nombre);
                await AsyncStorage.setItem('apellido_pat', meseroValido.apellido_pat);
                await AsyncStorage.setItem('apellido_mat', meseroValido.apellido_mat);
                await AsyncStorage.setItem('username', meseroValido.username);
                await AsyncStorage.setItem('email', meseroValido.email);
                await AsyncStorage.setItem('password', meseroValido.password);
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
        } catch (error) {
            console.error(error);
            if (!error.response) {
                showAlert("Error de Conexión", "No se pudo conectar con el servidor.");
            } else {
                showAlert("Error", "Ocurrió un error inesperado.");
            }
        }
    };



    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground
                source={require("../assets/fondopho.gif")}
                style={styles.backgroundGIF}
            >
                <Card containerStyle={styles.card}>
                    <Image
                        style={styles.image}
                        source={require("../assets/LogoTACO.png")}
                    />
                    <TextInput
                        style={styles.input}
                        value={userName}
                        onChangeText={setUserName}
                        placeholder=" Ingresa tu Usuario"
                    />

                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder=" Ingresa tu Contraseña"
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.eye}
                    >
                        <Ionicons
                            name={isPasswordVisible ? "eye-off" : "eye"}
                            size={24}
                            color="grey"
                        />
                    </TouchableOpacity>

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
    card: {
        backgroundColor: "rgba(0,0,0,0.5)",
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
        top: 242,
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

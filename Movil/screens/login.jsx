import React, { useState } from "react";
import { StyleSheet, TextInput, View, Alert, TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import { Button, Card, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");

    const user = {
        userName: "Mesero",
        password: "12345",
    };
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigation = useNavigation();

    let tries = 0;

    const validateUser = () => {
        if (tries <= 3) {
            if (userName === user.userName && password === user.password) {
                navigation.replace("Tab");
            } else {
                Alert.alert("Contraseña o Usuarios Incorrectos", `Te quedan ${3 - tries} intentos`, [
                    { text: "Intentar de Nuevo", onPress: () => tries++ },
                ]);
            }
        } else {
            Alert.alert("Demasiados Intentos", "Ingresa el Usuario/Contraseña Correcta", [
                {
                    text: "OK",
                },
            ]);
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
                <Image style={styles.image} source={require("../assets/LogoTACO.png")} />
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
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eye}>
                    <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="grey" />
                </TouchableOpacity>

                <Button
                    buttonStyle={{ borderRadius: 10, marginTop: 10 }}
                    color={"orange"}
                    title="Iniciar Sesión"
                    onPress={validateUser}
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
        margin:15,
        marginLeft:20,
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

});

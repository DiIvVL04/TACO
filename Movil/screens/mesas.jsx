import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Card, Avatar, ListItem, Image } from '@rneui/themed';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Simulación de datos del menú
const MENU_ITEMS = [
    { id: 1, categoria: 'Entradas', nombre: 'Guacamole', precio: 50, cantidad: 0 },
    { id: 2, categoria: 'Guisados', nombre: 'Mole con pollo', precio: 100, cantidad: 0 },
    { id: 3, categoria: 'Bebidas', nombre: 'Agua de horchata', precio: 30, cantidad: 0 },
    { id: 4, categoria: 'Postres', nombre: 'Flan', precio: 40, cantidad: 0 },
];





export default function Mesas() {
    const navigation = useNavigation();

    //Simulacion de Menu
    const [modalVisible, setModalVisible] = useState(false);
    const [menu, setMenu] = useState(MENU_ITEMS);

    const aumentarCantidad = (id) => {
        const nuevoMenu = menu.map((item) => {
            if (item.id === id) {
                return { ...item, cantidad: item.cantidad + 1 };
            }
            return item;
        });
        setMenu(nuevoMenu);
    };

    const disminuirCantidad = (id) => {
        const nuevoMenu = menu.map((item) => {
            if (item.id === id && item.cantidad > 0) {
                return { ...item, cantidad: item.cantidad - 1 };
            }
            return item;
        });
        setMenu(nuevoMenu);
    };
    /////////////////////////////////////////////////////////////////////////////




    const nombre = 'Angelo Daniel';
    const ocupacion = 'Mesero';

    const irPerfil = () => {
        navigation.navigate('perfil')
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '10%', backgroundColor: 'orange', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar
                    size={50}
                    rounded
                    margin={10}
                    source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
                />
                <ListItem.Content>
                    <ListItem.Title
                        onPress={irPerfil}
                        style={{ color: "black", fontWeight: "bold" }}>
                        {nombre}
                    </ListItem.Title>
                    <ListItem.Subtitle
                        onPress={irPerfil}
                        style={{ color: "black" }}>
                        {ocupacion}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </View>

            <View style={styles.mesas}>

                <Card style={styles.mesacard}>
                    <View style={styles.imgname}>
                    <Image source={require('../assets/mesa.png')} style={styles.imageStyle} />
                    <Text marginLeft={20} style={{fontSize:40, fontStyle:'bold', margin:10 }}>MESA 1</Text>
                    </View>
                    <Button
                        color={'orange'}
                        onPress={() => setModalVisible(true)}
                        containerStyle={{
                            width: 'auto',
                            borderRadius: 10,
                        }}
                    >
                        ORDEN
                        <Octicons
                            margin={10}
                            name="list-unordered"
                            size={15}
                            color="black"
                        />
                    </Button>
                </Card>
            </View>



            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            {menu.map((item) => (
                                <View key={item.id} style={styles.menuItem}>
                                    <Text style={styles.menuText}>{item.nombre} - ${item.precio}</Text>
                                    <View style={styles.counterView}>
                                        <TouchableOpacity onPress={() => disminuirCantidad(item.id)} style={styles.counterButton}>
                                            <Text style={styles.counterButtonText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.counterText}>{item.cantidad}</Text>
                                        <TouchableOpacity onPress={() => aumentarCantidad(item.id)} style={styles.counterButton}>
                                            <Text style={styles.counterButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                        <View style={styles.ButtonModal}>
                            <Button title="Cerrar" color={'red'} onPress={() => setModalVisible(false)} />
                            <Button title="Pedir" color={'orange'} onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>

        </View >


    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#f2f2f200',
        alignItems: 'center',
    },
    mesas: {
        flexDirection: 'column',
        width: '100%',
    },
    mesacard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    imgname:{
        flexDirection:'row'
    },








    //Modales
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 80,
        backgroundColor: "#F1EFDB",
        borderRadius: 20,
        padding: 50,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    counterView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    counterButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 20,
    },
    counterButtonText: {
        fontSize: 15,
    },
    counterText: {
        marginHorizontal: 30,
        fontSize: 20,
    },
    ButtonModal: {
        flexDirection: 'row',
    }

});
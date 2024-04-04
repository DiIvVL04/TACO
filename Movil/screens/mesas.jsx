import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, ListItem, Image } from '@rneui/themed';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Mesas = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [mesas, setMesas] = useState([]);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [menu, setMenu] = useState([]);
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        fetchMesas();
        fetchPlatillos();
        fetchNombreUsuario();
    }, []);

    const fetchNombreUsuario = async () => {
        try {
            const nombre = await AsyncStorage.getItem('nombre');
            const apellidoPat = await AsyncStorage.getItem('apellido_pat'); 
            
            if (nombre && apellidoPat) {
                const nombreCompleto = `${nombre} ${apellidoPat}`;
                setNombre(nombreCompleto); 
            }
        } catch (error) {
            console.log("Error al obtener el nombre y apellido del usuario:", error);
        }
    };

    const fetchPlatillos = async () => {
        try {
            const response = await fetch('http://192.168.100.23:8081/api/Proyecto_Integrador/platillo/obtener');
            const data = await response.json();
            if (data.status === "OK") {
                let gruposPorTipo = {};
                data.data.forEach(platillo => {
                    const tipo = platillo.tipo;
                    if (!gruposPorTipo[tipo]) {
                        gruposPorTipo[tipo] = [];
                    }
                    gruposPorTipo[tipo].push({
                        id: platillo.idPlatillos,
                        nombre: platillo.nombre,
                        precio: platillo.precio,
                        cantidad: 0,
                    });
                });
                setMenu(gruposPorTipo);
            } else {
                console.log('Error fetching platillos:', data.mensaje);
            }
        } catch (error) {
            console.error('Error fetching platillos:', error);
        }
    };

    const cerrarYResetear = () => {
        const menuReset = { ...menu };
        Object.keys(menuReset).forEach(tipo => {
            menuReset[tipo] = menuReset[tipo].map(item => {
                return { ...item, cantidad: 0 };
            });
        });
        setMenu(menuReset);
        setModalVisible(false);
    };


    //  POR PROBAR ////////////////////////////////////////////
    const enviarPedido = async () => {
        const idMesa = mesaSeleccionada?.idMesas;
        const pedido = Object.keys(menu).flatMap(tipo =>
            menu[tipo].filter(item => item.cantidad > 0).map(item => ({
                idPlatillo: item.id,
                cantidad: item.cantidad,
            }))
        );

        const dataParaEnviar = {
            idMesa,
            platillos: pedido,
        };

        try {
            const respuesta = await fetch('http://192.168.100.23:8081/api/Proyecto_Integrador/orden/guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataParaEnviar),
            });

            if (respuesta.ok) {
                console.log('Pedido enviado con éxito');
                cerrarYResetear();
            } else {
                const errorData = await respuesta.json();
                console.error('Error al enviar el pedido:', errorData.message);
            }
        } catch (error) {
            console.error('Error al enviar el pedido', error);
        }
    };

    //////////////////////////////////////////////////////////////////////////////////////



    const fetchMesas = async () => {
        try {
            const response = await fetch('http://192.168.100.23:8081/api/Proyecto_Integrador/mesa/obtener');
            const data = await response.json();
            if (!data.error) {
                setMesas(data.data);
            } else {
                console.log('Error fetching mesas:', data.mensaje);
            }
        } catch (error) {
            console.error('Error fetching mesas:', error);
        }
    };


    const aumentarCantidad = (idPlatillo) => {
        setMenu(prevMenu => {
            return Object.keys(prevMenu).reduce((acc, tipo) => {
                acc[tipo] = prevMenu[tipo].map(item => {
                    if (item.id === idPlatillo) {
                        return { ...item, cantidad: item.cantidad + 1 };
                    }
                    return item;
                });
                return acc;
            }, {});
        });
    };

    const disminuirCantidad = (id) => {
        const nuevoMenu = Object.entries(menu).reduce((acc, [tipo, platillos]) => {
            acc[tipo] = platillos.map(platillo => {
                if (platillo.id === id && platillo.cantidad > 0) {
                    return { ...platillo, cantidad: platillo.cantidad - 1 };
                }
                return platillo;
            });
            return acc;
        }, {});

        setMenu(nuevoMenu);
    };

    const ocupacion = 'Mesero';

    const irPerfil = () => {
        navigation.navigate('perfil');
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '10%', backgroundColor: '#F59456', flexDirection: 'row', alignItems: 'center' }}>
                <ListItem.Content>
                    <ListItem.Title
                        onPress={irPerfil}
                        style={{ color: "black", fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
                        {nombre}
                    </ListItem.Title>
                    <ListItem.Subtitle
                        onPress={irPerfil}
                        style={{ color: "black", fontSize: 16, marginLeft: 10 }}>
                        {ocupacion}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </View>

            <ScrollView style={styles.mesasContainer}>
                {mesas.map((mesa) => (
                    <Card
                        key={mesa.idMesas}
                        containerStyle={mesa.estado ? styles.mesacard : styles.mesacardDisabled}
                    >
                        <View>
                            <View style={styles.imgName}>
                                <Image source={require('../assets/mesa.png')} style={styles.imageStyle} />
                                <Text marginLeft={20} style={styles.mesaText}>MESA {mesa.id_mesas}</Text>
                            </View>
                            {mesa.estado && (
                                <Button
                                    color={'orange'}
                                    onPress={() => {
                                        setMesaSeleccionada(mesa);
                                        setModalVisible(true);
                                    }}
                                    containerStyle={styles.buttonContainer}
                                >
                                    ORDEN
                                    <Octicons name="list-unordered" size={15} color="black" />
                                </Button>
                            )}
                        </View>
                    </Card>
                ))}

            </ScrollView>



            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            {Object.keys(menu).map((tipo) => (
                                <View key={tipo}>
                                    <Text style={styles.tipoText}>{tipo}</Text>
                                    {menu[tipo].map((item) => (
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
                                </View>
                            ))}
                        </ScrollView>
                        <View style={styles.buttonModal}>
                            <Button title="Cerrar" color={'red'} onPress={cerrarYResetear} />
                            <Button title="Ordenar" color={'orange'} onPress={enviarPedido} />
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
        backgroundColor: '#F1EFDB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#F59456',
    },
    headerText: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubtitle: {
        marginLeft: 10,
        fontSize: 14,
        color: '#fff',
    },
    mesasContainer: {
        padding: 10,
    },
    mesacard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    imgName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyle: {
        width: 50,
        height: 50,
    },
    mesaText: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 16,
    },
    mesacardDisabled: {
        backgroundColor: '#D3D3D3',
        opacity: 0.5,
        padding: 15,
        marginBottom: 10,
    },
    orderButton: {
        marginTop: 10,
        backgroundColor: 'orange',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
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
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxHeight: '80%',
    },

    tipoContainer: {
        marginBottom: 20,
    },
    tipoText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    menuText: {
        fontSize: 16,
        marginRight: 25,
    },
    counterView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterButton: {
        backgroundColor: '#DDD',
        padding: 5,
        borderRadius: 5,
    },
    counterButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    counterText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    buttonModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
});


export default Mesas;
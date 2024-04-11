import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { Button, Card, ListItem } from '@rneui/themed';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////SOLO CAMBIEN SU IP/////////////
const IP = '192.168.100.23'
/////////////////////////////////////////

const Mesas = () => {
    
    useEffect(() => {
        fetchMesas();
        fetchNombreUsuario();
    }, []);

    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [mesas, setMesas] = useState([]);
    const ocupacion = 'Mesero';
    const [modalVisible, setModalVisible] = useState(false);

    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

    const StoragePedido = async () => {
        try {
            navigation.navigate("pedidos");
        } catch (error) {
            console.error('Error al guardar en AsyncStorage:', error);
        }
    };

    const fetchNombreUsuario = async () => {
        try {
            const values = await AsyncStorage.multiGet(['nombre', 'apellido_pat', 'apellido_mat']);
            const [[, nombre], [, apellidoPat], [, apellidoMat],] = values;
            const nombreCompleto = `${nombre} ${apellidoPat} ${apellidoMat}`.trim();
            setNombre(nombreCompleto);
        } catch (error) {
            console.log('Error al obtener datos del usuario:', error);
        }
    };

    const fetchMesas = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`http://${IP}:8081/api/Proyecto_Integrador/mesa/obtener`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (!data.error && data.data) {
                setMesas(data.data);
                fetchMesas();
            } else {
                console.log('Error fetching mesas:', data.mensaje);
            }
        } catch (error) {
            console.error('Error fetching mesas:', error);
        }
    };


    const crearPedido = async () => {
        const idPersonalStr = await AsyncStorage.getItem('id_personal');
        const idPersonal = parseInt(idPersonalStr);
        
        const idMesasStr = await AsyncStorage.getItem('id_mesas');
        const idMesas = parseInt(idMesasStr);

        const pedido = {
            idPedidos: 0,
            mesaBean: {
                id_mesas: idMesas,
            },
            personalBean: {
                idPersonal: idPersonal,
            },
            status: false,
        };

        console.log(idMesas, idPersonal);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`http://${IP}:8081/api/Proyecto_Integrador/pedido/guardar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedido)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Pedido creado exitosamente', responseData);
                alert('Pedido creado con éxito');

            } else {
                const errorData = await response.text();
                console.error('Error al crear el pedido:', errorData);
                alert('Error al crear el pedido. Por favor, intente nuevamente.');
            }
        } catch (error) {
            console.error('Ocurrió un error al crear el pedido:', error);
            alert('Ocurrió un error al crear el pedido. Por favor, verifique su conexión y intente nuevamente.');
        }
    };



    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: '10%', backgroundColor: '#F59456', flexDirection: 'row', alignItems: 'center' }}>
                <ListItem.Content>
                    <ListItem.Title
                        style={{ color: "black", fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
                        {nombre}
                    </ListItem.Title>
                    <ListItem.Subtitle
                        style={{ color: "black", fontSize: 16, marginLeft: 10 }}>
                        {ocupacion}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </View>

            <ScrollView style={styles.mesasContainer}>
                {mesas.map((mesa) => (
                    <TouchableOpacity
                    key={mesa.idMesas}
                    style={[styles.mesaCard, mesa.estado === 0 ? { opacity: 0.5 } : {}]}
                    onPress={async () => {
                        if (mesa.estado == 1) {
                            setMesaSeleccionada(mesa.id_mesas);
                            await AsyncStorage.setItem('id_mesas', mesa.id_mesas.toString());
                            setModalVisible(true);
                        }
                        return;
                        }}
                    >
                        <Card containerStyle={mesa.estado ? styles.mesacard : styles.mesacardDisabled}>
                            <View>
                                <View style={styles.imgName}>
                                    <Image source={require('../assets/mesa.png')} style={styles.imageStyle} />
                                    <Text style={[styles.mesaText, { marginLeft: 20 }]}>MESA {mesa.id_mesas}</Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>




            {/* Modal Seleccionar Mesa */}
            {modalVisible && (
                <View style={styles.modalBackground} />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView1}>
                    <View style={styles.modalView1}>
                        <View style={styles.buttonCard}>
                            <Button
                                buttonStyle={{ backgroundColor: '#2A2E98', borderRadius: 20 }}
                                containerStyle={styles.buttonContainer}
                                onPress={() => crearPedido(true)}
                                icon={<Octicons name="plus-circle" size={20} color="white" style={{ marginRight: 5 }} />}
                                title="Crear Pedido"
                                titleStyle={{ fontSize: 14 }}
                            />
                            <Button
                                buttonStyle={{ backgroundColor: '#D32F87', borderRadius: 20 }}
                                containerStyle={styles.buttonContainer}
                                onPress={StoragePedido}
                                icon={<MaterialCommunityIcons name="file-eye-outline" size={20} color="white" style={{ marginRight: 5 }} />}
                                title="Ver Pedidos"
                                titleStyle={{ fontSize: 14 }}
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </TouchableOpacity>
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
    mesasContainer: {
        padding: 10,
    },
    mesacard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
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
        fontSize: 23,
    },
    mesacardDisabled: {
        backgroundColor: '#D3D3D3',
        opacity: 0.5,
        padding: 15,
        marginBottom: 10,
    },
    centeredView1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView1: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxHeight: '80%',
    },
    buttonCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    buttonClose: {
        marginTop: 20,
        backgroundColor: "#F59456",
        padding: 10,
        elevation: 2,
        borderRadius: 10,
        width: '40%',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },


});


export default Mesas;
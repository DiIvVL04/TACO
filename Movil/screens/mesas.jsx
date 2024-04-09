import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput
} from 'react-native';
import { Button, Card, ListItem } from '@rneui/themed';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////SOLO CAMBIEN SU IP/////////////
const IP = '192.168.100.23'
/////////////////////////////////////////

const Mesas = () => {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [mesas, setMesas] = useState([]);

    const [crearPedidoModalVisible, setCrearPedidoModalVisible] = useState(false);
    const [idMesas, setIdMesas] = useState("");
    const ocupacion = 'Mesero';

    const [modalVisible, setModalVisible] = useState(false);

    const [mesaSeleccionada, setMesaSeleccionada] = useState('');


    useEffect(() => {
        fetchMesas();
        fetchNombreUsuario();
    }, []);



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

        if (!idMesas) {
            alert("Por favor, seleccione una mesa.");
            return;
        }

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



    const crearOrden = async () => {
        const pedido = {
            idOrdenes: 0,
            pedidoBean: {},
            platilloBean: platillos.filter(p => p.cantidad > 0),
            status: false,
        };

        try {
            const respuesta = await fetch(`https://${IP}.23:8081/api/Proyecto_Integrador/orden/guardar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedido),
            });

            if (respuesta.ok) {
                console.log('Orden creada con éxito');
                setIsModalVisible(false);
            } else {
                throw new Error('Error al crear la orden');
            }
        } catch (error) {
            console.error(error);
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
                <Button
                    buttonStyle={{ backgroundColor: '#2A2E98', borderRadius: 20 }}
                    containerStyle={styles.buttonContainer}
                    onPress={() => setCrearPedidoModalVisible(true)}
                    icon={<Octicons name="plus-circle" size={20} color="white" style={{ marginRight: 5 }} />}
                    title="Crear Pedido"
                    titleStyle={{ fontSize: 14 }}
                />
                {mesas.map((mesa) => (
                    <TouchableOpacity
                        key={mesa.idMesas}
                        style={[styles.mesaCard, mesa.estado === 0 ? { opacity: 0.5 } : {}]}
                        onPress={() => {

                            if (mesa.estado == 1) {
                                setMesaSeleccionada(mesa.idMesas);
                                setModalVisible(true);
                            } return;
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



            {/* Modal Crear Pedido */}
            {crearPedidoModalVisible && (
                <View style={styles.modalBackground} />

            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={crearPedidoModalVisible}
                onRequestClose={() => {
                    setCrearPedidoModalVisible(!crearPedidoModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView1}>
                        <Text style={styles.modalText}>Pedido para Mesa: </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setIdMesas}
                            value={idMesas}
                            placeholder="Número de la Mesa"
                            keyboardType="numeric"
                        />
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.buttonClose, styles.buttonStyle]}
                                onPress={() => setCrearPedidoModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonClose, styles.buttonStyle]}
                                onPress={crearPedido}
                            >
                                <Text style={styles.textStyle}>Crear</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>




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
                                buttonStyle={{ backgroundColor: 'orange', borderRadius: 20 }}
                                containerStyle={styles.buttonContainer}
                                onPress={() => {
                                    setIsModalVisibleOrden(true); // Esto abrirá el modal
                                }}
                                icon={<Ionicons name="create" size={20} color="white" style={{ marginRight: 5 }} />}
                                title="Crear Orden"
                                titleStyle={{ fontSize: 14 }}
                            />
                            <Button
                                buttonStyle={{ backgroundColor: '#D32F87', borderRadius: 20 }}
                                containerStyle={styles.buttonContainer}
                                onPress={() => {
                                }}
                                icon={<MaterialCommunityIcons name="file-eye-outline" size={20} color="white" style={{ marginRight: 5 }} />}
                                title="Ver Pedidos"
                                titleStyle={{ fontSize: 14 }}
                            />
                        </View>

                        <View>


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
    stockText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
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
    cardSpace: {
        flex: 1,
        flexDirection: "column",
    },
    stockText: {
        fontSize: 12,
        color: '#666',
    },
    platoDeshabilitado: {
        backgroundColor: '#FCA5A5',
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
        marginTop: 10,
        width: '100%',
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
        backgroundColor: "#2196F3",
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: '100%',
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttonStyle: {
        backgroundColor: "#2196F3",
        padding: 10,
        margin: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },


});


export default Mesas;
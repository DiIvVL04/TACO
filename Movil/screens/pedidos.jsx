import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Button, Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////SOLO CAMBIEN SU IP/////////////
const IP = '192.168.100.23'
/////////////////////////////////////////

export default function Pedidos() {

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchTickets();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        fetchTickets();
    }, []);

    const recuperarIdsPedidos = async () => {
        const idsPedidosStr = await AsyncStorage.getItem('id_Pedidos');
        const idsPedidos = JSON.parse(idsPedidosStr || '[]');
    };

    const regresarTab = () => {
        navigation.replace("Tab");
    };


    const navigation = useNavigation();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const [orden, setOrden] = useState([]);

    const [ordenes, setOrdenP] = useState([]);

    const [isModalVisibleOrden, setModalVisibleOrden] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);


    const handlePressTicket = async (item) => {
        setModalVisible(true);
        console.log("Item seleccionado:", item);
        if (item && item.data && item.data.idPedidos !== undefined) {
            try {
                await AsyncStorage.setItem('id_Pedidos', JSON.stringify(item.data.idPedidos));
                console.log("idPedidos seleccionado y guardado:", item.data.idPedidos);
            } catch (error) {
                console.error("Error al seleccionar y guardar el idPedidos:", error);
            }
        } else {
            console.error("El item seleccionado no tiene un idPedidos válido:", item);
        }
    };

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const idPersonalStr = await AsyncStorage.getItem('id_personal');
            const idMesasStr = await AsyncStorage.getItem('id_mesas');
            const idPersonal = parseInt(idPersonalStr);
            const idMesas = parseInt(idMesasStr);
            const token = await AsyncStorage.getItem('token');

            console.log(idMesas, idPersonal);
            if (!idPersonal || !idMesas || !token) {
                console.error('Falta idPersonal, idMesas, o token');
                setLoading(false);
                return;
            }

            let ticketsFiltrados = [];
            let idsPedidos = [];

            for (let idPedido = 1; idPedido <= 30; idPedido++) {
                const response = await fetch(`http://${IP}:8081/api/Proyecto_Integrador/pedido/obtenerUno`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        idPedidos: idPedido,
                        mesaBean: { id_mesas: idMesas },
                        personalBean: {},
                        status: false,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.data.mesaBean?.id_mesas);
                    if (data && data.data.mesaBean?.id_mesas == idMesas && data.data.statusP == false) {
                        console.log('id Pedido ' + idPedido)
                        idsPedidos.push(idPedido);
                        ticketsFiltrados.push(data);
                    }
                }
            }

            await AsyncStorage.setItem('id_Pedidos', JSON.stringify(idsPedidos));

            setTickets(ticketsFiltrados);
        } catch (error) {
            console.error('Error al obtener tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    const crearOrden = async () => {
        const token = await AsyncStorage.getItem('token');
        const idPedidoStr = await AsyncStorage.getItem('id_Pedidos');
        const idPedido = JSON.parse(idPedidoStr);

        console.log("ID del Pedido actual:", idPedido);

        for (const tipo of Object.keys(orden)) {
            for (const platillo of orden[tipo]) {
                if (platillo.cantidad > 0) {
                    for (let i = 0; i < platillo.cantidad; i++) {
                        const ordenParaPlatillo = {
                            idOrdenes: 0,
                            pedidoBean: { idPedidos: idPedido },
                            platilloBean: { idPlatillos: platillo.id },
                            status: false
                        };

                        try {
                            const response = await fetch(`http://${IP}:8081/api/Proyecto_Integrador/orden/guardar`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify(ordenParaPlatillo)
                            });

                            if (!response.ok) {
                                throw new Error(`Respuesta no exitosa del servidor con estado ${response.status}`);
                            }

                            const data = await response.json();
                            if (data.status !== "OK") {
                                console.error(`Error creando la orden para el platillo ID: ${platillo.id} en el pedido ID: ${idPedido}, Mensaje: ${data.mensaje}`);
                            } else {
                                console.log(`Orden creada con éxito para el platillo ID: ${platillo.id} en el pedido ID: ${idPedido}`);
                            }
                        } catch (error) {
                            console.error(`Error al enviar la orden para el platillo ID: ${platillo.id} en el pedido ID: ${idPedido}`, error);
                        }
                    }
                }
            }
        }
    };


    const fetchPlatillos = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`http://${IP}:8081/api/Proyecto_Integrador/platillo/obtener`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.status === "OK") {
                let gruposPorTipo = {};
                let idsPlatillos = [];
                const platillosConStock = data.data.filter(platillo => platillo.stock > 0);
                platillosConStock.forEach(platillo => {
                    const tipo = platillo.tipo;
                    if (!gruposPorTipo[tipo]) {
                        gruposPorTipo[tipo] = [];
                    }
                    gruposPorTipo[tipo].push({
                        id: platillo.idPlatillos,
                        nombre: platillo.nombre,
                        precio: platillo.precio,
                        cantidad: 0,
                        stock: platillo.stock,
                    });
                    idsPlatillos.push(platillo.idPlatillos);
                });
                await AsyncStorage.setItem('id_Platillos', JSON.stringify(idsPlatillos));
                console.log('IDs Platillo:', idsPlatillos);
                setOrden(gruposPorTipo);
            } else {
                console.log('Error fetching platillos:', data.mensaje);
            }
        } catch (error) {
            console.error('Error fetching platillos:', error);
        }
    };


    const aumentarCantidad = (itemId) => {
        setOrden(prevOrden => {
            const nuevoOrden = {};
            Object.keys(prevOrden).forEach(tipo => {
                nuevoOrden[tipo] = prevOrden[tipo].map(platillo => {
                    if (platillo.id === itemId && platillo.cantidad < platillo.stock) {
                        return { ...platillo, cantidad: platillo.cantidad + 1 };
                    }
                    return platillo;
                });
            });
            return nuevoOrden;
        });
    };

    const disminuirCantidad = (itemId) => {
        setOrden(prevOrden => {
            const nuevoOrden = {};
            Object.keys(prevOrden).forEach(tipo => {
                nuevoOrden[tipo] = prevOrden[tipo].map(platillo => {
                    if (platillo.id === itemId && platillo.cantidad > 0) {
                        return { ...platillo, cantidad: platillo.cantidad - 1 };
                    }
                    return platillo;
                });
            });
            return nuevoOrden;
        });
    };

    const verOrdenes = async () => {
        const token = await AsyncStorage.getItem('token');
        const idPedidoGuardado = await AsyncStorage.getItem('id_Pedidos');
        const idPedido = idPedidoGuardado ? JSON.parse(idPedidoGuardado) : null;

        if (idPedido) {
            try {
                const response = await fetch(`http://${IP}:8081/api/Proyecto_Integrador/orden/pedidos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "pedidoBean": {
                            "idPedidos": idPedido,
                        },
                    }),
                });
                if (!response.ok) {
                    throw new Error(`Error en la respuesta del servidor: ${response.status}`);
                }
                const respuesta = await response.json();
                if (respuesta.error) {
                    throw new Error(`Error en la respuesta del servidor: ${respuesta.mensaje}`);
                }
                console.log("Ordenes obtenidas con éxito:", respuesta.data);
                setOrdenP(respuesta.data || []);
            } catch (error) {
                console.error(error);
                setOrdenP([]);
            }
        } else {
            console.log("ID de pedido no válido o no encontrado:", idPedido);
            setOrdenP([]);
        }
    };


    const mandarCaja = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const idPedidoGuardado = await AsyncStorage.getItem('id_Pedidos');
            const idPedido = idPedidoGuardado ? JSON.parse(idPedidoGuardado) : null;

            if (!token) {
                console.error('Falta token');
                return;
            }
            if (!idPedido) { // Aquí corregimos la variable a idPedido en vez de idPedidos
                console.error('Falta idPedido');
                return;
            }
            const datos = {
                idCaja: 0,
                status_de_Pago: false,
                pedidoBean: {
                    idPedidos: idPedido
                }
            };
            const respuesta = await fetch(`http://${IP}:8081/api/Proyecto_Integrador/caja/guardar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            });

            if (respuesta.ok) {
                const resultado = await respuesta.json();
                console.log('Envío a Pagar:', resultado);
            } else {
                console.error('Error en la solicitud:', respuesta.status, await respuesta.text());
            }
        } catch (error) {
            console.error('Error al intentar enviar a caja o leer de AsyncStorage:', error);
        }
    };



    return (
        <View style={styles.container}>

            <FlatList
                data={tickets}
                keyExtractor={(item, index) => `ticket-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handlePressTicket(item)}
                    >
                        <Card containerStyle={styles.cardContainer}>
                            <Card.Title style={styles.cardTitle}>Pedido </Card.Title>
                            <Card.Divider />
                        </Card>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => <Button title="Cargar" type="clear" loading />}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />

            <Button
                buttonStyle={{ backgroundColor: '#D32F87', borderRadius: 20 }}
                containerStyle={styles.buttonRetry}
                onPress={regresarTab}
                icon={<Fontisto name="arrow-return-left" size={20} color="white" style={{ marginRight: 5 }} />}
                title="Regresar"
                titleStyle={{ fontSize: 14 }}
            />




            {/* Modal para mostrar detalles del ticket seleccionado */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.buttonModal}>
                            <Button
                                buttonStyle={{ backgroundColor: '#2A2E98', borderRadius: 20 }}
                                containerStyle={styles.buttonClose}
                                onPress={() => {
                                    mandarCaja();
                                    setModalVisible(false);
                                }}
                                icon={<MaterialIcons name="attach-money" size={20} color="white" style={{ marginRight: 5 }} />}
                                title="Mandar a Pagar"
                                titleStyle={{ fontSize: 14 }}
                            />
                            <Button
                                buttonStyle={{ backgroundColor: 'orange', borderRadius: 20 }}
                                containerStyle={styles.buttonClose}
                                onPress={() => {
                                    fetchPlatillos();
                                    setModalVisibleOrden(true);
                                }}
                                icon={<Ionicons name="create" size={20} color="white" style={{ marginRight: 5 }} />}
                                title="Crear Orden"
                                titleStyle={{ fontSize: 14 }}
                            />
                        </View>
                        <Button
                            buttonStyle={{ backgroundColor: '#D32F87', borderRadius: 20 }}
                            containerStyle={styles.buttonClose}
                            onPress={() => {
                                verOrdenes();
                            }}
                            icon={<MaterialCommunityIcons name="food-fork-drink" size={20} color="white" style={{ marginRight: 5 }} />}
                            title="Ver Orden"
                            titleStyle={{ fontSize: 14 }}
                        />
                        <View style={styles.ticketContainer}>
                            <ScrollView>
                                {ordenes.map((ordenItem, i) => {
                                    console.log(`Orden ${i}: status = ${ordenItem.status}`);

                                    return (
                                        <View key={i} style={[styles.lineItem, ordenItem.status == true ? styles.itemGreenBackground : {}]}>
                                            <Text style={styles.itemName}>{ordenItem.platilloBean.nombre}</Text>
                                            <Text style={styles.itemPrice}>${ordenItem.platilloBean.precio.toFixed(2)}</Text>
                                        </View>
                                    );
                                })}
                                {ordenes.length === 0 && <Text style={styles.noOrders}>No hay ordenes</Text>}
                            </ScrollView>
                        </View>
                        <View>
                            <Button
                                buttonStyle={{ backgroundColor: 'red', borderRadius: 20 }}
                                containerStyle={styles.buttonClose}
                                onPress={() => {
                                    setOrdenP([]);
                                    setModalVisible(false);
                                }}
                                title="Cerrar"
                                titleStyle={{ fontSize: 14 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal >




            {/* Modal para Crear Orden*/}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisibleOrden}
                onRequestClose={() => {
                    setModalVisibleOrden(!isModalVisibleOrden);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            {Object.keys(orden).map((tipo) => (
                                <View key={tipo} style={styles.seccionTipo}>
                                    <Text style={styles.tipoText}>{tipo}</Text>
                                    {orden[tipo].map((item) => (
                                        <View key={item.id} style={styles.ordenItem}>
                                            <View style={styles.itemInfo}>
                                                <Text style={styles.itemNombre}>{item.nombre}  <Text style={styles.itemPrecio}>${item.precio.toFixed(2)}</Text>
                                                </Text>
                                                <Text style={styles.stockText}>Disponible: {item.stock}</Text>

                                            </View>
                                            <View>
                                                <View style={styles.counterView}>
                                                    <TouchableOpacity onPress={() => disminuirCantidad(item.id)} style={styles.counterButton}>
                                                        <Text style={styles.counterButtonText}>-</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.counterText}>{item.cantidad}</Text>
                                                    <TouchableOpacity onPress={() => aumentarCantidad(item.id, item.stock)} style={styles.counterButton}>
                                                        <Text style={styles.counterButtonText}>+</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </ScrollView>
                        <View style={styles.buttonModal}>
                            <Button
                                buttonStyle={{ backgroundColor: '#D32F87', borderRadius: 20 }}
                                containerStyle={styles.buttonClose}
                                onPress={() => setModalVisibleOrden(false)}
                                title="Cerrar"
                                titleStyle={{ fontSize: 14 }}
                            />
                            <Button
                                buttonStyle={{ backgroundColor: 'orange', borderRadius: 20 }}
                                containerStyle={styles.buttonClose}
                                onPress={() => {
                                    crearOrden();
                                    setModalVisibleOrden(false);
                                }}
                                title="Ordenar"
                                titleStyle={{ fontSize: 14 }}
                            />

                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        backgroundColor: '#EBEADD',
    },
    cardContainer: {
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        margin: 10,
        backgroundColor: '#FFFFFF',
    },
    cardTitle: {
        fontSize: 18,
        color: '#333333',
    },
    buttonClose: {
        margin: 10,
        width: '50%',
    },
    buttonRetry: {
        margin: 10,
        width: '95%',

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '95%',
        height: '95%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonModal: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    ticketContainer: {
        width: '100%',
        marginTop: 20,
    },
    lineItem: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    itemGreenBackground: {
        backgroundColor: '#E8F5E9',
    },
    itemName: {
        fontSize: 16,
        color: '#333',
    },
    itemPrice: {
        fontSize: 16,
        color: '#333',
    },
    noOrders: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#BDBDBD',
    },
    tipoText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: '#424242',
    },
    ordenItem: {
        padding: 5,
        borderBottomWidth: 3,
        borderBottomColor: '#D32F87',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ordenText: {
        fontSize: 16,
        color: '#111',
    },
    stockText: {
        fontSize: 14,
        color: '#9E9E9E',
    },
    counterView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%'
    },
    counterButton: {
        margin: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        padding: 5,
    },
    counterButtonText: {
        fontSize: 18,
        color: '#424242',
    },
    counterText: {
        fontSize: 16,
        marginHorizontal: 10,
        color: '#424242',
    },
});
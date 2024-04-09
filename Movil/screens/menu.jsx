import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////SOLO CAMBIEN SU IP/////////////
const IP = '192.168.100.23'
/////////////////////////////////////////

const Menu = () => {
    const [categorias, setCategorias] = useState({});

    const fetchCategoriasConPlatos = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`http://${IP}:8081/api/Proyecto_Integrador/platillo/obtener`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
    
            const data = await response.json()
            const platosAgrupados = agruparPlatosPorCategoria(data.data);
            setCategorias(platosAgrupados);
        } catch (error) {
            console.error("Error al obtener las categorías y platos:", error);
        }
    };

        const agruparPlatosPorCategoria = (platos) => {
            return platos.reduce((acc, plato) => {
                const { tipo, nombre, precio, stock } = plato;
                if (!acc[tipo]) {
                    acc[tipo] = [];
                }
                acc[tipo].push({ nombre, precio, stock });
                return acc;
            }, {});
        };

        useEffect(() => {
            fetchCategoriasConPlatos();
        }, []);

        return (
            <ScrollView style={styles.container}>
                {Object.entries(categorias).map(([categoria, platos]) => (
                    <View key={categoria} style={styles.categoriaContainer}>
                        <Text style={styles.categoriaTitulo}>{categoria}</Text>
                        {platos.map((plato, index) => (
                            <View key={index} style={[styles.platoContainer, plato.stock === 0 && styles.platoDeshabilitado]}>
                                <View style={styles.platoDetalle}>
                                    <Text style={[styles.platoNombre, plato.stock === 0 && styles.textoDeshabilitado]}>{plato.nombre}</Text>
                                    <Text style={[styles.platoStock, plato.stock === 0 && styles.textoDeshabilitado]}>Stock: {plato.stock}</Text>
                                    <Text style={[styles.platoPrecio, plato.stock === 0 && styles.textoDeshabilitado]}>${plato.precio}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F1EFDB',
        },
        categoriaContainer: {
            marginVertical: 15,
            alignSelf: "center",
            maxHeight: '80%',
            width: '90%',
            paddingHorizontal: 15,
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
        },
        categoriaTitulo: {
            fontSize: 20,
            fontWeight: '600',
            color: '#333',
            marginTop: 10,
            marginBottom: 15,
            textAlign: 'center',
        },
        platoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#D32F87',
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        platoDetalle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
        },
        platoNombre: {
            fontSize: 16,
            color: '#333',
        },
        platoPrecio: {
            fontSize: 16,
            color: '#333',
        },
        platoStock: {
            alignSelf: 'center',
            fontSize: 12,
            color: '#777',
            paddingLeft: 10,
        },
        platoDeshabilitado: {
            backgroundColor: '#FCA5A5',
            borderRadius: 100,
        },
        textoDeshabilitado: {
            color: '#555',
        },
    });

    export default Menu;

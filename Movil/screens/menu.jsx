import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const Menu = () => {
    const [categorias, setCategorias] = useState({});

    const fetchCategoriasConPlatos = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8080/api/Proyecto_Integrador/platillo/obtener');
            const platosAgrupados = agruparPlatosPorCategoria(response.data.data);
            setCategorias(platosAgrupados);
        } catch (error) {
            console.error("Error al obtener las categorías y platos:", error);
        }
    };

    const agruparPlatosPorCategoria = (platos) => {
        return platos.reduce((acc, plato) => {
            const { tipo, nombre, precio } = plato;
            if (!acc[tipo]) {
                acc[tipo] = [];
            }
            acc[tipo].push({ nombre, precio });
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
                        <View key={index} style={styles.platoContainer}>
                            <Text style={styles.platoNombre}>{plato.nombre}</Text>
                            <Text style={styles.platoPrecio}>${plato.precio}</Text>
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
    platoNombre: {
        fontSize: 16,
        color: '#333', 
    },
    platoPrecio: {
        fontSize: 16,
        color: '#333',
    },
});

export default Menu;

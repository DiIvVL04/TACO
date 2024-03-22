import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const Menu = () => {
    // Datos de ejemplo
    const categorias = {
        Entradas: [
            { nombre: 'Guacamole', precio: '$50' },
            { nombre: 'Quesadillas', precio: '$45' },
        ],
        Guisados: [
            { nombre: 'Mole con pollo', precio: '$70' },
            { nombre: 'Cochinita Pibil', precio: '$75' },
        ],
        Bebidas: [
            { nombre: 'Agua de horchata', precio: '$30' },
            { nombre: 'Cerveza', precio: '$40' },
        ],
        Postres: [
            { nombre: 'Flan', precio: '$50' },
            { nombre: 'Arroz con leche', precio: '$45' },
        ],
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.menuContainer}>
                <View style={styles.card}>
                    {Object.entries(categorias).map(([categoria, platos]) => (
                        <View key={categoria} style={styles.categoriaContainer}>
                            <Text style={styles.categoriaTitulo}>{categoria}</Text>
                            {platos.map((plato) => (
                                <View key={plato.nombre} style={styles.platoContainer}>
                                    <Text style={styles.platoNombre}>{plato.nombre}</Text>
                                    <Text style={styles.platoPrecio}>{plato.precio}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0', 
    },
    menuContainer: {
        marginTop:20,
        padding: 20,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: 'orange', 
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        borderColor: 'black', 
        borderWidth: 2,
    },
    categoriaContainer: {
        marginBottom: 20,
    },
    categoriaTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', 
        marginBottom: 10,
        textDecorationLine: 'underline', 
    },
    platoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 1, 
        borderBottomColor: '#FF4500', 
    },
    platoNombre: {
        fontSize: 18,
        color: '#000000', 
    },
    platoPrecio: {
        fontSize: 18,
        color: '#000000',
    },
});

export default Menu;

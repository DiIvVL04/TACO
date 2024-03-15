import { Image } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';

export default function Codigo() {
    return (
        <View style={styles.container}>
            <Image style={{ height: 300, width: 300, borderRadius: 10 }} source={require('../assets/QR.png')} />
        </View>


    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Splash() {
    const navigation = useNavigation();

    useEffect(() => {
        const timeoutid = setTimeout(async () => {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                navigation.replace('Tab');
            } else {
                navigation.replace('login');
            }
        }, 3000);
        return () => clearTimeout(timeoutid);
    }, [navigation]);



    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black'
        }}>
            <Image style={{
                width: 200,
                height: 100
            }} source={require('../assets/LogoTACO.png')} />
        </View>
    )
}

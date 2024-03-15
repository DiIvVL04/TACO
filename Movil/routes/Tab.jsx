import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import Menu from "../screens/menu";
import Mesas from "../screens/mesas";
import Perfil from "../screens/perfil";
import Codigo from "../screens/codigo";

const Tab = createBottomTabNavigator();

export default function TabNav() {
    return (
        <Tab.Navigator initialRouteName="mesas">

            <Tab.Screen name='mesas' component={Mesas}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Mesas',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name='table-restaurant' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: '#D32F87',
                    tabBarInactiveTintColor: '#009574',
                    tabBarLabelStyle: { fontSize: 10 }
                }} />

            <Tab.Screen name='menu' component={Menu}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name='restaurant-menu' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: '#D32F87',
                    tabBarInactiveTintColor: '#009574',
                    tabBarLabelStyle: { fontSize: 10 }
                }} />

            <Tab.Screen name='perfil' component={Perfil}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name='user' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: '#D32F87',
                    tabBarInactiveTintColor: '#009574',
                    tabBarLabelStyle: { fontSize: 10 }
                }} />

            <Tab.Screen name='codigo' component={Codigo}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Codigo QR',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='qrcode' size={size} color={color} />
                    ),
                    tabBarActiveTintColor: '#D32F87',
                    tabBarInactiveTintColor: '#009574',
                    tabBarLabelStyle: { fontSize: 10 }
                }} />
        </Tab.Navigator>
    )
}

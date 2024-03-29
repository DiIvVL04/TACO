import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNav from './routes/Tab'
import Login from "./screens/login"
import Splash from "./screens/splash"
import Mesas from "./screens/mesas"
import Menu from "./screens/menu"
import Codigo from "./screens/codigo"
import Perfil from "./screens/perfil"


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='splash'>


        <Stack.Screen options={{ headerShown: false }}
          name='Tab' component={TabNav} />

        <Stack.Screen options={{ headerShown: false }}
          name='splash' component={Splash} />

        <Stack.Screen options={{ headerShown: false }}
          name='login' component={Login} />

        <Stack.Screen options={{ headerShown: false }}
          name='mesas' component={Mesas} />

        <Stack.Screen options={{ headerShown: false }}
          name='menu' component={Menu} />

        <Stack.Screen options={{ headerShown: false }}
          name='perfil' component={Perfil} />

        <Stack.Screen options={{ headerShown: false }}
          name='codigo' component={Codigo} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

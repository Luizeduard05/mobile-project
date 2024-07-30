import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './src/pages/Login/login';
import ConsultaMedico from './src/pages/ConsultaMedico/consultaMedico';
import ConsultaPaciente from './src/pages/ConsultaPaciente/consultaPaciente';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{title: 'Login', headerShown: false}}/>
          <Stack.Screen name='ConsultaMedico' component={ConsultaMedico} options={{title: 'Suas Consultas do dia'}}/>
          <Stack.Screen name='ConsultaPaciente' component={ConsultaPaciente} options={{title: 'Suas Consultas'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
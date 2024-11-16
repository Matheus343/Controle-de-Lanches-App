import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Tela Home
import CadastroAlunoScreen from './screens/CadastroAlunoScreen'; // Tela de Cadastro

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Início' }}
                />
                <Stack.Screen
                    name="CadastroAluno"
                    component={CadastroAlunoScreen}
                    options={{ title: 'Cadastro de Aluno' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

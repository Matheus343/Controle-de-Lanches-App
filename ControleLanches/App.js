import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CadastroAlunoScreen from './screens/CadastroAlunoScreen';
import AutorizacaoLancheScreen from './screens/AutorizacaoLancheScreen';

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
                <Stack.Screen
                    name="AutorizacaoLanche"
                    component={AutorizacaoLancheScreen}
                    options={{ title: 'Autorizar Lanches' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

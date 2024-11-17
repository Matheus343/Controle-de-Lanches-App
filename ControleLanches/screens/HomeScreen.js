import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Sistema de Gestão</Text>
            <Button
                title="Cadastro de Alunos"
                onPress={() => navigation.navigate('CadastroAluno')}
                style={styles.button1}
            />
            <Button
                title="Autorizar Lanches"
                onPress={() => navigation.navigate('AutorizacaoLanche')}
                style={styles.button2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    button1: {
        marginBottom: 60,
        marginTop: 67,
    },
    button2: {
        marginBottom: 40,
        marginTop: 80,
    },
});

export default HomeScreen;

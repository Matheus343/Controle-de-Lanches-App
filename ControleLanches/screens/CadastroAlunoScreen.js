import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroAlunoScreen = () => {
    const [ra, setRa] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [alunos, setAlunos] = useState([]);

    // Função para buscar os últimos alunos do backend
    const fetchAlunos = async () => {
        try {
            const response = await axios.get('http://192.168.15.144:3000/aluno/filter/getAll'); // Substitua pelo IP correto
            console.log('Alunos carregados:', response.data);
            setAlunos(response.data); // Define os últimos alunos recebidos
            await AsyncStorage.setItem('alunos', JSON.stringify(response.data)); // Salva no AsyncStorage
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    };

    // Função para carregar os alunos salvos no AsyncStorage
    const loadAlunosFromStorage = async () => {
        try {
            const storedAlunos = await AsyncStorage.getItem('alunos');
            if (storedAlunos) {
                setAlunos(JSON.parse(storedAlunos));
            }
        } catch (error) {
            console.error('Erro ao carregar alunos do armazenamento:', error);
        }
    };

    const handleCadastro = async () => {
        if (!ra || !nome || !foto) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Gera um ID aleatório para o aluno
            const id = Math.random().toString(36).substr(2, 9);

            await axios.post('http://192.168.15.144:3000/aluno', { id, ra, nome, foto }); // Substitua pelo IP correto
            Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
            setRa('');
            setNome('');
            setFoto('');
            fetchAlunos(); // Atualizar a lista após cadastro
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar o aluno.');
        }
    };

    // Carrega os alunos do AsyncStorage ao entrar na tela
    useEffect(() => {
        loadAlunosFromStorage();
        fetchAlunos(); // Buscar alunos do backend
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Aluno</Text>
            <TextInput
                style={styles.input}
                placeholder="RA"
                value={ra}
                onChangeText={setRa}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Caminho da Foto"
                value={foto}
                onChangeText={setFoto}
            />
            <Button title="Cadastrar" onPress={handleCadastro} />
            <Text style={styles.subTitle}>Últimos Alunos Cadastrados:</Text>
            <FlatList
                data={alunos}
                keyExtractor={(item) => item._id || item.ra} // Ajuste para evitar conflitos
                renderItem={({ item }) => (
                    <View style={styles.alunoContainer}>
                        <Text style={styles.alunoText}>RA: {item.ra}</Text>
                        <Text style={styles.alunoText}>Nome: {item.nome}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    alunoContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    alunoText: {
        fontSize: 16,
    },
});

export default CadastroAlunoScreen;

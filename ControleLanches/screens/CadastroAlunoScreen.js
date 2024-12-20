import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const CadastroAlunoScreen = () => {
    const [id, setId] = useState(null); 
    const [ra, setRa] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [alunos, setAlunos] = useState([]);

    const fetchAlunos = async () => {
        try {
            const response = await axios.get('http://192.168.15.144:3000/aluno/filter/getAll');
            setAlunos(response.data); 
            await AsyncStorage.setItem('alunos', JSON.stringify(response.data)); 
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    };

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
            if (id) {
                await axios.put(`http://192.168.15.144:3000/aluno/${id}`, { ra, nome, foto }); 
                Alert.alert('Sucesso', 'Aluno atualizado com sucesso!');
                setId(null); 
            } else {
                const newId = Math.random().toString(36).substr(2, 9); 
                await axios.post('http://192.168.15.144:3000/aluno', { id: newId, ra, nome, foto }); 
                Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
            }

            setRa('');
            setNome('');
            setFoto('');
            fetchAlunos(); 
        } catch (error) {
            console.error('Erro ao cadastrar/atualizar aluno:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar/atualizar o aluno.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://192.168.15.144:3000/aluno/${id}`);
            Alert.alert('Sucesso', 'Aluno excluído com sucesso!');
            setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== id)); 
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
            Alert.alert('Erro', 'Não foi possível excluir o aluno.');
        }
    };

    const handleEdit = (item) => {
        setId(item.id); 
        setRa(item.ra);
        setNome(item.nome);
        setFoto(item.foto);
        Alert.alert('Modo de edição ativado', 'Altere os campos e clique em "Cadastrar" para atualizar.');
    };

    useEffect(() => {
        loadAlunosFromStorage();
        fetchAlunos();
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
            <Button title={id ? "Atualizar" : "Cadastrar"} onPress={handleCadastro} />
            <Text style={styles.subTitle}>Últimos Alunos Cadastrados:</Text>
            <FlatList
                data={alunos}
                keyExtractor={(item) => item.id || item.ra} 
                renderItem={({ item }) => (
                    <View style={styles.alunoContainer}>
                        <View style={styles.alunoInfo}>
                            <Text style={styles.alunoText}>RA: {item.ra}</Text>
                            <Text style={styles.alunoText}>Nome: {item.nome}</Text>
                        </View>
                        <View style={styles.actionIcons}>
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <Ionicons name="pencil" size={24} color="blue" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Ionicons name="close" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    alunoInfo: {
        flex: 1,
    },
    alunoText: {
        fontSize: 16,
    },
    actionIcons: {
        flexDirection: 'row',
        gap: 10,
    },
});

export default CadastroAlunoScreen;

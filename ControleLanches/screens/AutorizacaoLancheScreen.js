import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const AutorizacaoLancheScreen = () => {
    const [alunos, setAlunos] = useState([]);
    const [autorizacoes, setAutorizacoes] = useState([]);
    const [data, setData] = useState('');
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [qtdeLanches, setQtdeLanches] = useState('');
    const [autorizacaoId, setAutorizacaoId] = useState(null);

    const fetchAlunos = async () => {
        try {
            const response = await axios.get('http://192.168.15.144:3000/aluno/filter/getAll'); 
            setAlunos(response.data);
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    };

    const fetchAutorizacoes = async () => {
        try {
            const response = await axios.get('http://192.168.15.144:3000/lanche'); 
            setAutorizacoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar autorizações:', error);
        }
    };

    const handleSalvar = async () => {
        if (!data || !alunoSelecionado || !qtdeLanches) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (qtdeLanches > 3) {
            Alert.alert('Erro', 'A quantidade máxima de lanches é 3.');
            return;
        }

        try {
            const existeAutorizacao = autorizacoes.some(
                (aut) => aut.data === data && aut.alunoId === alunoSelecionado.id && aut.id !== autorizacaoId
            );

            if (existeAutorizacao) {
                Alert.alert('Erro', 'Já existe uma autorização para este aluno nesta data.');
                return;
            }

            if (autorizacaoId) {
                await axios.put(`http://192.168.15.144:3000/lanche/${autorizacaoId}`, {
                    data,
                    alunoId: alunoSelecionado.id,
                    qtdeLanches,
                });
                Alert.alert('Sucesso', 'Autorização atualizada com sucesso!');
            } else {
                await axios.post('http://192.168.15.144:3000/lanche', {
                    data,
                    alunoId: alunoSelecionado.id,
                    qtdeLanches,
                });
                Alert.alert('Sucesso', 'Autorização criada com sucesso!');
            }

            setData('');
            setAlunoSelecionado(null);
            setQtdeLanches('');
            setAutorizacaoId(null); 
            fetchAutorizacoes(); 
        } catch (error) {
            console.error('Erro ao salvar autorização:', error);
            Alert.alert('Erro', 'Não foi possível salvar a autorização.');
        }
    };

    const handleExcluir = async (id) => {
        try {
            await axios.delete(`http://192.168.15.144:3000/lanche/${id}`); 
            Alert.alert('Sucesso', 'Autorização excluída com sucesso!');
            fetchAutorizacoes();
        } catch (error) {
            console.error('Erro ao excluir autorização:', error);
            Alert.alert('Erro', 'Não foi possível excluir a autorização.');
        }
    };

    const handleEditar = (item) => {
        setData(item.data);
        setAlunoSelecionado(alunos.find((aluno) => aluno.id === item.alunoId));
        setQtdeLanches(item.qtdeLanches.toString());
        setAutorizacaoId(item.id);
    };

    useEffect(() => {
        fetchAlunos();
        fetchAutorizacoes();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Autorizar Lanche</Text>
            <TextInput
                style={styles.input}
                placeholder="Data de Liberação (YYYY-MM-DD)"
                value={data}
                onChangeText={setData}
            />
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={alunoSelecionado}
                    onValueChange={(itemValue) => setAlunoSelecionado(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione um Aluno" value={null} />
                    {alunos.map((aluno) => (
                        <Picker.Item key={aluno.id} label={aluno.nome} value={aluno} />
                    ))}
                </Picker>
            </View>
            {alunoSelecionado && (
                <Image source={{ uri: alunoSelecionado.foto }} style={styles.foto} />
            )}
            <TextInput
                style={styles.input}
                placeholder="Quantidade de Lanches"
                value={qtdeLanches}
                onChangeText={setQtdeLanches}
                keyboardType="numeric"
            />
            <Button title={autorizacaoId ? "Atualizar" : "Salvar"} onPress={handleSalvar} />
            <Text style={styles.subTitle}>Autorizações:</Text>
            <FlatList
                data={autorizacoes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.autorizacaoContainer}>
                        <View>
                            <Text style={styles.autorizacaoText}>Data: {item.data}</Text>
                            <Text style={styles.autorizacaoText}>Aluno: {alunos.find((aluno) => aluno.id === item.alunoId)?.nome || 'Desconhecido'}</Text>
                            <Text style={styles.autorizacaoText}>Qtde Lanches: {item.qtdeLanches}</Text>
                        </View>
                        <View style={styles.actionIcons}>
                            <TouchableOpacity onPress={() => handleEditar(item)}>
                                <Ionicons name="pencil" size={24} color="blue" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleExcluir(item.id)}>
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    autorizacaoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    autorizacaoText: {
        fontSize: 16,
    },
    foto: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    actionIcons: {
        flexDirection: 'row',
        gap: 10,
    },
});

export default AutorizacaoLancheScreen;

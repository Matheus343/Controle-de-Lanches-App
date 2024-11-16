import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Image, Alert } from 'react-native';

const CadastroAlunoScreen = () => {
    const [ra, setRa] = useState('');
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [alunos, setAlunos] = useState([]);

    const handleCadastro = async () => {
        if (!ra || !nome || !foto) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }

        const novoAluno = {
            ra,
            nome,
            foto,
        };

        try {
            // Envia os dados para o servidor
            const response = await alunoService.criarAluno(novoAluno);

            // Atualiza a lista de alunos localmente após o sucesso
            setAlunos((prevAlunos) => [response.data, ...prevAlunos.slice(0, 4)]);

            Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
            setRa('');
            setNome('');
            setFoto('');
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar o aluno. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Aluno</Text>
            {/* Formulário */}
            <TextInput
                style={styles.input}
                placeholder="RA"
                value={ra}
                onChangeText={setRa}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Caminho da Foto (Ex: aluno1.jpg)"
                value={foto}
                onChangeText={setFoto}
            />
            <Button title="Cadastrar" onPress={handleCadastro} />

            {/* Listagem dos últimos alunos cadastrados */}
            <Text style={styles.subTitle}>Últimos 5 alunos cadastrados:</Text>
            {alunos.length === 0 ? (
                <Text style={styles.noData}>Nenhum aluno cadastrado ainda.</Text>
            ) : (
                <FlatList
                    data={alunos}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.alunoContainer}>
                            <Image
                                source={{ uri: `file:///path/to/assets/${item.foto}` }}
                                style={styles.foto}
                            />
                            <View style={styles.alunoInfo}>
                                <Text style={styles.alunoNome}>{item.nome}</Text>
                                <Text style={styles.alunoRA}>RA: {item.ra}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
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
        color: '#333',
    },
    noData: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 10,
    },
    alunoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    foto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    alunoInfo: {
        flex: 1,
    },
    alunoNome: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    alunoRA: {
        fontSize: 14,
        color: '#555',
    },
});

export default CadastroAlunoScreen;

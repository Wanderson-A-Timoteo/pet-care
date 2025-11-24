import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ScrollView, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const cores = {
  primaria: '#6C63FF',
  fundo: '#F5F5F5',
  branco: '#FFF',
  texto: '#333',
  cinzaClaro: '#DDD',
  placeholder: '#999'
};

export default function PerfilUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState(null);

  // Carregar dados salvos ao abrir a tela
  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const perfilSalvo = await AsyncStorage.getItem('@perfil_usuario');
      if (perfilSalvo) {
        const dados = JSON.parse(perfilSalvo);
        setNome(dados.nome);
        setEmail(dados.email);
        setFoto(dados.foto);
      }
    } catch (error) {
      console.log('Erro ao carregar perfil');
    }
  };

  const selecionarFoto = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const salvarPerfil = async () => {
    const dadosPerfil = { nome, email, foto };
    try {
      await AsyncStorage.setItem('@perfil_usuario', JSON.stringify(dadosPerfil));
      if (Platform.OS === 'web') {
        alert('Perfil atualizado com sucesso!');
      } else {
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView contentContainerStyle={estilos.scrollContent}>
        
        <Text style={estilos.titulo}>Meu Perfil</Text>

        {/* Área da Foto */}
        <View style={estilos.fotoContainer}>
          <TouchableOpacity onPress={selecionarFoto}>
            {foto ? (
              <Image source={{ uri: foto }} style={estilos.foto} />
            ) : (
              <View style={estilos.fotoPlaceholder}>
                <Ionicons name="person" size={60} color="#CCC" />
              </View>
            )}
            <View style={estilos.iconeEditarFoto}>
              <Ionicons name="camera" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Formulário */}
        <View style={estilos.formulario}>
          <Text style={estilos.label}>Seu Nome:</Text>
          <TextInput
            style={estilos.input}
            placeholder="Digite seu nome"
            placeholderTextColor={cores.placeholder}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={estilos.label}>Seu E-mail:</Text>
          <TextInput
            style={estilos.input}
            placeholder="exemplo@email.com"
            placeholderTextColor={cores.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={estilos.botaoSalvar} onPress={salvarPerfil}>
            <Text style={estilos.textoBotao}>Salvar Perfil</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center', // Centraliza tudo
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: cores.primaria,
    marginBottom: 30,
  },
  fotoContainer: {
    marginBottom: 30,
    position: 'relative',
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: cores.primaria,
  },
  fotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#CCC',
  },
  iconeEditarFoto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: cores.primaria,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: cores.branco,
  },
  formulario: {
    width: '100%',
    ...Platform.select({
      web: { maxWidth: 500 } // Limita largura na web para ficar bonito
    })
  },
  label: {
    fontSize: 16,
    color: cores.texto,
    marginBottom: 5,
    fontWeight: '600',
    marginLeft: 5,
  },
  input: {
    backgroundColor: cores.branco,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: cores.primaria,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotao: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

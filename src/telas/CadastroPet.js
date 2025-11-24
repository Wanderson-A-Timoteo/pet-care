import React, { useState, useContext, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { PetContext } from '../contextos/PetContext';

const cores = {
  primaria: '#6C63FF',
  fundo: '#F5F5F5',
  branco: '#FFF',
  texto: '#333',
  cinzaClaro: '#DDD',
  placeholder: '#999'
};

export default function CadastroPet({ navigation, route }) {
  const { adicionarPet, atualizarPet } = useContext(PetContext);
  
  // Verifica se estamos editando (recebendo dados via rota)
  const petParaEditar = route.params?.petParaEditar;
  const modoEdicao = !!petParaEditar;

  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [imagemUri, setImagemUri] = useState(null);

  // Preenche os campos se for edição
  useEffect(() => {
    if (modoEdicao) {
      setNome(petParaEditar.nome);
      setRaca(petParaEditar.raca);
      setIdade(petParaEditar.idade);
      setImagemUri(petParaEditar.imagem);
      // Atualiza título da navegação
      navigation.setOptions({ title: 'Editar Pet' });
    }
  }, [petParaEditar, navigation]);

  const selecionarImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissao.granted === false) {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria!");
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!resultado.canceled) {
      setImagemUri(resultado.assets[0].uri);
    }
  };

  const salvar = () => {
    if (!nome || !raca || !idade) {
      Alert.alert("Atenção", "Preencha nome, raça e idade!");
      return;
    }

    const dadosPet = {
      nome,
      raca,
      idade,
      imagem: imagemUri
    };

    if (modoEdicao) {
      // ATUALIZAR
      atualizarPet(petParaEditar.id, dadosPet);
      Alert.alert("Sucesso", "Dados do pet atualizados!");
    } else {
      // CRIAR NOVO
      const novoPet = { id: Date.now().toString(), ...dadosPet };
      adicionarPet(novoPet);
      Alert.alert("Sucesso", "Novo amigo cadastrado!");
    }
    
    navigation.goBack();
  };

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView contentContainerStyle={estilos.scrollContent}>
        <View style={estilos.formulario}>
          
          <Text style={estilos.titulo}>{modoEdicao ? "Editar Pet ✏️" : "Novo Amigo 🐾"}</Text>

          <Text style={estilos.label}>Nome:</Text>
          <TextInput 
            style={estilos.input} 
            placeholder="Ex: Rex" 
            placeholderTextColor={cores.placeholder}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={estilos.label}>Raça:</Text>
          <TextInput 
            style={estilos.input} 
            placeholder="Ex: Labrador" 
            placeholderTextColor={cores.placeholder}
            value={raca}
            onChangeText={setRaca}
          />

          <Text style={estilos.label}>Idade:</Text>
          <TextInput 
            style={estilos.input} 
            placeholder="Ex: 2 anos" 
            placeholderTextColor={cores.placeholder}
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
          />

          <TouchableOpacity style={estilos.botaoImagem} onPress={selecionarImagem}>
            <Text style={estilos.textoBotaoImagem}>
              {imagemUri ? "Alterar Foto" : "Selecionar Foto"}
            </Text>
          </TouchableOpacity>

          {imagemUri && (
            <Image source={{ uri: imagemUri }} style={estilos.previewImagem} />
          )}

          <TouchableOpacity style={estilos.botaoSalvar} onPress={salvar}>
            <Text style={estilos.textoBotaoSalvar}>
              {modoEdicao ? "Salvar Alterações" : "Cadastrar Pet"}
            </Text>
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
    flexGrow: 1,
    padding: 20,
    ...Platform.select({ web: { alignItems: 'center' } })
  },
  formulario: {
    width: '100%',
    ...Platform.select({ web: { maxWidth: 600 } })
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.primaria,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: cores.texto,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: cores.branco,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
  },
  botaoImagem: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  textoBotaoImagem: {
    color: '#555',
    fontWeight: 'bold',
  },
  previewImagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  botaoSalvar: {
    backgroundColor: cores.primaria,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoSalvar: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

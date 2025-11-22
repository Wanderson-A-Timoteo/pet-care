import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Platform, 
  Alert 
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

export default function CadastroPet({ navigation }) {
  const { adicionarPet } = useContext(PetContext);

  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [imagemUri, setImagemUri] = useState(null);

  const selecionarImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissao.granted === false) {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria para escolher a foto!");
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

  const salvarPet = () => {
    if (!nome || !raca || !idade) {
      Alert.alert("Atenção", "Preencha pelo menos nome, raça e idade!");
      return;
    }

    const novoPet = {
      id: Date.now().toString(),
      nome,
      raca,
      idade,
      imagem: imagemUri
    };

    adicionarPet(novoPet);
    
    setNome('');
    setRaca('');
    setIdade('');
    setImagemUri(null);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView contentContainerStyle={estilos.scrollContent}>
        <View style={estilos.formulario}>
          
          <Text style={estilos.titulo}>Novo Amigo 🐾</Text>

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
              {imagemUri ? "Trocar Foto" : "Selecionar Foto"}
            </Text>
          </TouchableOpacity>

          {imagemUri && (
            <Image source={{ uri: imagemUri }} style={estilos.previewImagem} />
          )}

          <TouchableOpacity style={estilos.botaoSalvar} onPress={salvarPet}>
            <Text style={estilos.textoBotaoSalvar}>Cadastrar Pet</Text>
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
    ...Platform.select({
      web: { alignItems: 'center' }
    })
  },
  formulario: {
    width: '100%',
    ...Platform.select({
      web: { maxWidth: 600 }
    })
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

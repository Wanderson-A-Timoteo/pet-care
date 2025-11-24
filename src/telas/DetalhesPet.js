import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PetContext } from '../contextos/PetContext';

const cores = {
  primaria: '#6C63FF',
  fundo: '#F5F5F5',
  branco: '#FFF',
  texto: '#333',
  cinza: '#666',
  vermelho: '#FF4C4C'
};

export default function DetalhesPet({ route, navigation }) {
  const { pets, excluirPet } = useContext(PetContext); // Lista atualizada de pets
  const [imgError, setImgError] = useState(false);

  // Pega apenas o ID vindo da navegação
  const petId = route.params?.pet?.id;

  // Encontra o pet dentro da lista do contexto
  const pet = pets.find(p => p.id === petId);

  // Se o pet não for encontrado (ex: foi excluído), voltamos para evitar erro
  useEffect(() => {
    if (!pet) {
      navigation.navigate('Home');
    }
  }, [pet, navigation]);

  // Se ainda não carregou ou não achou, retorna nulo para não quebrar
  if (!pet) return null;

  const confirmarExclusao = () => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Tem certeza que deseja remover ${pet.nome}?`)) {
        executarExclusao();
      }
    } else {
      Alert.alert(
        "Remover Pet",
        `Tem certeza que deseja remover ${pet.nome}?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Remover", onPress: executarExclusao, style: "destructive" }
        ]
      );
    }
  };

  const executarExclusao = () => {
    excluirPet(pet.id);
    navigation.navigate('Home');
  };

  const irParaEdicao = () => {
    // Passa o objeto 'pet' atualizado para a edição
    navigation.navigate('CadastroPet', { petParaEditar: pet });
  };

  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView contentContainerStyle={estilos.scrollContent}>
        
        <View style={estilos.cardDetalhes}>
          <View style={estilos.imagemContainer}>
            {pet.imagem && !imgError ? (
              <Image 
                source={{ uri: pet.imagem }} 
                style={estilos.imagem} 
                onError={() => setImgError(true)}
              />
            ) : (
              <View style={estilos.imagemPlaceholder}>
                <Ionicons name="paw" size={80} color="#CCC" />
              </View>
            )}
          </View>

          <View style={estilos.infoContainer}>
            <Text style={estilos.nome}>{pet.nome}</Text>
            
            <View style={estilos.linhaInfo}>
              <Ionicons name="pricetag-outline" size={20} color={cores.primaria} />
              <Text style={estilos.textoInfo}>Raça: {pet.raca}</Text>
            </View>

            <View style={estilos.linhaInfo}>
              <Ionicons name="calendar-outline" size={20} color={cores.primaria} />
              <Text style={estilos.textoInfo}>Idade: {pet.idade}</Text>
            </View>
          </View>

          <View style={estilos.botoesContainer}>
            <TouchableOpacity style={estilos.botaoEditar} onPress={irParaEdicao}>
              <Ionicons name="create-outline" size={24} color={cores.branco} />
              <Text style={estilos.textoBotao}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.botaoExcluir} onPress={confirmarExclusao}>
              <Ionicons name="trash-outline" size={24} color={cores.branco} />
              <Text style={estilos.textoBotao}>Excluir</Text>
            </TouchableOpacity>
          </View>
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
    ...Platform.select({
      web: { alignItems: 'center' }
    })
  },
  cardDetalhes: {
    backgroundColor: cores.branco,
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    ...Platform.select({
      web: { maxWidth: 600 }
    })
  },
  imagemContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#F0F0F0',
  },
  imagem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagemPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 24,
  },
  nome: {
    fontSize: 32,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 20,
    textAlign: 'center',
  },
  linhaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 10,
  },
  textoInfo: {
    fontSize: 18,
    color: '#555',
    marginLeft: 10,
  },
  botoesContainer: {
    padding: 24,
    paddingTop: 0,
    gap: 15,
  },
  botaoEditar: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoExcluir: {
    flexDirection: 'row',
    backgroundColor: cores.vermelho,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: cores.branco,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

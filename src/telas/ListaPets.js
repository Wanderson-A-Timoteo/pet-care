import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PetContext } from '../contextos/PetContext';
import CardPet from '../componentes/CardPet';

const cores = {
  primaria: '#6C63FF',
  branco: '#FFF',
  fundo: '#F5F5F5',
  texto: '#333'
};

export default function ListaPets({ navigation }) {
  const { pets } = useContext(PetContext); // Consumindo os dados do contexto!

  // Função para renderizar cada item da lista
  const renderizarPet = ({ item }) => (
    <CardPet 
      pet={item} 
      onPress={() => navigation.navigate('DetalhesPet', { pet: item })} 
    />
  );

  return (
    <SafeAreaView style={estilos.container}>
      
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>Meus Pets 🐾</Text>
      </View>

      {/* Verifica se tem pets na lista */}
      {pets.length > 0 ? (
        <FlatList
          data={pets}
          keyExtractor={item => item.id}
          renderItem={renderizarPet}
          contentContainerStyle={estilos.listaContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={estilos.vazioContainer}>
          <Ionicons name="file-tray-outline" size={60} color="#DDD" />
          <Text style={estilos.vazioTexto}>Nenhum pet cadastrado ainda.</Text>
          <Text style={estilos.vazioSubtexto}>Toque no + para adicionar um amigo!</Text>
        </View>
      )}

      {/* Botão Flutuante (FAB) */}
      <TouchableOpacity 
        style={estilos.botaoAdicionar} 
        onPress={() => navigation.navigate('CadastroPet')}
      >
        <Ionicons name="add" size={30} color={cores.branco} />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    // Centraliza título na web
    ...Platform.select({
      web: { alignItems: 'center' }
    })
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  listaContent: {
    padding: 20,
    paddingBottom: 100,
    ...Platform.select({
      web: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Centraliza os cards na tela
        maxWidth: 1200, // Limita a largura total da grade para não esticar em monitores ultra-wide
        alignSelf: 'center', // Centraliza a grade na página
        width: '100%'
      }
    })
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  vazioTexto: {
    color: cores.texto,
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
  vazioSubtexto: {
    color: '#999',
    fontSize: 14,
    marginTop: 5,
  },
  botaoAdicionar: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: cores.primaria,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 999,
  },
});

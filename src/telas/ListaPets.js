import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const cores = {
  primaria: '#6C63FF',
  branco: '#FFF',
  fundo: '#F5F5F5'
};

export default function ListaPets({ navigation }) {
  return (
    <SafeAreaView style={estilos.container}>
      
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Meus Pets 🐾</Text>
        
        <View style={estilos.vazioContainer}>
          <Text style={estilos.vazioTexto}>Nenhum pet cadastrado ainda.</Text>
        </View>
      </View>

      {/* Botão Flutuante (FAB) para Cadastrar */}
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
  conteudo: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: cores.primaria,
    marginBottom: 20,
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vazioTexto: {
    color: '#999',
    fontSize: 16,
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

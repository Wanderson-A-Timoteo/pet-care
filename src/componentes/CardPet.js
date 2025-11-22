import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const cores = {
  branco: '#FFF',
  texto: '#333',
  cinza: '#666',
  sombra: '#000'
};

export default function CardPet({ pet, onPress }) {
  return (
    <TouchableOpacity style={estilos.card} onPress={onPress}>
      {/* Imagem do Pet ou Ícone Padrão se não tiver foto */}
      {pet.imagem ? (
        <Image source={{ uri: pet.imagem }} style={estilos.imagem} />
      ) : (
        <View style={estilos.imagemPlaceholder}>
          <Ionicons name="paw" size={40} color="#CCC" />
        </View>
      )}

      <View style={estilos.infoContainer}>
        <Text style={estilos.nome}>{pet.nome}</Text>
        <Text style={estilos.detalhes}>{pet.raca} • {pet.idade}</Text>
      </View>

      <Ionicons name="chevron-forward" size={24} color="#CCC" />
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    // Sombra
    elevation: 3,
    shadowColor: cores.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Responsividade Web
    ...Platform.select({
      web: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center'
      }
    })
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 30, // Redonda
    marginRight: 15,
  },
  imagemPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
  },
  detalhes: {
    fontSize: 14,
    color: cores.cinza,
    marginTop: 4,
  },
});

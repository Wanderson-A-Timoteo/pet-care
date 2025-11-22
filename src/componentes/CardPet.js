import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const cores = {
  branco: '#FFF',
  texto: '#333',
  cinza: '#666',
  sombra: '#000',
  borda: '#EEE'
};

export default function CardPet({ pet, onPress }) {
  return (
    <TouchableOpacity style={estilos.card} onPress={onPress} activeOpacity={0.9}>
      {/* Imagem Grande no Topo */}
      {pet.imagem ? (
        <Image source={{ uri: pet.imagem }} style={estilos.imagem} />
      ) : (
        <View style={estilos.imagemPlaceholder}>
          <Ionicons name="paw" size={60} color="#CCC" />
        </View>
      )}

      {/* Informações Abaixo */}
      <View style={estilos.infoContainer}>
        <Text style={estilos.nome}>{pet.nome}</Text>
        <Text style={estilos.detalhes}>{pet.raca} • {pet.idade}</Text>
        
        {/* Botãozinho de ação visual (opcional, apenas decorativo por enquanto) */}
        <View style={estilos.botaoVerMais}>
          <Text style={estilos.textoVerMais}>Ver detalhes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: cores.branco,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: cores.borda,
    elevation: 4,
    shadowColor: cores.sombra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Ajuste Responsivo para Web
    ...Platform.select({
      web: {
        width: '300px', // Largura FIXA na web fica mais bonito e previsível
        margin: '20px', // Espaçamento em volta de cada card
        // Removemos alignSelf e maxWidth complexos
      },
      default: {
        width: '100%', // No mobile ocupa a largura toda da lista
      }
    })
  },
  imagem: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imagemPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 16,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 4,
  },
  detalhes: {
    fontSize: 14,
    color: cores.cinza,
    marginBottom: 12,
  },
  botaoVerMais: {
    backgroundColor: '#6C63FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start', // Botão alinhado à esquerda
  },
  textoVerMais: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  }
});

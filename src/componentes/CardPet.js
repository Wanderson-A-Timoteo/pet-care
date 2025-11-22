import React, { useState } from 'react';
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
  // Estado para controlar se a imagem falhou
  const [imgError, setImgError] = useState(false);

  return (
    <TouchableOpacity style={estilos.card} onPress={onPress} activeOpacity={0.9}>
      {/* Lógica: Se tem imagem E não deu erro, mostra imagem. Senão, placeholder. */}
      {pet.imagem && !imgError ? (
        <Image 
          source={{ uri: pet.imagem }} 
          style={estilos.imagem} 
          onError={() => setImgError(true)} // Se falhar, ativa o erro
        />
      ) : (
        <View style={estilos.imagemPlaceholder}>
          <Ionicons name="paw" size={60} color="#CCC" />
        </View>
      )}

      <View style={estilos.infoContainer}>
        <Text style={estilos.nome}>{pet.nome}</Text>
        <Text style={estilos.detalhes}>{pet.raca} • {pet.idade}</Text>
        
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
        width: '300px', // Largura FIXA na web
        margin: '20px', // Espaçamento em volta de cada card
      },
      default: {
        width: '100%', // Mobile ocupa a largura toda da lista
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
    alignSelf: 'flex-start',
  },
  textoVerMais: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  }
});

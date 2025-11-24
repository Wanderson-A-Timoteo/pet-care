import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cria o Contexto
export const PetContext = createContext();

// Cria o Provedor (o componente que vai envolver o app)
export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);

  // Carregar dados ao iniciar
  useEffect(() => {
    async function carregarDados() {
      try {
        const petsSalvos = await AsyncStorage.getItem('@meus_pets');
        if (petsSalvos) {
          setPets(JSON.parse(petsSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar pets:', error);
      }
    }
    carregarDados();
  }, []);

  // Função para salvar no AsyncStorage
  const salvarNoStorage = async (novaLista) => {
    try {
      await AsyncStorage.setItem('@meus_pets', JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro ao salvar pet:', error);
    }
  };

  // Adicionar novo pet
  const adicionarPet = (novoPet) => {
    const novaLista = [...pets, novoPet];
    setPets(novaLista);
    salvarNoStorage(novaLista);
  };

  // Atualizar pet existente
  const atualizarPet = (id, dadosAtualizados) => {
    const novaLista = pets.map(pet => 
      pet.id === id ? { ...pet, ...dadosAtualizados } : pet
    );
    setPets(novaLista);
    salvarNoStorage(novaLista);
  };

  // Excluir pet
  const excluirPet = (id) => {
    const novaLista = pets.filter(pet => pet.id !== id);
    setPets(novaLista);
    salvarNoStorage(novaLista);
  };

  return (
    <PetContext.Provider value={{ pets, adicionarPet, excluirPet, atualizarPet }}>
      {children}
    </PetContext.Provider>
  );
};

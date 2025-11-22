import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Rotas from './src/navegacao/Rotas';
import { PetProvider } from './src/contextos/PetContext';

export default function App() {
  return (
    <PetProvider> 
      <StatusBar style="auto" />
      <Rotas />
    </PetProvider>
  );
}

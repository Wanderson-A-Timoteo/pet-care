import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Rotas from './src/navegacao/Rotas';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Rotas />
    </>
  );
}

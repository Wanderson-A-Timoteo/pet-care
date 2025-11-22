import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import ListaPets from '../telas/ListaPets';
import PerfilUsuario from '../telas/PerfilUsuario';
import CadastroPet from '../telas/CadastroPet';
import DetalhesPet from '../telas/DetalhesPet';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const cores = {
  primaria: '#6C63FF',
  cinza: 'gray',
};

// Configuração das Abas (Bottom Tabs)
function NavegacaoAbas() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let nomeIcone;

          if (route.name === 'Meus Pets') {
            nomeIcone = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'Perfil') {
            nomeIcone = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={nomeIcone} size={size} color={color} />;
        },
        tabBarActiveTintColor: cores.primaria,
        tabBarInactiveTintColor: cores.cinza,
      })}
    >
      <Tab.Screen name="Meus Pets" component={ListaPets} />
      <Tab.Screen name="Perfil" component={PerfilUsuario} />
    </Tab.Navigator>
  );
}

// Configuração Principal (Stack) que engloba as Abas
export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={NavegacaoAbas} />
        <Stack.Screen 
          name="CadastroPet" 
          component={CadastroPet} 
          options={{ headerShown: true, title: 'Cadastrar Pet' }}
        />
        <Stack.Screen 
          name="DetalhesPet" 
          component={DetalhesPet} 
          options={{ headerShown: true, title: 'Detalhes do Pet' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

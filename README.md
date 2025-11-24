# Pet Care 🐾

## Descrição

**Pet Care** é um aplicativo multiplataforma (Android, iOS e Web) desenvolvido como Trabalho Final da disciplina de **DESENVOLVIMENTO FRONT-END I**, na Pós-Graduação em Desenvolvimento Full Stack do **IFSUDESTEMG - Campus Manhuaçu**.

O objetivo do projeto é oferecer uma ferramenta simples e intuitiva para gerenciar o cadastro de animais de estimação e informações do tutor. O aplicativo demonstra o domínio de conceitos fundamentais e avançados do React Native, incluindo navegação complexa, manipulação de estado global, persistência de dados e design responsivo.

## 🚀 Funcionalidades

* **CRUD Completo de Pets:**
    * **Cadastrar:** Adição de novos pets com Nome, Raça, Idade e Foto (selecionada da galeria do dispositivo).
    * **Listar:** Visualização dos pets cadastrados. No mobile, apresenta-se em lista vertical; na web, adapta-se para um Grid responsivo.
    * **Detalhes:** Visualização expandida das informações e foto do pet.
    * **Editar:** Possibilidade de alterar os dados e a foto de um pet existente.
    * **Excluir:** Remoção de um pet da lista, com confirmação de segurança.
* **Perfil do Usuário:** Tela dedicada para o cadastro de dados do tutor (Nome, E-mail e Foto de Perfil), com persistência independente.
* **Navegação Híbrida:** Combinação de `Bottom Tab Navigator` (abas principais) e `Stack Navigator` (fluxo de telas internas).
* **Persistência de Dados:** Utilização do `AsyncStorage` para garantir que todos os dados (pets e perfil) sejam salvos localmente e permaneçam disponíveis ao reiniciar o app.
* **Design Responsivo:** Layout adaptativo que oferece a melhor experiência tanto em telas pequenas (smartphones) quanto em telas grandes (navegadores web), utilizando limites de largura (`maxWidth`) e ajustes de alinhamento.

## 🛠 Tecnologias Utilizadas

* **React Native** (Expo SDK 54)
* **React Navigation** (v6 - Stack & Bottom Tabs)
* **Context API** (Gerenciamento de Estado Global - `PetContext`)
* **AsyncStorage** (Persistência de Dados Local)
* **Expo Image Picker** (Acesso à Galeria de Imagens)
* **React Native Web** (Compatibilidade com Navegadores)
* **Ionicons** (@expo/vector-icons)

## ⚙️ Configuração e Execução

Para rodar este projeto localmente, siga os passos abaixo:

### Pré-requisitos
* Node.js e npm instalados.
* Emulador Android configurado ou dispositivo físico com o app **Expo Go**.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Wanderson-A-Timoteo/pet-care.git
    ```

2.  **Entre na pasta do projeto:**
    ```bash
    cd pet-care
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### Executando o Projeto

1.  **Inicie o servidor do Expo:**
    Recomendamos usar a flag `-c` para limpar o cache na inicialização:
    ```bash
    npx expo start -c
    ```

2.  **Abra o aplicativo:**
    * **Android:** Pressione `a` no terminal (com o emulador aberto ou dispositivo conectado via USB).
    * **Web:** Pressione `w` no terminal para abrir no navegador padrão.
    * **iOS:** Pressione `i` no terminal (requer macOS e Simulator).

## 📂 Estrutura do Projeto

O código fonte está organizado dentro da pasta `src`:

* `src/assets/`: Imagens e recursos estáticos.
* `src/componentes/`: Componentes de UI reutilizáveis (ex: `CardPet.js`).
* `src/contextos/`: Lógica de estado global e regras de negócio (`PetContext.js`).
* `src/navegacao/`: Configuração das rotas e tipos de navegação (`Rotas.js`).
* `src/telas/`: Telas principais da aplicação (`ListaPets`, `CadastroPet`, `DetalhesPet`, `PerfilUsuario`).

## ✒️ Autor

**Wanderson de Almeida Timóteo**

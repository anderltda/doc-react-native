
# TaskFlow App

## App de tarefas pessoais

Um app para cadastrar, editar, atualizar e remover tarefas.

Funcionalidades iniciais

- login simples
- lista de tarefas
- filtro por pendente e concluída
- armazenamento local
- tema dark e light

## Tela de Login

A aplicação deve iniciar na tela de login contendo:

- Campo de usuário  
- Campo de senha  
- Botão de login  
- Mensagem de erro para credenciais inválidas  

---

### Usuários (hardcoded)

Os usuários devem ser definidos diretamente no código:

```ts
const users = [
  {
    id: 1,
    username: 'admin',
    password: '123',
    role: 'admin',
    name: 'Administrador',
  },
  {
    id: 2,
    username: 'user',
    password: '123',
    role: 'user',
    name: 'Usuário Comum',
  },
];
```

---

### Regras de autenticação

Após login:

- Usuário --admin-- → navegar para --Configurações--  
- Usuário --user-- → navegar para --Home--  
- Credenciais inválidas → exibir erro
- O usuário deve permanecer logado
- Os dados devem ser salvos no AsyncStorage
- Ao abrir o app novamente, deve ir direto para o app (sem login)
- No logout limpa os dados

---

### As Telas 

- Home
- Tarefas
- Configurações

Deve conter "Header" com:

- Nome do usuário logado
- Botão de logout
- Identificação do perfil (admin/user)

------------------------------------------------------------------------

# Sobre o projeto

Ideia do app

Criar um aplicativo mobile de gerenciamento de tarefas, onde o usuário poderá:

- visualizar tarefas
- cadastrar tarefas
- editar tarefas
- remover tarefas
- filtrar tarefas
- navegar entre telas
- armazenar dados localmente
- consumir API
- utilizar componentes reutilizáveis
- aplicar organização modular
- construir uma interface visual bem estruturada

------------------------------------------------------------------------

# Objetivo

Desenvolver um aplicativo em React Native com TypeScript que contemple os seguintes temas:

- Fundamentos do React Native
- Navegação entre telas
- Armazenamento local com AsyncStorage
- Consumo de API
- Modularização com ESModules
- Componentização
- CRUD
- Listagem
- UI
- Tipagem forte com TypeScript

------------------------------------------------------------------------

# Conceitos aplicados

O projeto deve utilizar os conceitos básicos já estudados, como:

- View
- Text
- TextInput
- TouchableOpacity ou Pressable
- FlatList
- StyleSheet
- useState
- useEffect
- Context API
- eventos
- renderização condicional

------------------------------------------------------------------------

## Context API

O app deve utilizar Context API para:

- autenticação (AuthContext)
- tarefas (TaskContext)
- tema (ThemeContext)

Não é permitido gerenciar estado global apenas com useState nas telas.

------------------------------------------------------------------------

## Navegação

O app deve possuir navegação utilizando React Navigation com:

- Stack Navigation
- Bottom Tabs Navigation

Regras da navegação

- o projeto deve combinar navegação por pilha e navegação por abas
- o fluxo principal deve usar abas inferiores
- telas internas e de detalhe devem usar stack

Cada aba pode ter seu próprio Stack Navigation.

Exemplo:
- HomeStack
- TaskStack
- SettingsStack

Exemplo de organização

Bottom Tabs

- Home
- Tarefas
- Configurações

Stack Navigation

Cada aba pode possuir seu próprio Stack Navigator.

Dentro da aba de Home:
- Mensagem de boas-vindas
- Frase motivacional do dia

Dentro da aba de Tarefas:
- Lista de tarefas
- Cadastro de tarefa
- Detalhe da tarefa
- Edição de tarefa

Dentro da aba de Configurações:
- Alteração de tema (Persistível no AsyncStorage)
- Perfil do usuário (admin/user)
- Preferência de tratamento (Sr., Sra., Srta.)

Navegações esperadas

- ir da Home para a aba de tarefas
- ir da lista para cadastro
- ir da lista para detalhes
- ir dos detalhes para edição
- retornar entre telas usando stack

------------------------------------------------------------------------

## Armazenamento local (AsyncStorage)

Todas as tarefas criadas ou alteradas pelo usuário devem ser persistidas localmente.

O app deve:

- salvar tarefas no dispositivo
- carregar tarefas ao abrir o app
- atualizar tarefas já salvas
- remover tarefas do armazenamento
- opcionalmente manter preferências do usuário, como tema

------------------------------------------------------------------------

## Consumo de API

O app deve consumir uma API para complementar alguma funcionalidade.

Exemplos de uso

- A tela Home deve consumir API para exibir a frase motivacional
- buscar categoria para adicionar na tarefa
- buscar uma imagem ou ícone representando a categoria da tarefa

O app deve demonstrar

- uso de fetch ou axios
- tratamento de carregamento
- tratamento de erro
- atualização da interface após resposta da API

Sugestão

Pode usar APIs públicas, como:

- JSONPlaceholder
- DummyJSON

------------------------------------------------------------------------

## Arquitetura

O projeto deve seguir separação de responsabilidades:

- screens → UI
- components → reutilização
- services → API / storage
- context → estado global
- hooks → lógica reutilizável

------------------------------------------------------------------------

## Hooks customizados

O projeto deve conter obrigatoriamente pelo menos um hook customizado implementado e utilizado no app, como:
- useTasks
- useAuth
- useTheme

Objetivo:
- separar lógica das telas
- evitar repetição de código

------------------------------------------------------------------------

## Modularização com ESModules

Estrutura obrigatória:

```ts
src/
  components/
    CustomButton.tsx
    CustomInput.tsx
    Header.tsx
    TaskCard.tsx
    EmptyState.tsx
    StatusBadge.tsx
    FilterBar.tsx

  screens/
    home/
      HomeScreen.tsx

    tasks/
      TaskListScreen.tsx
      TaskFormScreen.tsx
      TaskDetailScreen.tsx

    settings/
      SettingsScreen.tsx

  routes/
    AppRoutes.tsx
    TabRoutes.tsx
    TaskStackRoutes.tsx

  services/
    taskStorage.ts
    api.ts

  context/
    AuthContext.tsx
    TaskContext.tsx
    ThemeContext.tsx

  hooks/
    useTasks.ts

  types/
    task.ts
    user.ts
    navigation.ts

  utils/
    formatDate.ts
    generateId.ts

App.tsx
```

------------------------------------------------------------------------

## Componentização

-   CustomButton
-   CustomInput
-   TaskCard
-   Header
-   EmptyState
-   StatusBadge
-   FilterBar

------------------------------------------------------------------------

## CRUD

-   Create (criar tarefa)
-   Read (listar tarefas)
-   Update (editar tarefa)
-   Delete (excluir tarefa)

------------------------------------------------------------------------

## Listagem

A listagem deve ser feita com FlatList.

Requisitos da listagem

- mostrar título da tarefa
- mostrar status
- mostrar categoria
- mostrar a imagem ou ícone representando a categoria 
- mostrar prioridade
- mostrar data de criação
- mostrar data de atualização
- permitir clicar em um item
- exibir mensagem quando a lista estiver vazia

------------------------------------------------------------------------

## UI

O app deve conter:

- layout limpo
- espaçamento consistente
- cores por status
- inputs estilizados
- empty state
- loading ao buscar dados
- confirmação ao excluir
- feedback visual ao salvar
- estado vazio amigável
- mensagens claras de erro

------------------------------------------------------------------------

## TypeScript

Proibido usar `any`

### Deve ser tipado:

-   props
-   estados
-   funções
-   eventos
-   API
-   contextos
-   navegação
-   parâmetros de rota

### Exemplo:

```ts
export type TaskStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string };
  TaskDetail: { taskId: string };
};

export type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  Settings: undefined;
};
```

------------------------------------------------------------------------

# Modelo de dados

```ts
export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';
export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  categoryIcon: string;
  createdAt: string;
  updatedAt: string;
}
```

------------------------------------------------------------------------

# Fluxo do app

## Tabs

-   Home
-   Tarefas
-   Configurações

## Stack (Tarefas)

-   Lista
-   Cadastro
-   Detalhe
-   Edição

------------------------------------------------------------------------

# Tecnologias

-   React Native
-   Expo
-   TypeScript
-   React Navigation
-   AsyncStorage
-   Fetch / Axios

------------------------------------------------------------------------

# Regras de negócio

1.  título obrigatório
2.  não salvar vazio
3.  id único
4.  data automática
5.  editar tarefa
6.  excluir com confirmação
7.  empty state
8.  persistência local
9.  consumir API
10. tratar loading/erro
11. usar stack + tabs
12. não usar any

------------------------------------------------------------------------

# Entrega

## Código

-   projeto funcional

## Vídeo

-   3 a 7 minutos

## Deve mostrar:

-   navegação
-   CRUD
-   persistência
-   API

------------------------------------------------------------------------

# Diferenciais

-   animações
-   validação
-   loading

------------------------------------------------------------------------

# Avaliação

## Funcionalidade — 45%
- CRUD
- navegação
- AsyncStorage
- API

## Código — 25%
- limpo
- tipado
- sem any

## UI — 20%
- consistente

## Apresentação — 10%
- vídeo do funcionamento

------------------------------------------------------------------------

# Resultado esperado

Um app:

-   funcional
-   organizado
-   tipado
-   com navegação profissional
-   com persistência local
-   com consumo de API

------------------------------------------------------------------------

# 📚 Referências

https://reactnative.dev/docs/components-and-apis
https://docs.expo.dev/skills/
https://reactnavigation.org/
https://www.typescriptlang.org/docs/

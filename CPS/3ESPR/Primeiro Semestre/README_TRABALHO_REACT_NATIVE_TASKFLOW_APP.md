# TaskFlow App — Checkpoint 2

Aplicativo mobile para gerenciamento de tarefas pessoais, desenvolvido com React Native, Expo e TypeScript.

O projeto reúne os principais fundamentos estudados na disciplina: componentes nativos, estado, eventos, renderização condicional, formulários, navegação, Context API, hooks, persistência local, consumo de API, CRUD, componentização e tipagem forte.

## Objetivo

Desenvolver um aplicativo funcional no qual o usuário possa:

- autenticar-se;
- permanecer conectado ao reabrir o aplicativo;
- visualizar, cadastrar, consultar, editar e excluir tarefas;
- filtrar tarefas por status;
- navegar entre telas por abas e pilhas;
- alterar e persistir o tema da aplicação;
- consumir uma API pública;
- receber feedback claro durante carregamentos, erros e operações de salvamento.

## Tecnologias obrigatórias

- React Native;
- Expo;
- TypeScript;
- React Navigation;
- Context API;
- AsyncStorage;
- Fetch ou Axios;
- ESModules (`import` e `export`).

## Conceitos fundamentais aplicados

O projeto deve demonstrar o uso de:

- `View`, `Text`, `TextInput` e `Image`;
- `Pressable` ou `TouchableOpacity`;
- `FlatList`;
- `StyleSheet`;
- `SafeAreaView`;
- `ActivityIndicator`;
- `Alert`;
- `useState` e `useEffect`;
- props e eventos;
- formulários e validação;
- renderização condicional;
- componentes reutilizáveis;
- Context API;
- hooks customizados;
- operações assíncronas com `async/await` e `try/catch`;
- tipagem com TypeScript.

## Autenticação

A aplicação deve iniciar na tela de login quando não houver uma sessão válida armazenada.

### Usuários disponíveis

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

### Regras de autenticação

- Credenciais inválidas devem gerar uma mensagem de erro clara.
- A sessão deve ser persistida no AsyncStorage.
- Ao reabrir o aplicativo, o usuário autenticado deve acessar diretamente o fluxo principal.
- O logout deve apagar os dados da sessão e retornar à tela de login.
- Após o login, `admin` deve abrir o fluxo principal com a aba **Configurações** selecionada.
- Após o login, `user` deve abrir o fluxo principal com a aba **Home** selecionada.
- Todas as telas principais devem exibir um `Header` com nome, perfil e botão de logout.

> A autenticação é apenas didática. Usuários e senhas ficam no código e não representam uma implementação adequada para produção.

## Navegação

O projeto deve combinar:

- **Bottom Tabs** para o fluxo principal;
- **Stack Navigation** para telas internas e de detalhes.

### Abas principais

- Home;
- Tarefas;
- Configurações.

### Pilha de tarefas

- Lista de tarefas;
- Cadastro de tarefa;
- Detalhes da tarefa;
- Edição da tarefa.

O usuário deve conseguir navegar da Home para Tarefas, abrir o cadastro, consultar uma tarefa, acessar sua edição e retornar corretamente pelas telas da pilha.

## Gerenciamento de estado

A Context API é obrigatória para os estados globais:

- `AuthContext`: sessão e autenticação;
- `TaskContext`: tarefas e operações de CRUD;
- `ThemeContext`: tema claro/escuro.

Não é permitido manter todo o estado global somente com `useState` dentro das telas.

O projeto deve implementar e utilizar pelo menos um hook customizado, como `useAuth`, `useTasks` ou `useTheme`.

## Modelo de dados

```ts
export type UserRole = 'admin' | 'user';
export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';
export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: string;
  userId: number;
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

Cada tarefa deve pertencer ao usuário que a criou. Um usuário comum visualiza e altera somente as próprias tarefas. O administrador também deve trabalhar com as próprias tarefas; não é necessário criar um painel administrativo de outros usuários.

## CRUD de tarefas

O aplicativo deve permitir:

- **Create:** cadastrar uma tarefa;
- **Read:** listar e consultar seus detalhes;
- **Update:** editar dados e alterar seu status;
- **Delete:** excluir mediante confirmação.

### Regras de negócio e validação

- O título é obrigatório e não pode conter somente espaços.
- O título deve ter pelo menos 3 caracteres.
- A descrição é obrigatória e deve ter pelo menos 5 caracteres.
- Status, prioridade e categoria devem possuir valores válidos.
- Não é permitido salvar um formulário inválido.
- Cada tarefa deve possuir um identificador único.
- `createdAt` deve ser definido automaticamente no cadastro.
- `updatedAt` deve ser atualizado automaticamente em cada edição.
- A exclusão deve solicitar confirmação com `Alert`.
- O usuário deve receber feedback visual ao salvar, editar ou excluir.
- Falhas de leitura ou gravação devem ser tratadas com `try/catch` e mensagem compreensível.

## Listagem

A listagem deve utilizar `FlatList` e mostrar:

- título;
- status;
- categoria;
- imagem ou ícone da categoria;
- prioridade;
- data de criação;
- data de atualização.

Também deve permitir abrir um item, filtrar por tarefas pendentes e concluídas e mostrar um estado vazio amigável quando não houver resultados.

## Persistência local

O AsyncStorage deve armazenar:

- sessão do usuário;
- tarefas criadas ou alteradas;
- preferência de tema;
- preferência de tratamento (`Sr.`, `Sra.` ou `Srta.`), quando definida.

As tarefas devem ser carregadas ao iniciar o aplicativo. Inclusões, edições e exclusões precisam ser refletidas no armazenamento local.

## Consumo de API

A Home deve consumir uma API pública para exibir uma frase motivacional ou conteúdo equivalente. Também é possível consumir uma API para obter categorias ou imagens relacionadas às tarefas.

A integração deve demonstrar:

- chamada com Fetch ou Axios;
- tipagem da resposta;
- indicador de carregamento;
- tratamento de erros com `try/catch`;
- mensagem e opção de tentar novamente em caso de falha;
- atualização da interface após a resposta.

APIs sugeridas: JSONPlaceholder ou DummyJSON.

## Tema e configurações

A tela de Configurações deve permitir:

- alternar entre tema claro e escuro;
- persistir o tema no AsyncStorage;
- visualizar nome e perfil do usuário;
- selecionar uma preferência de tratamento.

As cores devem ser centralizadas no `ThemeContext`, evitando valores espalhados pelas telas.

## Interface e acessibilidade

A interface deve possuir:

- layout limpo e responsivo;
- espaçamento consistente;
- cores coerentes para status e prioridade;
- inputs e botões estilizados;
- feedback de toque;
- loading nas operações assíncronas;
- mensagens claras de validação e erro;
- estado vazio amigável;
- contraste legível nos temas claro e escuro.

Elementos interativos devem utilizar, quando aplicável, `accessibilityLabel`, `accessibilityHint` e `accessibilityRole`. Botões que exibem somente ícones precisam ter descrição acessível.

## TypeScript

É proibido utilizar `any`.

Devem ser tipados:

- props;
- estados;
- funções e eventos;
- contextos;
- respostas da API;
- entidades do domínio;
- navegação e parâmetros de rota.

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

## Estrutura sugerida

```text
src/
  components/
    CustomButton.tsx
    CustomInput.tsx
    EmptyState.tsx
    FilterBar.tsx
    Header.tsx
    StatusBadge.tsx
    TaskCard.tsx
  screens/
    auth/
      LoginScreen.tsx
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
    api.ts
    authStorage.ts
    taskStorage.ts
  context/
    AuthContext.tsx
    TaskContext.tsx
    ThemeContext.tsx
  hooks/
    useAuth.ts
    useTasks.ts
    useTheme.ts
  types/
    navigation.ts
    task.ts
    user.ts
  utils/
    formatDate.ts
    generateId.ts
    validation.ts
App.tsx
```

## Como executar

Requisitos:

- Node.js em versão LTS;
- npm;
- aplicativo Expo Go ou emulador Android/iOS.

```bash
npm install
npx expo start
```

Depois, abra o QR Code no Expo Go ou selecione uma das opções de emulador exibidas pelo Expo.

## Checklist de entrega

- [ ] Login válido e inválido funcionando;
- [ ] sessão persistida e logout funcionando;
- [ ] fluxo inicial diferente para `admin` e `user`;
- [ ] Stack e Bottom Tabs combinados;
- [ ] CRUD completo;
- [ ] tarefas separadas por usuário;
- [ ] dados persistidos no AsyncStorage;
- [ ] listagem construída com `FlatList`;
- [ ] filtros funcionando;
- [ ] API com loading, erro e nova tentativa;
- [ ] três contextos implementados;
- [ ] ao menos um hook customizado em uso;
- [ ] tema claro/escuro persistido;
- [ ] validações e confirmação de exclusão;
- [ ] recursos básicos de acessibilidade;
- [ ] nenhuma ocorrência de `any`;
- [ ] código organizado por responsabilidade;
- [ ] projeto documentado no `README.md` do próprio repositório;
- [ ] README com descrição, funcionalidades, tecnologias, estrutura, instalação e execução;
- [ ] repositório publicado no GitHub e acessível para avaliação;
- [ ] vídeo demonstrando navegação, CRUD, persistência e API.

## Entrega

O repositório deverá conter o código completo e permanecer acessível durante todo o período de correção. Antes do envio, verifique se ele está público ou se o professor possui permissão de acesso.

O `README.md` do repositório deve apresentar, no mínimo:

- descrição e objetivo do aplicativo;
- no máximo 5 integrantes;
- nomes e RMs dos integrantes;
- tecnologias utilizadas;
- funcionalidades implementadas;
- estrutura principal do projeto;
- instruções de instalação e execução;
- credenciais de teste;
- API consumida;
- link para o vídeo, caso ele também seja publicado online.
- duração do video de 3 a 7 minutos;

## Avaliação

| Critério | Peso | Evidências esperadas |
| --- | ---: | --- |
| Funcionalidade | 45% | CRUD, navegação, AsyncStorage e API |
| Código | 25% | Organização, tipagem forte, tratamento de erros e ausência de `any` |
| Interface | 20% | Consistência visual, estados de tela, temas e acessibilidade básica |
| Apresentação | 10% | Vídeo objetivo demonstrando o funcionamento |

## Diferenciais

- animações;
- validações mais completas;
- transições e feedbacks visuais;
- melhor tratamento de estados de carregamento e falha.

## Referências

- [Componentes e APIs do React Native](https://reactnative.dev/docs/components-and-apis)
- [Documentação do Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

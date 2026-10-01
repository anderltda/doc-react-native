# 🌐 Checkpoint 2 — Consumo de API no React Native

## React Native + TypeScript + Fetch + Axios + Service Layer + Hooks + Interceptors

---

# 🎯 Objetivo

Construir uma aplicação React Native utilizando conceitos modernos de consumo de API e arquitetura frontend mobile.

O aluno deverá aplicar:

- Fetch API
- Axios
- TypeScript
- Service Layer
- Custom Hooks
- React Navigation
- Axios Interceptors
- Tratamento de erro
- Loading State
- Componentização
- Cache local
- Offline First
- TanStack Query

---

# 🛠️ Tecnologias obrigatórias

- React Native
- Expo
- TypeScript
- Axios
- React Navigation
- AsyncStorage
- TanStack Query

---

# 🌍 API utilizada

```txt
https://jsonplaceholder.typicode.com
```

---

# 📦 Estrutura obrigatória

```txt
src/
  services/
    api.ts
    userService.ts
    postService.ts

  hooks/
    useUsers.ts
    usePosts.ts

  screens/
    HomeScreen.tsx
    UsersFetchScreen.tsx
    UsersScreen.tsx
    UserDetailsScreen.tsx
    UserPostsScreen.tsx
    PostsScreen.tsx
    CreatePostScreen.tsx
    ErrorTestScreen.tsx

  components/
    Loading.tsx
    ErrorMessage.tsx
    EmptyState.tsx
    UserCard.tsx
    PostCard.tsx

  navigation/
    AppNavigator.tsx
    types.ts

  types/
    user.ts
    post.ts
```

---

# 🧭 Navegação obrigatória

```txt
Home
 ├── UsersFetch
 ├── Users
 │    └── UserDetails
 │          └── UserPosts
 ├── Posts
 ├── CreatePost
 └── ErrorTest
```

---

# 🧪 Exercício 1 — Fetch API

Criar uma tela chamada:

```txt
UsersFetchScreen
```

## Requisitos

- buscar usuários usando fetch
- exibir nome e email
- ter loading
- ter tratamento de erro
- ter botão recarregar
- tratar estado vazio

---

# 🧪 Exercício 2 — POST

Criar uma tela chamada:

```txt
CreatePostScreen
```

## Requisitos

- input de título
- input de conteúdo
- botão criar post
- loading durante envio
- validação de campos
- tratamento de erro
- exibir ID retornado

---

# 🧪 Exercício 3 — Axios Service Layer

Criar:

```txt
services/api.ts
services/userService.ts
services/postService.ts

hooks/useUsers.ts
hooks/usePosts.ts
```

## Objetivo

Separar:

- configuração do Axios
- chamadas HTTP
- regras de negócio
- lógica reutilizável

---

# 🧪 Exercício 4 — Tratamento de erro

Criar uma tela chamada:

```txt
ErrorTestScreen
```

## URL obrigatória

```txt
https://jsonplaceholder.typicode.com/rota-inexistente
```

## Requisitos

- erro HTTP
- loading
- retry
- mensagem amigável
- estado vazio

---

# 🧪 Exercício 5 — Axios Interceptor

Adicionar interceptor obrigatório.

## Header obrigatório

```txt
X-App-Name: ReactNativeClass
```

## Logs obrigatórios

```ts
console.log('Request:', config.method, config.url);
console.log('Response:', response.status);
```

---

# 🧪 Exercício 6 — Projeto principal

Criar:

```txt
UsersScreen
UserDetailsScreen
UserPostsScreen
PostsScreen
CreatePostScreen
```

## Funcionalidades obrigatórias

### UsersScreen

- listar usuários
- usar Axios
- usar custom hook
- usar service layer
- loading
- error state
- empty state
- botão recarregar

### UserDetailsScreen

Receber:

```ts
userId: number
```

Buscar:

```txt
GET /users/:id
```

Exibir:

- nome
- email
- telefone
- website
- empresa

### UserPostsScreen

Buscar:

```txt
GET /posts?userId=ID
```

### PostsScreen

- listar posts
- exibir os 20 primeiros
- loading
- tratamento de erro
- botão recarregar

### CreatePostScreen

- criar post usando Axios
- loading
- validação
- tratamento de erro
- exibir ID retornado

## Utilizar TanStack Query

- useQuery
- queryKey
- QueryClientProvider

---

# ❌ Não é permitido

```txt
any
```

---

# ❌ Erros críticos

- usar any
- não tratar erro
- não ter loading
- não usar service layer
- não usar interceptors
- não implementar TanStack Query
- app não executar

---

# 📦 Entrega

O aluno deve entregar:

- Enviar via teams - Anderson da Silva Nascimento
- grupo de 5 pessoas
- link do GitHub
- README.md do projeto


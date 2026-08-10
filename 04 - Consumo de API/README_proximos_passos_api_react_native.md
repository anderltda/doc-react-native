# 🚀 Aula Avançada — Próximos Passos no Consumo de API (React Native)

## 🔥 Evoluindo para nível profissional

Depois de dominar consumo básico de API, o próximo nível envolve padrões reais usados em aplicações de mercado.

Esta aula cobre:

- Autenticação com token (JWT)
- Refresh Token
- Interceptors avançados
- Cache com TanStack Query
- Paginação
- Infinite Scroll
- Upload de arquivos
- Download de arquivos
- Offline First
- Sincronização com armazenamento local

Todos os exemplos são executáveis em **App.tsx**.

---

# 🔐 1. Autenticação com Token

## 🧠 Teoria

Após login, a API retorna um token:

```json
{
  "access_token": "abc123"
}
```

Esse token deve ser enviado em todas as requisições:

```http
Authorization: Bearer abc123
```

---

## 💻 Exemplo (App.tsx)

```tsx
import React from 'react';
import { Button, SafeAreaView } from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export default function App() {

  const callApi = async () => {
    const token = 'fake-token';

    const res = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  };

  return (
    <SafeAreaView>
      <Button title="Chamar API com token" onPress={callApi} />
    </SafeAreaView>
  );
}
```

---

# 🔁 2. Refresh Token

## 🧠 Teoria

Quando o token expira, a API retorna:

```http
401 Unauthorized
```

Fluxo correto:

1. Detectar erro 401
2. Fazer refresh token
3. Repetir requisição original

---

# 🧠 3. Interceptors Avançados

## 💻 Exemplo (App.tsx)

```tsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer fake-token';
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Token expirado');
    }
    return Promise.reject(error);
  }
);
```

---

# ⚡ 4. Cache com TanStack Query

## 🧠 Teoria

Evita chamadas repetidas e melhora performance.

---

## 💻 Exemplo

```tsx
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Text, SafeAreaView } from 'react-native';

const queryClient = new QueryClient();

function AppContent() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/users').then((r) => r.json()),
  });

  if (isLoading) return <Text>Loading...</Text>;

  return <Text>{data[0].name}</Text>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <AppContent />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
```

---

# 📄 5. Paginação

## 🧠 Teoria

Carregar dados em partes.

---

## 💻 Exemplo

```tsx
const res = await fetch('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10');
```

---

# 🔄 6. Infinite Scroll

## 💻 Exemplo

```tsx
<FlatList
  data={data}
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
/>
```

---

# 📤 7. Upload de arquivos

## 💻 Exemplo

```tsx
const formData = new FormData();

formData.append('file', {
  uri: 'file://path',
  name: 'file.jpg',
  type: 'image/jpeg',
});

await fetch('https://api.com/upload', {
  method: 'POST',
  body: formData,
});
```

---

# 📥 8. Download de arquivos

## 💻 Exemplo

```tsx
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const blob = await res.blob();
```

---

# 📶 9. Offline First

## 🧠 Teoria

App funciona sem internet.

Estratégia:

- salvar dados localmente
- sincronizar depois

---

# 🔄 10. Sincronização com armazenamento local

## 💻 Exemplo

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('@cache', JSON.stringify(data));
```

---

# 🧪 Exercícios

## Exercício 1 — Fetch

Crie uma tela que:

- busque usuários
- exiba nome e email
- tenha loading
- tenha mensagem de erro
- tenha botão para recarregar

---

## Exercício 2 — POST

Crie uma tela que:

- tenha input de título
- tenha input de conteúdo
- envie os dados via POST
- mostre o ID retornado

---

## Exercício 3 — Axios Service

Crie:

```txt
services/api.ts
services/userService.ts
hooks/useUsers.ts
```

Depois use isso em uma tela.

---

## Exercício 4 — Tratamento de erro

Force uma URL errada:

```txt
https://jsonplaceholder.typicode.com/rota-inexistente
```

E trate o erro na tela.

---

## Exercício 5 — Interceptor

Crie um interceptor que adicione:

```txt
X-App-Name: ReactNativeClass
```

em todas as requisições.

---

## Checkpoint 2 — Projeto final

Crie um app com:

- lista de usuários
- detalhes de usuário
- lista de posts
- criação de post
- loading
- erro
- service layer
- tipagem
- hook customizado
- implementar login com token
- criar interceptor
- implementar paginação
- criar infinite scroll
- salvar cache local
- simular offline

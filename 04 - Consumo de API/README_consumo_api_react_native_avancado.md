# 🌐 Consumo de API no React Native

## React Native + TypeScript + Fetch + Axios + Service Layer + Hooks + Cache

---

## 📌 Objetivo da aula

Nesta aula você vai aprender, de forma prática e mais profunda, como consumir APIs em aplicações **React Native com TypeScript**.

A proposta não é apenas “fazer um `fetch`”, mas entender como apps reais trabalham com comunicação HTTP, estados assíncronos, tratamento de erros, tipagem, arquitetura e boas práticas.

Ao final, você será capaz de criar telas que:

- Buscam dados de uma API
- Enviam dados para uma API
- Tratam loading, erro e sucesso
- Utilizam `fetch`
- Utilizam `axios`
- Trabalham com `GET`, `POST`, `PUT` e `DELETE`
- Organizam chamadas HTTP em services
- Criam hooks reutilizáveis
- Tratam status HTTP
- Trabalham com headers
- Cancelam requisições
- Usam interceptors
- Entendem quando usar TanStack Query

---

# 🧠 1. O que significa consumir uma API?

Consumir uma API significa fazer uma comunicação entre o aplicativo mobile e um servidor.

Exemplo:

```txt
React Native App  --->  API REST  --->  Banco de Dados
```

O aplicativo envia uma requisição HTTP e recebe uma resposta.

Exemplo de resposta em JSON:

```json
{
  "id": 1,
  "name": "Anderson",
  "email": "anderson@email.com"
}
```

---

# 🌍 2. O que é HTTP?

HTTP é o protocolo usado para comunicação entre cliente e servidor.

No React Native, normalmente usamos HTTP para:

- buscar usuários
- autenticar login
- enviar formulários
- cadastrar dados
- atualizar registros
- remover registros
- baixar dados para exibição

---

# 🧾 3. Principais métodos HTTP

| Método | Uso comum | Exemplo |
|---|---|---|
| GET | Buscar dados | Buscar usuários |
| POST | Criar dados | Criar um post |
| PUT | Atualizar tudo | Atualizar usuário inteiro |
| PATCH | Atualizar parcialmente | Alterar apenas nome |
| DELETE | Remover dados | Excluir uma tarefa |

---

# 📦 4. O que é JSON?

JSON é o formato mais comum para troca de dados entre app e API.

Exemplo:

```json
{
  "id": 1,
  "title": "Estudar React Native",
  "completed": false
}
```

No JavaScript/TypeScript, JSON normalmente vira objeto:

```ts
type Task = {
  id: number;
  title: string;
  completed: boolean;
};
```

---

# 🔁 5. Estados fundamentais ao consumir API

Toda tela que consome API normalmente tem pelo menos três estados:

```ts
const [data, setData] = useState<T[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

## Por quê?

Porque uma requisição pode estar:

- carregando
- com sucesso
- com erro
- vazia
- sendo atualizada
- cancelada

Um app profissional precisa tratar todos esses estados.

---

# 🧪 API usada nos exemplos

Usaremos a API pública:

```txt
https://jsonplaceholder.typicode.com
```

Endpoints usados:

```txt
GET    /users
GET    /posts
GET    /posts/:id
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
```

---

# 🛠️ Criando o projeto

```bash
npx create-expo-app app-consumo-api --template blank-typescript
cd app-consumo-api
npm install
npx expo start
```

---

# 🛠️ Instalando Axios

O `fetch` já existe no JavaScript, mas o Axios precisa ser instalado.

```bash
npm install axios
```

---

# ✅ 6. GET com Fetch, TypeScript, Loading e Error

## Objetivo

Buscar usuários de uma API e exibir em uma lista.

## O que este exemplo ensina

- `fetch`
- `useEffect`
- `useState`
- `FlatList`
- loading
- error
- tipagem de resposta

## `App.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, } from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
    } finally {
      // 'Executa depois de 2 segundos'
      setTimeout(() => { 
        setLoading(false);
      }, 2000);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando usuários...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>Erro: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Usuários</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>@{item.username}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f4f6f8',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  error: {
    color: '#b00020',
    fontSize: 16,
    fontWeight: '700',
  },
});
```

---

# 🧠 Explicação importante

## Por que verificar `response.ok`?

O `fetch` só cai no `catch` em erros de rede, como falha de conexão.

Se a API responder `404`, `400` ou `500`, o `fetch` ainda considera que houve uma resposta.

Por isso usamos:

```ts
if (!response.ok) {
  throw new Error(`Erro HTTP: ${response.status}`);
}
```

---

# ✅ 7. GET com botão de recarregar

## Objetivo

Criar uma tela com:

- botão para carregar
- botão para recarregar
- estado vazio
- loading manual

## `App.tsx`

```tsx
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, View, } from 'react-native';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPosts = useCallback(async () => {
    let data: Post[] = [];
    try {
      setLoading(true);
      setError('');
      setPosts([]);

      const response = await fetch('https://jsonplaceholder.typicode.com/posts');

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      data = await response.json();
      
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar posts';
      setError(message);
    } finally {
      // 'Executa depois de 2 segundos'
      setTimeout(() => { 
        setLoading(false);
        setPosts(data.slice(0, 10));
      }, 2000);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Posts</Text>

      <Button title="Carregar posts" onPress={loadPosts} />

      {loading && (
        <View style={styles.feedback}>
          <ActivityIndicator />
          <Text>Buscando dados...</Text>
        </View>
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}

      {!loading && posts.length === 0 && !error && (
        <Text style={styles.empty}>Nenhum post carregado.</Text>
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
  },
  feedback: {
    marginVertical: 16,
    alignItems: 'center',
    gap: 8,
  },
  error: {
    color: '#b00020',
    marginVertical: 16,
    fontWeight: '700',
  },
  empty: {
    marginTop: 20,
    color: '#666',
  },
  list: {
    paddingTop: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
});
```

---

# ✅ 8. POST com Fetch

## Objetivo

Enviar dados para uma API.

## Conceitos

Para enviar JSON, normalmente usamos:

```ts
headers: {
  'Content-Type': 'application/json',
}
```

E no corpo:

```ts
body: JSON.stringify(data)
```

## `App.tsx`

```tsx
import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, } from 'react-native';

type CreatePostPayload = {
  title: string;
  body: string;
  userId: number;
};

type CreatedPostResponse = CreatePostPayload & {
  id: number;
};

export default function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  async function createPost() {
    try {
      if (!title.trim() || !body.trim()) {
        Alert.alert('Validação', 'Informe título e conteúdo.');
        return;
      }

      setLoading(true);

      const payload: CreatePostPayload = {
        title,
        body,
        userId: 1,
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: CreatedPostResponse = await response.json();

      Alert.alert('Post criado', `ID gerado: ${data.id}`);
      setTitle('');
      setBody('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar post';
      Alert.alert('Erro', message);
    } finally {
      // 'Executa depois de 2 segundos'
      setTimeout(() => { 
        setLoading(false);
      }, 2000);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar post com Fetch</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Conteúdo"
        value={body}
        onChangeText={setBody}
        multiline
      />

      <Button
        title={loading ? 'Enviando...' : 'Criar post'}
        onPress={createPost}
        disabled={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});
```

---

# ✅ 9. Cancelando requisição com AbortController

## Por que cancelar requisições?

Em apps reais, a tela pode desmontar enquanto a requisição ainda está em andamento.

```tsx
“desmontar” (unmount) -> o componente sai da tela e deixa de existir
```

Exemplos:

- usuário voltou para tela anterior
- usuário digitou uma nova busca
- internet ficou lenta
- componente desmontou

Se você não cancelar ou controlar isso, pode tentar atualizar estado de componente desmontado.

## `App.tsx`

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, } from 'react-native';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// ⏳ sleep
function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
  });
}

export default function App() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Idle');

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

async function loadTodo() {
  controllerRef.current?.abort();

  const abortController = new AbortController();
  controllerRef.current = abortController;

  try {
    setLoading(true);
    setTodo(null);
    setStatus('🌐 Fazendo requisição...');

    // 🔥 1. fetch
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
        signal: abortController.signal,
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    setStatus('⏳ Simulando processamento (3s)...');

    // 🔥 2. simula um atraso da api - delay cancelável
    await sleep(3000, abortController.signal);

    // 🔥 3. proteção
    if (abortController.signal.aborted) {
      setStatus('❌ Cancelado antes de processar dados');
      return;
    }

    // 🔥 4. processamento final
    const data: Todo = await response.json();

    // 🔥 5. proteção extra (boa prática)
    if (abortController.signal.aborted) {
      setStatus('❌ Cancelado antes de atualizar UI');
      return;
    }

    setTodo(data);
    setStatus('✅ Sucesso!');

  } catch (err: any) {
    if (err.name === 'AbortError') {
      setStatus('❌ Requisição cancelada!');
      return;
    }

    setStatus('🔥 Erro');
    console.log(err);
  } finally {
    setLoading(false);
  }
}

  function cancelRequest() {
    controllerRef.current?.abort();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AbortController Demo</Text>

      <Button title="Carregar tarefa" onPress={loadTodo} />
      <Button title="Cancelar requisição" onPress={cancelRequest} />

      <Text style={styles.status}>{status}</Text>

      {loading && <ActivityIndicator style={styles.loading} />}

      {todo && (
        <Text style={styles.result}>
          {todo.id} - {todo.title}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  loading: {
    marginTop: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## 🧠 O que é AbortController

O AbortController é uma API do JavaScript que serve para:
cancelar operações assíncronas, principalmente requisições HTTP (fetch)

## 🎯 Problema que ele resolve

Sem AbortController, você pode ter:

* ❌ requisição continua mesmo saindo da tela
* ❌ tentativa de setState após componente desmontar
* ❌ memory leak
* ❌ dados sobrescrevendo outros (race condition)

🧠 Como funciona

```ts
controller.signal
```
👉 é o “canal” que conecta o cancelamento ao fetch

```ts
controller.abort()
```
👉 dispara o cancelamento

Quando `abort()` é chamado, o fetch recebe um erro do tipo `AbortError`, que você pode tratar para evitar efeitos colaterais.

---

# ⚖️ 10. Fetch vs Axios

## Fetch

Vantagens:

- já vem no JavaScript
- não precisa instalar biblioteca
- bom para casos simples
- funciona bem com `AbortController`

Desvantagens:

- não transforma erro HTTP automaticamente
- precisa chamar `response.json()`
- não possui interceptors nativos
- configuração de timeout é menos direta

---

## Axios

Vantagens:

- API mais amigável
- transforma JSON automaticamente
- facilita headers
- possui interceptors
- timeout nativo
- melhor padronização em projetos grandes

Desvantagens:

- precisa instalar dependência
- adiciona uma biblioteca ao projeto

---

# ✅ 11. GET com Axios

## `App.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import axios, { AxiosError } from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users'
      );

      setUsers(response.data);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Usuários com Axios</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  error: {
    color: '#b00020',
    fontWeight: '700',
  },
});
```

---

# ✅ 12. Axios com POST

## `App.tsx`

```tsx
import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, } from 'react-native';
import axios from 'axios';

type CreatePostPayload = {
  title: string;
  body: string;
  userId: number;
};

type PostResponse = CreatePostPayload & {
  id: number;
};

export default function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  async function createPost() {
    try {
      if (!title.trim() || !body.trim()) {
        Alert.alert('Validação', 'Preencha todos os campos.');
        return;
      }

      setLoading(true);

      const payload: CreatePostPayload = {
        title,
        body,
        userId: 1,
      };

      const response = await axios.post<PostResponse>(
        'https://jsonplaceholder.typicode.com/posts',
        payload
      );

      Alert.alert('Sucesso', `Post criado com ID: ${response.data.id}`);
      setTitle('');
      setBody('');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível criar o post.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>POST com Axios</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Conteúdo"
        value={body}
        onChangeText={setBody}
        multiline
      />

      <Button
        title={loading ? 'Enviando...' : 'Criar post'}
        onPress={createPost}
        disabled={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});
```

---

# ✅ 13. Service Layer com Axios

## Por que criar service?

Em app pequeno, chamar `axios.get()` direto na tela funciona.

Mas em app real, isso vira problema.

Problemas de chamar API direto na tela:

- repetição de URL
- repetição de headers
- difícil trocar API
- difícil testar
- difícil tratar erro global
- componentes ficam muito grandes

A solução é criar uma camada de service.

---

## Arquitetura sugerida

```txt
src/
  services/
    api.ts
    postService.ts
  types/
    post.ts
  screens/
    PostsScreen.tsx
```

---

## Exemplo executável em um único App.tsx

Mesmo usando a ideia de service, deixamos tudo no mesmo arquivo para facilitar a aula.

```tsx
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import axios from 'axios';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const postService = {
  async findAll(): Promise<Post[]> {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  },

  async findById(id: number): Promise<Post> {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },
};

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const data = await postService.findAll();
      setPosts(data.slice(0, 10));
    } catch {
      setError('Erro ao carregar posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPostDetails = useCallback(async (id: number) => {
    try {
      setDetailsLoading(true);
      const data = await postService.findById(id);
      setSelectedPost(data);
    } catch {
      setError('Erro ao carregar detalhes.');
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Service Layer com Axios</Text>

      <Button title="Recarregar" onPress={loadPosts} />

      {loading && <ActivityIndicator style={styles.loading} />}

      {!!error && <Text style={styles.error}>{error}</Text>}

      {selectedPost && (
        <View style={styles.details}>
          <Text style={styles.detailsTitle}>Post selecionado</Text>
          <Text>ID: {selectedPost.id}</Text>
          <Text>{selectedPost.title}</Text>
        </View>
      )}

      {detailsLoading && <Text>Carregando detalhes...</Text>}

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Button
              title="Ver detalhes"
              onPress={() => loadPostDetails(item.id)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  loading: {
    marginVertical: 16,
  },
  error: {
    color: '#b00020',
    marginVertical: 12,
    fontWeight: '700',
  },
  details: {
    backgroundColor: '#e8f0fe',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  detailsTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  postTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },
});
```

---

# ✅ 14. Axios Interceptors

## O que são interceptors?

Interceptors permitem executar lógica antes da requisição ou depois da resposta.

Usos comuns:

- adicionar token
- adicionar headers
- logar requisições
- tratar erro global
- renovar token expirado
- redirecionar para login em erro 401

---

## Exemplo executável em App.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
};

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  config.headers['X-App-Name'] = 'AulaReactNative';
  config.headers['X-Platform'] = 'mobile';
  console.log('======================');
  console.log('URL:', config.url);
  console.log('METHOD:', config.method);
  console.log('HEADERS:');
  console.log(config.headers);
  console.log('X-App-Name:', config.headers['X-App-Name']);
  console.log('X-Platform:', config.headers['X-Platform']);
  console.log('======================');
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('Resposta recebida:', response.status);
    return response;
  },
  (error) => {
    console.log('Erro global de API:', error.message);
    return Promise.reject(error);
  }
);

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

async function loadUsers() {
  try {
    const response = await api.get<User[]>('/users');
    console.log('Headers:', response.headers);
    setUsers(response.data);
  } finally {
    setLoading(false);
  }
}

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Interceptors</Text>

      {users.map((user) => (
        <View key={user.id} style={styles.card}>
          <Text style={styles.name}>{user.name}</Text>
          <Text>{user.email}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontWeight: '700',
  },
});
```

---

# ✅ 15. Custom Hook para API

## Por que criar custom hook?

Um hook reutilizável permite separar:

- estado
- loading
- erro
- chamada HTTP
- lógica de atualização

A tela fica mais limpa.

---

## `App.tsx`

```tsx
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, View, } from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
};

function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar usuários';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    reload: loadUsers,
  };
}

export default function App() {
  const { users, loading, error, reload } = useUsers();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Custom Hook useUsers</Text>

      <Button title="Recarregar" onPress={reload} />

      {loading && (
        <View style={styles.feedback}>
          <ActivityIndicator />
          <Text>Carregando usuários...</Text>
        </View>
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  feedback: {
    marginVertical: 16,
    alignItems: 'center',
  },
  error: {
    color: '#b00020',
    marginVertical: 12,
    fontWeight: '700',
  },
  list: {
    paddingTop: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontWeight: '700',
  },
});
```

---

# ✅ 16. TanStack Query (antigo React Query).

## O que é TanStack Query?

TanStack Query é uma biblioteca para gerenciamento de estado assíncrono e estado vindo do servidor.

Ela ajuda com:

- cache
- loading
- error
- retry
- refetch
- stale data
- sincronização
- queries e mutations

Em projetos maiores, ela costuma ser uma opção melhor do que controlar tudo manualmente com `useState` e `useEffect`.

---

## Instalação

```bash
npm install @tanstack/react-query
```

---

## `App.tsx`

```tsx
import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
  email: string;
};

const queryClient = new QueryClient();

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!response.ok) {
    throw new Error('Erro ao buscar usuários');
  }

  return response.json();
}

function UsersScreen() {
  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isPending) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TanStack Query</Text>

      {isFetching && <Text>Atualizando em background...</Text>}

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersScreen />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontWeight: '700',
  },
  error: {
    color: '#b00020',
    fontWeight: '700',
  },
});
```

Ele serve para:

- reduzir código repetitivo
- melhorar experiência do usuário
- facilitar manutenção
- lidar melhor com casos complexos de dados
- buscar dados
- cachear
- controlar loading
- erro
- refetch
- sincronização

Tudo isso automaticamente.

🚀 Código
```tsx
const {
  data,
  isPending,
  isError,
  error,
  isFetching,
} = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

## 🧠 O que o useQuery faz?
👉 Executa uma função assíncrona:
```tsx
fetchUsers
```
👉 Guarda o resultado em cache
👉 Controla estados automaticamente


## 🎯 Fluxo interno
Tela monta isso
```tsx
  → result.data
  → result.isPending
  → result.isError
  → result.error
  → result.isFetching
  → result.refetch
  → result.isSuccess
  → result.status
```

## Passos
→ useQuery executa fetchUsers()
→ loading = true
→ resposta chega
→ data recebe resultado
→ loading = false

---

# 🧠 17. Quando usar cada abordagem?

## Use Fetch quando:

- o app é pequeno
- você quer zero dependências
- a chamada é simples
- você quer controlar tudo manualmente

## Use Axios quando:

- o app tem muitas APIs
- precisa de interceptors
- precisa de timeout
- precisa padronizar headers
- trabalha com autenticação
- quer service layer mais limpo

## Use TanStack Query quando:

- há muitas telas consumindo API
- precisa de cache
- precisa de refetch automático
- precisa controlar estado de servidor
- quer reduzir `useEffect` manual
- quer trabalhar com queries e mutations

---

# 🚨 18. Erros comuns

## 1. Chamar API direto no corpo do componente

Errado:

```tsx
import { Text } from 'react-native';

export default function App() {
  fetch('https://api.com/users');

  return <Text>App</Text>;
}

```

Isso pode gerar múltiplas chamadas a cada render.

Certo:

```tsx
import React, { useEffect } from 'react';
import { Text } from 'react-native';

export default function App() {
  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const response = await fetch('https://api.com/users');
    const data = await response.json();

    console.log(data);
  }

  return <Text>App</Text>;
}
```

---

## 2. Não tratar erro HTTP no Fetch

Errado:

```ts
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, } from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      setLoading(true);

      // ❌ rota inválida para simular erro HTTP
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/rota-inexistente'
      );

      // ❌ fetch NÃO lança erro automaticamente para 404
      // ❌ este código continua executando

      const data = await response.json();

      console.log('Dados recebidos:', data);

      setUser(data);
    } catch (err) {
      console.log('Catch executou:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>❌ Exemplo errado</Text>

      {loading && <ActivityIndicator />}

      {user && (
        <Text>
          {user.name} - {user.email}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
});
```

Certo:

```ts
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, } from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/rota-inexistente'
      );

      // ✅ tratamento correto
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data: User = await response.json();

      setUser(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro desconhecido';

      setError(message);

      console.log('Erro tratado:', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>✅ Exemplo correto</Text>

      {loading && <ActivityIndicator />}

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {user && (
        <Text>
          {user.name} - {user.email}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  error: {
    color: 'red',
    fontWeight: '700',
  },
});
```

---

## 3. Usar `any` em tudo

Errado:

```ts
const [users, setUsers] = useState<any[]>([]);
```

Certo:

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

const [users, setUsers] = useState<User[]>([]);
```

---

## 4. Não criar loading

O usuário precisa saber que algo está acontecendo.

---

## 5. Não criar empty state

Quando a lista está vazia, mostre uma mensagem.

---

## 6. Ignorar status code

Status importantes:

| Status | Significado |
|---|---|
| 200 | OK |
| 201 | Criado |
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Sem permissão |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

---

# 📄 19. Exemplo de api.ts

```ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

# 📄 20. Exemplo de userService.ts

```ts
import { api } from './api';

export type User = {
  id: number;
  name: string;
  email: string;
};

export const userService = {
  async findAll(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  async findById(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
};
```

---

# 📄 21. Exemplo de useUsers.ts

```ts
import { useCallback, useEffect, useState } from 'react';
import { userService, User } from '../services/userService';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await userService.findAll();
      setUsers(data);
    } catch {
      setError('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    reload: loadUsers,
  };
}
```

---

# 🎓 23. Checklist

Antes de entregar, confira:

- [ ] Não usa `any`
- [ ] Usa `try/catch`
- [ ] Trata loading
- [ ] Trata error
- [ ] Trata lista vazia
- [ ] Usa TypeScript corretamente
- [ ] Não chama API no render
- [ ] Usa service layer
- [ ] Usa hooks quando necessário
- [ ] Código está organizado

---

# 📚 Fontes oficiais

- React Native Networking: https://reactnative.dev/docs/network
- Axios Docs: https://axios-http.com/
- Axios Interceptors: https://axios-http.com/docs/interceptors
- Axios Cancellation: https://axios-http.com/docs/cancellation
- TanStack Query React Native: https://tanstack.com/query/latest/docs/framework/react/react-native
- TanStack Query Queries: https://tanstack.com/query/v5/docs/framework/react/guides/queries

---

# ✅ Conclusão

Consumir API em React Native não é apenas buscar dados.

Um app profissional precisa considerar:

- estado de carregamento
- erro
- tipagem
- organização
- service layer
- headers
- autenticação
- cancelamento
- cache
- experiência do usuário

Dominar esse tema é essencial para construir aplicativos reais.

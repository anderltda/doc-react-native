# 🚀 Aula de React Native — Fundamentos Essenciais

Este material reúne uma aula prática e completa de **React Native com TypeScript**, focada em fundamentos que todo desenvolvedor precisa dominar para construir aplicações profissionais.

Todos os exemplos foram pensados para serem executados em um projeto **React Native com Expo + TypeScript**, utilizando **um único arquivo `App.tsx` por exemplo**, facilitando o aprendizado e os testes.

---

# 📚 Conteúdo da Aula

## 1. 🧠 Fundamentos Essenciais

### 📌 JavaScript / TypeScript
- Tipagem avançada (**Generics, Utility Types, Mapped Types**)
- **Closures**, **hoisting** e **event loop**
- **Promises**, **async/await** e **tratamento de erros**
- **Imutabilidade** e manipulação de objetos
- **Modularização** com ESModules

### 📌 React (core)
- Hooks: **useState, useEffect, useMemo, useCallback**
- **Custom Hooks**
- **Context API**
- **Re-render e performance**
- **Controlled vs uncontrolled components**

---

# 1) Tipagem avançada — Generics, Utility Types, Mapped Types

## ✅ Objetivo
Entender como usar recursos avançados do TypeScript para criar código mais seguro, reutilizável e escalável.

## 💡 Conceitos abordados
- `Pick`
- `Omit`
- `Partial`
- `Required`
- `Mapped Types`
- `Generics`

## 💻 Exemplo (`App.tsx`)

```tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// Tipo base
type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

// Utility Types
type UserPreview = Pick<User, 'id' | 'name'>;
type UserWithoutEmail = Omit<User, 'email'>;
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;

// Mapped Types
type BooleanFields<T> = {
  [K in keyof T]: boolean; // “Para cada campo de T, transforme o valor em boolean”
};

type UserFieldValidation = BooleanFields<User>;

// Generics
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

function createResponse<T>(data: T, message: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

function CardItem<T>({ item, title }: { item: T; title: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.code}>{JSON.stringify(item, null, 2)}</Text>
    </View>
  );
}

export default function App() {
  const user: User = {
    id: 1,
    name: 'Anderson',
    email: 'anderson@email.com',
    active: true,
  };

  const preview: UserPreview = {
    id: 1,
    name: 'Anderson',
  };

  const withoutEmail: UserWithoutEmail = {
    id: 1,
    name: 'Anderson',
    active: true,
  };

  const partialUser: PartialUser = {
    name: 'Novo Nome',
  };

  const requiredUser: RequiredUser = {
    id: 2,
    name: 'Maria',
    email: 'maria@email.com',
    active: false,
  };

  const validation: UserFieldValidation = {
    id: true,
    name: true,
    email: false,
    active: true,
  };

  const response = createResponse<User>(user, 'Usuário carregado com sucesso');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Tipagem avançada com TypeScript</Text>

        <CardItem title="User" item={user} />
        <CardItem title="Pick<User, 'id' | 'name'>" item={preview} />
        <CardItem title="Omit<User, 'email'>" item={withoutEmail} />
        <CardItem title="Partial<User>" item={partialUser} />
        <CardItem title="Required<User>" item={requiredUser} />
        <CardItem title="Mapped Types" item={validation} />
        <CardItem title="Generic ApiResponse<User>" item={response} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { padding: 20, gap: 16 },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  code: { fontSize: 13, color: '#333' },
});
```

## 🔍 O que observar
- `Pick` seleciona campos específicos
- `Omit` remove campos
- `Partial` torna tudo opcional
- `Required` torna tudo obrigatório
- `Mapped Types` transformam tipos dinamicamente
- `Generics` aumentam a reutilização do código

---

# 2) Closures, hoisting e event loop

## ✅ Objetivo
Entender fundamentos do JavaScript que afetam diretamente o comportamento do React Native.

## 💡 Conceitos abordados
- Closure
- Hoisting
- Microtasks e macrotasks
- Ordem de execução assíncrona

## 💻 Exemplo (`App.tsx`)

```tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const messages: string[] = [];

    // Closure
    function createCounter() {
      let count = 0;

      return function () {
        count++;
        return count;
      };
    }

    const counter = createCounter();
    messages.push(`Closure 1: ${counter()}`);
    messages.push(`Closure 2: ${counter()}`);
    messages.push(`Closure 3: ${counter()}`);

    // Hoisting 
    messages.push(`Hoisting function declaration: ${sayHello()}`);

    // Regra mental simples - “JS lê tudo primeiro, executa depois”
    function sayHello() {
      return 'Olá, função disponível antes da declaração';
    }

    // Event loop
    messages.push('1 - Início');

    setTimeout(() => {
      setLogs((prev) => [...prev, '4 - setTimeout executado']);
    }, 0);

    Promise.resolve().then(() => {
      setLogs((prev) => [...prev, '3 - Promise.then executado']);
    });

    messages.push('2 - Fim');

    setLogs(messages);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Closures, Hoisting e Event Loop</Text>

        {logs.map((log, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>{log}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { padding: 20, gap: 12 },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  text: { fontSize: 15, color: '#222' },
});
```

## 🔍 O que observar
A ordem tende a ser:
1. `1 - Início`
2. `2 - Fim`
3. `3 - Promise.then executado`
4. `4 - setTimeout executado`

Isso acontece porque **Promises** entram na fila de **microtasks**, que é processada antes das **macrotasks**.

---

# 3) Promises, async/await e tratamento de erro

## ✅ Objetivo
Aprender a lidar com fluxos assíncronos e tratar falhas corretamente.

## 💻 Exemplo (`App.tsx`)

```tsx
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type User = {
  id: number;
  name: string;
  email: string;
};

function fakeFetchUsers(shouldFail = false): Promise<User[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Erro ao buscar usuários'));
        return;
      }

      resolve([
        { id: 1, name: 'Anderson', email: 'anderson@email.com' },
        { id: 2, name: 'Maria', email: 'maria@email.com' },
      ]);
    }, 1500);
  });
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const loadUsers = async (shouldFail = false) => {
    try {
      setLoading(true);
      setError('');
      const response = await fakeFetchUsers(shouldFail);
      setUsers(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Promises + async/await + error handling</Text>

        <View style={styles.buttonContainer}>
          <Button title="Carregar com sucesso" onPress={() => loadUsers(false)} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Simular erro" onPress={() => loadUsers(true)} />
        </View>

        {loading && <ActivityIndicator size="large" />}

        {!!error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <Text style={styles.title}>{user.name}</Text>
            <Text>{user.email}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { padding: 20, gap: 16 },
  header: { fontSize: 24, fontWeight: '700' },
  buttonContainer: { marginBottom: 8 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '700' },
  errorBox: {
    backgroundColor: '#ffe5e5',
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    color: '#b00020',
    fontWeight: '600',
  },
});
```

## 🔍 O que observar
- `try/catch/finally` é essencial
- toda tela real normalmente possui:
  - `loading`
  - `error`
  - `data`

---

# 4) Imutabilidade e manipulação de objetos

## ✅ Objetivo
Aprender como atualizar estado da forma correta no React.

## 💻 Exemplo (`App.tsx`)

```tsx
import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type Profile = {
  name: string;
  age: number;
  address: {
    city: string;
    country: string;
  };
};

export default function App() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Anderson',
    age: 30,
    address: {
      city: 'São Paulo',
      country: 'Brasil',
    },
  });

  const updateName = () => {
    setProfile((prev) => ({
      ...prev,
      name: 'Anderson Silva',
    }));
  };

  const updateCity = () => {
    setProfile((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        city: 'Campinas',
      },
    }));
  };

  const incrementAge = () => {
    setProfile((prev) => ({
      ...prev,
      age: prev.age + 1,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Imutabilidade</Text>

        <View style={styles.card}>
          <Text style={styles.text}>Nome: {profile.name}</Text>
          <Text style={styles.text}>Idade: {profile.age}</Text>
          <Text style={styles.text}>Cidade: {profile.address.city}</Text>
          <Text style={styles.text}>País: {profile.address.country}</Text>
        </View>

        <View style={styles.button}>
          <Button title="Atualizar nome" onPress={updateName} />
        </View>

        <View style={styles.button}>
          <Button title="Atualizar cidade" onPress={updateCity} />
        </View>

        <View style={styles.button}>
          <Button title="Incrementar idade" onPress={incrementAge} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: { fontSize: 16, marginBottom: 8 },
  button: { marginBottom: 12 },
});
```

## 🔍 O que observar
- nunca altere o estado diretamente
- use `...prev` para criar novos objetos
- em objetos aninhados, copie também os níveis internos necessários

---

# 5) Modularização com ESModules

## ✅ Objetivo
Visualizar como separar responsabilidades no projeto.

## 💻 Exemplo (`App.tsx`)

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

/**
 * Em projeto real:
 * /types/user.ts
 */
type User = {
  id: number;
  name: string;
};

/**
 * Em projeto real:
 * /utils/format.ts
 */
function formatUserName(name: string): string {
  return name.toUpperCase();
}

/**
 * Em projeto real:
 * /services/userService.ts
 */
function getUsers(): User[] {
  return [
    { id: 1, name: 'Anderson' },
    { id: 2, name: 'Maria' },
  ];
}

/**
 * Em projeto real:
 * /components/UserCard.tsx
 */
function UserCard({ user }: { user: User }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {user.id} - {formatUserName(user.name)}
      </Text>
    </View>
  );
}

export default function App() {
  const users = getUsers();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Modularização com ESModules</Text>

      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6f8' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  text: { fontSize: 16 },
});
```

## 🔍 O que observar
Mesmo com tudo em um arquivo, já é possível entender como separar:
- tipos
- utils
- services
- components

---

# 6) Hooks — useState, useEffect, useMemo, useCallback

## ✅ Objetivo
Dominar os hooks mais usados no React.

## 💻 Exemplo (`App.tsx`)

```tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('Componente montado ou count alterado:', count);
  }, [count]);

  const doubled = useMemo(() => {
    console.log('Calculando valor dobrado...');
    return count * 2;
  }, [count]);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Hooks principais</Text>

        <View style={styles.card}>
          <Text style={styles.text}>Count: {count}</Text>
          <Text style={styles.text}>Dobrado com useMemo: {doubled}</Text>
          <View style={styles.button}>
            <Button title="Incrementar" onPress={increment} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Digite seu nome:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
          />
          <Text style={styles.text}>Nome digitado: {name}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  text: { fontSize: 16, marginBottom: 8 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: { marginTop: 8 },
});
```

## 🔍 O que observar
- `useState`: controla estado local
- `useEffect`: executa efeitos colaterais
- `useMemo`: evita recálculos desnecessários
- `useCallback`: evita recriação desnecessária de funções

---

# 7) Custom Hooks — arquitetura reutilizável

## ✅ Objetivo
Extrair lógica reutilizável e deixar componentes mais limpos.

## 💻 Exemplo (`App.tsx`)

```tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type User = {
  id: number;
  name: string;
};

function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers([
        { id: 1, name: 'Anderson' },
        { id: 2, name: 'Maria' },
        { id: 3, name: 'João' },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { users, loading };
}

export default function App() {
  const { users, loading } = useUsers();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Custom Hook</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          users.map((user) => (
            <View key={user.id} style={styles.card}>
              <Text style={styles.text}>{user.name}</Text>
            </View>
          ))
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  text: { fontSize: 16 },
});
```

## 🔍 O que observar
O componente principal fica focado na UI, enquanto a lógica vai para o hook.

---

# 8) Context API

## ✅ Objetivo
Compartilhar estado global simples sem passar props manualmente por muitos níveis.

## 💻 Exemplo (`App.tsx`)

```tsx
import React, { createContext, useContext, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }

  return context;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function HomeScreen() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? '#222' : '#fff' },
      ]}
    >
      <Text style={[styles.text, { color: isDark ? '#fff' : '#000' }]}>
        Tema atual: {theme}
      </Text>
      <Button title="Alternar tema" onPress={toggleTheme} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Context API</Text>
          <HomeScreen />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    padding: 20,
    borderRadius: 12,
  },
  text: { fontSize: 18, marginBottom: 12 },
});
```

## 🔍 O que observar
- `Provider` compartilha valores
- `useContext` consome esses valores
- Context é excelente para tema, autenticação simples e preferências globais

---

# 9) Re-render e performance — memo, reconciliation

## ✅ Objetivo
Entender como evitar renderizações desnecessárias.

## 💻 Exemplo (`App.tsx`)

```tsx
import React, { memo, useCallback, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

type ChildProps = {
  count: number;
  onIncrement: () => void;
};

const Child = memo(({ count, onIncrement }: ChildProps) => {
  console.log('Renderizou Child');

  return (
    <View style={styles.card}>
      <Text style={styles.text}>Count no filho: {count}</Text>
      <Button title="Incrementar" onPress={onIncrement} />
    </View>
  );
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const onIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Re-render e performance</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Digite algo"
            value={text}
            onChangeText={setText}
          />
          <Text style={styles.text}>Texto: {text}</Text>
        </View>

        <Child count={count} onIncrement={onIncrement} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  text: { fontSize: 16, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
});
```

## 🔍 O que observar
- `memo` memoriza o componente
- `useCallback` estabiliza a referência da função
- isso ajuda bastante em listas e componentes pesados

---

# 10) Controlled vs uncontrolled components

## ✅ Objetivo
Entender duas formas de lidar com inputs no React Native.

## 💻 Exemplo (`App.tsx`)

```tsx
import React, { useRef, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [controlledValue, setControlledValue] = useState('');
  const uncontrolledValueRef = useRef('');

  const showUncontrolledValue = () => {
    alert(`Valor uncontrolled: ${uncontrolledValueRef.current}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Controlled vs Uncontrolled</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Controlled Input</Text>
          <TextInput
            style={styles.input}
            value={controlledValue}
            onChangeText={setControlledValue}
            placeholder="Digite algo"
          />
          <Text style={styles.text}>Estado: {controlledValue}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Uncontrolled Input</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite algo"
            onChangeText={(text) => {
              uncontrolledValueRef.current = text;
            }}
          />
          <Button title="Mostrar valor uncontrolled" onPress={showUncontrolledValue} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  label: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  text: { fontSize: 16 },
});
```

## 🔍 O que observar
- **Controlled**: valor vem do estado
- **Uncontrolled**: valor fica fora do fluxo principal de renderização
- no React Native, o mais comum é usar **controlled components**

---

# 🧾 Resumo Final

## ✅ Você praticou em JavaScript / TypeScript:
- Tipagem avançada
- Generics
- Utility Types
- Mapped Types
- Closures
- Hoisting
- Event Loop
- Promises
- async/await
- tratamento de erros
- imutabilidade
- modularização

## ✅ Você praticou em React:
- `useState`
- `useEffect`
- `useMemo`
- `useCallback`
- Custom Hooks
- Context API
- performance com `memo`
- controlled vs uncontrolled components

---

# 🧪 Desafio prático

Crie uma tela com:

- input para nome
- botão para buscar usuários
- loading
- erro
- lista de usuários
- tema light/dark com Context API
- `useMemo` para filtrar usuários
- `useCallback` para funções de ação
- tipagem com `Pick`, `Omit` ou `Partial`

---

# 📁 Estrutura futura sugerida para evolução

Quando quiser sair do modelo de “um único `App.tsx` por exemplo”, a estrutura pode evoluir para algo assim:

```bash
src/
  components/
  screens/
  hooks/
  context/
  services/
  utils/
  types/
```

Exemplo:
- `components/`: componentes reutilizáveis
- `screens/`: telas
- `hooks/`: hooks customizados
- `context/`: estados globais
- `services/`: API, storage, auth
- `utils/`: helpers
- `types/`: tipos e interfaces

---

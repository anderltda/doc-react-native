# 🚀 React Native + Expo + TypeScript Roadmap
Guia do **básico ao avançado**, com foco em prática, fundamentos sólidos e construção de um app real.


---

# Criação do Projeto (Template TypeScript)

## Criar projeto

```bash
npx create-expo-app app-react-native --template blank-typescript
cd app-react-native
npm install
rm -rf .expo .expo-shared
npx expo start --clear --lan
```

apagar as pastas: app, components, constants, fonts
criar pasta: src/app/index.tsx

alterar tsconfig.json e adicionar src dentro dos paths
"paths": {
      "@/*": [
        "./src/*"
      ]
    }
alterar esm app.json 
web: static -> server
instalar o Axios ( ```bash npm i axios ```)
criar função para chamada das rotas e estilização do APP

## Executar projeto

```bash
npx expo start --clear --lan
```

## Executar no navegador

Em muitos casos o Expo já resolve isso sozinho. Se o ambiente precisar, instale também:

```bash
npx expo install react-native-web react-dom
```

Depois execute:

```bash
npx expo start --web
```

---

# Base TypeScript

## Objetivo

Entender fundamentos que serão usados no React Native.

## 📚 Conteúdos

* function
* arrow function
* interface
* type
* enum

## 💻 Exemplo (App)

```tsx
import { View, Text } from 'react-native';

function saudacao(nome: string): string {
  return `Olá, ${nome}`;
}

const soma = (a: number, b: number): number => a + b;

type Status = 'loading' | 'success' | 'error';

enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface User {
  name: string;
  role: Role;
}

const user: User = {
  name: 'Anderson',
  role: Role.ADMIN,
};

export default function App() {
  const mensagem = saudacao('Anderson');
  const total = soma(10, 5);
  const status: Status = 'success';
  const statusEnum = StatusEnum.ACTIVE;

  return (
    <View style={{ padding: 20 }}>
      <Text>{mensagem}</Text>
      <Text>Total: {total}</Text>
      <Text>Status: {status}</Text>
      <Text>Status Enum: {statusEnum}</Text>
      <Text>User Role: {user.role}</Text>
    </View>
  );
}
```

### 🔍 Explicação

* `function saudacao(...)` cria uma função tradicional com parâmetro e retorno tipados
* `const soma = (...) => ...` mostra uma arrow function, muito usada no React
* `interface User` define o formato de um objeto
* `type Status` restringe os valores permitidos
* `enum` organiza constantes nomeadas

---

# Classes e Tipagem Avançada

## 📚 Conteúdos

* class
* extends
* implements
* readonly
* optional (`?`)

## 💻 Exemplo (App)

```tsx
import { View, Text } from 'react-native';

interface Animal {
  name: string;
  makeSound(): string;
}

class Dog implements Animal {
  constructor(public name: string) {}

  makeSound(): string {
    return 'Au au';
  }
}

class Vehicle {
  constructor(public brand: string) {}
}

class Car extends Vehicle {
  constructor(brand: string, public model: string) {
    super(brand);
  }
}

interface User {
  readonly id: number;
  name?: string;
}

export default function App() {
  const dog = new Dog('Rex');
  const car = new Car('Toyota', 'Corolla');

  const user: User = {
    id: 1,
    name: 'Anderson',
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{dog.name} faz {dog.makeSound()}</Text>
      <Text>{car.brand} - {car.model}</Text>
      <Text>ID: {user.id}</Text>
      <Text>Nome: {user.name ?? 'Não informado'}</Text>
    </View>
  );
}
```

### 🔍 Explicação

* `class` cria uma estrutura orientada a objetos
* `implements Animal` obriga a classe a seguir o contrato da interface
* `extends Vehicle` permite herança
* `readonly id` não pode ser alterado depois da criação
* `name?` significa que o campo é opcional

## Exemplo isolado — `readonly`

```tsx
interface User {
  readonly id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: 'Anderson',
};

// ❌ erro
// user.id = 2;
```

## Exemplo isolado — `optional`

```tsx
interface User {
  id: number;
  name?: string;
}

const user: User = {
  id: 1,
};
```

---

# Lógica de Programação com TypeScript

## Objetivo

Aprender estruturas básicas que serão usadas em praticamente qualquer tela ou regra de negócio.

## 📚 Conteúdos

* if / else
* ternário
* switch
* for
* while
* map
* filter
* find
* operadores lógicos
* optional chaining

## 💻 Exemplo (App) — if / else

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const age: number = 20;
  let message: string = '';

  if (age >= 18) {
    message = 'Maior de idade';
  } else {
    message = 'Menor de idade';
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>{message}</Text>
    </View>
  );
}
```

### 🔍 Explicação

* `if` avalia uma condição
* `else` executa quando a condição é falsa
* muito usado em validação e fluxo de tela

## 💻 Exemplo (App) — operador ternário

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const isLogged: boolean = true;

  return (
    <View style={{ padding: 20 }}>
      <Text>{isLogged ? 'Usuário logado' : 'Usuário não logado'}</Text>
    </View>
  );
}
```

### 🔍 Explicação

* o ternário é uma forma curta de `if/else`
* é muito usado dentro do JSX

## 💻 Exemplo (App) — switch

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const status: string = 'success';
  let message: string = '';

  switch (status) {
    case 'loading':
      message = 'Carregando';
      break;
    case 'success':
      message = 'Sucesso';
      break;
    case 'error':
      message = 'Erro';
      break;
    default:
      message = 'Status desconhecido';
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>{message}</Text>
    </View>
  );
}
```

### 🔍 Explicação

* `switch` é útil quando há várias possibilidades fixas
* comum para status, perfil e tipo de tela

## 💻 Exemplo (App) — for

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const items: string[] = [];

  for (let i = 1; i <= 5; i++) {
    items.push(`Item ${i}`);
  }

  return (
    <View style={{ padding: 20 }}>
      {items.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </View>
  );
}
```

### 🔍 Explicação

* `for` repete um bloco várias vezes
* normalmente é usado para montar dados antes da renderização

## 💻 Exemplo (App) — while

```tsx
import { View, Text } from 'react-native';

export default function App() {
  let count = 1;
  const values: string[] = [];

  while (count <= 3) {
    values.push(`Valor ${count}`);
    count++;
  }

  return (
    <View style={{ padding: 20 }}>
      {values.map((value, index) => (
        <Text key={index}>{value}</Text>
      ))}
    </View>
  );
}
```

### 🔍 Explicação

* `while` repete enquanto a condição for verdadeira
* use com cuidado para não gerar loop infinito

## 💻 Exemplo (App) — map

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const names: string[] = ['Anderson', 'Maria', 'João'];

  return (
    <View style={{ padding: 20 }}>
      {names.map((name, index) => (
        <Text key={index}>{name}</Text>
      ))}
    </View>
  );
}
```

### 🔍 Explicação

* `map` percorre arrays e transforma itens
* é uma das formas mais usadas para renderizar listas

## 💻 Exemplo (App) — filter

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const numbers: number[] = [10, 15, 20, 25, 30];
  const filtered = numbers.filter((n) => n >= 20);

  return (
    <View style={{ padding: 20 }}>
      {filtered.map((n, index) => (
        <Text key={index}>{n}</Text>
      ))}
    </View>
  );
}
```

### 🔍 Explicação

* `filter` retorna apenas os elementos que atendem à condição
* muito usado em busca e filtros

## 💻 Exemplo (App) — find

```tsx
import { View, Text } from 'react-native';

interface User {
  id: number;
  name: string;
}

export default function App() {
  const users: User[] = [
    { id: 1, name: 'Anderson' },
    { id: 2, name: 'Maria' },
  ];

  const user = users.find((item) => item.id === 2);

  return (
    <View style={{ padding: 20 }}>
      <Text>{user ? user.name : 'Usuário não encontrado'}</Text>
    </View>
  );
}
```

### 🔍 Explicação

* `find` retorna o primeiro item que corresponde à condição
* ideal para localizar um item específico

## 💻 Exemplo (App) — operadores lógicos

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const isAdmin = true;
  const isActive = true;

  return (
    <View style={{ padding: 20 }}>
      <Text>{isAdmin && isActive ? 'Acesso liberado' : 'Acesso negado'}</Text>
    </View>
  );
}
```

### 🔍 Explicação

* `&&` significa E
* `||` significa OU
* `!` inverte um booleano

## 💻 Exemplo (App) — optional chaining

```tsx
import { View, Text } from 'react-native';

interface Address {
  city: string;
}

interface User {
  name: string;
  address?: Address;
}

export default function App() {
  const user: User = {
    name: 'Anderson',
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome: {user.name}</Text>
      <Text>Cidade: {user.address?.city ?? 'Não informada'}</Text>
    </View>
  );
}
```

### 🔍 Explicação

* `?.` evita erro ao acessar algo que pode ser `undefined`
* `??` define um valor padrão

---

# Condicionais em React Native (Component)

## Objetivo

Aplicar regras de renderização diretamente na interface.

## 📚 Conteúdos

* if dentro da função
* operador ternário
* renderização condicional com `&&`
* condição com função
* loops com `map`
* lista com objetos
* condição + loop + estado

## 💻 Exemplo (App) — if dentro da função

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const isLogged = true;

  if (!isLogged) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Usuário não logado</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Bem-vindo!</Text>
    </View>
  );
}
```

### 🔍 Explicação

* você pode usar `if` antes do `return`
* é útil quando a tela inteira muda de acordo com a condição

## 💻 Exemplo (App) — operador ternário

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const isLogged = true;

  return (
    <View style={{ padding: 20 }}>
      <Text>{isLogged ? 'Bem-vindo!' : 'Faça login'}</Text>
    </View>
  );
}
```

### 🔍 Explicação

* ideal para alternar rapidamente entre dois conteúdos
* muito usado em textos, botões e blocos pequenos

## 💻 Exemplo (App) — renderização condicional com `&&`

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const isAdmin = true;

  return (
    <View style={{ padding: 20 }}>
      {isAdmin && <Text>Área de admin</Text>}
    </View>
  );
}
```

### 🔍 Explicação

* renderiza algo apenas se a condição for verdadeira
* é ótimo quando não existe bloco alternativo

## 💻 Exemplo (App) — condição com função

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const role = 'ADMIN';

  function renderContent() {
    if (role === 'ADMIN') return <Text>Admin</Text>;
    if (role === 'USER') return <Text>Usuário</Text>;
    return <Text>Visitante</Text>;
  }

  return <View style={{ padding: 20 }}>{renderContent()}</View>;
}
```

### 🔍 Explicação

* ajuda a organizar lógica de renderização mais complexa
* evita JSX muito poluído

## 💻 Exemplo (App) — loops com `map`

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const users = ['Anderson', 'Maria', 'João'];

  return (
    <View style={{ padding: 20 }}>
      {users.map((user, index) => (
        <Text key={index}>{user}</Text>
      ))}
    </View>
  );
}
```

### 🔍 Explicação

* `map` percorre os itens e renderiza um componente para cada um
* cada item precisa de `key`

## 💻 Exemplo (App) — lista com objetos

```tsx
import { View, Text } from 'react-native';

interface User {
  id: number;
  name: string;
}

export default function App() {
  const users: User[] = [
    { id: 1, name: 'Anderson' },
    { id: 2, name: 'Maria' },
  ];

  return (
    <View style={{ padding: 20 }}>
      {users.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}
```

### 🔍 Explicação

* usar `id` como `key` é melhor que usar índice
* padrão muito comum ao renderizar dados vindos da API

## 💻 Exemplo (App) — condição + loop + estado

```tsx
import { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  const [show, setShow] = useState(true);

  const users = ['Anderson', 'Maria', 'João'];

  return (
    <View style={{ padding: 20 }}>
      <Button title="Toggle" onPress={() => setShow(!show)} />

      {show ? (
        users.map((user, index) => <Text key={index}>{user}</Text>)
      ) : (
        <Text>Lista escondida</Text>
      )}
    </View>
  );
}
```

### 🔍 Explicação

* aqui você junta estado, condição e renderização de lista
* é um padrão muito comum em interfaces reais

---

# Fundamentos React Native

## Objetivo

Entender os componentes básicos da interface e como lidar com entrada de dados.

## 📚 Conteúdos

* JSX
* View, Text
* TextInput, Button
* useState

## 💻 Exemplo (App)

```tsx
import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [name, setName] = useState<string>('');

  return (
    <View style={{ padding: 20 }}>
      <Text>Digite seu nome:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        placeholder="Seu nome"
      />
      <Button title="Mostrar" onPress={() => alert(name)} />
    </View>
  );
}
```

### 🔍 Explicação

* `View` é o container base da tela
* `Text` renderiza texto
* `TextInput` recebe entrada do usuário
* `Button` dispara ações
* `useState` controla o valor digitado

---

# Layout + Estilo

## Instalação

```bash
npx expo install react-native-safe-area-context
```

## Objetivo

Aprender a posicionar e estilizar componentes na tela.

## 📚 Conteúdos

* Flexbox
* StyleSheet

## 💻 Exemplo (App)

```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>1</Text>
      </View>
      <View style={styles.box}>
        <Text>2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### 🔍 Explicação

* `flex: 1` faz o container ocupar a tela
* `flexDirection: 'row'` coloca os itens lado a lado
* `justifyContent` alinha no eixo principal
* `alignItems` alinha no eixo cruzado
* `StyleSheet.create` organiza e padroniza estilos

---

# Estado + Eventos

## Objetivo

Entender como alterar dados e reagir a interações do usuário.

## 📚 Conteúdos

* useState
* eventos (`onPress`)

## 💻 Exemplo (App)

```tsx
import { View, Text, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <View style={{ padding: 20 }}>
      <Text>Contador: {count}</Text>
      <Button title="+" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

### 🔍 Explicação

* `count` guarda o valor atual
* `setCount` atualiza o estado
* ao atualizar o estado, a tela renderiza novamente
* `onPress` executa a ação ao clicar no botão

---

# Navegação

## Instalação

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

## Objetivo

Trocar entre telas do app de forma organizada e tipada.

## 💻 Exemplo (App)

```tsx
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({ navigation }: HomeProps) {
  return (
    <View style={{ padding: 20 }}>
      <Text>Home</Text>
      <Button title="Ir" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

function Details() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Detalhes</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 🔍 Explicação

* `NavigationContainer` é o container principal da navegação
* `createNativeStackNavigator` cria navegação em pilha
* `RootStackParamList` tipa as rotas
* `NativeStackScreenProps` tipa a prop `navigation`

---

# API + Listas

## Instalação

```bash
npm install axios
```

## Objetivo

Consumir dados externos e renderizar listas.

## 💻 Exemplo (App)

```tsx
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

interface User {
  id: number;
  name: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  return (
    <View style={{ paddingTop: 40 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
```

### 🔍 Explicação

* `useEffect` executa o código quando a tela carrega
* `fetch` busca os dados da API
* `User[]` tipa a lista recebida
* `FlatList` renderiza listas grandes com melhor performance

---

# Persistência

## Instalação

```bash
npx expo install @react-native-async-storage/async-storage
```

## Objetivo

Salvar e recuperar dados localmente no dispositivo.

## 💻 Exemplo (App)

```tsx
import { View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function App() {
  const [token, setToken] = useState<string>('');

  const save = async () => {
    await AsyncStorage.setItem('token', '123');
    setToken('123');
  };

  const load = async () => {
    const value = await AsyncStorage.getItem('token');
    setToken(value ?? '');
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Token: {token || 'Nenhum token salvo'}</Text>
      <Button title="Salvar" onPress={save} />
    </View>
  );
}
```

### 🔍 Explicação

* `setItem` salva o valor localmente
* `getItem` recupera o valor salvo
* `useEffect` carrega o valor ao abrir a tela
* `?? ''` evita valores `null`

---

# Context API

## Objetivo

Compartilhar estado global entre várias partes do app.

## 💻 Exemplo (App)

```tsx
import React, { createContext, useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';

interface AuthContextData {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextData | null>(null);

function Home() {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <Text>Contexto não encontrado</Text>;
  }

  return (
    <View>
      <Text>{auth.user ?? 'Não logado'}</Text>
      <Button title="Login" onPress={() => auth.setUser('Anderson')} />
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <View style={{ padding: 20 }}>
        <Home />
      </View>
    </AuthContext.Provider>
  );
}
```

### 🔍 Explicação

* `createContext` cria um contexto global
* `Provider` disponibiliza o estado para componentes filhos
* `useContext` consome esse estado
* a interface `AuthContextData` evita uso de `any`

---

# Recursos Nativos

## Instalação

```bash
npx expo install expo-camera
```

## Objetivo

Acessar recursos do dispositivo, como câmera e permissões.

## 💻 Exemplo (App)

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { View, Button, Text } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Carregando permissões...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ padding: 20 }}>
        <Button title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  return <CameraView style={{ flex: 1 }} />;
}
```

### 🔍 Explicação

* `useCameraPermissions()` consulta e solicita permissão
* primeiro tratamos o estado inicial
* depois validamos se o acesso foi concedido
* `CameraView` exibe a câmera

---

## Estrutura sugerida

```text
src/
 ├── components/
 ├── screens/
 ├── services/
 ├── context/
 ├── hooks/
 └── utils/
```

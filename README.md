# 🚀 React Native + Expo + TypeScript Roadmap

Guia do **básico ao avançado**, construção de um app real.

---

# Criação do Projeto (Template TypeScript)

Rodar:
```bash
npx create-expo-app app-react-native --template blank-typescript
cd app-react-native
npm install
```

Rodar:
```bash
npx expo install react-native-web react-dom
npx expo start
```

---

# Base TypeScript

## Objetivo

Entender fundamentos que serão usados no React Native.

## 📚 Conteúdos

* function
* arrow function
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
  ACTIVE,
  INACTIVE,
  PENDING,
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

---

# Classes e Tipagem Avançada

## 📚 Conteúdos

* class
* extends
* implements
* readonly
* optional ( ? )

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

export default function App() {
  const dog = new Dog('Rex');
  const car = new Car('Toyota', 'Corolla');

  return (
    <View style={{ padding: 20 }}>
      <Text>{dog.name} faz {dog.makeSound()}</Text>
      <Text>{car.brand} - {car.model}</Text>
    </View>
  );
}
```

## readonly (somente leitura)

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
user.id = 2;
```

## readonly usando em classe (somente leitura)

```tsx
class User {
  readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}

const u = new User(1);

// ❌ erro
u.id = 2;
```

## optional (?)

```tsx
interface User {
  id: number;
  name?: string;
}

const user: User = {
  id: 1,
};

// ok — name é opcional
```

---

# Lógica de Programação com TypeScript


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
* muito usado para renderização condicional e validação

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

* ternário é uma forma curta de `if/else`
* muito usado dentro do JSX

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

* `switch` é útil quando há várias opções de decisão
* comum para status, tipo de usuário, perfil, ambiente

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
* em React Native, normalmente você usa `for` para preparar dados e `map` para renderizar

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

* `map` percorre arrays
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
* muito usado em busca, filtros de tabela e listas

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

* `find` retorna o primeiro item encontrado
* ideal para buscar um registro específico

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
* `!` inverte o valor booleano

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
* `??` define valor padrão

---

# Condicionais em React Native (Component)

## 📚 Conteúdos

* if dentro da função
* Operador ternário
* Renderização condicional com &&
* Condição com função
* Loops map
* Lista com objetos
* (condição + loop + estado)

## if dentro da função

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const isLogged = true;

  if (!isLogged) {
    return (
      <View>
        <Text>Usuário não logado</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Bem-vindo!</Text>
    </View>
  );
}
```

## Operador ternário

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const isLogged = true;

  return (
    <View>
      <Text>
        {isLogged ? 'Bem-vindo!' : 'Faça login'}
      </Text>
    </View>
  );
}
```

## Renderização condicional com &&

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const isAdmin = true;

  return (
    <View>
      {isAdmin && <Text>Área de admin</Text>}
    </View>
  );
}
```

## Condição com função

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const role = 'ADMIN';

  function renderContent() {
    if (role === 'ADMIN') return <Text>Admin</Text>;
    if (role === 'USER') return <Text>Usuário</Text>;
    return <Text>Visitante</Text>;
  }

  return <View>{renderContent()}</View>;
}
```

## Loops map
```tsx
import { View, Text } from 'react-native';

export default function App() {
  const users = ['Anderson', 'Maria', 'João'];

  return (
    <View>
      {users.map((user, index) => (
        <Text key={index}>{user}</Text>
      ))}
    </View>
  );
}
```


## Lista com objetos

```tsx
import { View, Text } from 'react-native';

export default function App() {
  const users = [
    { id: 1, name: 'Anderson' },
    { id: 2, name: 'Maria' },
  ];

  return (
    <View>
      {users.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}
```


## (condição + loop + estado)

```tsx
import { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  const [show, setShow] = useState(true);

  const users = ['Anderson', 'Maria', 'João'];

  return (
    <View>
      <Button
        title="Toggle"
        onPress={() => setShow(!show)}
      />

      {show ? (
        users.map((user, index) => (
          <Text key={index}>{user}</Text>
        ))
      ) : (
        <Text>Lista escondida</Text>
      )}
    </View>
  );
}
```

---

# Fundamentos React Native

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
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1 }} />
      <Button title="Mostrar" onPress={() => alert(name)} />
    </View>
  );
}
```

---

# Layout + Estilo

## Instalação

```bash
npx expo install react-native-safe-area-context
```

## 📚 Conteúdos

* Flexbox
* StyleSheet

## 💻 Exemplo (App)

```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box}><Text>1</Text></View>
      <View style={styles.box}><Text>2</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  box: { width: 80, height: 80, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }
});
```

---

# Estado + Eventos

## 📚 Conteúdos

* useState
* Eventos (onPress)

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

---

# Navegação

## Instalação

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

## 💻 Exemplo (App)

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

const Stack = createNativeStackNavigator();

function Home({ navigation }: any) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Ir" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

function Details() {
  return <Text>Detalhes</Text>;
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

---

# API + Listas

## Instalação

```bash
npm install axios
```

## 💻 Exemplo (App)

```tsx
import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

interface User {
  id: number;
  name: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
```

---

# Persistência

## Instalação

```bash
npx expo install @react-native-async-storage/async-storage
```

## 💻 Exemplo (App)

```tsx
import { View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function App() {
  const [token, setToken] = useState<string>('');

  const save = async () => {
    await AsyncStorage.setItem('token', '123');
    setToken('123');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Token: {token}</Text>
      <Button title="Salvar" onPress={save} />
    </View>
  );
}
```

---

# Context API

## 💻 Exemplo (App)

```tsx
import { createContext, useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';

const AuthContext = createContext<any>(null);

function Home() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <View>
      <Text>{user}</Text>
      <Button title="Login" onPress={() => setUser('Anderson')} />
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Home />
    </AuthContext.Provider>
  );
}
```

---

# Recursos Nativos

## Instalação

```bash
npx expo install expo-camera
```

## 💻 Exemplo (App)

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { View, Button } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission?.granted) {
    return (
      <View>
        <Button title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  return <CameraView style={{ flex: 1 }} />;
}
```

---

🔥 Ready!

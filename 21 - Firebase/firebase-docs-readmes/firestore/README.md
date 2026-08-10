# Firebase Cloud Firestore com React Native + Expo

Este material demonstra como configurar e utilizar o **Cloud Firestore** em uma aplicação **React Native + Expo + TypeScript** usando o Firebase JavaScript SDK.

> As regras abertas mostradas neste material são apenas para desenvolvimento. Em produção, restrinja o acesso com Authentication e regras adequadas.

## 1. Instalação

Em um projeto Expo:

```bash
npx expo install firebase
```

## 2. Registrar o aplicativo no Firebase

No Firebase Console, abra o projeto e registre um aplicativo **Web (`</>`)** para obter o `firebaseConfig`.

Exemplo:

```ts
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};
```

## 3. Criar o Firestore

No Firebase Console:

```text
Build
  └── Firestore Database
        └── Create database
```

Escolha a região e conclua a criação.

O Firestore organiza os dados em:

```text
Collection
   └── Document
         └── Fields
```

Exemplo:

```text
users
├── abc123
│   ├── name: "Maria"
│   ├── email: "maria@email.com"
│   └── createdAt: ...
└── def456
    ├── name: "João"
    ├── email: "joao@email.com"
    └── createdAt: ...
```

## 4. Configuração do Firebase

Estrutura sugerida:

```text
src/
├── config/
│   └── firebase.ts
├── services/
│   └── userService.ts
├── screens/
│   └── HomeScreen.tsx
└── types/
    └── User.ts
```

Crie `src/config/firebase.ts`:

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;
```

## 5. Tipo User

Crie `src/types/User.ts`:

```ts
export interface User {
  id?: string;
  name: string;
  email: string;
}
```

O `id` é opcional porque `addDoc()` pode gerar o identificador automaticamente.

## 6. Service para o Firestore

Crie `src/services/userService.ts`:

```ts
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../config/firebase";
import { User } from "../types/User";

const COLLECTION_NAME = "users";

export async function createUser(user: User) {
  const docRef = await addDoc(
    collection(db, COLLECTION_NAME),
    {
      name: user.name,
      email: user.email,
      createdAt: serverTimestamp(),
    }
  );

  return docRef.id;
}

export async function getUsers(): Promise<User[]> {
  const snapshot = await getDocs(
    collection(db, COLLECTION_NAME)
  );

  return snapshot.docs.map((document) => ({
    id: document.id,
    name: document.data().name,
    email: document.data().email,
  }));
}
```

### `collection()`

```ts
collection(db, "users")
```

cria uma referência para a collection `users`.

### `addDoc()`

```ts
const docRef = await addDoc(
  collection(db, "users"),
  {
    name: "Maria",
    email: "maria@email.com",
    createdAt: serverTimestamp(),
  }
);
```

O Firestore gera automaticamente o ID:

```ts
console.log(docRef.id);
```

### `getDocs()`

```ts
const snapshot = await getDocs(
  collection(db, "users")
);
```

Retorna os documentos existentes na collection.

### `serverTimestamp()`

```ts
createdAt: serverTimestamp()
```

faz o timestamp ser definido pelo servidor do Firebase.

## 7. Exemplo de tela

`src/screens/HomeScreen.tsx`:

```tsx
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  createUser,
  getUsers,
} from "../services/userService";

import { User } from "../types/User";

export function HomeScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os usuários.");
    }
  }

  async function handleSave() {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Atenção", "Informe nome e e-mail.");
      return;
    }

    try {
      await createUser({ name, email });

      setName("");
      setEmail("");

      await loadUsers();

      Alert.alert("Sucesso", "Usuário cadastrado.");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar o usuário.");
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Firebase Firestore</Text>

        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Button
          title="Salvar no Firestore"
          onPress={handleSave}
        />

        <Button
          title="Atualizar usuários"
          onPress={loadUsers}
        />

        <FlatList
          data={users}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
```

`App.tsx`:

```tsx
import { HomeScreen } from "./src/screens/HomeScreen";

export default function App() {
  return <HomeScreen />;
}
```

## 8. Security Rules

Uma configuração que bloqueia tudo:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Nesse cenário, a aplicação poderá receber:

```text
FirebaseError: Missing or insufficient permissions.
```

### Regra temporária para testes

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Isso libera o banco inteiro e **não deve ser usado em produção**.

É melhor limitar o teste à collection necessária:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if true;
    }
  }
}
```

Depois de adicionar Authentication:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 9. Fluxo

```text
HomeScreen
    │
    ▼
userService
    │
    ▼
Firebase JS SDK
    │
    ▼
Cloud Firestore
    │
    ▼
users
```

## 10. Executar

```bash
npm install
npx expo start
```

## 11. Troubleshooting

### Missing or insufficient permissions

Confira:

1. se as Rules foram publicadas;
2. se o caminho usado no código é realmente `users`;
3. se `projectId` aponta para o mesmo projeto em que as regras foram publicadas;
4. se a regra exige `request.auth != null`, confirme que existe um usuário autenticado.

## Exercícios:

- Crie uma função `updateDoc()` para atualização;
- Crie uma função `deleteDoc()` para exclusão;
- Crie uma função `query()` e `where()` para consultas;
- Crie uma função de paginação;
- Crie listeners em tempo real com `onSnapshot()`;

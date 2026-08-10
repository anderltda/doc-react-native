# React Native + Expo + Firebase Firestore

Este projeto demonstra como integrar uma aplicação **React Native utilizando Expo e TypeScript** com o **Firebase Cloud Firestore**.

O objetivo é apresentar uma configuração simples do Firebase e realizar operações básicas de leitura e escrita no Firestore.

## Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Firebase JavaScript SDK
- Cloud Firestore

## Arquitetura

A comunicação da aplicação acontece da seguinte forma:

```text
React Native / Expo
        │
        ▼
Firebase JavaScript SDK
        │
        ▼
Cloud Firestore
        │
        ▼
Collection: users
```

O aplicativo não precisa de um backend próprio para este exemplo. O Firebase SDK realiza a comunicação diretamente com os serviços do Firebase.

---

# 1. Criando um projeto no Firebase

Acesse o Firebase Console:

https://console.firebase.google.com/

Crie um novo projeto ou utilize um projeto existente.

Depois de criar o projeto, será necessário registrar uma aplicação.

Como este exemplo utiliza o **Firebase JavaScript SDK**, selecione:

```text
Project Overview
      ↓
Add app
      ↓
Web </>
```

Mesmo sendo uma aplicação React Native, utilizaremos a configuração Web do Firebase porque a integração deste exemplo é realizada através do Firebase JavaScript SDK.

Ao registrar a aplicação, o Firebase fornecerá uma configuração semelhante a:

```ts
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

Essas informações identificam qual projeto Firebase será utilizado pela aplicação.

---

# 2. Criando o Cloud Firestore

No Firebase Console, acesse:

```text
Build
  ↓
Firestore Database
  ↓
Create database
```

Selecione uma região para o banco de dados e conclua a criação.

O Cloud Firestore trabalha principalmente com:

```text
Collections
    ↓
Documents
    ↓
Fields
```

Por exemplo:

```text
users
│
├── 8hs72hd82hd
│   ├── name: "Maria"
│   ├── email: "maria@email.com"
│   └── createdAt: ...
│
└── 92jd82js91k
    ├── name: "João"
    ├── email: "joao@email.com"
    └── createdAt: ...
```

Nesse exemplo, `users` é uma **collection**.

Cada usuário é armazenado como um **document**.

---

# 3. Configurando as Security Rules

Ao criar o Firestore, é possível que as regras estejam configuradas para bloquear todas as operações:

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

A condição:

```js
if false
```

significa que nenhuma operação de leitura ou escrita será permitida.

Ao tentar acessar o Firestore dessa forma, a aplicação poderá receber:

```text
FirebaseError: Missing or insufficient permissions.
```

## Regra temporária para desenvolvimento

Durante os primeiros testes podemos temporariamente utilizar:

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

Depois clique em:

```text
Publish
```

> **IMPORTANTE:** essa configuração deixa todo o banco acessível e deve ser utilizada somente durante desenvolvimento e testes.

Não utilize essa regra em produção.

Uma evolução será utilizar Firebase Authentication e restringir o acesso:

```js
match /users/{userId} {
  allow read, write: if request.auth != null;
}
```

Nesse caso, somente usuários autenticados poderão acessar os documentos.

---

# 4. Criando o projeto Expo

Para criar um projeto Expo com TypeScript:

```bash
npx create-expo-app firebase-expo-app --template blank-typescript
```

Entre no projeto:

```bash
cd firebase-expo-app
```

---

# 5. Instalando o Firebase

Instale o Firebase JavaScript SDK:

```bash
npx expo install firebase
```

O Firebase disponibiliza diferentes módulos que podem ser utilizados separadamente.

Por exemplo:

```ts
firebase/app
firebase/firestore
firebase/auth
firebase/storage
```

Neste projeto utilizaremos principalmente:

```ts
firebase/app
firebase/firestore
```

---

# 6. Estrutura do projeto

Uma organização possível é:

```text
firebase-expo-app/
│
├── App.tsx
├── package.json
│
└── src/
    │
    ├── config/
    │   └── firebase.ts
    │
    ├── services/
    │   └── userService.ts
    │
    ├── screens/
    │   └── HomeScreen.tsx
    │
    └── types/
        └── User.ts
```

Essa organização separa responsabilidades.

```text
config
   ↓
Configuração do Firebase

services
   ↓
Comunicação com serviços externos

screens
   ↓
Telas da aplicação

types
   ↓
Interfaces e tipos TypeScript
```

---

# 7. Configurando o Firebase

Crie:

```text
src/config/firebase.ts
```

Adicione:

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

## initializeApp

A instrução:

```ts
initializeApp(firebaseConfig);
```

inicializa o Firebase utilizando as configurações fornecidas pelo Firebase Console.

## getFirestore

A instrução:

```ts
getFirestore(app);
```

obtém uma instância do Cloud Firestore associada ao projeto Firebase.

Exportamos essa instância:

```ts
export const db = getFirestore(app);
```

para que possa ser utilizada em outros arquivos.

---

# 8. Criando o tipo User

Crie:

```text
src/types/User.ts
```

```ts
export interface User {
  id?: string;
  name: string;
  email: string;
}
```

O `id` é opcional porque antes de salvar o documento no Firestore ainda não temos necessariamente um identificador.

Quando utilizamos `addDoc`, o próprio Firestore gera um ID.

---

# 9. Criando o UserService

Crie:

```text
src/services/userService.ts
```

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

O service concentra a comunicação com o Firebase.

Assim, a tela não precisa conhecer diretamente detalhes sobre como os dados são armazenados.

A arquitetura fica:

```text
HomeScreen
     │
     ▼
UserService
     │
     ▼
Firebase SDK
     │
     ▼
Cloud Firestore
```

---

# 10. Entendendo collection()

O código:

```ts
collection(db, "users")
```

obtém uma referência para a collection:

```text
users
```

no Firestore.

Isso não significa necessariamente que a collection precisa existir previamente.

Quando o primeiro documento for criado, o Firestore poderá criar a estrutura necessária.

---

# 11. Salvando dados com addDoc()

Para adicionar um documento utilizamos:

```ts
const docRef = await addDoc(
  collection(db, "users"),
  {
    name: user.name,
    email: user.email,
    createdAt: serverTimestamp(),
  }
);
```

O Firestore gera automaticamente um identificador.

Por exemplo:

```text
users
│
└── V5Rk92Dks72L
    │
    ├── name
    ├── email
    └── createdAt
```

Podemos obter esse identificador através de:

```ts
docRef.id
```

---

# 12. serverTimestamp()

Utilizamos:

```ts
serverTimestamp()
```

para registrar a data e hora utilizando o servidor do Firebase.

Por exemplo:

```ts
createdAt: serverTimestamp()
```

Isso evita depender exclusivamente do relógio do dispositivo do usuário.

---

# 13. Consultando os usuários

Para recuperar os documentos utilizamos:

```ts
const snapshot = await getDocs(
  collection(db, "users")
);
```

O resultado contém os documentos encontrados.

Depois podemos transformá-los:

```ts
return snapshot.docs.map((document) => ({
  id: document.id,
  name: document.data().name,
  email: document.data().email,
}));
```

O fluxo é:

```text
getDocs()
    ↓
Firestore
    ↓
users
    ↓
documents
    ↓
map()
    ↓
User[]
```

---

# 14. Criando a tela

Crie:

```text
src/screens/HomeScreen.tsx
```

Exemplo simplificado:

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

      Alert.alert(
        "Erro",
        "Não foi possível carregar os usuários."
      );
    }
  }

  async function handleSave() {
    if (!name || !email) {
      Alert.alert(
        "Atenção",
        "Informe nome e e-mail."
      );

      return;
    }

    try {
      await createUser({
        name,
        email,
      });

      setName("");
      setEmail("");

      await loadUsers();

      Alert.alert(
        "Sucesso",
        "Usuário cadastrado."
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o usuário."
      );
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>
          Firebase + Expo
        </Text>

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
              <Text>
                {item.name}
              </Text>

              <Text>
                {item.email}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
```

---

# 15. App.tsx

O `App.tsx` pode simplesmente carregar a tela:

```tsx
import { HomeScreen } from "./src/screens/HomeScreen";

export default function App() {
  return <HomeScreen />;
}
```

---

# 16. Executando o projeto

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Depois escolha onde executar:

```text
i → iOS

a → Android

w → Web
```

Também é possível utilizar o Expo Go em um dispositivo compatível com a versão do SDK utilizada pelo projeto.

---

# 17. Fluxo completo da aplicação

Ao abrir o aplicativo:

```text
App.tsx
   ↓
HomeScreen
   ↓
loadUsers()
   ↓
getUsers()
   ↓
Firebase SDK
   ↓
Cloud Firestore
   ↓
users
```

Ao cadastrar:

```text
Usuário informa:

Nome
E-mail
   ↓
handleSave()
   ↓
createUser()
   ↓
addDoc()
   ↓
Firebase SDK
   ↓
Cloud Firestore
   ↓
users
   ↓
novo documento
```

---

# 18. Visualizando os dados no Firebase

Depois de cadastrar um usuário, acesse:

```text
Firebase Console
      ↓
Firestore Database
      ↓
Data
```

Você deverá encontrar:

```text
users
│
├── documento
│   ├── name
│   ├── email
│   └── createdAt
│
└── documento
    ├── name
    ├── email
    └── createdAt
```

---

# 19. Erro: Missing or insufficient permissions

Um erro comum durante a configuração é:

```text
FirebaseError:
Missing or insufficient permissions.
```

Esse erro geralmente significa que o aplicativo conseguiu chegar ao Firestore, mas as **Security Rules impediram a operação**.

Por exemplo:

```js
allow read, write: if false;
```

bloqueia todas as operações.

Durante testes podemos utilizar:

```js
allow read, write: if true;
```

Lembrando novamente:

> Nunca utilize uma regra que permita acesso irrestrito ao banco em uma aplicação de produção.

---

# 20. Firebase não é apenas um banco de dados

É importante entender que o Firebase é uma plataforma composta por diversos serviços.

Podemos evoluir a arquitetura para:

```text
                    Firebase
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
 Authentication     Firestore       Storage
        │              │              │
        ▼              ▼              ▼
    Usuários         Dados          Arquivos
```

Por exemplo:

## Authentication

Pode cuidar de:

```text
Cadastro
Login
Logout
Sessão
```

## Cloud Firestore

Pode armazenar:

```text
Usuários
Produtos
Tarefas
Pedidos
Posts
Configurações
```

## Firebase Storage

Pode armazenar:

```text
Fotos
Avatares
Documentos
Vídeos
Arquivos
```

---

# 21. Próxima evolução: Authentication

Depois que a conexão com o Firestore estiver funcionando, uma evolução natural é adicionar o Firebase Authentication.

A arquitetura passaria para:

```text
React Native / Expo
        │
        ▼
Firebase Authentication
        │
        ├── Cadastro
        ├── Login
        └── Logout
        │
        ▼
Usuário autenticado
        │
        ▼
Cloud Firestore
        │
        ▼
Security Rules
```

Então podemos substituir:

```js
allow read, write: if true;
```

por:

```js
allow read, write: if request.auth != null;
```

Dessa maneira, somente usuários autenticados poderão acessar os dados.

---

# 22. Regras restritas apenas à collection users

Depois de validar que a integração está funcionando, é melhor restringir as regras apenas à collection utilizada pela aplicação.

Exemplo:

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

Essa regra continua aberta para a collection `users`, mas não libera automaticamente todas as collections do banco.

Para produção, o ideal será utilizar autenticação:

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

---

# 23. Verificando o projeto Firebase utilizado pelo aplicativo

Se mesmo após alterar as regras o erro de permissão continuar acontecendo, confira se o projeto configurado no aplicativo é o mesmo projeto no qual você publicou as regras.

Você pode adicionar temporariamente:

```ts
console.log("Firebase Project:", firebaseConfig.projectId);
```

Por exemplo:

```ts
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};

console.log("Firebase Project:", firebaseConfig.projectId);
```

Compare o valor exibido com:

```text
Firebase Console
      ↓
Project Settings
      ↓
General
      ↓
Project ID
```

---

# 24. Resumo do funcionamento

Com essa implementação temos uma aplicação Expo capaz de:

- conectar ao Firebase;
- acessar o Cloud Firestore;
- criar documentos;
- consultar documentos;
- trabalhar com collections;
- gerar IDs automaticamente;
- utilizar timestamps do servidor;
- organizar o acesso ao Firebase através de uma camada de services;
- utilizar TypeScript para representar os dados.

A arquitetura final do exemplo é:

```text
React Native + Expo
        │
        ▼
     Screen
        │
        ▼
     Service
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

Esse modelo fornece uma base simples para evoluir posteriormente para:

- Firebase Authentication;
- cadastro e login de usuários;
- atualização de documentos;
- exclusão de documentos;
- consultas com filtros;
- paginação;
- upload de arquivos;
- Firebase Storage;
- regras de segurança mais robustas;
- controle de acesso por usuário.

---

# 25. Comandos principais

Criar o projeto:

```bash
npx create-expo-app firebase-expo-app --template blank-typescript
```

Entrar no projeto:

```bash
cd firebase-expo-app
```

Instalar o Firebase:

```bash
npx expo install firebase
```

Instalar dependências:

```bash
npm install
```

Executar:

```bash
npx expo start
```

---

# Conclusão

A integração entre **React Native, Expo e Firebase** permite criar aplicações mobile com persistência de dados sem a necessidade inicial de desenvolver um backend próprio.

O Firebase JavaScript SDK fornece acesso ao Cloud Firestore diretamente no aplicativo e permite evoluir o projeto posteriormente com serviços como Authentication e Storage.

Durante o desenvolvimento, regras abertas podem facilitar testes, mas em aplicações reais o acesso ao Firestore deve ser protegido por regras de segurança adequadas e, normalmente, integrado ao Firebase Authentication.

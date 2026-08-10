# Firebase Cloud Firestore com React Native + Expo

Este material demonstra como configurar e utilizar o **Cloud Firestore** em uma aplicação **React Native + Expo + TypeScript** usando o **Firebase JavaScript SDK**.

O projeto de exemplo cobre:

- configuração do Firebase;
- criação de documentos;
- leitura de documentos;
- atualização com `updateDoc()`;
- exclusão com `deleteDoc()`;
- consultas com `query()` e `where()`;
- ordenação com `orderBy()`;
- paginação com `limit()` e `startAfter()`;
- listeners em tempo real com `onSnapshot()`;
- organização em camada de services;
- Security Rules;
- tratamento de erros comuns.

> As regras abertas mostradas neste material devem ser utilizadas apenas em desenvolvimento. Em produção, configure autenticação e regras de segurança adequadas.

---

# 1. Arquitetura

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

Uma organização simples do projeto pode ser:

```text
firebase-expo-app/
│
├── App.tsx
├── package.json
│
└── src/
    ├── config/
    │   └── firebase.ts
    ├── services/
    │   └── userService.ts
    ├── screens/
    │   └── HomeScreen.tsx
    └── types/
        └── User.ts
```

A ideia é manter o acesso ao Firebase fora da tela:

```text
Screen
   │
   ▼
Service
   │
   ▼
Firebase SDK
   │
   ▼
Firestore
```

---

# 2. Criando o projeto Firebase

Acesse o Firebase Console:

```text
https://console.firebase.google.com/
```

Crie um novo projeto ou utilize um projeto existente.

Depois registre uma aplicação:

```text
Project Overview
      ↓
Add app
      ↓
Web </>
```

Como este exemplo utiliza o **Firebase JavaScript SDK**, utilizamos a configuração de aplicativo Web.

O Firebase fornecerá uma configuração semelhante a:

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

---

# 3. Criando o Cloud Firestore

No Firebase Console:

```text
Build
  ↓
Firestore Database
  ↓
Create database
```

Escolha uma região e finalize a criação.

O Firestore utiliza uma estrutura baseada em:

```text
Collection
   ↓
Document
   ↓
Fields
```

Exemplo:

```text
users
│
├── abc123
│   ├── name: "Maria"
│   ├── email: "maria@email.com"
│   └── createdAt: ...
│
└── def456
    ├── name: "João"
    ├── email: "joao@email.com"
    └── createdAt: ...
```

---

# 4. Criando o projeto Expo

Exemplo:

```bash
npx create-expo-app firebase-expo-app --template blank-typescript
```

Entre na pasta:

```bash
cd firebase-expo-app
```

Instale o Firebase:

```bash
npx expo install firebase
```

---

# 5. Configurando o Firebase

Crie:

```text
src/config/firebase.ts
```

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

## `initializeApp()`

```ts
initializeApp(firebaseConfig);
```

Inicializa o Firebase para o projeto configurado.

## `getFirestore()`

```ts
getFirestore(app);
```

Obtém a instância do Cloud Firestore associada à aplicação Firebase.

---

# 6. Criando o tipo User

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

O `id` é opcional porque, antes da criação do documento, ainda não existe um identificador gerado pelo Firestore.

---

# 7. Service completo do Firestore

Crie:

```text
src/services/userService.ts
```

```ts
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";
import { User } from "../types/User";

const COLLECTION_NAME = "users";


// CREATE

export async function createUser(
  user: User
) {
  const docRef = await addDoc(
    collection(
      db,
      COLLECTION_NAME
    ),
    {
      name: user.name,
      email: user.email,
      createdAt: serverTimestamp(),
    }
  );

  return docRef.id;
}


// READ

export async function getUsers():
  Promise<User[]> {

  const snapshot =
    await getDocs(
      collection(
        db,
        COLLECTION_NAME
      )
    );

  return snapshot.docs.map(
    (document) => ({
      id: document.id,
      name: document.data().name,
      email: document.data().email,
    })
  );
}


// UPDATE

export async function updateUser(
  id: string,
  user: Partial<User>
) {
  const userRef = doc(
    db,
    COLLECTION_NAME,
    id
  );

  await updateDoc(
    userRef,
    {
      ...user,
      updatedAt: serverTimestamp(),
    }
  );
}


// DELETE

export async function deleteUser(
  id: string
) {
  const userRef = doc(
    db,
    COLLECTION_NAME,
    id
  );

  await deleteDoc(userRef);
}


// QUERY + WHERE

export async function findUsersByEmail(
  email: string
): Promise<User[]> {

  const q = query(
    collection(
      db,
      COLLECTION_NAME
    ),

    where(
      "email",
      "==",
      email
    )
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (document) => ({
      id: document.id,
      name: document.data().name,
      email: document.data().email,
    })
  );
}


// ORDER BY

export async function getUsersOrdered():
  Promise<User[]> {

  const q = query(
    collection(
      db,
      COLLECTION_NAME
    ),
    orderBy("name", "asc")
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (document) => ({
      id: document.id,
      name: document.data().name,
      email: document.data().email,
    })
  );
}


// PAGINAÇÃO

export interface PaginatedUsers {
  users: User[];

  lastDocument:
    | QueryDocumentSnapshot
    | null;

  hasMore: boolean;
}

export async function getUsersPaginated(
  pageSize: number = 10,
  lastDocument?: QueryDocumentSnapshot
): Promise<PaginatedUsers> {

  const usersRef = collection(
    db,
    COLLECTION_NAME
  );

  const q = lastDocument
    ? query(
        usersRef,
        orderBy("name"),
        startAfter(lastDocument),
        limit(pageSize)
      )
    : query(
        usersRef,
        orderBy("name"),
        limit(pageSize)
      );

  const snapshot =
    await getDocs(q);

  const users =
    snapshot.docs.map(
      (document) => ({
        id: document.id,
        name: document.data().name,
        email: document.data().email,
      })
    );

  const lastVisible =
    snapshot.docs.length > 0
      ? snapshot.docs[
          snapshot.docs.length - 1
        ]
      : null;

  return {
    users,
    lastDocument: lastVisible,
    hasMore:
      snapshot.docs.length === pageSize,
  };
}


// REAL TIME

export function subscribeToUsers(
  callback:
    (users: User[]) => void
) {
  const q = query(
    collection(
      db,
      COLLECTION_NAME
    ),
    orderBy("name")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const users =
        snapshot.docs.map(
          (document) => ({
            id: document.id,
            name: document.data().name,
            email: document.data().email,
          })
        );

      callback(users);
    }
  );
}
```

---

# 8. CREATE — criando documentos

A função:

```ts
createUser()
```

utiliza:

```ts
addDoc()
```

Exemplo:

```ts
await createUser({
  name: "Anderson",
  email: "anderson@email.com",
});
```

Internamente:

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

Exemplo:

```text
users
└── 8as7df89as7d
    ├── name
    ├── email
    └── createdAt
```

O ID pode ser recuperado através de:

```ts
docRef.id
```

---

# 9. READ — consultando documentos

Para recuperar todos os usuários:

```ts
const users = await getUsers();
```

Internamente:

```ts
const snapshot = await getDocs(
  collection(db, "users")
);
```

Depois os documentos são convertidos em objetos:

```ts
const users = snapshot.docs.map(
  (document) => ({
    id: document.id,
    name: document.data().name,
    email: document.data().email,
  })
);
```

---

# 10. UPDATE — atualizando documentos

Para atualizar um documento utilizamos:

```ts
updateDoc()
```

Exemplo:

```ts
await updateUser(
  "ID_DO_DOCUMENTO",
  {
    name: "Anderson Silva",
    email: "anderson@email.com",
  }
);
```

A referência do documento é criada com:

```ts
const userRef = doc(
  db,
  "users",
  id
);
```

Depois:

```ts
await updateDoc(
  userRef,
  {
    ...user,
    updatedAt: serverTimestamp(),
  }
);
```

O Firestore atualizará somente os campos informados.

Resultado:

```text
users
└── abc123
    ├── name
    ├── email
    ├── createdAt
    └── updatedAt
```

---

# 11. DELETE — excluindo documentos

A função:

```ts
deleteUser()
```

utiliza:

```ts
deleteDoc()
```

Exemplo:

```ts
await deleteUser(
  "ID_DO_DOCUMENTO"
);
```

Implementação:

```ts
const userRef = doc(
  db,
  "users",
  id
);

await deleteDoc(userRef);
```

O documento será removido da collection.

---

# 12. QUERY e WHERE — realizando consultas

O Firestore permite construir consultas com:

```ts
query()
```

e:

```ts
where()
```

Exemplo:

```ts
const q = query(
  collection(db, "users"),
  where(
    "email",
    "==",
    "anderson@email.com"
  )
);
```

Podemos chamar:

```ts
const users =
  await findUsersByEmail(
    "anderson@email.com"
  );
```

Conceitualmente:

```text
users
WHERE email = "anderson@email.com"
```

Outros exemplos:

```ts
where(
  "age",
  ">",
  18
)
```

```ts
where(
  "status",
  "==",
  "ACTIVE"
)
```

Podemos combinar condições:

```ts
const q = query(
  collection(db, "users"),

  where(
    "status",
    "==",
    "ACTIVE"
  ),

  where(
    "age",
    ">=",
    18
  )
);
```

Algumas consultas compostas podem exigir a criação de índices no Firestore.

---

# 13. ORDER BY — ordenando resultados

Para ordenar os usuários pelo nome:

```ts
const q = query(
  collection(db, "users"),
  orderBy(
    "name",
    "asc"
  )
);
```

Uso:

```ts
const users =
  await getUsersOrdered();
```

Para ordem decrescente:

```ts
orderBy(
  "name",
  "desc"
)
```

---

# 14. Paginação

Uma forma eficiente de paginação no Firestore utiliza:

```ts
limit()
```

e:

```ts
startAfter()
```

Fluxo:

```text
Primeira consulta
      │
      ▼
limit(10)
      │
      ▼
10 documentos
      │
      ▼
último documento
      │
      ▼
startAfter(último)
      │
      ▼
próximos 10
```

## Primeira página

```ts
const page =
  await getUsersPaginated(10);
```

O retorno contém:

```ts
page.users
page.lastDocument
page.hasMore
```

## Próxima página

```ts
const nextPage =
  await getUsersPaginated(
    10,
    page.lastDocument ?? undefined
  );
```

A primeira query utiliza:

```ts
query(
  usersRef,
  orderBy("name"),
  limit(pageSize)
)
```

As páginas seguintes utilizam:

```ts
query(
  usersRef,
  orderBy("name"),
  startAfter(lastDocument),
  limit(pageSize)
)
```

---

# 15. Paginação com FlatList

Na tela:

```tsx
import {
  QueryDocumentSnapshot,
} from "firebase/firestore";
```

Estados:

```tsx
const [users, setUsers] =
  useState<User[]>([]);

const [
  lastDocument,
  setLastDocument
] =
  useState<
    QueryDocumentSnapshot | null
  >(null);

const [
  hasMore,
  setHasMore
] =
  useState(true);
```

Primeira carga:

```tsx
async function loadUsers() {
  const result =
    await getUsersPaginated(10);

  setUsers(result.users);

  setLastDocument(
    result.lastDocument
  );

  setHasMore(
    result.hasMore
  );
}
```

Carregar mais:

```tsx
async function loadMore() {
  if (
    !lastDocument ||
    !hasMore
  ) {
    return;
  }

  const result =
    await getUsersPaginated(
      10,
      lastDocument
    );

  setUsers((current) => [
    ...current,
    ...result.users,
  ]);

  setLastDocument(
    result.lastDocument
  );

  setHasMore(
    result.hasMore
  );
}
```

Na `FlatList`:

```tsx
<FlatList
  data={users}

  keyExtractor={(item) =>
    item.id!
  }

  renderItem={({ item }) => (
    <Text>
      {item.name}
    </Text>
  )}

  onEndReached={loadMore}

  onEndReachedThreshold={0.5}
/>
```

Fluxo:

```text
Usuários 1-10
      │
      ▼
final da lista
      │
      ▼
loadMore()
      │
      ▼
startAfter()
      │
      ▼
Usuários 11-20
```

---

# 16. Listener em tempo real com onSnapshot()

O Firestore permite observar alterações em tempo real com:

```ts
onSnapshot()
```

Função:

```ts
export function subscribeToUsers(
  callback:
    (users: User[]) => void
) {
  const q = query(
    collection(
      db,
      "users"
    ),
    orderBy("name")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const users =
        snapshot.docs.map(
          (document) => ({
            id: document.id,
            name:
              document.data().name,
            email:
              document.data().email,
          })
        );

      callback(users);
    }
  );
}
```

---

# 17. getDocs() x onSnapshot()

Com:

```ts
getDocs()
```

a consulta é executada uma vez:

```text
App
 │
 │ getDocs()
 ▼
Firestore
 │
 ▼
resultado
```

Se algum documento for alterado depois disso, a tela não será atualizada automaticamente.

Com:

```ts
onSnapshot()
```

a aplicação permanece observando as alterações:

```text
App
 │
 │ subscribe
 ▼
Firestore
 │
 ├── alteração
 │      ↓
 │    callback()
 │
 ├── alteração
 │      ↓
 │    callback()
 │
 └── alteração
        ↓
      callback()
```

Isso permite interfaces atualizadas em tempo real.

---

# 18. Utilizando onSnapshot() no React

Exemplo:

```tsx
useEffect(() => {
  const unsubscribe =
    subscribeToUsers(
      (users) => {
        setUsers(users);
      }
    );

  return () => {
    unsubscribe();
  };
}, []);
```

É importante remover o listener quando a tela for desmontada:

```tsx
return () => {
  unsubscribe();
};
```

Isso evita manter listeners desnecessários ativos.

---

# 19. Tela completa com CRUD

Exemplo simplificado:

```tsx
import {
  useEffect,
  useState,
} from "react";

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
  deleteUser,
  subscribeToUsers,
  updateUser,
} from "../services/userService";

import { User } from "../types/User";

export function HomeScreen() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [users, setUsers] =
    useState<User[]>([]);

  const [
    selectedUser,
    setSelectedUser
  ] =
    useState<User | null>(
      null
    );

  useEffect(() => {
    const unsubscribe =
      subscribeToUsers(
        setUsers
      );

    return unsubscribe;
  }, []);

  async function handleSave() {
    if (
      !name.trim() ||
      !email.trim()
    ) {
      Alert.alert(
        "Atenção",
        "Informe nome e e-mail."
      );

      return;
    }

    try {
      if (
        selectedUser?.id
      ) {
        await updateUser(
          selectedUser.id,
          {
            name,
            email,
          }
        );

        setSelectedUser(null);
      } else {
        await createUser({
          name,
          email,
        });
      }

      setName("");
      setEmail("");

    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erro",
        "Não foi possível salvar."
      );
    }
  }

  function handleEdit(
    user: User
  ) {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
  }

  async function handleDelete(
    id: string
  ) {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erro",
        "Não foi possível excluir."
      );
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>
          Firebase Firestore
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
          title={
            selectedUser
              ? "Atualizar usuário"
              : "Cadastrar usuário"
          }
          onPress={handleSave}
        />

        <FlatList
          data={users}

          keyExtractor={
            (item) =>
              item.id!
          }

          renderItem={({
            item
          }) => (
            <View>
              <Text>
                {item.name}
              </Text>

              <Text>
                {item.email}
              </Text>

              <Button
                title="Editar"
                onPress={() =>
                  handleEdit(
                    item
                  )
                }
              />

              <Button
                title="Excluir"
                onPress={() =>
                  handleDelete(
                    item.id!
                  )
                }
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
```

---

# 20. App.tsx

```tsx
import {
  HomeScreen,
} from "./src/screens/HomeScreen";

export default function App() {
  return <HomeScreen />;
}
```

---

# 21. Security Rules

Uma configuração que bloqueia todas as operações:

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
FirebaseError:
Missing or insufficient permissions.
```

---

# 22. Regra temporária para desenvolvimento

Durante os primeiros testes:

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

Essa configuração libera todo o banco.

**Não utilize em produção.**

Uma opção melhor para testes é liberar apenas:

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

---

# 23. Protegendo com Firebase Authentication

Depois de adicionar Authentication:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write:
        if request.auth != null;
    }
  }
}
```

Isso exige que exista um usuário autenticado.

Uma regra ainda mais restritiva:

```js
match /users/{userId} {
  allow read, write:
    if request.auth != null
    && request.auth.uid == userId;
}
```

Nesse caso, o ID do documento deve estar relacionado ao UID autenticado.

---

# 24. Erro: Missing or insufficient permissions

Se ocorrer:

```text
FirebaseError:
Missing or insufficient permissions.
```

verifique:

1. se as Rules foram publicadas;
2. se a collection utilizada pelo código é realmente `users`;
3. se o `projectId` do `firebaseConfig` é o mesmo projeto em que as regras foram publicadas;
4. se a regra exige autenticação;
5. se existe um usuário autenticado;
6. se o caminho do documento atende às regras configuradas.

---

# 25. Consultas e índices

Algumas combinações de:

```ts
where()
orderBy()
```

podem exigir índices adicionais.

Exemplo:

```ts
query(
  collection(db, "users"),

  where(
    "status",
    "==",
    "ACTIVE"
  ),

  orderBy(
    "name"
  )
);
```

Quando uma consulta exigir um índice composto, o Firestore poderá retornar um erro indicando que um índice deve ser criado.

---

# 26. Resumo das principais funções

```text
Firestore
│
├── CREATE
│   └── addDoc()
│
├── READ
│   └── getDocs()
│
├── UPDATE
│   └── updateDoc()
│
├── DELETE
│   └── deleteDoc()
│
├── QUERY
│   ├── query()
│   ├── where()
│   └── orderBy()
│
├── PAGINAÇÃO
│   ├── limit()
│   └── startAfter()
│
└── REAL TIME
    └── onSnapshot()
```

---

# 27. Fluxo completo

```text
React Native / Expo
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
        ├── CREATE
        ├── READ
        ├── UPDATE
        ├── DELETE
        ├── QUERY
        ├── PAGINAÇÃO
        └── REAL TIME
```

---

# 28. Executando o projeto

Instale as dependências:

```bash
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Atalhos comuns:

```text
i → iOS

a → Android

w → Web
```

---

# 29. Próximos passos

Depois desta implementação, algumas evoluções possíveis são:

- filtros combinados;
- busca por intervalo;
- paginação com filtros;
- listeners em documentos específicos;
- listener em queries filtradas;
- transações;
- batch writes;
- integração com Firebase Authentication;
- regras de segurança por UID;
- upload de arquivos com Firebase Storage;
- Context API;
- TanStack Query;
- cache local;
- arquitetura Repository;
- tratamento centralizado de erros.

---

# Resultado

Com este exemplo temos uma base completa para trabalhar com o Cloud Firestore em aplicações React Native com Expo.

A camada `userService.ts` oferece:

```text
createUser()
getUsers()
updateUser()
deleteUser()
findUsersByEmail()
getUsersOrdered()
getUsersPaginated()
subscribeToUsers()
```

Com isso é possível demonstrar desde operações CRUD básicas até consultas, paginação e atualização em tempo real.

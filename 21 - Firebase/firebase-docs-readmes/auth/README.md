# Firebase Authentication com React Native + Expo

Este material demonstra como adicionar **Firebase Authentication** a uma aplicação **React Native + Expo + TypeScript**, utilizando autenticação por **e-mail e senha**.

## 1. Pré-requisitos

Instale o Firebase:

```bash
npx expo install firebase
```

O projeto também deve possuir a configuração Firebase obtida ao registrar um aplicativo Web no Firebase Console.

## 2. Habilitar Email/Password

No Firebase Console:

```text
Build
  └── Authentication
        └── Sign-in method
              └── Email/Password
```

Habilite **Email/Password** e salve.

## 3. Configuração

`src/config/firebase.ts`:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
```

## 4. Estrutura sugerida

```text
src/
├── config/
│   └── firebase.ts
├── services/
│   └── authService.ts
└── screens/
    └── AuthScreen.tsx
```

## 5. AuthService

Crie `src/services/authService.ts`:

```ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../config/firebase";

export async function register(
  email: string,
  password: string
) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return credential.user;
}

export async function login(
  email: string,
  password: string
) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return credential.user;
}

export async function logout() {
  await signOut(auth);
}
```

## 6. Cadastro

O método:

```ts
createUserWithEmailAndPassword(
  auth,
  email,
  password
)
```

cria uma nova conta.

Exemplo:

```ts
const user = await register(
  "aluno@email.com",
  "123456"
);

console.log(user.uid);
```

Cada usuário possui um `uid` exclusivo.

## 7. Login

```ts
const user = await login(
  "aluno@email.com",
  "123456"
);

console.log(user.email);
```

Internamente o service utiliza:

```ts
signInWithEmailAndPassword(
  auth,
  email,
  password
)
```

## 8. Logout

```ts
await logout();
```

que executa:

```ts
signOut(auth);
```

## 9. Observando o estado de autenticação

O Firebase permite observar mudanças no usuário autenticado:

```ts
import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "./src/config/firebase";
```

Exemplo no `App.tsx`:

```tsx
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  Text,
} from "react-native";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "./src/config/firebase";
import { logout } from "./src/services/authService";
import { AuthScreen } from "./src/screens/AuthScreen";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <SafeAreaView>
      <Text>Usuário autenticado</Text>
      <Text>{user.email}</Text>

      <Button
        title="Sair"
        onPress={logout}
      />
    </SafeAreaView>
  );
}
```

## 10. Tela de Login/Cadastro

`src/screens/AuthScreen.tsx`:

```tsx
import { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  login,
  register,
} from "../services/authService";

export function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const user = await register(email, password);

      Alert.alert(
        "Sucesso",
        `Usuário criado: ${user.email}`
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível criar a conta.");
    }
  }

  async function handleLogin() {
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "E-mail ou senha inválidos.");
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Firebase Authentication</Text>

        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title="Entrar"
          onPress={handleLogin}
        />

        <Button
          title="Criar conta"
          onPress={handleRegister}
        />
      </View>
    </SafeAreaView>
  );
}
```

## 11. Authentication + Firestore

Authentication e Firestore são serviços diferentes:

```text
React Native / Expo
        │
        ▼
Firebase
   ┌────┴──────────────┐
   ▼                   ▼
Authentication      Firestore
   │                   │
   └── request.auth ───┘
```

Depois que o usuário estiver autenticado, as Firestore Security Rules podem verificar:

```js
request.auth != null
```

Exemplo:

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

Uma regra ainda mais restritiva pode associar o documento ao UID:

```js
match /users/{userId} {
  allow read, write:
    if request.auth != null
    && request.auth.uid == userId;
}
```

Nesse modelo, o documento deve utilizar o UID como ID.

## 12. Criando documento pelo UID

Em vez de `addDoc()`, pode-se utilizar:

```ts
import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../config/firebase";

export async function saveProfile(name: string) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  await setDoc(
    doc(db, "users", user.uid),
    {
      name,
      email: user.email,
    }
  );
}
```

Assim:

```text
users
└── UID_DO_FIREBASE
    ├── name
    └── email
```

e a regra:

```js
request.auth.uid == userId
```

passa a ter uma relação direta com o documento.

## 13. Fluxo

```text
Cadastro/Login
      │
      ▼
Firebase Authentication
      │
      ▼
Firebase User
      │
      ├── uid
      ├── email
      └── ...
      │
      ▼
Firestore Security Rules
      │
      ▼
Dados autorizados
```

## 14. Tratamento de erros

Em aplicações reais, prefira tratar `FirebaseError.code`.

Exemplo:

```ts
import { FirebaseError } from "firebase/app";

try {
  await login(email, password);
} catch (error) {
  if (error instanceof FirebaseError) {
    console.log(error.code);
  }
}
```

Isso permite apresentar mensagens diferentes para erros de credencial, rede, configuração etc.

## Próximos passos

- recuperação de senha;
- verificação de e-mail;
- login social;
- persistência adequada da sessão no React Native;
- Context API para autenticação;
- rotas públicas e privadas;
- Firestore Rules baseadas em UID.

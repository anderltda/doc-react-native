# Firebase + React Native + Expo

Projeto de exemplo usando **React Native**, **Expo**, **TypeScript**, **Firebase JavaScript SDK** e **Cloud Firestore**.

## Estrutura

```text
firebase-expo-app/
├── App.tsx
├── index.ts
├── app.json
├── package.json
├── firestore.rules
└── src/
    ├── config/
    │   └── firebase.ts
    ├── screens/
    │   └── HomeScreen.tsx
    ├── services/
    │   └── userService.ts
    └── types/
        └── User.ts
```

## 1. Configurar o Firebase

No Firebase Console, abra o seu projeto e registre um aplicativo **Web (`</>`)** para obter `firebaseConfig`.

Depois edite:

```text
src/config/firebase.ts
```

Substitua os valores abaixo pelos valores reais fornecidos pelo Firebase:

```ts
const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_PROJECT_ID.firebaseapp.com',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_PROJECT_ID.firebasestorage.app',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID',
};
```

## 2. Security Rules do Firestore

No Firebase Console:

```text
Firestore Database → Rules
```

Para o primeiro teste, use temporariamente:

```text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if true;
    }
  }
}
```

A mesma regra está disponível em `firestore.rules`.

> Atenção: `if true` é somente para desenvolvimento. Não use essa regra em produção.

Depois de configurar Firebase Authentication, você pode trocar por:

```text
allow read, write: if request.auth != null;
```

## 3. Instalar dependências

```bash
npm install
```

Se preferir criar o projeto a partir de um template Expo e copiar apenas o código-fonte, utilize a versão de SDK compatível com seu ambiente e execute:

```bash
npx expo install firebase
```

## 4. Executar

```bash
npx expo start
```

Atalhos:

```bash
npm run ios
npm run android
npm run web
```

## 5. Teste

Na tela inicial:

1. Informe nome.
2. Informe e-mail.
3. Pressione **Salvar no Firestore**.
4. O app cria um documento na collection `users`.
5. A lista é atualizada lendo os documentos do Firestore.

No Firebase Console você verá aproximadamente:

```text
users
└── ID_GERADO_PELO_FIREBASE
    ├── name: "Anderson"
    ├── email: "anderson@email.com"
    └── createdAt: Timestamp
```

## Fluxo

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
    └── users
```

A tela não acessa diretamente o Firestore; toda operação de dados fica concentrada em `services/userService.ts`.

## Próxima evolução

O próximo passo natural é adicionar Firebase Authentication (cadastro/login) e substituir a regra temporária por regras que exijam `request.auth != null`.

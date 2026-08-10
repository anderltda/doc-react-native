# Firebase Storage com React Native + Expo

Este material demonstra como utilizar o **Cloud Storage for Firebase** em uma aplicação **React Native + Expo + TypeScript**.

O exemplo mostra o fluxo para selecionar uma imagem no dispositivo e enviá-la ao Firebase Storage.

> Para aplicações reais, configure Authentication e Storage Security Rules antes de disponibilizar uploads.

## 1. Instalação do Firebase

```bash
npx expo install firebase
```

## 2. Configuração

`src/config/firebase.ts`:

```ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export default app;
```

## 3. Habilitar o Storage

No Firebase Console, acesse o serviço **Storage** e siga o processo para criar o bucket do projeto.

O valor de:

```ts
storageBucket
```

deve corresponder ao bucket informado na configuração do seu aplicativo Firebase.

## 4. Estrutura sugerida

```text
src/
├── config/
│   └── firebase.ts
├── services/
│   └── storageService.ts
└── screens/
    └── UploadScreen.tsx
```

## 5. Selecionando uma imagem com Expo

Para selecionar imagens da galeria:

```bash
npx expo install expo-image-picker
```

Importe:

```ts
import * as ImagePicker from "expo-image-picker";
```

Exemplo:

```ts
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ["images"],
  allowsEditing: true,
  quality: 0.8,
});

if (!result.canceled) {
  const uri = result.assets[0].uri;

  console.log(uri);
}
```

A `uri` representa o arquivo selecionado no dispositivo.

## 6. Convertendo a URI para Blob

Para enviar o arquivo ao Firebase Storage com o JavaScript SDK, podemos obter um `Blob`:

```ts
async function uriToBlob(uri: string) {
  const response = await fetch(uri);
  return await response.blob();
}
```

## 7. StorageService

Crie `src/services/storageService.ts`:

```ts
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { storage } from "../config/firebase";

export async function uploadImage(
  uri: string,
  fileName: string
) {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(
    storage,
    `images/${fileName}`
  );

  const snapshot = await uploadBytes(
    storageRef,
    blob
  );

  const downloadURL = await getDownloadURL(
    snapshot.ref
  );

  return downloadURL;
}
```

## 8. `ref()`

```ts
ref(
  storage,
  "images/avatar.jpg"
)
```

representa um caminho dentro do Storage.

A estrutura seria:

```text
Storage
└── images
    └── avatar.jpg
```

## 9. `uploadBytes()`

```ts
await uploadBytes(
  storageRef,
  blob
);
```

envia o conteúdo para o Firebase Storage.

## 10. `getDownloadURL()`

Depois do upload:

```ts
const url = await getDownloadURL(
  snapshot.ref
);
```

obtemos uma URL que pode ser utilizada para acessar o arquivo conforme as regras e o token/URL retornado pelo serviço.

Exemplo de uso:

```ts
const imageUrl = await uploadImage(
  uri,
  "avatar.jpg"
);

console.log(imageUrl);
```

## 11. Tela completa de exemplo

`src/screens/UploadScreen.tsx`:

```tsx
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { uploadImage } from "../services/storageService";

export function UploadScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function selectImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setDownloadUrl(null);
    }
  }

  async function handleUpload() {
    if (!imageUri) {
      Alert.alert("Atenção", "Selecione uma imagem.");
      return;
    }

    try {
      setUploading(true);

      const fileName = `image-${Date.now()}.jpg`;

      const url = await uploadImage(
        imageUri,
        fileName
      );

      setDownloadUrl(url);

      Alert.alert(
        "Sucesso",
        "Imagem enviada para o Firebase Storage."
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Erro",
        "Não foi possível enviar a imagem."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Firebase Storage</Text>

        <Button
          title="Selecionar imagem"
          onPress={selectImage}
        />

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}

        {uploading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Enviar para o Storage"
            onPress={handleUpload}
          />
        )}

        {downloadUrl && (
          <>
            <Text>Imagem enviada:</Text>

            <Image
              source={{ uri: downloadUrl }}
              style={{
                width: 200,
                height: 200,
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
```

`App.tsx`:

```tsx
import { UploadScreen } from "./src/screens/UploadScreen";

export default function App() {
  return <UploadScreen />;
}
```

## 12. Fluxo do upload

```text
Galeria do dispositivo
        │
        ▼
Expo ImagePicker
        │
        ▼
URI local
        │
        ▼
fetch(uri)
        │
        ▼
Blob
        │
        ▼
uploadBytes()
        │
        ▼
Firebase Storage
        │
        ▼
getDownloadURL()
        │
        ▼
URL da imagem
```

## 13. Storage Security Rules

As regras do Storage são configuradas separadamente das regras do Firestore.

Uma regra aberta é insegura para produção.

Exemplo conceitual para permitir apenas usuários autenticados:

```js
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Nesse caso:

```js
request.auth != null
```

exige um usuário autenticado pelo Firebase Authentication.

## 14. Organização por usuário

Uma estrutura melhor para arquivos privados é:

```text
users/
└── UID
    └── images/
        ├── avatar.jpg
        └── foto-01.jpg
```

No código:

```ts
const storageRef = ref(
  storage,
  `users/${user.uid}/images/${fileName}`
);
```

Uma regra pode então comparar o UID do caminho com o UID autenticado:

```js
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write:
        if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

## 15. Authentication + Firestore + Storage

Uma aplicação pode combinar os três serviços:

```text
React Native + Expo
        │
        ▼
      Firebase
        │
   ┌────┼─────────┐
   │    │         │
   ▼    ▼         ▼
 Auth Firestore Storage
   │    │         │
   │    │         └── imagens/arquivos
   │    │
   │    └── dados/metadados
   │
   └── identidade/UID
```

Um padrão comum é:

1. autenticar o usuário;
2. enviar a imagem para Storage;
3. obter a URL;
4. salvar os metadados/URL em um documento no Firestore.

Exemplo:

```text
Storage
└── users/{uid}/avatar.jpg

Firestore
└── users/{uid}
    ├── name
    ├── email
    └── avatarUrl
```

## 16. Cuidados importantes

- não deixe upload público em produção;
- valide tipos e tamanhos de arquivos;
- use caminhos organizados por usuário;
- evite sobrescrever arquivos acidentalmente;
- trate erros de rede;
- considere progresso de upload para arquivos grandes;
- configure regras coerentes com o modelo de autenticação.

## Próximos passos

- upload com progresso;
- exclusão de arquivos;
- atualização de avatar;
- câmera com Expo;
- múltiplos arquivos;
- integração entre Storage e Firestore;
- regras por UID.

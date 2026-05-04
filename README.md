# 🚀 React Native + Expo + TypeScript Roadmap  
Guia do **básico ao avançado**, com foco em prática, fundamentos sólidos e construção de um app real.

---

# ▶️ Criando o projeto (Template TypeScript)

```bash
npx create-expo-app app-react-native --template blank-typescript
cd app-react-native
npm install
```

---

# 📱 Preparando o ambiente para rodar no celular

Antes de rodar o projeto, siga estes passos:

## 1. Instalar o Expo Go

No seu celular:

- 📱 iOS → App Store → instalar **Expo Go**
- 🤖 Android → Play Store → instalar **Expo Go**

---

## 2. Conectar na mesma rede Wi-Fi

- O **computador e o celular devem estar na mesma rede**
- Evite redes corporativas ou com bloqueio de portas

---

# ▶️ Executando o projeto no celular

```bash
npx expo start --clear --lan
```

---

## 📷 Abrindo o app no device

1. O terminal abrirá um **QR Code**
2. Abra o **Expo Go**
3. Escaneie o QR Code
4. O app será carregado no celular

---

# ✅ Fluxo completo (resumo)

```bash
npx create-expo-app app-react-native --template blank-typescript
cd app-react-native
npm install
npx expo start --clear --lan
```

---

# ⚠️ Executar no navegador

## Em muitos casos o Expo já resolve isso sozinho. Se o ambiente precisar, instale também:

```bash
npx expo install react-native-web react-dom
```

---

# 🧠 Boas práticas

```bash
npx expo start --lan
```

---

# 🧪 Exemplo mínimo (App.tsx)

```tsx
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>🚀 Rodando no celular com Expo!</Text>
    </View>
  );
}
```
---

# 📚 Fontes

- https://reactnative.dev/docs/components-and-apis
- https://docs.expo.dev/skills/

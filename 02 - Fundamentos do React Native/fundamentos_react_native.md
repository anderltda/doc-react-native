# 📱 Aula de React Native — Fundamentos Essenciais

Este material apresenta uma aula prática completa sobre os **Fundamentos do React Native**, ideal para quem quer entender como a plataforma funciona na prática.

Todos os exemplos utilizam **um único arquivo `App.tsx`**, permitindo fácil execução em projetos com **Expo + TypeScript**.

---

# 📚 Conteúdo da Aula

## 🧠 Fundamentos do React Native

### 📌 Core
- Diferença entre React e React Native
- Componentes nativos (`View`, `Text`, `Image`)
- Renderização nativa

### 📌 Layout e UI
- Flexbox no React Native
- Estilização com `StyleSheet`
- Responsividade

### 📌 Interação
- Eventos (`onPress`, `onChangeText`)
- Inputs

### 📌 Runtime
- Ciclo de vida com `useEffect`

### 📌 Device
- Dimensões da tela
- Plataforma (iOS / Android)

### 📌 Navegação
- Conceito de navegação (simulação)

---

# 🛠️ Pré-requisitos

- Node.js
- npm ou yarn
- Expo CLI

---

# ▶️ Criando o projeto

```bash
npx create-expo-app app-fundamentos-rn --template blank-typescript
cd app-fundamentos-rn
npm install
npx expo start
```

---

# 1) Componentes básicos

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>React Native</Text>

        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.image}
        />

        <Text style={styles.description}>
          Componentes nativos renderizados pelo sistema operacional.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  card: { alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700' },
  image: { width: 80, height: 80 },
  description: { marginTop: 10 },
});
```

---

# 2) Layout com Flexbox

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: 'red' }]} />
        <View style={[styles.box, { backgroundColor: 'blue' }]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  box: { width: 80, height: 80 },
});
```

---

# 3) Estilização

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Estilização com StyleSheet</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
```

---

# 4) Interação

```tsx
import React, { useState } from 'react';
import { Button, SafeAreaView, TextInput, Text } from 'react-native';

export default function App() {
  const [name, setName] = useState('');

  return (
    <SafeAreaView>
      <TextInput value={name} onChangeText={setName} />
      <Button title="Mostrar" onPress={() => alert(name)} />
    </SafeAreaView>
  );
}
```

---

# 5) Dimensões

```tsx
import React from 'react';
import { Dimensions, Text } from 'react-native';

export default function App() {
  const { width, height } = Dimensions.get('window');

  return <Text>{width} x {height}</Text>;
}
```

---

# 6) Plataforma

```tsx
import React from 'react';
import { Platform, Text } from 'react-native';

export default function App() {
  return <Text>{Platform.OS}</Text>;
}
```

---

# 7) Ciclo de vida

```tsx
import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('Montou');

    return () => console.log('Desmontou');
  }, []);

  return null;
}
```

---

# 8) Navegação (conceito)

```tsx
import React, { useState } from 'react';
import { Button, Text } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('home');

  return screen === 'home' ? (
    <>
      <Text>Home</Text>
      <Button title="Ir" onPress={() => setScreen('details')} />
    </>
  ) : (
    <>
      <Text>Details</Text>
      <Button title="Voltar" onPress={() => setScreen('home')} />
    </>
  );
}
```

---

# 🧾 Resumo

Você aprendeu:
- Componentes nativos
- Layout com Flexbox
- Estilização
- Eventos
- Inputs
- Ciclo de vida
- Dimensões
- Plataforma
- Navegação (conceito)

# 🚀 Armazenamento Local no React Native

Guia completo com conceitos e exemplos práticos utilizando **AsyncStorage**, incluindo persistência de dados, sessão e preferências.

---

# 📚 Conteúdo

- O que é armazenamento local
- Quando usar
- AsyncStorage
- Trabalhando com JSON
- Persistência de sessão
- Boas práticas
- Exemplos práticos
- Exercícios

# 🧠 O que é armazenamento local

Armazenamento local permite salvar dados diretamente no dispositivo do usuário para reutilização futura, mesmo após fechar o app.

### Exemplos:
- Usuário logado
- Tema (dark/light)
- Preferências
- Lista de tarefas
- Cache simples

---

# 📌 Quando usar

Use quando o dado:

- Precisa persistir após fechar o app
- É pequeno e simples
- Não depende de backend imediato

---

# ⚠️ Quando evitar

Evite usar sozinho para:

- Dados críticos
- Dados sensíveis sem proteção
- Grandes volumes de dados

---

# ⚙️ Conceitos importantes

## Tudo é string

```ts
JSON.stringify(objeto)
JSON.parse(valor)
```

## Uso assíncrono

```ts
await AsyncStorage.setItem(key, value)
```

---

# 🛠️ Instalação

```bash
npx expo install @react-native-async-storage/async-storage
```

---

# 💻 Exemplo 1 — Salvar nome (App.tsx)

```tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@name';

export default function App() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    await AsyncStorage.setItem(KEY, name);
    setSaved(name);
  };

  const load = async () => {
    const value = await AsyncStorage.getItem(KEY);
    if (value) {
      setSaved(value);
      setName(value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Digite seu nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Button title="Salvar" onPress={save} />
      <Text>Salvo: {saved}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 }
});
```

---

# 💻 Exemplo 2 — Salvar objeto (App.tsx)

```tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = { id: number; name: string };

const KEY = '@user';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { load(); }, []);

  const save = async () => {
    const u = { id: 1, name: 'Anderson' };
    await AsyncStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };

  const load = async () => {
    const value = await AsyncStorage.getItem(KEY);
    if (value) setUser(JSON.parse(value));
  };

  return (
    <SafeAreaView>
      <Button title="Salvar usuário" onPress={save} />
      <Text>{user?.name}</Text>
    </SafeAreaView>
  );
}
```

---

# 💻 Exemplo 3 — Lista persistida (App.tsx)

```tsx
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, TextInput, Button, FlatList, Text, View, StyleSheet, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@tasks';

type Task = {
  id: number;
  title: string;
};

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem(KEY);

      if (data) {
        const parsedTasks: Task[] = JSON.parse(data);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas:', error);
    }
  };

  const addTask = async () => {
    if (!text.trim()) {
      Alert.alert('Atenção', 'Digite uma tarefa antes de adicionar.');
      return;
    }

    try {
      const newTask: Task = {
        id: Date.now(),
        title: text.trim(),
      };

      const newTasks = [...tasks, newTask];

      setTasks(newTasks);
      setText('');

      await AsyncStorage.setItem(KEY, JSON.stringify(newTasks));
      console.log('Tarefa salva com sucesso!');
    } catch (error) {
      console.log('Erro ao salvar tarefa:', error);
    }
  };

  const clearAll = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(KEY);
      setTasks([]);
      console.log('Tudo limpo!');
    } catch (error) {
      console.log('Erro ao limpar:', error);
    }
  }, [setTasks]);

  const confirmClearAll = () => {
    Alert.alert(
      'Limpar tudo',
      'Tem certeza que deseja remover todas as tarefas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim, limpar', style: 'destructive', onPress: clearAll },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa"
          value={text}
          onChangeText={setText}
        />

        <View style={styles.buttonSpacing}>
          <Button title="Adicionar" onPress={addTask} />
        </View>

        <Button title="Limpar tudo" onPress={confirmClearAll} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa salva.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  buttonSpacing: {
    marginBottom: 10,
  },
  taskItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
```

---

# 💻 Exemplo 4 — Sessão (App.tsx)

```tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@session';

export default function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  const login = async () => {
    await AsyncStorage.setItem(KEY, 'admin');
    setUser('admin');
  };

  const load = async () => {
    const u = await AsyncStorage.getItem(KEY);
    if (u) setUser(u);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(KEY);
    setUser(null);
  };

  if (user) {
    return (
      <SafeAreaView>
        <Text>Logado: {user}</Text>
        <Button title="Logout" onPress={logout} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Button title="Login" onPress={login} />
    </SafeAreaView>
  );
}
```

---

# 💻 Exemplo 5 — Sessão com tema (App.tsx)

```tsx
import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode, } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_THEME_KEY = '@app_theme';

type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

type ThemeTokens = {
  colors: {
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    primaryText: string;
    success: string;
    danger: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    title: number;
    subtitle: number;
    body: number;
    caption: number;
  };
};

type ThemeContextData = {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  tokens: ThemeTokens;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const lightTokens: ThemeTokens = {
  colors: {
    background: '#F5F7FA',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    primary: '#2563EB',
    primaryText: '#FFFFFF',
    success: '#16A34A',
    danger: '#DC2626',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
  },
  typography: {
    title: 28,
    subtitle: 20,
    body: 16,
    caption: 13,
  },
};

const darkTokens: ThemeTokens = {
  colors: {
    background: '#0F172A',
    surface: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
    primary: '#60A5FA',
    primaryText: '#111827',
    success: '#22C55E',
    danger: '#F87171',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
  },
  typography: {
    title: 28,
    subtitle: 20,
    body: 16,
    caption: 13,
  },
};

const ThemeContext = createContext<ThemeContextData | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {

    try {
      const savedTheme = await AsyncStorage.getItem(STORAGE_THEME_KEY);

      if (
        savedTheme === 'light' ||
        savedTheme === 'dark' ||
        savedTheme === 'system'
      ) {
        setModeState(savedTheme);
      }
    } catch (error) {
      console.log('Erro ao carregar tema:', error);
    }
  };

  const setMode = async (newMode: ThemeMode) => {

    try {
      setModeState(newMode);
      await AsyncStorage.setItem(STORAGE_THEME_KEY, newMode);
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }

  };

  const resolvedTheme: ResolvedTheme = mode === 'system' ? systemScheme === 'dark' ? 'dark' : 'light' : mode;

  const tokens = resolvedTheme === 'dark' ? darkTokens : lightTokens;

  const toggleTheme = async () => {
    const nextMode: ThemeMode = resolvedTheme === 'light' ? 'dark' : 'light';
    await setMode(nextMode);
  };

  const value = useMemo(() => ({ mode, resolvedTheme, tokens, setMode, toggleTheme, }),
    [mode, resolvedTheme, tokens]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }

  return context;
}

function ThemeButton({ label, active, onPress, }: { label: string; active: boolean; onPress: () => void; }) {
  const { tokens } = useTheme();

  return (
    <Pressable onPress={onPress}
      style={[
        styles.optionButton,
        {
          backgroundColor: active ? tokens.colors.primary : tokens.colors.surface,
          borderColor: active ? tokens.colors.primary : tokens.colors.border,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
      ]}>

      <Text style={{
          color: active ? tokens.colors.primaryText : tokens.colors.text,
          fontSize: tokens.typography.body,
          fontWeight: '600',
        }}>
        {label}
      </Text>
    </Pressable>
  );
}

function HomeScreen() {
  const { mode, resolvedTheme, tokens, setMode, toggleTheme } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: tokens.colors.background },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: tokens.colors.card,
            borderColor: tokens.colors.border,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
          },
        ]}>

        <Text
          style={{
            color: tokens.colors.text,
            fontSize: tokens.typography.title,
            fontWeight: '700',
            marginBottom: tokens.spacing.sm,
          }}>
          Theme Provider
        </Text>

        <Text
          style={{
            color: tokens.colors.textSecondary,
            fontSize: tokens.typography.body,
            marginBottom: tokens.spacing.lg,
          }}>

          Exemplo com tema escalável, tokens, persistência local e suporte ao
          tema do sistema.

        </Text>

        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
              borderRadius: tokens.radius.md,
              padding: tokens.spacing.md,
            },
          ]}>

          <Text
            style={{
              color: tokens.colors.text,
              fontSize: tokens.typography.body,
              marginBottom: tokens.spacing.xs,
            }}>

            Modo salvo: <Text style={{ fontWeight: '700' }}>{mode}</Text>

          </Text>

          <Text
            style={{
              color: tokens.colors.text,
              fontSize: tokens.typography.body,
            }}>

            Tema aplicado:{" "} <Text style={{ fontWeight: '700' }}>{resolvedTheme}</Text>

          </Text>
        </View>

        <Text
          style={{
            color: tokens.colors.text,
            fontSize: tokens.typography.subtitle,
            fontWeight: '600',
            marginTop: tokens.spacing.lg,
            marginBottom: tokens.spacing.sm,
          }}>

          Escolha o tema

        </Text>

        <View style={styles.row}>
          <ThemeButton label="Light" active={mode === 'light'} onPress={() => setMode('light')}/>
          <ThemeButton label="Dark" active={mode === 'dark'} onPress={() => setMode('dark')}/>
          <ThemeButton label="System" active={mode === 'system'} onPress={() => setMode('system')}/>
        </View>

        <Pressable onPress={toggleTheme}
          style={[
            styles.mainButton,
            {
              backgroundColor: tokens.colors.primary,
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.md,
              marginTop: tokens.spacing.lg,
            },
          ]}>

          <Text
            style={{
              color: tokens.colors.primaryText,
              fontSize: tokens.typography.body,
              fontWeight: '700',
              textAlign: 'center',
            }}>

            Alternar Light/Dark

          </Text>
        </Pressable>

        <View
          style={[
            styles.previewCard,
            {
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
              borderRadius: tokens.radius.md,
              padding: tokens.spacing.md,
              marginTop: tokens.spacing.lg,
            },
          ]}>

          <Text
            style={{
              color: tokens.colors.text,
              fontSize: tokens.typography.body,
              fontWeight: '600',
              marginBottom: tokens.spacing.xs,
            }}>

            Preview dos tokens
            
          </Text>

          <Text style={{ color: tokens.colors.textSecondary }}>
            background: {tokens.colors.background}
          </Text>
          <Text style={{ color: tokens.colors.textSecondary }}>
            surface: {tokens.colors.surface}
          </Text>
          <Text style={{ color: tokens.colors.textSecondary }}>
            primary: {tokens.colors.primary}
          </Text>
          <Text style={{ color: tokens.colors.textSecondary }}>
            text: {tokens.colors.text}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
  },
  infoBox: {
    borderWidth: 1,
  },
  previewCard: {
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  optionButton: {
    borderWidth: 1,
  },
  mainButton: {},
});
```

---

# 💻 Exemplo 6 — Salvar Imagem "Avatar" com Câmera e Persistência

## Instalar dependências

``` bash
npx expo install expo-image-picker
```
---

```tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AVATAR_KEY = '@avatar';

export default function App() {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    loadAvatar();
  }, []);

  const loadAvatar = async () => {
    try {
      const saved = await AsyncStorage.getItem(AVATAR_KEY);
      if (saved) {
        setAvatar(saved);
      }
    } catch (error) {
      console.log('Erro ao carregar avatar:', error);
    }
  };

  const pickImage = async () => {
    try {
      // pedir permissão
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permissão necessária', 'Autorize o uso da câmera');
        return;
      }

      // abrir câmera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;

        setAvatar(uri);
        await AsyncStorage.setItem(AVATAR_KEY, uri);

        console.log('Avatar salvo:', uri);
      }
    } catch (error) {
      console.log('Erro ao tirar foto:', error);
    }
  };

  const removeAvatar = async () => {
    try {
      await AsyncStorage.removeItem(AVATAR_KEY);
      setAvatar(null);
    } catch (error) {
      console.log('Erro ao remover avatar:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Avatar do Usuário</Text>

      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Sem foto</Text>
          </View>
        )}
      </View>

      <View style={styles.buttons}>
        <Button title="Tirar Foto" onPress={pickImage} />

        {avatar && (
          <Button title="Remover Avatar" onPress={removeAvatar} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#555',
  },
  buttons: {
    gap: 10,
  },
});
```

---

# 🧠 Boas práticas

- Centralizar chaves
- Criar service de storage
- Usar try/catch
- Não salvar dados sensíveis
- Evitar grandes volumes

---

# ❌ Erros comuns

- Não usar JSON.stringify
- Não tratar null
- Mutar estado diretamente

---

# 🧪 Exercícios

## 1 - Salvar nome e carregar ao abrir app

## 2 - Lista de tarefas persistida

## 3 - Login com sessão salva

## 4 - Configurações persistidas

---

# 🧠 Resumo

- AsyncStorage persiste dados
- Sempre usar JSON para objetos
- Usar async/await
- Ideal para dados simples

---

# 📚 Fontes

https://reactnative.dev/docs/asyncstorage
https://react-native-async-storage.github.io/async-storage/docs/usage/
https://reactnative.dev/docs/image
https://docs.expo.dev/versions/latest/sdk/async-storage/
https://docs.expo.dev/versions/latest/sdk/imagepicker/

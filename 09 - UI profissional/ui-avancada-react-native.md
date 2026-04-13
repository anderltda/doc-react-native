# 🚀 React Native — UI Profissional Avançada

Guia com foco em:

- animações profissionais
- ThemeProvider + Context
- acessibilidade
- dark mode automático
- design tokens dinâmicos

Todos os exemplos abaixo usam **um único arquivo `App.tsx`** para facilitar estudo e execução.

---

# Objetivo

Levar a construção visual para um nível mais maduro, aproximando o projeto de uma base **enterprise**:

- UI consistente
- tema centralizado
- melhor experiência de uso
- adaptação automática ao sistema
- mais escalabilidade

---

# 1. Animações profissionais

## O que são

Animações profissionais não servem apenas para “enfeitar”.

Elas ajudam a:

- comunicar mudança de estado
- melhorar percepção de fluidez
- dar feedback visual
- tornar a experiência mais agradável

---

## Boas práticas

- use animações curtas
- evite exagero
- anime opacidade, escala e posição
- mantenha consistência
- não atrapalhe a leitura

---

## Exemplo — Card com fade + slide

### `App.tsx`

```tsx
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.content}>
        <Text style={styles.title}>Animações profissionais</Text>
        <Text style={styles.subtitle}>
          Pequenas transições deixam a interface mais elegante e fluida.
        </Text>

        <Animated.View
          style={[
            styles.card,
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          <Text style={styles.cardTitle}>Card animado</Text>
          <Text style={styles.cardText}>
            Este bloco aparece com fade e deslocamento vertical suave.
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
});
```

---

## Exemplo — Botão com feedback de escala

### `App.tsx`

```tsx
import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.content}>
        <Text style={styles.title}>Feedback visual</Text>

        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable onPressIn={animateIn} onPressOut={animateOut} style={styles.button}>
            <Text style={styles.buttonText}>Pressione aqui</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
```

---

# 2. ThemeProvider + Context

## O que é

Em vez de espalhar cores e estilos pela aplicação, você centraliza o tema em um contexto.

Isso permite:

- reutilização
- manutenção simples
- troca de tema global
- base pronta para dark mode

---

## Exemplo — ThemeProvider simples

### `App.tsx`

```tsx
import React, { createContext, useContext, useMemo } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const lightTheme = {
  colors: {
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    primary: '#2563EB',
  },
};

// useMemo é um hook do React usado para memorizar (cachear) o resultado de um cálculo e evitar recomputações desnecessárias.
// useContext permite acessar valores de um Context diretamente em qualquer componente.

const ThemeContext = createContext(lightTheme);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useMemo(() => lightTheme, []);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  return useContext(ThemeContext);
}

function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>ThemeProvider</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          O tema é lido por qualquer componente da aplicação.
        </Text>
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
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
});
```

---

## Estrutura mental recomendada

No projeto real, normalmente você criaria algo como:

- `theme/tokens.ts`
- `theme/light.ts`
- `theme/dark.ts`
- `theme/ThemeProvider.tsx`
- `hooks/useTheme.ts`

Mas aqui usamos tudo em um só arquivo para estudo.

---

# 3. Acessibilidade

## Por que importa

Acessibilidade melhora a experiência para:

- leitores de tela
- pessoas com baixa visão
- pessoas com dificuldades motoras
- qualquer usuário em contexto real de uso

UI profissional também significa UI acessível.

---

## Boas práticas

- use textos claros
- garanta contraste suficiente
- não dependa apenas de cor
- defina `accessibilityLabel`
- defina `accessibilityRole`
- use áreas de toque confortáveis

---

## Exemplo — Botão acessível

### `App.tsx`

```tsx
import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.content}>
        <Text style={styles.title}>Acessibilidade</Text>
        <Text style={styles.subtitle}>
          Elementos precisam ser compreensíveis também para tecnologias assistivas.
        </Text>

        <Pressable
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel="Salvar configurações"
          accessibilityHint="Toque duas vezes para salvar as alterações atuais"
          onPress={() => Alert.alert('Salvo com sucesso')}
        >
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    minHeight: 52,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
```

---

## Outros pontos importantes

- imagens importantes devem ter descrição acessível
- campos devem ter labels claras
- mensagens de erro precisam ser objetivas
- tamanho do texto deve continuar legível
- foco e navegação precisam ser previsíveis

---

# 4. Dark mode automático

## O que é

O app lê a preferência do sistema operacional e escolhe automaticamente o tema claro ou escuro.

No React Native isso pode ser feito com:

- `useColorScheme()`

---

## Exemplo — troca automática de tema

### `App.tsx`

```tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

const lightTheme = {
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#64748B',
};

const darkTheme = {
  background: '#020617',
  card: '#0F172A',
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
};

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Dark mode automático</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          O tema muda de acordo com a configuração do sistema.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
});
```

---

# 5. Design tokens dinâmicos

## O que são

Design tokens são valores centrais da interface, por exemplo:

- cores
- espaçamentos
- fontes
- bordas
- sombras

Tokens dinâmicos permitem trocar esses valores conforme o tema, contexto ou perfil do produto.

---

## Benefícios

- consistência
- escalabilidade
- mudança global rápida
- suporte real a múltiplos temas

---

## Exemplo — tokens dinâmicos por tema

### `App.tsx`

```tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

const tokens = {
  light: {
    colors: {
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#0F172A',
      textSecondary: '#64748B',
      primary: '#2563EB',
    },
    spacing: {
      md: 16,
      lg: 24,
    },
    radius: {
      md: 16,
      lg: 24,
    },
  },
  dark: {
    colors: {
      background: '#020617',
      surface: '#0F172A',
      text: '#F8FAFC',
      textSecondary: '#CBD5E1',
      primary: '#60A5FA',
    },
    spacing: {
      md: 16,
      lg: 24,
    },
    radius: {
      md: 16,
      lg: 24,
    },
  },
};

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? tokens.dark : tokens.light;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          padding: theme.spacing.lg,
        },
      ]}
    >
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          padding: theme.spacing.md,
        }}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Design tokens dinâmicos
        </Text>

        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          A interface usa tokens centrais que variam conforme o tema atual.
        </Text>

        <View
          style={{
            marginTop: theme.spacing.md,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.md,
            paddingVertical: 14,
            alignItems: 'center',
          }}
        >
          <Text style={styles.buttonText}>Ação principal</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
```

---

# Exemplo completo — ThemeProvider + dark mode + tokens dinâmicos

## Objetivo

Juntar tudo em uma base mais realista.

### `App.tsx`

```tsx
import React, { createContext, useContext, useMemo } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

const themes = {
  light: {
    colors: {
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#0F172A',
      textSecondary: '#64748B',
      primary: '#2563EB',
    },
    spacing: {
      md: 16,
      lg: 24,
    },
    radius: {
      md: 16,
      lg: 24,
    },
  },
  dark: {
    colors: {
      background: '#020617',
      surface: '#0F172A',
      text: '#F8FAFC',
      textSecondary: '#CBD5E1',
      primary: '#60A5FA',
    },
    spacing: {
      md: 16,
      lg: 24,
    },
    radius: {
      md: 16,
      lg: 24,
    },
  },
};

type ThemeType = typeof themes.light;

const ThemeContext = createContext<ThemeType>(themes.light);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const theme = useMemo(
    () => (scheme === 'dark' ? themes.dark : themes.light),
    [scheme]
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  return useContext(ThemeContext);
}

function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          padding: theme.spacing.lg,
        },
      ]}
    >
      <StatusBar
        barStyle={theme.colors.background === '#020617' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          padding: theme.spacing.md,
        }}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Base escalável
        </Text>

        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Tema global, dark mode automático e tokens reutilizáveis.
        </Text>

        <View
          accessible
          accessibilityRole="button"
          accessibilityLabel="Abrir painel"
          style={{
            marginTop: theme.spacing.md,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.md,
            paddingVertical: 14,
            alignItems: 'center',
          }}
        >
          <Text style={styles.buttonText}>Abrir painel</Text>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
```

---

# Arquitetura sugerida para projeto real

Uma organização comum seria:

```txt
src/
  theme/
    tokens.ts
    lightTheme.ts
    darkTheme.ts
    ThemeProvider.tsx
  hooks/
    useTheme.ts
  components/
    AppButton.tsx
    AppCard.tsx
    AppInput.tsx
    PageHeader.tsx
  screens/
    Home/
      index.tsx
```

---

# Regras práticas para nível enterprise

## Animações
- use com propósito
- mantenha rápidas
- evite exagero

## Tema
- nunca espalhe cor hardcoded sem critério
- centralize tudo em tema/tokens

## Acessibilidade
- todo botão importante deve ter papel e descrição quando necessário
- contraste deve ser suficiente
- áreas tocáveis devem ser confortáveis

## Dark mode
- trate como parte do produto, não como extra
- valide contraste no tema escuro

## Tokens dinâmicos
- use para cores, espaçamentos, bordas e sombras
- evite valores soltos por toda a aplicação

---

# Exercícios sugeridos

## Exercício 1
Crie um `AppButton` que consuma o tema pelo contexto.

## Exercício 2
Crie um `PageHeader` que mude automaticamente entre light e dark.

## Exercício 3
Adicione `fontSize` e `shadow` dentro dos design tokens.

## Exercício 4
Crie uma tela com dois cards animados entrando em sequência.

## Exercício 5
Monte uma tela acessível com:
- título
- descrição
- botão principal
- botão secundário

---

# Conclusão

Esses tópicos levam sua UI para um nível muito mais profissional:

- animações trazem fluidez
- ThemeProvider organiza a identidade visual
- acessibilidade melhora qualidade real do produto
- dark mode torna a experiência moderna
- tokens dinâmicos deixam a base escalável

Esse é o tipo de fundação que sustenta aplicações React Native com cara de produto maduro.

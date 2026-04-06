# 🚀 React Native — UI Profissional: Bibliotecas Úteis

Guia prático com foco em bibliotecas que ajudam a construir interfaces mais profissionais no React Native.

A proposta deste material é mostrar **quais bibliotecas valem a pena conhecer**, **para que servem**, **quando usar** e trazer **exemplos prontos em um único `App.tsx`** sempre que possível.

---

# Objetivos da aula

Você vai conhecer bibliotecas úteis para:

- componentes de interface
- navegação
- ícones
- animações
- bottom sheet
- formulários
- listas
- gráficos
- temas
- feedback visual

---

# Antes de começar

Nem toda biblioteca deve entrar no projeto.

Uma UI profissional não significa usar muitas bibliotecas.
Significa usar as bibliotecas certas, com critério.

Sempre avalie:

- maturidade da biblioteca
- documentação
- comunidade
- frequência de atualização
- compatibilidade com Expo ou React Native CLI
- impacto na arquitetura do projeto

---

# 1. `react-native-vector-icons`

## Para que serve

É uma das bibliotecas mais conhecidas para trabalhar com ícones.

Com ícones, você consegue melhorar:

- menus
- headers
- botões
- listas
- navegação
- feedback visual

---

## Quando usar

Use quando precisar de:

- ícones consistentes
- interface mais profissional
- identidade visual melhor

---

## Exemplo

### Instalação

```bash
npm install react-native-vector-icons
```

> Em projetos Expo, normalmente é comum usar `@expo/vector-icons`.

### `App.tsx`

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from '@expo/vector-icons/MaterialIcons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Icon name="dashboard" size={32} color="#2563EB" />
        <Text style={styles.title}>Ícones profissionais</Text>
        <Text style={styles.subtitle}>
          Ícones ajudam a comunicar ações e melhorar a leitura da interface.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },
});
```

---

# 2. `@react-navigation/native`

## Para que serve

É a base de navegação em aplicações React Native.

Permite criar:

- pilha de telas
- tabs
- drawer
- navegação estruturada
- fluxos autenticados e públicos

---

## Quando usar

Praticamente em todo app real.

Sem navegação bem organizada, a UI do produto fica limitada.

---

## Exemplo mental de uso

Você normalmente combina:

- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`

### Instalação comum

```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
```

---

# 3. `react-native-reanimated`

## Para que serve

É uma das bibliotecas mais importantes para animações modernas no React Native.

Com ela você pode criar:

- entradas suaves
- microinterações
- bottom sheets
- transições
- elementos animados com melhor performance

---

## Quando usar

Use quando quiser animações mais maduras do que as básicas do `Animated`.

É muito comum em apps com aparência premium.

---

## Exemplo simples

### Instalação

```bash
npm install react-native-reanimated
```

### `App.tsx`

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown.duration(500)} style={styles.card}>
        <Text style={styles.title}>Reanimated</Text>
        <Text style={styles.subtitle}>
          Ideal para animações fluidas e interfaces mais sofisticadas.
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },
});
```

---

# 4. `react-native-gesture-handler`

## Para que serve

É essencial para interações mais avançadas com gestos.

Muito usada junto com:

- React Navigation
- Reanimated
- Bottom Sheet

---

## Ajuda em casos como

- swipe
- drag
- interações de toque mais complexas
- menus laterais
- gestos em listas

---

# 5. `@gorhom/bottom-sheet`

## Para que serve

É uma das bibliotecas mais populares para bottom sheets profissionais.

Bottom sheet é aquele painel que sobe da parte inferior da tela.

---

## Quando usar

Use quando quiser:

- filtros
- ações rápidas
- seleção de opções
- formulários rápidos
- experiência parecida com apps modernos

---

## Exemplo de uso

### Instalação

```bash
npm install @gorhom/bottom-sheet react-native-reanimated react-native-gesture-handler
```

### Cenários comuns

- abrir filtro de busca
- mostrar detalhes rápidos
- exibir ações do item
- substituir modal tradicional

---

# 6. `react-hook-form`

## Para que serve

Ajuda a construir formulários com mais controle e menos bagunça.

Muito útil para:

- validação
- controle de campos
- performance
- formulários escaláveis

---

## Quando usar

Sempre que o app começar a ter formulários mais reais:

- login
- cadastro
- edição
- filtros complexos
- múltiplos campos

---

## Exemplo

### Instalação

```bash
npm install react-hook-form
```

### `App.tsx`

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  name: string;
};

export default function App() {
  const { control } = useForm<FormData>({
    defaultValues: {
      name: '',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>react-hook-form</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
```

---

# 7. `zod`

## Para que serve

É excelente para validação de dados.

Muito usada junto com:

- `react-hook-form`

---

## Benefícios

- validação mais clara
- schemas reutilizáveis
- melhor organização
- integração boa com TypeScript

---

## Exemplo de ideia

```tsx
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha muito curta'),
});
```

---

# 8. `@shopify/flash-list`

## Para que serve

É uma alternativa moderna para listas performáticas.

Muito útil quando a aplicação trabalha com muitos itens.

---

## Quando usar

Use quando:

- a lista cresce muito
- precisa de melhor performance
- quer rolagem mais suave

---

## Exemplo

### Instalação

```bash
npm install @shopify/flash-list
```

### `App.tsx`

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

const data = Array.from({ length: 20 }, (_, index) => ({
  id: String(index),
  title: `Item ${index + 1}`,
}));

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={data}
        estimatedItemSize={70}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
});
```

---

# 9. `react-native-paper`

## Para que serve

É uma biblioteca de componentes prontos inspirados em Material Design.

Ajuda quando você quer produtividade com componentes como:

- botão
- input
- card
- dialog
- snackbar
- appbar

---

## Quando usar

É útil quando você quer:

- acelerar construção da interface
- usar componentes prontos
- manter consistência

---

## Observação

Ela é muito prática, mas você precisa avaliar se o estilo dela combina com a identidade do seu produto.

---

# 10. `native-base`

## Para que serve

É outra biblioteca de componentes pronta para interface.

Traz vários componentes e utilidades visuais.

---

## Quando usar

Pode ser útil para:

- prototipação rápida
- projetos que precisam de produtividade
- times que preferem biblioteca de UI pronta

---

# 11. `react-native-toast-message`

## Para que serve

Mostra feedback rápido ao usuário.

Exemplos:

- sucesso
- erro
- aviso
- confirmação

---

## Quando usar

Use para feedback não bloqueante.

Exemplo:
- “salvo com sucesso”
- “erro ao processar”
- “conexão restabelecida”

---

# 12. `react-native-modal`

## Para que serve

É uma alternativa mais rica ao modal padrão.

Permite criar modais com:

- animações melhores
- backdrop
- transições visuais
- abertura e fechamento mais elegantes

---

# 13. `victory-native`

## Para que serve

Biblioteca para gráficos em React Native.

Muito útil em:

- dashboards
- relatórios
- indicadores
- analytics

---

## Quando usar

Quando a UI precisa exibir dados visuais:

- barras
- linhas
- pizza
- comparação de métricas

---

# 14. `react-native-svg`

## Para que serve

Muitas bibliotecas visuais dependem dela.

É usada para:

- gráficos
- ícones customizados
- elementos vetoriais
- componentes visuais avançados

---

## Observação

Muitas vezes você não usa diretamente no começo, mas ela aparece como dependência importante no projeto.

---

# 15. `expo-linear-gradient` ou gradientes equivalentes

```bash
npx expo install expo-linear-gradient
```

## Para que serve

Ajuda a criar superfícies visuais mais ricas:

- botões
- banners
- headers
- cards destacados

---

## Exemplo

### `App.tsx`

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#2563EB', '#7C3AED']} style={styles.banner}>
        <Text style={styles.title}>Gradiente profissional</Text>
        <Text style={styles.subtitle}>
          Ótimo para áreas de destaque e identidade visual.
        </Text>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: 24,
  },
  banner: {
    borderRadius: 24,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#E2E8F0',
    lineHeight: 22,
  },
});
```

---

# Biblioteca por objetivo

## Para componentes prontos
- `react-native-paper`
- `native-base`

## Para navegação
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`

## Para ícones
- `react-native-vector-icons`
- `@expo/vector-icons`

## Para animações
- `react-native-reanimated`

## Para gestos
- `react-native-gesture-handler`

## Para bottom sheet
- `@gorhom/bottom-sheet`

## Para formulários
- `react-hook-form`
- `zod`

## Para listas performáticas
- `@shopify/flash-list`

## Para feedback visual
- `react-native-toast-message`
- `react-native-modal`

## Para gráficos
- `victory-native`
- `react-native-svg`

## Para superfícies ricas
- `expo-linear-gradient`

---

# Combinações muito boas para projetos reais

## Stack 1 — Produto moderno e flexível
- `@react-navigation/native`
- `react-native-reanimated`
- `react-native-gesture-handler`
- `@gorhom/bottom-sheet`
- `react-hook-form`
- `zod`
- `react-native-vector-icons`

## Stack 2 — Dashboard enterprise
- `@react-navigation/native`
- `react-native-vector-icons`
- `victory-native`
- `react-native-svg`
- `react-hook-form`
- `zod`
- `react-native-toast-message`

## Stack 3 — Protótipo rápido
- `react-native-paper`
- `@react-navigation/native`
- `react-hook-form`

---

# Critérios para escolher bibliotecas

Antes de adotar uma biblioteca, pergunte:

## 1. Ela resolve um problema real?
Não adicione só porque é famosa.

## 2. Ela combina com a arquitetura do projeto?
Uma biblioteca pode ser ótima, mas não encaixar no seu app.

## 3. Ela está viva?
Veja se há manutenção e uso ativo.

## 4. O time consegue manter?
Tecnologia boa também precisa ser viável no dia a dia.

## 5. É compatível com seu ambiente?
Expo e React Native CLI podem ter diferenças.

---

# Estratégia recomendada

Para começar um app com UI profissional, uma base muito boa seria:

- navegação com `@react-navigation/native`
- ícones com `react-native-vector-icons` ou `@expo/vector-icons`
- animações com `react-native-reanimated`
- formulários com `react-hook-form`
- validação com `zod`
- bottom sheet com `@gorhom/bottom-sheet`
- listas com `@shopify/flash-list`

Essa combinação já entrega uma base muito forte.

---

# Conclusão

Bibliotecas úteis aceleram muito a construção de uma UI profissional.

O segredo não está em usar tudo.
Está em escolher bem.

As mais estratégicas geralmente são:

- navegação
- ícones
- animações
- formulários
- validação
- listas performáticas
- feedback visual

Quando bem escolhidas, essas bibliotecas melhoram:

- produtividade
- consistência visual
- escalabilidade
- percepção de qualidade do produto

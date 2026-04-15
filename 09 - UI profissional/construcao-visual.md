# 🚀 React Native — UI Profissional (Construção Visual)

Este material foi criado como uma **aula prática de React Native** com foco em **UI profissional**, mostrando como construir interfaces visuais mais modernas, limpas e com aparência de produto real.

Todos os exemplos foram pensados para serem executados em um único arquivo:

- `App.tsx`

---

# 📚 Objetivo da aula

Nesta aula você vai aprender a construir interfaces com melhor percepção visual, trabalhando principalmente:

- hierarquia visual
- tipografia
- espaçamento
- cards
- botões
- headers
- listas visuais
- dashboard
- formulário moderno

A proposta é que você copie cada exemplo individualmente para o mesmo `App.tsx`, execute e observe o resultado visual.

---

# 🧠 O que é uma UI profissional?

Uma UI profissional não depende apenas de “deixar bonito”.

Ela precisa transmitir:

- clareza
- organização
- consistência
- contraste
- facilidade de leitura
- boa distribuição dos elementos na tela

Na prática, uma interface profissional normalmente possui:

- títulos fortes
- subtítulos bem definidos
- espaço em branco bem usado
- botões com destaque
- cards organizados
- cores com função
- alinhamento consistente

---

# 🛠 Estrutura usada

Os exemplos abaixo utilizam apenas recursos nativos do React Native:

- `View`
- `Text`
- `SafeAreaView`
- `ScrollView`
- `TouchableOpacity`
- `TextInput`
- `StyleSheet`
- `StatusBar`

Sem bibliotecas externas, para facilitar o estudo e a execução.

---

# Exemplo 1 — Estrutura visual profissional básica

## Objetivo

Criar uma tela limpa com:

- fundo suave
- título forte
- subtítulo
- card principal
- botão destacado

## App.tsx

```tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />

      <View style={styles.content}>
        <Text style={styles.badge}>UI Profissional</Text>

        <Text style={styles.title}>Construção visual no React Native</Text>

        <Text style={styles.subtitle}>
          Aprenda a criar interfaces modernas, limpas e com aparência de produto real.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fundamentos Visuais</Text>
          <Text style={styles.cardText}>
            Uma interface profissional depende de hierarquia, espaçamento, contraste e consistência.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Começar aula</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8EEFF',
    color: '#315EFB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 38,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
```

---

# Exemplo 2 — Hierarquia visual com header e ações

## Objetivo

Criar uma tela com:

- header elegante
- avatar fake
- boas proporções
- ações em destaque

## App.tsx

```tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, Anderson</Text>
          <Text style={styles.headerTitle}>Seu painel visual</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AS</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Destaque</Text>
          <Text style={styles.heroTitle}>Construa interfaces com aparência premium</Text>
          <Text style={styles.heroDescription}>
            Use contraste, espaço em branco e organização para aumentar a percepção de qualidade.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Explorar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Ver mais</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#111827',
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  body: {
    flex: 1,
    padding: 24,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },
  heroLabel: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    color: '#4338CA',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 32,
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 15,
  },
});
```

---

# Exemplo 3 — Cards com métricas estilo dashboard

## Objetivo

Montar um dashboard visual com:

- métricas
- cards bem distribuídos
- organização em grade

## App.tsx

```tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dashboard UI</Text>
        <Text style={styles.subtitle}>
          Exemplo de construção visual profissional para métricas.
        </Text>

        <View style={styles.grid}>
          <View style={styles.cardLarge}>
            <Text style={styles.cardLabel}>Receita mensal</Text>
            <Text style={styles.cardValue}>R$ 48.900</Text>
            <Text style={styles.cardInfo}>+12% em relação ao mês anterior</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.cardSmall}>
              <Text style={styles.cardLabel}>Clientes</Text>
              <Text style={styles.smallValue}>1.284</Text>
            </View>

            <View style={styles.cardSmall}>
              <Text style={styles.cardLabel}>Pedidos</Text>
              <Text style={styles.smallValue}>329</Text>
            </View>
          </View>

          <View style={styles.cardDark}>
            <Text style={styles.darkLabel}>Performance geral</Text>
            <Text style={styles.darkValue}>87%</Text>
            <Text style={styles.darkInfo}>
              Layouts bem estruturados aumentam legibilidade e percepção de qualidade.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 24,
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
  grid: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  cardLarge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  cardSmall: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 20,
  },
  cardLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: '#16A34A',
    fontWeight: '600',
  },
  smallValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  darkLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 10,
  },
  darkValue: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  darkInfo: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
  },
});
```

---

# Exemplo 4 — Lista profissional de opções

## Objetivo

Criar uma lista visualmente elegante com:

- ícone fake
- título
- descrição
- seta de navegação

## App.tsx

```tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const items = [
  {
    id: 1,
    icon: '🎨',
    title: 'Cores e contraste',
    description: 'Aprenda a destacar elementos importantes.',
  },
  {
    id: 2,
    icon: '📐',
    title: 'Espaçamento',
    description: 'Crie respiro visual entre blocos e componentes.',
  },
  {
    id: 3,
    icon: '🧱',
    title: 'Cards',
    description: 'Organize conteúdo de forma moderna e elegante.',
  },
  {
    id: 4,
    icon: '🔠',
    title: 'Tipografia',
    description: 'Defina hierarquia clara com pesos e tamanhos.',
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      <View style={styles.content}>
        <Text style={styles.title}>Elementos da UI profissional</Text>
        <Text style={styles.subtitle}>
          Cada item abaixo representa uma peça essencial de uma interface visual madura.
        </Text>

        <View style={styles.list}>
          {items.map((item) => (
            <TouchableOpacity key={item.id} style={styles.item}>
              <View style={styles.left}>
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>

                <View style={styles.textBox}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 24,
  },
  list: {
    gap: 14,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 24,
  },
  textBox: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  arrow: {
    fontSize: 28,
    color: '#9CA3AF',
    marginLeft: 12,
  },
});
```

---

# Exemplo 5 — Formulário com aparência moderna

## Objetivo

Criar um layout de formulário profissional com:

- header visual
- campos estilizados
- CTA principal
- boa separação visual

## App.tsx

```tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E293B" />

      <View style={styles.top}>
        <Text style={styles.topLabel}>Cadastro</Text>
        <Text style={styles.topTitle}>Monte formulários com UI profissional</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Criar conta</Text>
        <Text style={styles.formSubtitle}>
          Interfaces limpas transmitem mais confiança ao usuário.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
  },
  top: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 60,
  },
  topLabel: {
    alignSelf: 'flex-start',
    backgroundColor: '#334155',
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  topTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 36,
  },
  formCard: {
    marginHorizontal: 20,
    marginTop: -30,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 24,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
```

---

# Exemplo 6 — Tela estilo app real com seções

## Objetivo

Construir uma tela mais próxima de produto real com:

- cabeçalho
- seção de destaque
- atalhos
- lista recente

## App.tsx

```tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const shortcuts = ['Design', 'Layout', 'Tipografia', 'Cards'];
const recentItems = [
  'Criando headers elegantes',
  'Espaçamento e respiro visual',
  'Botões com peso visual',
  'Formulários modernos',
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>Bem-vindo</Text>
            <Text style={styles.title}>UI Profissional</Text>
          </View>

          <View style={styles.profile}>
            <Text style={styles.profileText}>UI</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>Aula em destaque</Text>
          <Text style={styles.bannerTitle}>Construção visual moderna no React Native</Text>
          <Text style={styles.bannerDescription}>
            Aprenda a combinar estrutura, contraste e organização para criar telas com aparência premium.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Atalhos</Text>
        <View style={styles.shortcutRow}>
          {shortcuts.map((item) => (
            <View key={item} style={styles.shortcutCard}>
              <Text style={styles.shortcutText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Conteúdo recente</Text>
        <View style={styles.list}>
          {recentItems.map((item) => (
            <View key={item} style={styles.listItem}>
              <View style={styles.dot} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallText: {
    color: '#64748B',
    fontSize: 13,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  profile: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  banner: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
  },
  bannerLabel: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E293B',
    color: '#CBD5E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 14,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 10,
  },
  bannerDescription: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  shortcutRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  shortcutCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  shortcutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  list: {
    gap: 12,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
    marginRight: 12,
  },
  listText: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '600',
  },
});
```

---

# 🎯 Fundamentos que deixam a UI mais profissional

## 1. Hierarquia visual

Use tamanhos e pesos diferentes para mostrar importância.

Exemplo de leitura visual:

- título principal: `28` a `32`
- subtítulo: `14` a `16`
- texto secundário: `12` a `14`

Quanto mais importante a informação, mais destaque ela precisa receber.

---

## 2. Espaçamento consistente

Espaçamento é um dos elementos que mais impactam a aparência profissional.

Use uma lógica previsível, como:

- `8`
- `12`
- `16`
- `20`
- `24`

Evite valores aleatórios em cada componente.

---

## 3. Tipografia bem definida

A tipografia ajuda a organizar a leitura.

Boas práticas:

- títulos com `fontWeight: '800'`
- subtítulos com cores secundárias
- textos longos com `lineHeight`
- evitar excesso de tamanhos diferentes

---

## 4. Cores com função

As cores precisam ter papéis claros:

- fundo geral
- superfície/card
- texto principal
- texto secundário
- ação principal
- estado de sucesso/alerta

Uma UI profissional não usa cor apenas por estética, mas por função.

---

## 5. Bordas arredondadas

Interfaces modernas costumam usar bastante arredondamento visual.

Valores comuns:

- `12`
- `14`
- `16`
- `20`
- `24`

Isso ajuda a deixar a interface mais moderna e agradável.

---

## 6. Profundidade visual

Cards e blocos podem ganhar destaque usando:

- `shadowColor`
- `shadowOffset`
- `shadowOpacity`
- `shadowRadius`
- `elevation`

Use com moderação. Muito excesso deixa a tela poluída.

---

## 7. Contraste

O usuário precisa identificar rapidamente:

- o que é título
- o que é conteúdo
- o que é ação
- o que é secundário

Por isso, contraste é essencial entre:

- fundo e card
- botão e texto
- título e descrição

---

# ✅ Checklist de UI profissional

Antes de considerar uma tela pronta, revise:

- o título principal está claro?
- existe respiro entre os blocos?
- os elementos estão alinhados?
- o botão principal chama atenção?
- os cards possuem boa separação visual?
- o texto está fácil de ler?
- a tela parece consistente do começo ao fim?

---

# 📈 Ordem sugerida de estudo

Você pode estudar os exemplos nesta sequência:

1. Estrutura visual básica
2. Header com hierarquia
3. Cards e blocos visuais
4. Dashboard
5. Lista de opções
6. Formulário moderno
7. Tela completa estilo app real


# 🚀 React Native — UI Profissional: Design System, Layout Responsivo e Dashboard Enterprise

Guia avançado para construção de aplicações com padrão **enterprise**.

---

# 🎯 Objetivo

Este material une 3 pilares fundamentais:

- 🎨 Design System
- 📱 Layout Responsivo
- 📊 Dashboard Enterprise

---

# 🎨 PARTE 1 — Design System

## O que é

Um Design System é um conjunto de:

- cores
- tipografia
- espaçamentos
- componentes
- regras visuais

---

## Exemplo — Tokens + Tema

### `App.tsx`

```tsx
import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';

const theme = {
  colors: {
    primary: '#0F172A',
    secondary: '#1E293B',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 16,
    lg: 24,
  },
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: theme.spacing.lg }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: theme.colors.text }}>
          Design System
        </Text>
        <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>
          Tokens centralizados garantem consistência visual.
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

---

# 📱 PARTE 2 — Layout Responsivo

## Conceito

Layouts devem se adaptar a:

- celulares pequenos
- celulares grandes
- tablets

---

## Exemplo — Responsivo com Dimensions

```tsx
import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const isTablet = width > 768;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Layout Responsivo</Text>

      <View style={[styles.grid, isTablet && styles.gridTablet]}>
        <View style={styles.card}>
          <Text>Card 1</Text>
        </View>
        <View style={styles.card}>
          <Text>Card 2</Text>
        </View>
        <View style={styles.card}>
          <Text>Card 3</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'column',
    gap: 12,
  },
  gridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    flex: 1,
  },
});
```

---

# 📊 PARTE 3 — Dashboard Enterprise

## Objetivo

Criar uma tela real de produto:

- métricas
- organização em grid
- leitura rápida
- estrutura profissional

---

## Exemplo — Dashboard

```tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';

function MetricCard({ label, value }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dashboard Enterprise</Text>

        <View style={styles.grid}>
          <MetricCard label="Receita" value="R$ 120k" />
          <MetricCard label="Clientes" value="1.2k" />
          <MetricCard label="Pedidos" value="340" />
          <MetricCard label="Conversão" value="8.4%" />
        </View>

        <View style={styles.bigCard}>
          <Text style={styles.bigText}>
            Dashboards devem priorizar leitura rápida e organização.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  content: { padding: 24 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 24 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 16,
  },
  label: { color: '#64748B', marginBottom: 8 },
  value: { fontSize: 24, fontWeight: '800' },
  bigCard: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 20,
  },
  bigText: { color: '#FFF', fontSize: 16 },
});
```

---

# 🧠 Boas práticas Enterprise

## Design System
- nunca hardcode cores espalhadas
- use tokens centralizados

## Responsividade
- use breakpoints simples
- pense em tablet desde o início

## Dashboard
- destaque métricas principais
- use grid consistente
- evite poluição visual

---

# 🚀 Conclusão

Esses três pilares transformam sua UI:

- Design System → consistência
- Responsividade → adaptabilidade
- Dashboard → valor de negócio
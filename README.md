# 🚀 React Native — UI Profissional: Componentes Reutilizáveis

Guia prático com foco em **componentização**, **consistência visual** e **reuso** no React Native.

A ideia desta aula é mostrar como construir uma UI profissional usando **componentes reutilizáveis**, sempre com exemplos que podem ser executados em **um único arquivo `App.tsx`**.

---

# Objetivos da aula

Você vai aprender a criar e reutilizar:

- botões padronizados
- cards reutilizáveis
- headers
- inputs
- seções
- listas com item reutilizável
- telas mais organizadas e escaláveis

---

# Por que componentes reutilizáveis importam

Quando a interface cresce, copiar e colar código começa a gerar problemas:

- inconsistência visual
- manutenção difícil
- duplicação desnecessária
- mais chance de erro
- evolução lenta da UI

Com componentes reutilizáveis, você ganha:

- padronização
- produtividade
- organização
- escalabilidade
- aparência mais profissional

---

# Exemplo 1 — Botão reutilizável

## Objetivo

Criar um botão padrão para ser usado em vários lugares da aplicação.

## O que esse exemplo ensina

- como criar um componente local dentro do `App.tsx`
- como passar propriedades
- como manter o visual consistente
- como variar estilo sem duplicar código

## `App.tsx`

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

type ButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary';
};

function AppButton({ title, variant = 'primary' }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'primary'
            ? styles.buttonTextPrimary
            : styles.buttonTextSecondary,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.content}>
        <Text style={styles.title}>Botão reutilizável</Text>
        <Text style={styles.subtitle}>
          Um mesmo componente pode ser usado em vários contextos sem repetir layout.
        </Text>

        <View style={styles.group}>
          <AppButton title="Salvar" />
          <AppButton title="Cancelar" variant="secondary" />
          <AppButton title="Continuar" />
        </View>
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
  group: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#0F172A',
  },
  buttonSecondary: {
    backgroundColor: '#E2E8F0',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
  },
  buttonTextSecondary: {
    color: '#0F172A',
  },
});
```

---

# Exemplo 2 — Card reutilizável

## Objetivo

Criar um card genérico que recebe título, descrição e valor.

## O que esse exemplo ensina

- separar estrutura visual em componente
- reaproveitar o mesmo layout para diferentes conteúdos
- manter padrão visual de dashboard

## `App.tsx`

```tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type InfoCardProps = {
  label: string;
  value: string;
  description: string;
};

function InfoCard({ label, value, description }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1F5F9" />

      <View style={styles.content}>
        <Text style={styles.title}>Cards reutilizáveis</Text>
        <Text style={styles.subtitle}>
          O mesmo componente pode apresentar métricas diferentes sem perder consistência.
        </Text>

        <View style={styles.cards}>
          <InfoCard
            label="Vendas"
            value="R$ 18.400"
            description="Resultado acumulado desta semana"
          />
          <InfoCard
            label="Clientes"
            value="284"
            description="Novos clientes no período"
          />
          <InfoCard
            label="Conversão"
            value="12,8%"
            description="Taxa média da campanha atual"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
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
  cards: {
    gap: 14,
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
  cardLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});
```

---

# Exemplo 3 — Input reutilizável

## Objetivo

Criar um campo de formulário reutilizável e consistente.

## O que esse exemplo ensina

- reduzir duplicação em formulários
- padronizar labels e inputs
- facilitar manutenção

## `App.tsx`

```tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type AppInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
};

function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
}: AppInputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.content}>
        <Text style={styles.title}>Inputs reutilizáveis</Text>
        <Text style={styles.subtitle}>
          Um único componente deixa o formulário limpo e padronizado.
        </Text>

        <AppInput
          label="Nome"
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
        />

        <AppInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
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
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0F172A',
  },
});
```

---

# Exemplo 4 — Header reutilizável

## Objetivo

Criar um cabeçalho padrão para várias telas.

## O que esse exemplo ensina

- centralizar identidade visual
- reaproveitar blocos de topo
- deixar o app mais consistente

## `App.tsx`

```tsx
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <PageHeader
        eyebrow="UI Profissional"
        title="Header reutilizável"
        subtitle="Use a mesma estrutura visual em diferentes telas do produto."
      />

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Esse conteúdo fica abaixo de um header padronizado e elegante.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
  },
  header: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E293B',
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
  },
  body: {
    flex: 1,
    padding: 24,
  },
  card: {
    marginTop: -18,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  cardText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
});
```

---

# Exemplo 5 — Item de lista reutilizável

## Objetivo

Criar um item de lista reutilizável para menus, configurações ou módulos.

## O que esse exemplo ensina

- transformar um item visual em componente
- facilitar criação de listas consistentes
- melhorar organização da UI

## `App.tsx`

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

type MenuItemProps = {
  icon: string;
  title: string;
  description: string;
};

function MenuItem({ icon, title, description }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <View style={styles.textBox}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>
      </View>

      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.content}>
        <Text style={styles.title}>Itens reutilizáveis</Text>
        <Text style={styles.subtitle}>
          Ideal para menus, preferências, módulos e listas de navegação.
        </Text>

        <View style={styles.list}>
          <MenuItem
            icon="👤"
            title="Perfil"
            description="Gerencie seus dados pessoais"
          />
          <MenuItem
            icon="🔔"
            title="Notificações"
            description="Controle alertas e avisos"
          />
          <MenuItem
            icon="🔐"
            title="Segurança"
            description="Ajuste senha e permissões"
          />
        </View>
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
    backgroundColor: '#E2E8F0',
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
    color: '#0F172A',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  arrow: {
    fontSize: 28,
    color: '#94A3B8',
    marginLeft: 12,
  },
});
```

---

# Exemplo 6 — Seção reutilizável com composição

## Objetivo

Criar uma tela mais próxima de app real usando vários componentes pequenos.

## O que esse exemplo ensina

- composição de componentes
- organização da UI em blocos menores
- tela escalável e profissional

## `App.tsx`

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

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

type StatCardProps = {
  label: string;
  value: string;
};

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Composição de componentes</Text>
        <Text style={styles.subtitle}>
          A UI profissional nasce da soma de pequenos componentes reutilizáveis.
        </Text>

        <Section title="Indicadores">
          <View style={styles.row}>
            <StatCard label="Pedidos" value="128" />
            <StatCard label="Clientes" value="54" />
          </View>
        </Section>

        <Section title="Categorias">
          <View style={styles.tagRow}>
            <Tag text="Design" />
            <Tag text="Componentes" />
            <Tag text="Formulários" />
            <Tag text="Dashboard" />
          </View>
        </Section>

        <Section title="Resumo">
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              Em vez de montar toda a tela diretamente no JSX principal, quebre em
              blocos pequenos. Isso melhora leitura, manutenção e reuso.
            </Text>
          </View>
        </Section>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
});
```

---

# Boas práticas para componentes reutilizáveis

## 1. Dê nomes claros

Prefira nomes como:

- `AppButton`
- `PageHeader`
- `InfoCard`
- `MenuItem`
- `AppInput`

Evite nomes genéricos demais como:

- `Component1`
- `Box`
- `Test`
- `Elemento`

---

## 2. Passe apenas props necessárias

Um componente reutilizável deve ser simples de usar.

Exemplo bom:

```tsx
<AppButton title="Salvar" variant="primary" />
```

Evite componentes que exijam props demais sem necessidade.

---

## 3. Centralize estilos visuais

Se todo botão principal do app tiver a mesma identidade, mantenha isso no componente e não espalhado na tela.

---

## 4. Use composição

Às vezes é melhor compor a interface com pequenos componentes do que criar um único componente gigante.

Exemplo:

- `PageHeader`
- `Section`
- `StatCard`
- `Tag`
- `MenuItem`

Juntos, eles formam uma tela maior.

---

## 5. Mantenha consistência

Defina padrões para:

- bordas
- espaçamento
- tamanhos de fonte
- pesos de texto
- cores
- altura de botões e inputs

---

## 6. Pense em escalabilidade

Hoje você pode ter uma tela pequena. Amanhã pode ter 20 telas.

Se os componentes já estiverem bem definidos, a evolução fica muito mais simples.

---

# Estrutura mental recomendada

Quando for criar uma UI, pense assim:

## Primeiro nível — componentes base

- botão
- input
- card
- badge
- tag
- divider

## Segundo nível — componentes compostos

- header
- item de lista
- card de estatística
- card de produto
- bloco de formulário

## Terceiro nível — telas

- dashboard
- perfil
- configurações
- cadastro
- detalhes

---

# Benefícios práticos no projeto real

Em projetos enterprise, componentes reutilizáveis ajudam a:

- acelerar desenvolvimento
- reduzir bugs visuais
- facilitar manutenção
- padronizar a identidade do produto
- melhorar onboarding de novos devs
- simplificar refatorações

---

# Exercícios sugeridos

## Exercício 1
Crie um `AppButton` com 3 variantes:

- primary
- secondary
- danger

## Exercício 2
Crie um `ProfileCard` reutilizável com:

- nome
- cargo
- e-mail

## Exercício 3
Crie um `Section` que receba:

- título
- subtítulo
- children

## Exercício 4
Monte uma tela completa usando apenas componentes reutilizáveis.

---

# Conclusão

UI profissional não é só aparência.

É também:

- organização
- consistência
- escalabilidade
- clareza de código

Quando você cria componentes reutilizáveis, sua aplicação fica mais madura tanto visualmente quanto tecnicamente.

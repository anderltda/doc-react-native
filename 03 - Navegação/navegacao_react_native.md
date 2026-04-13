# 🚀 Aula: Navegação no React Native (React Navigation)

Guia prático com exemplos executáveis usando **React Navigation** para construir navegação profissional em apps React Native.

---

# 📚 Conteúdo

- Stack Navigation (base)
- Passagem de parâmetros
- Tipagem com TypeScript
- Bottom Tabs
- Navegação aninhada (Stack + Tabs)
- Navegação programática
- Padrões profissionais

---

# 🛠️ Instalação

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
```

---

# 1) Stack Navigation

```tsx
import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Ir para Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

function DetailsScreen({ navigation }: any) {
  return (
    <View>
      <Text>Details</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

# 2) Passando parâmetros

```tsx
import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View>
      <Button
        title="Abrir detalhes"
        onPress={() =>
          navigation.navigate('Details', {
            userId: 10,
            name: 'Anderson',
          })
        }
      />
    </View>
  );
}

function DetailsScreen({ route }: any) {
  const { userId, name } = route.params;

  return (
    <View>
      <Text>ID: {userId}</Text>
      <Text>Nome: {name}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

# 3) Tipagem com TypeScript

```tsx
import React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

/**
 * 1) Definição central das rotas e parâmetros
 */
type RootStackParamList = {
  Home: undefined;
  Details: {
    userId: number;
    name: string;
  };
};

/**
 * 2) Criando Stack tipado
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * 3) Tipagem da Home
 */
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: HomeProps) {
  return (
    <View>
      <Button
        title="Abrir detalhes"
        onPress={() =>
          navigation.navigate('Details', {
            userId: 10,
            name: 'Anderson',
          })
        }
      />
    </View>
  );
}

/**
 * 4) Tipagem da Details
 */
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({ route }: DetailsProps) {
  const { userId, name } = route.params;

  return (
    <View>
      <Text>ID: {userId}</Text>
      <Text>Nome: {name}</Text>
    </View>
  );
}

/**
 * 5) App principal
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

# 4) Bottom Tabs

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

---

# 5) Navegação aninhada

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  NavigationContainer,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

/**
 * Rotas da stack interna da aba Home.
 */
type HomeStackParamList = {
  Home: {
    welcomeMessage?: string;
  };
  Details: {
    userId: number;
    name: string;
  };
};

/**
 * Rotas das tabs principais.
 * HomeTab recebe params para a stack interna.
 * Profile também recebe params.
 */
type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Profile: {
    userName: string;
    plan: string;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

type DetailsScreenRouteProp = RouteProp<HomeStackParamList, 'Details'>;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

type ProfileScreenProps = BottomTabScreenProps<RootTabParamList, 'Profile'>;

/**
 * Tela Home da stack interna.
 */
function HomeScreen({ navigation, route }: HomeScreenProps) {
  const welcomeMessage =
    route.params?.welcomeMessage ?? 'Bem-vindo à aba Home';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.text}>{welcomeMessage}</Text>

      <View style={styles.spacer} />

      <Button
        title="Ir para Details com parâmetros"
        onPress={() =>
          navigation.navigate('Details', {
            userId: 10,
            name: 'Anderson',
          })
        }
      />
    </View>
  );
}

/**
 * Tela Details da stack interna.
 */
function DetailsScreen({ route }: DetailsScreenProps) {
  const { userId, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.text}>ID: {userId}</Text>
      <Text style={styles.text}>Nome: {name}</Text>
    </View>
  );
}

/**
 * Tela Profile da tab principal.
 */
function ProfileScreen({ route }: ProfileScreenProps) {
  const userName = route.params?.userName ?? 'Usuário não informado';
  const plan = route.params?.plan ?? 'Plano não informado';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Usuário: {userName}</Text>
      <Text style={styles.text}>Plano: {plan}</Text>
    </View>
  );
}

/**
 * Stack interna da aba Home.
 */
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Início' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Detalhes' }}
      />
    </Stack.Navigator>
  );
}

/**
 * Navegação principal.
 */
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HomeTab">
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          initialParams={{
            screen: 'Home',
            params: {
              welcomeMessage: 'Mensagem enviada pela Tab para a Home',
            },
          }}
          options={{ title: 'Home' }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{
            userName: 'Anderson Silva',
            plan: 'Premium',
          }}
          options={{ title: 'Perfil' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 6,
  },
  spacer: {
    height: 16,
  },
});
```

---

# 6) Navegação programática

```tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * Tipagem das rotas da aplicação.
 */
type RootStackParamList = {
  Home: undefined;
  Details: {
    userId: number;
    name: string;
  };
  Profile: {
    userName: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Referência global da navegação.
 */
const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Função de navegação programática global.
 */
function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

/**
 * Exemplo de "service" fora do React que dispara navegação.
 */
function fakeServiceRedirect() {
  console.log('Executando redirecionamento via service...');
  navigate('Profile', {
    userName: 'Anderson (via service)',
  });
}

/**
 * Tela Home.
 */
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Button
        title="Ir para Details"
        onPress={() =>
          navigate('Details', {
            userId: 10,
            name: 'Anderson',
          })
        }
      />

      <View style={styles.spacer} />

      <Button
        title="Ir para Profile via service"
        onPress={() => fakeServiceRedirect()}
      />
    </View>
  );
}

/**
 * Tela Details.
 */
function DetailsScreen({ route }: any) {
  const { userId, name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.text}>ID: {userId}</Text>
      <Text style={styles.text}>Nome: {name}</Text>
    </View>
  );
}

/**
 * Tela Profile.
 */
function ProfileScreen({ route }: any) {
  const userName = route.params?.userName ?? 'Usuário padrão';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Usuário: {userName}</Text>
    </View>
  );
}

/**
 * App principal.
 */
export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Perfil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  spacer: {
    height: 16,
  },
});
```

---

# 🧠 Padrões profissionais

## Estrutura

```bash
src/
  navigation/
    index.tsx
    types.ts
    stacks/
    tabs/
```

## Tipagem centralizada

```tsx
export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
};
```

---

# 🧾 Resumo

- Stack Navigation
- Params
- TypeScript
- Tabs
- Nested Navigation
- Navegação programática

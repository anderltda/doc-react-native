export interface ReadmeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  isCommand: boolean;
}

export interface ReadmeDoc {
  slug: string;
  title: string;
  sourcePath: string;
  summary: string;
  playfulHint: string;
  dependencies: string[];
  usage: string[];
  snippets: ReadmeSnippet[];
}

export const README_DOCS: ReadmeDoc[] = [
  {
    "slug": "roadmap-geral",
    "title": "00 - Roadmap Geral",
    "sourcePath": "README.md",
    "summary": "Visao geral do roadmap com exemplos do basico ao avancado em React Native, Expo e TypeScript.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom",
      "react-native-safe-area-context",
      "@react-navigation/native",
      "@react-navigation/native-stack",
      "react-native-screens",
      "axios",
      "@react-native-async-storage/async-storage",
      "expo-camera"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template Navigation (typescript)",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web",
      "npx expo install react-native-safe-area-context",
      "npm install @react-navigation/native"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template Navigation (typescript)\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      },
      {
        "id": "snippet-5",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nfunction saudacao(nome: string): string {\r\n  return `Olá, ${nome}`;\r\n}\r\n\r\nconst soma = (a: number, b: number): number => a + b;\r\n\r\ntype Status = 'loading' | 'success' | 'error';\r\n\r\nenum StatusEnum {\r\n  ACTIVE = 'ACTIVE',\r\n  INACTIVE = 'INACTIVE',\r\n  PENDING = 'PENDING',\r\n}\r\n\r\nenum Role {\r\n  ADMIN = 'ADMIN',\r\n  USER = 'USER',\r\n}\r\n\r\ninterface User {\r\n  name: string;\r\n  role: Role;\r\n}\r\n\r\nconst user: User = {\r\n  name: 'Anderson',\r\n  role: Role.ADMIN,\r\n};\r\n\r\nexport default function App() {\r\n  const mensagem = saudacao('Anderson');\r\n  const total = soma(10, 5);\r\n  const status: Status = 'success';\r\n  const statusEnum = StatusEnum.ACTIVE;\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>{mensagem}</Text>\r\n      <Text>Total: {total}</Text>\r\n      <Text>Status: {status}</Text>\r\n      <Text>Status Enum: {statusEnum}</Text>\r\n      <Text>User Role: {user.role}</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-6",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\ninterface Animal {\r\n  name: string;\r\n  makeSound(): string;\r\n}\r\n\r\nclass Dog implements Animal {\r\n  constructor(public name: string) {}\r\n\r\n  makeSound(): string {\r\n    return 'Au au';\r\n  }\r\n}\r\n\r\nclass Vehicle {\r\n  constructor(public brand: string) {}\r\n}\r\n\r\nclass Car extends Vehicle {\r\n  constructor(brand: string, public model: string) {\r\n    super(brand);\r\n  }\r\n}\r\n\r\ninterface User {\r\n  readonly id: number;\r\n  name?: string;\r\n}\r\n\r\nexport default function App() {\r\n  const dog = new Dog('Rex');\r\n  const car = new Car('Toyota', 'Corolla');\r\n\r\n  const user: User = {\r\n    id: 1,\r\n    name: 'Anderson',\r\n  };\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>{dog.name} faz {dog.makeSound()}</Text>\r\n      <Text>{car.brand} - {car.model}</Text>\r\n      <Text>ID: {user.id}</Text>\r\n      <Text>Nome: {user.name ?? 'Não informado'}</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-7",
        "title": "Exemplo isolado — `readonly`",
        "language": "tsx",
        "code": "interface User {\r\n  readonly id: number;\r\n  name: string;\r\n}\r\n\r\nconst user: User = {\r\n  id: 1,\r\n  name: 'Anderson',\r\n};\r\n\r\n// ❌ erro\r\n// user.id = 2;",
        "isCommand": false
      },
      {
        "id": "snippet-8",
        "title": "Exemplo isolado — `optional`",
        "language": "tsx",
        "code": "interface User {\r\n  id: number;\r\n  name?: string;\r\n}\r\n\r\nconst user: User = {\r\n  id: 1,\r\n};",
        "isCommand": false
      },
      {
        "id": "snippet-9",
        "title": "💻 Exemplo (App) — if / else",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const age: number = 20;\r\n  let message: string = '';\r\n\r\n  if (age >= 18) {\r\n    message = 'Maior de idade';\r\n  } else {\r\n    message = 'Menor de idade';\r\n  }\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>{message}</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-10",
        "title": "💻 Exemplo (App) — operador ternário",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const isLogged: boolean = true;\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>{isLogged ? 'Usuário logado' : 'Usuário não logado'}</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-11",
        "title": "💻 Exemplo (App) — switch",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const status: string = 'success';\r\n  let message: string = '';\r\n\r\n  switch (status) {\r\n    case 'loading':\r\n      message = 'Carregando';\r\n      break;\r\n    case 'success':\r\n      message = 'Sucesso';\r\n      break;\r\n    case 'error':\r\n      message = 'Erro';\r\n      break;\r\n    default:\r\n      message = 'Status desconhecido';\r\n  }\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>{message}</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-12",
        "title": "💻 Exemplo (App) — for",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const items: string[] = [];\r\n\r\n  for (let i = 1; i <= 5; i++) {\r\n    items.push(`Item ${i}`);\r\n  }\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      {items.map((item, index) => (\r\n        <Text key={index}>{item}</Text>\r\n      ))}\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-13",
        "title": "💻 Exemplo (App) — while",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  let count = 1;\r\n  const values: string[] = [];\r\n\r\n  while (count <= 3) {\r\n    values.push(`Valor ${count}`);\r\n    count++;\r\n  }\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      {values.map((value, index) => (\r\n        <Text key={index}>{value}</Text>\r\n      ))}\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-14",
        "title": "💻 Exemplo (App) — map",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const names: string[] = ['Anderson', 'Maria', 'João'];\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      {names.map((name, index) => (\r\n        <Text key={index}>{name}</Text>\r\n      ))}\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-15",
        "title": "💻 Exemplo (App) — filter",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const numbers: number[] = [10, 15, 20, 25, 30];\r\n  const filtered = numbers.filter((n) => n >= 20);\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      {filtered.map((n, index) => (\r\n        <Text key={index}>{n}</Text>\r\n      ))}\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-16",
        "title": "💻 Exemplo (App) — find",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\ninterface User {\r\n  id: number;\r\n  name: string;\r\n}\r\n\r\nexport default function App() {\r\n  const users: User[] = [\r\n    { id: 1, name: 'Anderson' },\r\n    { id: 2, name: 'Maria' },\r\n  ];\r\n\r\n  const user = users.find((item) => item.id === 2);\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>{user ? user.name : 'Usuário não encontrado'}</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-17",
        "title": "💻 Exemplo (App) — operadores lógicos",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const isAdmin = true;\r\n  const isActive = true;\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>{isAdmin && isActive ? 'Acesso liberado' : 'Acesso negado'}</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-18",
        "title": "💻 Exemplo (App) — optional chaining",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\ninterface Address {\r\n  city: string;\r\n}\r\n\r\ninterface User {\r\n  name: string;\r\n  address?: Address;\r\n}\r\n\r\nexport default function App() {\r\n  const user: User = {\r\n    name: 'Anderson',\r\n  };\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>Nome: {user.name}</Text>\r\n      <Text>Cidade: {user.address?.city ?? 'Não informada'}</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-19",
        "title": "💻 Exemplo (App) — if dentro da função",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const isLogged = true;\r\n\r\n  if (!isLogged) {\r\n    return (\r\n      <View style={{ padding: 20 }}>\r\n        <Text>Usuário não logado</Text>\r\n      </View>\r\n    );\r\n  }\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>Bem-vindo!</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-20",
        "title": "💻 Exemplo (App) — operador ternário",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const isLogged = true;\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>{isLogged ? 'Bem-vindo!' : 'Faça login'}</Text>\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-21",
        "title": "💻 Exemplo (App) — renderização condicional com `&&`",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const isAdmin = true;\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      {isAdmin && <Text>Área de admin</Text>}\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-22",
        "title": "💻 Exemplo (App) — condição com função",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const role = 'ADMIN';\r\n\r\n  function renderContent() {\r\n    if (role === 'ADMIN') return <Text>Admin</Text>;\r\n    if (role === 'USER') return <Text>Usuário</Text>;\r\n    return <Text>Visitante</Text>;\r\n  }\r\n\r\n  return <View style={{ padding: 20 }}>{renderContent()}</View>;\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-23",
        "title": "💻 Exemplo (App) — loops com `map`",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const users = ['Anderson', 'Maria', 'João'];\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      {users.map((user, index) => (\r\n        <Text key={index}>{user}</Text>\r\n      ))}\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-24",
        "title": "💻 Exemplo (App) — lista com objetos",
        "language": "tsx",
        "code": "import { View, Text } from 'react-native';\r\n\r\ninterface User {\r\n  id: number;\r\n  name: string;\r\n}\r\n\r\nexport default function App() {\r\n  const users: User[] = [\r\n    { id: 1, name: 'Anderson' },\r\n    { id: 2, name: 'Maria' },\r\n  ];\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      {users.map((user) => (\r\n        <Text key={user.id}>{user.name}</Text>\r\n      ))}\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-25",
        "title": "💻 Exemplo (App) — condição + loop + estado",
        "language": "tsx",
        "code": "import { useState } from 'react';\r\nimport { View, Text, Button } from 'react-native';\r\n\r\nexport default function App() {\r\n  const [show, setShow] = useState(true);\r\n\r\n  const users = ['Anderson', 'Maria', 'João'];\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Button title=\"Toggle\" onPress={() => setShow(!show)} />\r\n\r\n      {show ? (\r\n        users.map((user, index) => <Text key={index}>{user}</Text>)\r\n      ) : (\r\n        <Text>Lista escondida</Text>\r\n      )}\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-26",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import { View, Text, TextInput, Button } from 'react-native';\r\nimport { useState } from 'react';\r\n\r\nexport default function App() {\r\n  const [name, setName] = useState<string>('');\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>Digite seu nome:</Text>\r\n      <TextInput\r\n        value={name}\r\n        onChangeText={setName}\r\n        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}\r\n        placeholder=\"Seu nome\"\r\n      />\r\n      <Button title=\"Mostrar\" onPress={() => alert(name)} />\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-27",
        "title": "Instalação",
        "language": "bash",
        "code": "npx expo install react-native-safe-area-context",
        "isCommand": true
      },
      {
        "id": "snippet-28",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import { View, Text, StyleSheet } from 'react-native';\r\n\r\nexport default function App() {\r\n  return (\r\n    <View style={styles.container}>\r\n      <View style={styles.box}>\r\n        <Text>1</Text>\r\n      </View>\r\n      <View style={styles.box}>\r\n        <Text>2</Text>\r\n      </View>\r\n    </View>\r\n  );\r\n}\r\n\r\nconst styles = StyleSheet.create({\r\n  container: {\r\n    flex: 1,\r\n    flexDirection: 'row',\r\n    justifyContent: 'space-around',\r\n    alignItems: 'center',\r\n  },\r\n  box: {\r\n    width: 80,\r\n    height: 80,\r\n    backgroundColor: 'lightblue',\r\n    justifyContent: 'center',\r\n    alignItems: 'center',\r\n  },\r\n});",
        "isCommand": false
      },
      {
        "id": "snippet-29",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import { View, Text, Button } from 'react-native';\r\nimport { useState } from 'react';\r\n\r\nexport default function App() {\r\n  const [count, setCount] = useState<number>(0);\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>Contador: {count}</Text>\r\n      <Button title=\"+\" onPress={() => setCount(count + 1)} />\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-30",
        "title": "Instalação",
        "language": "bash",
        "code": "npm install @react-navigation/native\r\nnpm install @react-navigation/native-stack\r\nnpx expo install react-native-screens react-native-safe-area-context",
        "isCommand": true
      },
      {
        "id": "snippet-31",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import { NavigationContainer } from '@react-navigation/native';\r\nimport {\r\n  createNativeStackNavigator,\r\n  NativeStackScreenProps,\r\n} from '@react-navigation/native-stack';\r\nimport { View, Text, Button } from 'react-native';\r\n\r\ntype RootStackParamList = {\r\n  Home: undefined;\r\n  Details: undefined;\r\n};\r\n\r\nconst Stack = createNativeStackNavigator<RootStackParamList>();\r\n\r\ntype HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;\r\n\r\nfunction Home({ navigation }: HomeProps) {\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>Home</Text>\r\n      <Button title=\"Ir\" onPress={() => navigation.navigate('Details')} />\r\n    </View>\r\n  );\r\n}\r\n\r\nfunction Details() {\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>Detalhes</Text>\r\n    </View>\r\n  );\r\n}\r\n\r\nexport default function App() {\r\n  return (\r\n    <NavigationContainer>\r\n      <Stack.Navigator>\r\n        <Stack.Screen name=\"Home\" component={Home} />\r\n        <Stack.Screen name=\"Details\" component={Details} />\r\n      </Stack.Navigator>\r\n    </NavigationContainer>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-32",
        "title": "Instalação",
        "language": "bash",
        "code": "npm install axios",
        "isCommand": true
      },
      {
        "id": "snippet-33",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import { useEffect, useState } from 'react';\r\nimport { FlatList, Text, View } from 'react-native';\r\n\r\ninterface User {\r\n  id: number;\r\n  name: string;\r\n}\r\n\r\nexport default function App() {\r\n  const [users, setUsers] = useState<User[]>([]);\r\n\r\n  useEffect(() => {\r\n    fetch('https://jsonplaceholder.typicode.com/users')\r\n      .then((res) => res.json())\r\n      .then((data: User[]) => setUsers(data));\r\n  }, []);\r\n\r\n  return (\r\n    <View style={{ paddingTop: 40 }}>\r\n      <FlatList\r\n        data={users}\r\n        keyExtractor={(item) => item.id.toString()}\r\n        renderItem={({ item }) => <Text>{item.name}</Text>}\r\n      />\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-34",
        "title": "Instalação",
        "language": "bash",
        "code": "npx expo install @react-native-async-storage/async-storage",
        "isCommand": true
      },
      {
        "id": "snippet-35",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import { View, Button, Text } from 'react-native';\r\nimport AsyncStorage from '@react-native-async-storage/async-storage';\r\nimport { useEffect, useState } from 'react';\r\n\r\nexport default function App() {\r\n  const [token, setToken] = useState<string>('');\r\n\r\n  const save = async () => {\r\n    await AsyncStorage.setItem('token', '123');\r\n    setToken('123');\r\n  };\r\n\r\n  const load = async () => {\r\n    const value = await AsyncStorage.getItem('token');\r\n    setToken(value ?? '');\r\n  };\r\n\r\n  useEffect(() => {\r\n    load();\r\n  }, []);\r\n\r\n  return (\r\n    <View style={{ padding: 20 }}>\r\n      <Text>Token: {token || 'Nenhum token salvo'}</Text>\r\n      <Button title=\"Salvar\" onPress={save} />\r\n    </View>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-36",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import React, { createContext, useContext, useState } from 'react';\r\nimport { View, Text, Button } from 'react-native';\r\n\r\ninterface AuthContextData {\r\n  user: string | null;\r\n  setUser: React.Dispatch<React.SetStateAction<string | null>>;\r\n}\r\n\r\nconst AuthContext = createContext<AuthContextData | null>(null);\r\n\r\nfunction Home() {\r\n  const auth = useContext(AuthContext);\r\n\r\n  if (!auth) {\r\n    return <Text>Contexto não encontrado</Text>;\r\n  }\r\n\r\n  return (\r\n    <View>\r\n      <Text>{auth.user ?? 'Não logado'}</Text>\r\n      <Button title=\"Login\" onPress={() => auth.setUser('Anderson')} />\r\n    </View>\r\n  );\r\n}\r\n\r\nexport default function App() {\r\n  const [user, setUser] = useState<string | null>(null);\r\n\r\n  return (\r\n    <AuthContext.Provider value={{ user, setUser }}>\r\n      <View style={{ padding: 20 }}>\r\n        <Home />\r\n      </View>\r\n    </AuthContext.Provider>\r\n  );\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-37",
        "title": "Instalação",
        "language": "bash",
        "code": "npx expo install expo-camera",
        "isCommand": true
      },
      {
        "id": "snippet-38",
        "title": "💻 Exemplo (App)",
        "language": "tsx",
        "code": "import { CameraView, useCameraPermissions } from 'expo-camera';\r\nimport { View, Button, Text } from 'react-native';\r\n\r\nexport default function App() {\r\n  const [permission, requestPermission] = useCameraPermissions();\r\n\r\n  if (!permission) {\r\n    return (\r\n      <View style={{ padding: 20 }}>\r\n        <Text>Carregando permissões...</Text>\r\n      </View>\r\n    );\r\n  }\r\n\r\n  if (!permission.granted) {\r\n    return (\r\n      <View style={{ padding: 20 }}>\r\n        <Button title=\"Permitir\" onPress={requestPermission} />\r\n      </View>\r\n    );\r\n  }\r\n\r\n  return <CameraView style={{ flex: 1 }} />;\r\n}",
        "isCommand": false
      },
      {
        "id": "snippet-39",
        "title": "Estrutura sugeridaMarkdown Preview Enhanced",
        "language": "text",
        "code": "src/\r\n ├── components/\r\n ├── screens/\r\n ├── services/\r\n ├── context/\r\n ├── hooks/\r\n └── utils/",
        "isCommand": false
      }
    ]
  },
  {
    "slug": "01-base-do-react-native",
    "title": "01 - Base do React Native",
    "sourcePath": "01 - Base do React Native/README.md",
    "summary": "Resumo pratico do modulo 01 - Base do React Native com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "02-fundamentos-do-react-native",
    "title": "02 - Fundamentos do React Native",
    "sourcePath": "02 - Fundamentos do React Native/README.md",
    "summary": "Resumo pratico do modulo 02 - Fundamentos do React Native com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "03-navegacao",
    "title": "03 - Navegação",
    "sourcePath": "03 - Navegação/README.md",
    "summary": "Resumo pratico do modulo 03 - Navegação com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "04-consumo-de-api",
    "title": "04 - Consumo de API",
    "sourcePath": "04 - Consumo de API/README.md",
    "summary": "Resumo pratico do modulo 04 - Consumo de API com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "05-gerenciamento-de-estado",
    "title": "05 - Gerenciamento de estado",
    "sourcePath": "05 - Gerenciamento de estado/README.md",
    "summary": "Resumo pratico do modulo 05 - Gerenciamento de estado com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "06-formularios",
    "title": "06 - Formulários",
    "sourcePath": "06 - Formulários/README.md",
    "summary": "Resumo pratico do modulo 06 - Formulários com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "08-arquitetura-de-projeto",
    "title": "08 - Arquitetura de projeto",
    "sourcePath": "08 - Arquitetura de projeto/README.md",
    "summary": "Resumo pratico do modulo 08 - Arquitetura de projeto com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "09-ui-profissional",
    "title": "09 - UI profissional",
    "sourcePath": "09 - UI profissional/README.md",
    "summary": "Resumo pratico do modulo 09 - UI profissional com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "10-animacoes-e-gestos",
    "title": "10 - Animações e gestos",
    "sourcePath": "10 - Animações e gestos/README.md",
    "summary": "Resumo pratico do modulo 10 - Animações e gestos com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "11-armazenamento-local",
    "title": "11 - Armazenamento local",
    "sourcePath": "11 - Armazenamento local/README.md",
    "summary": "Resumo pratico do modulo 11 - Armazenamento local com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "12-recursos-nativos-do-dispositivo",
    "title": "12 - Recursos nativos do dispositivo",
    "sourcePath": "12 - Recursos nativos do dispositivo/README.md",
    "summary": "Resumo pratico do modulo 12 - Recursos nativos do dispositivo com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "13-seguranca",
    "title": "13 - Segurança",
    "sourcePath": "13 - Segurança/README.md",
    "summary": "Resumo pratico do modulo 13 - Segurança com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "14-performance",
    "title": "14 - Performance",
    "sourcePath": "14 - Performance/README.md",
    "summary": "Resumo pratico do modulo 14 - Performance com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "15-testes",
    "title": "15 - Testes",
    "sourcePath": "15 - Testes/README.md",
    "summary": "Resumo pratico do modulo 15 - Testes com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "16-debug-e-qualidade",
    "title": "16 - Debug e qualidade",
    "sourcePath": "16 - Debug e qualidade/README.md",
    "summary": "Resumo pratico do modulo 16 - Debug e qualidade com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "17-build-release-e-publicacao",
    "title": "17 - Build, release e publicação",
    "sourcePath": "17 - Build, release e publicação/README.md",
    "summary": "Resumo pratico do modulo 17 - Build, release e publicação com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "18-ci-cd",
    "title": "18 - CI-CD",
    "sourcePath": "18 - CI-CD/README.md",
    "summary": "Resumo pratico do modulo 18 - CI-CD com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "19-observabilidade-e-monitoramento",
    "title": "19 - Observabilidade e monitoramento",
    "sourcePath": "19 - Observabilidade e monitoramento/README.md",
    "summary": "Resumo pratico do modulo 19 - Observabilidade e monitoramento com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  },
  {
    "slug": "20-iot",
    "title": "20 - IoT",
    "sourcePath": "20 - IoT/README.md",
    "summary": "Resumo pratico do modulo 20 - IoT com comandos de setup e execucao.",
    "playfulHint": "Pense neste README como um mapa de fase: cada bloco de codigo e uma missao curta para evoluir no app.",
    "dependencies": [
      "react-native-web",
      "react-dom"
    ],
    "usage": [
      "npx create-expo-app app-react-native --template blank-typescript",
      "cd app-react-native",
      "npm install",
      "npx expo start",
      "npx expo install react-native-web react-dom",
      "npx expo start --web"
    ],
    "snippets": [
      {
        "id": "snippet-1",
        "title": "Criar projeto",
        "language": "bash",
        "code": "npx create-expo-app app-react-native --template blank-typescript\r\ncd app-react-native\r\nnpm install",
        "isCommand": true
      },
      {
        "id": "snippet-2",
        "title": "Executar projeto",
        "language": "bash",
        "code": "npx expo start",
        "isCommand": true
      },
      {
        "id": "snippet-3",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo install react-native-web react-dom",
        "isCommand": true
      },
      {
        "id": "snippet-4",
        "title": "Executar no navegador",
        "language": "bash",
        "code": "npx expo start --web",
        "isCommand": true
      }
    ]
  }
];

export const README_DOCS_BY_SLUG: Record<string, ReadmeDoc> = README_DOCS.reduce((acc, doc) => {
  acc[doc.slug] = doc;
  return acc;
}, {} as Record<string, ReadmeDoc>);

export const DEFAULT_DOC_SLUG = README_DOCS[0]?.slug ?? 'roadmap-geral';

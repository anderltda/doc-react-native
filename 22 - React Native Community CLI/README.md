# React Native sem Expo — Entendendo o Ambiente Nativo

## Introdução

Até este momento, utilizamos o **Expo** para criar e executar nossos projetos React Native.

Normalmente iniciamos um projeto com:

```bash
npx create-expo-app@latest
```

E executamos com:

```bash
npx expo start
```

O Expo facilita bastante o desenvolvimento porque configura e abstrai várias partes do ambiente nativo.

Nesta aula faremos algo diferente.

Vamos criar um projeto **React Native sem utilizar Expo**, seguindo o fluxo **Without a Framework** da documentação oficial do React Native.

Documentação oficial:

https://reactnative.dev/docs/getting-started-without-a-framework

O objetivo não é abandonar o Expo, mas entender melhor:

```text
React Native
      ↑
     Expo
```

O **React Native é a tecnologia base**.

O **Expo é um framework e um conjunto de ferramentas construído sobre React Native**.

---

# 1. React Native não é Expo

Um erro comum de quem está começando é pensar:

```text
React Native = Expo
```

Não são a mesma coisa.

Podemos desenvolver aplicações React Native utilizando diferentes abordagens.

### Com Expo

```text
React Native
     +
Expo
     ↓
Ferramentas e abstrações
     ↓
iOS / Android
```

### Sem Expo

```text
React Native
     ↓
Projeto iOS / Android
     ↓
Xcode / Gradle
     ↓
iOS / Android
```

Nos dois casos continuamos desenvolvendo uma aplicação **React Native**.

---

# 2. O que o Expo faz?

O Expo fornece diversas ferramentas para facilitar o desenvolvimento React Native.

Entre elas estão:

- criação e configuração do projeto;
- Expo CLI;
- Expo Go;
- Expo SDK;
- configuração simplificada de recursos nativos;
- desenvolvimento e builds;
- EAS (Expo Application Services);
  * EAS Build: gera builds de iOS e Android na nuvem
  * EAS Submit: envia o app para App Store e Google Play
  * EAS Update: publica atualizações de JavaScript/TypeScript sem precisar gerar uma nova versão completa em alguns casos
  * EAS Workflows: automatiza etapas de CI/CD
- configuração por `app.json` / `app.config`;
- config plugins.

Por exemplo, anteriormente utilizamos:

```bash
npx expo start
```

E depois pressionamos:

```text
i
```

para abrir o projeto no simulador iOS.

Grande parte da complexidade estava sendo gerenciada pelo Expo.

---

# 3. React Native sem framework

Também podemos trabalhar diretamente com o React Native sem utilizar um framework como Expo.

Nesse cenário teremos acesso direto aos projetos nativos:

```text
ios/
android/
```

Isso significa que passaremos a enxergar elementos que normalmente ficam abstraídos pelo Expo.

Por exemplo:

```text
React Native
│
├── TypeScript / JavaScript
│
├── iOS
│   ├── Xcode
│   ├── Swift
│   ├── Objective-C
│   └── CocoaPods
│
└── Android
    ├── Android Studio
    ├── Kotlin
    ├── Java
    └── Gradle
```

---

# 4. Preparando o ambiente

Antes de criar o projeto precisamos preparar o ambiente nativo.

A configuração oficial pode ser consultada em:

https://reactnative.dev/docs/set-up-your-environment

## macOS + iOS

Para desenvolver para iOS será necessário principalmente:

```text
Node.js
Xcode
Xcode Command Line Tools
CocoaPods
iOS Simulator
```

Abra o Xcode pelo menos uma vez após a instalação para que os componentes adicionais sejam instalados.

Podemos verificar o caminho configurado para o Xcode:

```bash
xcode-select -p
```

O resultado normalmente será:

```text
/Applications/Xcode.app/Contents/Developer
```

Caso necessário:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

Também podemos verificar os simuladores disponíveis:

```bash
xcrun simctl list devices
```

---

# 5. Android

Para desenvolvimento Android será necessário configurar principalmente:

```text
Android Studio
Android SDK
Android SDK Platform
Android Virtual Device
JDK
```

O Android Studio será responsável por disponibilizar as ferramentas necessárias para compilar e executar o projeto Android.

---

# 6. Criando nosso primeiro projeto sem Expo

No terminal execute:

```bash
npx @react-native-community/cli@latest init AulaReactNativeNative
```

Depois entre no projeto:

```bash
cd AulaReactNativeNative
```

Observe que **não utilizamos**:

```bash
npx create-expo-app
```

Estamos utilizando diretamente o **React Native Community CLI**.

---

# 7. Estrutura do projeto

Abra o projeto no VS Code.

Teremos uma estrutura semelhante a:

```text
AulaReactNativeNative/
│
├── android/
├── ios/
│
├── node_modules/
│
├── App.tsx
├── package.json
├── babel.config.js
├── metro.config.js
└── tsconfig.json
```

Dois diretórios merecem atenção:

```text
android/
ios/
```

Eles representam os projetos nativos da nossa aplicação.

---

# 8. Comparando com Expo

Em um projeto Expo que ainda utiliza o fluxo gerenciado, normalmente trabalhamos com algo semelhante a:

```text
meu-app/
│
├── assets/
├── node_modules/
├── app.json
├── package.json
└── ...
```

e não precisamos trabalhar diretamente com:

```text
ios/
android/
```

Isso não significa que um aplicativo Expo não tenha código nativo.

O Expo pode gerar esses projetos quando necessário.

Por exemplo:

```bash
npx expo prebuild
```

pode gerar:

```text
ios/
android/
```

Portanto:

> Expo não transforma React Native em uma tecnologia diferente. Ele fornece uma camada adicional de ferramentas e abstrações sobre o ecossistema React Native.

---

# 9. Nosso primeiro `App.tsx`

Vamos criar uma aplicação extremamente simples para demonstrar que os componentes React Native continuam sendo os mesmos.

Substitua o conteúdo do `App.tsx`:

```tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          React Native sem Expo
        </Text>

        <Text style={styles.platform}>
          Plataforma: {Platform.OS}
        </Text>

        <Text style={styles.counter}>
          {count}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>
            Incrementar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },

  platform: {
    fontSize: 18,
    marginBottom: 24,
  },

  counter: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
```

Observe que estamos utilizando:

```tsx
useState
SafeAreaView
View
Text
TouchableOpacity
StyleSheet
Platform
```

Todos esses recursos pertencem ao React/React Native.

Não precisamos do Expo para utilizá-los.

---

# 10. Executando o projeto

Agora aparece uma diferença importante.

Com Expo estávamos acostumados a executar:

```bash
npx expo start
```

Sem Expo utilizaremos os comandos do projeto React Native.

## Metro

O React Native utiliza o **Metro** para processar o código JavaScript/TypeScript da aplicação.

Podemos iniciá-lo com:

```bash
npm start
```

Teremos algo conceitualmente parecido com:

```text
App.tsx
   ↓
Metro
   ↓
Bundle JavaScript
   ↓
Aplicação React Native
```

---

# 11. Executando no iOS

Em outro terminal:

```bash
npm run ios
```

Também podemos utilizar:

```bash
npx react-native run-ios
```

O React Native irá trabalhar com o projeto existente dentro de:

```text
ios/
```

e utilizar as ferramentas nativas da Apple para compilar o aplicativo.

O fluxo agora é aproximadamente:

```text
App.tsx
   ↓
React Native
   ↓
Metro
   ↓
Projeto iOS
   ↓
Xcode
   ↓
Compilação
   ↓
iOS Simulator
```

---

# 12. Executando no Android

Primeiramente inicie um Android Emulator pelo Android Studio.

Depois execute:

```bash
npm run android
```

Ou:

```bash
npx react-native run-android
```

O fluxo será:

```text
App.tsx
   ↓
React Native
   ↓
Metro
   ↓
Projeto Android
   ↓
Gradle
   ↓
Compilação
   ↓
Android Emulator
```

---

# 13. Metro não é Expo

Essa distinção é importante.

Quando vemos:

```text
Metro
```

não significa que estamos utilizando Expo.

O Metro é o bundler utilizado pelo React Native.

Portanto podemos ter:

```text
React Native + Expo
        ↓
      Metro
```

e:

```text
React Native sem Expo
        ↓
      Metro
```

---

# 14. Alterando o código

Com o aplicativo executando, altere:

```tsx
<Text style={styles.title}>
  React Native sem Expo
</Text>
```

para:

```tsx
<Text style={styles.title}>
  Minha primeira aplicação Native
</Text>
```

Salve o arquivo.

O React Native possui **Fast Refresh**, portanto normalmente veremos a alteração rapidamente na aplicação.

Isso também não é uma funcionalidade exclusiva do Expo.

---

# 15. Conhecendo a pasta `ios`

Agora abra:

```text
ios/
```

Encontraremos arquivos relacionados ao projeto nativo iOS.

Entre eles podemos encontrar:

```text
Podfile
*.xcodeproj
*.xcworkspace
```

O arquivo `Podfile` está relacionado ao gerenciamento das dependências nativas iOS através do CocoaPods.

---

# 16. Abrindo o projeto no Xcode

Podemos abrir o workspace iOS diretamente no Xcode.

Por exemplo:

```bash
open ios/AulaReactNativeNative.xcworkspace
```

Agora conseguimos visualizar o projeto iOS.

Dentro do Xcode temos acesso a configurações como:

```text
Bundle Identifier
Signing
Capabilities
Deployment Target
Build Settings
Info.plist
```

Essa é uma diferença importante.

Sem Expo, estamos trabalhando diretamente com o projeto nativo.

---

# 17. Conhecendo a pasta `android`

Agora observe:

```text
android/
```

Encontraremos arquivos relacionados ao projeto Android.

Por exemplo:

```text
android/
├── app/
├── gradle/
├── build.gradle
├── gradle.properties
├── gradlew
└── settings.gradle
```

Aqui encontramos a estrutura de build nativa do Android.

---

# 18. O que é Gradle?

No Android, o **Gradle** é utilizado para automação e configuração do processo de build.

Quando executamos:

```bash
npm run android
```

há um processo nativo envolvendo Gradle.

Simplificando:

```text
React Native
     ↓
Android Project
     ↓
Gradle
     ↓
Compilação
     ↓
APK / App
```

---

# 19. O que é CocoaPods?

No iOS, bibliotecas React Native podem possuir componentes escritos em:

```text
Swift
Objective-C
C
C++
```

O CocoaPods é uma das ferramentas envolvidas no gerenciamento dessas dependências nativas.

Por isso podemos encontrar comandos como:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

Quando adicionamos determinadas bibliotecas nativas ao projeto, pode existir uma etapa de integração com o projeto iOS.

---

# 20. JavaScript e código nativo

Até agora nosso código está em:

```text
App.tsx
```

Mas uma aplicação React Native possui mais camadas.

Podemos visualizar assim:

```text
┌─────────────────────────────┐
│      TypeScript / JSX       │
│                             │
│         App.tsx             │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        React Native         │
└──────────────┬──────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
┌─────────────┐   ┌─────────────┐
│     iOS     │   │   Android   │
│             │   │             │
│ Swift       │   │ Kotlin      │
│ Objective-C │   │ Java        │
│ Xcode       │   │ Gradle      │
└─────────────┘   └─────────────┘
```

Essa é uma das principais ideias desta aula.

---

# 21. Então o que o Expo estava fazendo?

O Expo estava abstraindo várias dessas etapas.

Com Expo trabalhávamos principalmente com:

```text
App
 ↓
React Native
 ↓
Expo
 ↓
iOS / Android
```

O Expo fornece ferramentas para que o desenvolvedor não precise interagir diretamente com toda a infraestrutura nativa durante grande parte do desenvolvimento.

Sem Expo:

```text
App
 ↓
React Native
 ↓
ios/       android/
 ↓             ↓
Xcode        Gradle
 ↓             ↓
iOS         Android
```

---

# 22. Comparação prática

| Característica | Expo | React Native sem framework |
|---|---|---|
| Tecnologia base | React Native | React Native |
| TypeScript | ✅ | ✅ |
| React Hooks | ✅ | ✅ |
| `View`, `Text`, etc. | ✅ | ✅ |
| Metro | ✅ | ✅ |
| Fast Refresh | ✅ | ✅ |
| Expo CLI | ✅ | ❌ |
| Expo SDK | ✅ | ❌ por padrão |
| Expo Go | ✅ quando compatível | ❌ |
| `ios/` e `android/` obrigatórios no projeto | não inicialmente | ✅ |
| Xcode diretamente | menos frequente | ✅ |
| Gradle diretamente | menos frequente | ✅ |
| Código Swift/Kotlin próprio | possível | ✅ |
| Configuração nativa direta | possível | ✅ |
| Complexidade inicial | menor | maior |

---

# 23. Expo Go não é o aplicativo final

Outro conceito importante é entender o papel do **Expo Go**.

Durante o desenvolvimento podemos executar nosso JavaScript dentro do Expo Go.

Isso é extremamente conveniente para aprendizado e prototipação.

Mas:

```text
Expo Go ≠ aplicativo final
```

Quando uma aplicação é distribuída pela App Store ou Google Play, ela será compilada como uma aplicação própria.

---

# 24. Expo também pode trabalhar com código nativo

Não devemos criar a ideia de que:

```text
Expo = sem código nativo
```

Isso seria incorreto.

O Expo possui mecanismos como:

```bash
npx expo prebuild
```

e **Development Builds**, além de config plugins, que permitem trabalhar com dependências e configurações nativas.

Portanto atualmente a separação não é simplesmente:

```text
Expo = básico
React Native CLI = avançado
```

Os dois podem atender projetos profissionais.

A diferença está principalmente no **workflow e no nível de abstração utilizado**.

---

# 25. Por que aprender React Native sem Expo?

Mesmo utilizando Expo profissionalmente, conhecer essa estrutura ajuda a entender melhor o ecossistema.

Ao trabalhar sem Expo encontramos diretamente conceitos como:

```text
Metro
Xcode
CocoaPods
Gradle
Android SDK
iOS SDK
Swift
Kotlin
Build
Signing
Native Modules
```

Isso ajuda principalmente quando surgem problemas de integração com bibliotecas nativas.

---

# 26. Quando utilizar Expo?

Expo é uma ótima escolha quando queremos:

```text
configuração inicial simples
desenvolvimento rápido
boas APIs prontas
padronização
menos configuração nativa manual
build e distribuição simplificados
```

Inclusive, atualmente a própria documentação do React Native recomenda considerar um framework como Expo para novos aplicativos.

---

# 27. Quando trabalhar sem um framework?

O fluxo sem framework pode fazer sentido quando o projeto exige:

```text
controle direto da infraestrutura nativa
integrações nativas muito específicas
customizações avançadas no Xcode
customizações avançadas no Gradle
código Swift/Kotlin específico
requisitos particulares de build
```

Também é extremamente útil **didaticamente**, porque permite compreender o que existe abaixo das abstrações oferecidas pelo Expo.

---

# 28. Exercício 1 — Modificando nossa aplicação

Altere a aplicação para apresentar:

```text
React Native sem Expo

Plataforma: ios

Contador: 0

[ + Incrementar ]
[ - Decrementar ]
[ Zerar ]
```

Crie três funções:

```tsx
function increment() {
  setCount(count + 1);
}

function decrement() {
  setCount(count - 1);
}

function reset() {
  setCount(0);
}
```

---

# 29. Exercício 2 — Identificando a plataforma

Utilize:

```tsx
Platform.OS
```

para identificar a plataforma.

Exemplo:

```tsx
<Text>
  Executando em: {Platform.OS}
</Text>
```

No iOS:

```text
Executando em: ios
```

No Android:

```text
Executando em: android
```

---

# 30. Exercício 3 — Estilo específico por plataforma

Utilize:

```tsx
Platform.select()
```

Exemplo:

```tsx
const styles = StyleSheet.create({
  title: {
    fontSize: 28,

    ...Platform.select({
      ios: {
        fontWeight: '600',
      },

      android: {
        fontWeight: '700',
      },
    }),
  },
});
```

O objetivo é perceber que uma mesma aplicação React Native pode adaptar determinados comportamentos para cada plataforma.

---

# 31. Exercício 4 — Explorando o projeto nativo

Localize no projeto:

```text
ios/
android/
metro.config.js
package.json
App.tsx
```

Depois identifique:

**iOS**

```text
Podfile
.xcodeproj
.xcworkspace
```

**Android**

```text
build.gradle
settings.gradle
gradlew
android/app/
```

O objetivo não é modificar esses arquivos ainda.

O objetivo é entender **onde está cada camada do projeto**.

---

# 32. Desafio

Crie uma tela contendo:

```text
React Native Native App

Plataforma
ios / android

Contador
10

[ Incrementar ]
[ Decrementar ]
[ Zerar ]
```

Requisitos:

- utilizar `useState`;
- utilizar `Platform`;
- utilizar `StyleSheet`;
- criar componentes com `View`;
- utilizar `Text`;
- criar botões;
- executar no simulador/emulador;
- alterar o código e observar o Fast Refresh.

Não utilize nenhuma biblioteca Expo.

---

# 33. Perguntas para discussão

Ao final da aula, tente responder:

**React Native precisa do Expo?**

Não.

---

**Expo utiliza React Native?**

Sim.

---

**React Native sem Expo continua usando Metro?**

Sim.

---

**Sem Expo podemos utilizar `useState`?**

Sim. `useState` pertence ao React.

---

**`View`, `Text` e `StyleSheet` pertencem ao Expo?**

Não. Pertencem ao React Native.

---

**Um projeto Expo pode possuir as pastas `ios/` e `android/`?**

Sim.

---

**Expo é apenas para projetos pequenos?**

Não.

---

**Sem Expo temos maior contato direto com Xcode e Gradle?**

Sim.

---

# 34. Modelo mental

Ao terminar esta aula, guarde este modelo:

```text
                    REACT
                      │
                      ▼
                REACT NATIVE
                      │
            ┌─────────┴─────────┐
            │                   │
            ▼                   ▼
       COM FRAMEWORK       SEM FRAMEWORK
            │                   │
           Expo          Community CLI
            │                   │
            ▼                   ▼
       React Native        React Native
            │                   │
            ▼                   ▼
       iOS / Android       ios/ + android/
                                │
                         ┌──────┴──────┐
                         ▼             ▼
                       Xcode         Gradle
                         │             │
                         ▼             ▼
                        iOS         Android
```

A principal conclusão é:

> **React Native é a tecnologia utilizada para construir a aplicação. Expo é um framework e ecossistema de ferramentas que facilita o desenvolvimento de aplicações React Native.**

---

# 35. Comandos utilizados na aula

Criar projeto sem framework:

```bash
npx @react-native-community/cli@latest init AulaReactNativeNative
```

Entrar no projeto:

```bash
cd AulaReactNativeNative
```

Iniciar Metro:

```bash
npm start
```

Executar iOS:

```bash
npm run ios
```

Executar Android:

```bash
npm run android
```

Instalar dependências iOS quando necessário:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

Abrir Xcode:

```bash
open ios/AulaReactNativeNative.xcworkspace
```

---

# 36. Referências

Documentação oficial do React Native:

https://reactnative.dev/

Configuração do ambiente nativo:

https://reactnative.dev/docs/set-up-your-environment

Desenvolvimento sem framework:

https://reactnative.dev/docs/getting-started-without-a-framework

Documentação do Expo:

https://docs.expo.dev/

---

## Conclusão

A comparação correta não é simplesmente:

```text
Expo vs React Native
```

O mais correto é pensar em:

```text
React Native com Expo
vs
React Native sem framework
```

O React Native continua sendo a tecnologia principal nos dois cenários.

O que muda é o **workflow**, o **nível de abstração** e o quanto o desenvolvedor interage diretamente com as camadas nativas de iOS e Android.

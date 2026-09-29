# 📱 Trabalho — React Native

## Chat individual e em grupo com Firebase e Push Notifications

---

# 🧾 Enunciado

Desenvolva um aplicativo de **chat em React Native com TypeScript**, utilizando o **Firebase** como backend.

O aplicativo deverá permitir conversas individuais e conversas em grupo entre usuários autenticados exclusivamente por **e-mail e senha**. As mensagens deverão ser sincronizadas em tempo real e o aplicativo deverá enviar notificações push conforme uma política configurável.

O projeto deverá aplicar os seguintes conceitos:

- React Native;
- Expo;
- TypeScript;
- Hooks;
- Componentização;
- Firebase Authentication;
- Firebase Realtime Database;
- Cloud Firestore;
- Firebase Cloud Messaging;
- notificações push;
- atualização de dados em tempo real;
- tratamento de erros;
- estados de loading;
- tipagem forte;
- organização em módulos;
- regras de segurança.

> **Importante:** Firebase Authentication, Realtime Database, Cloud Firestore e Firebase Cloud Messaging deverão ser utilizados de forma funcional. A inclusão de dependências sem uso real não atende ao enunciado.

---

# 🎯 Objetivo

Construir um aplicativo de chat no qual usuários autenticados possam:

- trocar mensagens individuais;
- criar grupos;
- participar de conversas em grupo;
- respeitar o limite configurado de integrantes de cada grupo;
- receber notificações push conforme a política definida para a conversa;
- visualizar mensagens novas sem atualizar a tela manualmente.

---

# 🧰 Tecnologias obrigatórias

- React Native;
- Expo SDK 55 ou superior;
- TypeScript;
- Firebase Authentication;
- Firebase Realtime Database;
- Cloud Firestore;
- Firebase Cloud Messaging — FCM;
- Expo Notifications ou biblioteca equivalente compatível com FCM;
- API própria, criada com tecnologia de livre escolha e publicada na internet, para envio seguro das notificações.

> A configuração do SDK cliente (`firebaseConfig`) deverá estar no GitHub. Credenciais administrativas, contas de serviço e chaves privadas deverão permanecer exclusivamente nas variáveis secretas da API hospedada.

> **Cloud Functions for Firebase não faz parte deste trabalho.** O envio das notificações deverá ser realizado por uma API criada pela equipe. A linguagem, o framework e o serviço de hospedagem são de livre escolha. Node.js com Express é apenas uma possibilidade de implementação.

> **Disponibilidade obrigatória:** a API deverá estar publicada na internet e funcionando durante a correção. O professor não deverá precisar iniciar servidor local, executar comandos ou publicar a API para testar as notificações.

---

# 📱 Plataformas

O aplicativo deverá executar corretamente em:

- Android;
- iOS.

As notificações push deverão ser testadas em **dispositivo físico** ou ambiente compatível. Caso alguma plataforma exija configuração adicional, ela deverá ser documentada no `README.md`.

> O funcionamento completo das notificações não deverá depender exclusivamente do Expo Go. Quando necessário, utilize development build ou build nativo.

---

# 🔥 Responsabilidade de cada serviço Firebase

## Firebase Authentication

Deverá ser utilizado para:

- criar contas com e-mail e senha;
- autenticar usuários;
- recuperar a sessão;
- identificar usuários pelo `uid`;
- encerrar a sessão.

## Firebase Realtime Database

Deverá ser utilizado obrigatoriamente para:

- armazenar mensagens individuais e em grupo;
- sincronizar novas mensagens em tempo real;
- manter listeners das conversas abertas.

## Cloud Firestore

Deverá ser utilizado obrigatoriamente para:

- armazenar perfis dos usuários;
- armazenar grupos e seus metadados;
- armazenar os integrantes dos grupos;
- armazenar o limite máximo de integrantes;
- armazenar a política de notificações da conversa;
- armazenar tokens de dispositivos e preferências necessárias às notificações.

## Firebase Cloud Messaging

Deverá ser utilizado obrigatoriamente para:

- enviar notificações push aos destinatários;
- entregar notificações quando o aplicativo estiver em segundo plano ou fechado;
- identificar a conversa relacionada à notificação por meio dos dados do payload.

---

# 🔐 Autenticação

A única forma de autenticação permitida será **e-mail e senha**.

O aplicativo deverá permitir:

- criar uma conta;
- informar nome, e-mail, senha, número de celular, data de nascimento e foto de perfil;
- realizar login;
- recuperar a sessão autenticada;
- tratar credenciais inválidas;
- realizar logout.

Não deverão existir login com Google, Apple, usuários anônimos ou usuários hardcoded.

Uma possível tipagem é:

```ts
type ChatUser = {
  uid: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  photoUrl: string;
  createdAt: number;
};
```

---

# 💬 Tipos de conversa

O aplicativo deverá possuir dois tipos de conversa.

## Conversa individual

- Deve possuir exatamente dois participantes.
- Exibir a foto do outro participante e, ao tocar nela, abrir seu perfil com os dados cadastrais permitidos.
- Ambos deverão ser usuários autenticados por e-mail e senha.
- O usuário não poderá conversar consigo mesmo.
- Não deverão existir duas conversas individuais diferentes para o mesmo par de usuários.

Uma estratégia recomendada é gerar o identificador da conversa a partir dos dois `uid` ordenados.

```ts
type DirectConversation = {
  id: string;
  type: 'direct';
  participants: [string, string];
  createdAt: number;
};
```

## Conversa em grupo

- Deve possuir nome e proprietário.
- Deve possuir dois ou mais integrantes.
- Deve respeitar o limite máximo configurado.
- Somente integrantes ativos poderão ler e enviar mensagens.
- O proprietário poderá gerenciar integrantes e configurações.
- Um usuário removido não poderá continuar enviando ou recebendo novas mensagens do grupo.
- Exibir uma foto do grupo e, ao tocar nela, mostrar todos os integrantes. Ao selecionar um integrante, o aplicativo deverá abrir seu perfil com os dados cadastrais permitidos.


```ts
type NotificationPolicy =
  | 'all_group_messages'
  | 'mentioned_members'
  | 'direct_messages_only'
  | 'disabled';

type ChatGroup = {
  id: string;
  name: string;
  photoUrl: string;
  ownerId: string;
  memberIds: string[];
  memberLimit: number;
  notificationPolicy: NotificationPolicy;
  createdAt: number;
  updatedAt: number;
};
```

É proibido utilizar `any`.

## Fotos de perfil e de grupo

- As fotos deverão ser selecionadas pelo usuário a partir de uma fonte compatível com o dispositivo.
- A aplicação deverá solicitar e tratar as permissões necessárias.
- O arquivo da imagem deverá ser enviado a um serviço de armazenamento apropriado. Firebase Storage é recomendado, mas outra solução poderá ser utilizada.
- Apenas a URL final da imagem deverá ser armazenada no Firestore.
- É proibido armazenar imagens em Base64 diretamente no Firestore ou no Realtime Database.
- A interface deverá apresentar uma imagem padrão quando a foto não estiver disponível ou falhar ao carregar.
- O `README.md` deverá documentar qual serviço foi escolhido para armazenar as imagens.

---

# 👥 Limite configurável de integrantes

Cada grupo deverá possuir a configuração `memberLimit`.

Exemplo: se o limite do grupo for `5`, o grupo poderá possuir no máximo cinco integrantes, incluindo seu proprietário.

Requisitos obrigatórios:

- o limite deverá ser definido na criação do grupo;
- o limite deverá ser um número inteiro válido;
- o proprietário deverá poder alterar o limite;
- o limite não poderá ser reduzido para um número menor que a quantidade atual de integrantes;
- nenhum novo integrante poderá ser adicionado quando o limite for atingido;
- a interface deverá informar quantas vagas ainda estão disponíveis;
- a validação deverá existir na interface **e** nas regras do banco ou na API própria;
- tentativas simultâneas de entrada não poderão ultrapassar o limite configurado.

> Apenas desabilitar o botão na interface não é suficiente. A aplicação deverá impedir estouro do limite mesmo diante de requisições concorrentes.

---

# 📨 Mensagens

Todas as mensagens deverão ser persistidas no Firebase Realtime Database.

```ts
type MessageTarget =
  | { type: 'conversation' }
  | { type: 'member'; memberId: string };

type ChatMessage = {
  id: string;
  conversationId: string;
  conversationType: 'direct' | 'group';
  senderId: string;
  text: string;
  target: MessageTarget;
  mentionedUserIds: string[];
  createdAt: number;
};
```

Uma mensagem poderá ser:

- individual, destinada ao outro participante da conversa direta;
- geral do grupo, visível a todos os integrantes;
- direcionada a um integrante do grupo, por meio de menção ou seleção explícita.

Mesmo quando uma mensagem do grupo for direcionada a um integrante, ela continuará pertencendo ao histórico do grupo. A configuração determinará quem receberá a notificação push.

Não serão aceitas mensagens simuladas ou mantidas apenas no estado local.

---

# 🔔 Configuração das notificações push

Cada conversa em grupo deverá possuir uma política de notificação configurável pelo proprietário.

## Políticas obrigatórias

### `all_group_messages`

Quando uma mensagem geral for enviada ao grupo, todos os integrantes, exceto o remetente, deverão receber uma notificação.

### `mentioned_members`

Somente integrantes explicitamente mencionados ou selecionados como destinatários deverão receber a notificação.

### `direct_messages_only`

Mensagens enviadas em grupos não deverão gerar push. Apenas mensagens de conversas individuais deverão gerar notificações.

### `disabled`

Nenhuma mensagem daquela conversa deverá gerar notificação push.

## Regras gerais

- O remetente não deverá receber notificação da própria mensagem.
- Apenas participantes da conversa poderão receber a notificação.
- Tokens inválidos deverão ser tratados e removidos ou desativados.
- O texto da notificação não deverá expor informações sensíveis desnecessárias.
- O payload deverá conter, no mínimo, `conversationId` e `conversationType`.
- Ao tocar na notificação, o aplicativo deverá abrir ou direcionar para a conversa correspondente.
- O envio deverá ocorrer pela API online da equipe.
- É proibido enviar notificações diretamente pelo aplicativo utilizando credenciais administrativas.

## API online obrigatória para notificações

A equipe deverá criar uma pequena API separada do aplicativo mobile. Essa API será responsável pelas operações seguras necessárias ao push.

A tecnologia utilizada é de livre escolha. São exemplos possíveis:

- Node.js com Express;
- Node.js com Fastify;
- Java com Spring Boot;
- C# com ASP.NET Core;
- Python com FastAPI ou Flask;
- outra tecnologia capaz de validar o Firebase Authentication e enviar notificações com segurança.

Independentemente da tecnologia escolhida, a API deverá estar hospedada e acessível por uma URL pública com HTTPS.

Fluxo mínimo esperado:

1. O aplicativo obtém o token de autenticação do usuário no Firebase Authentication.
2. Após persistir a mensagem, o aplicativo envia à API o `conversationId` e o `messageId`.
3. A API valida o token recebido com o Firebase Admin SDK.
4. A API confirma no Realtime Database que a mensagem existe e que o remetente corresponde ao usuário autenticado.
5. A API consulta no Firestore os participantes, tokens e a política de notificações.
6. A API calcula os destinatários permitidos e envia as notificações pelo FCM ou pelo Expo Push Service.

A API não poderá confiar em uma lista de destinatários enviada pelo aplicativo. Os destinatários deverão ser calculados no servidor.

O endpoint deverá possuir proteção contra chamadas duplicadas. Uma mesma mensagem não poderá produzir notificações repetidas quando a requisição for reenviada.

Estrutura sugerida para quem optar por Node.js com Express:

```text
server/
  src/
    app.ts
    middleware/
      authenticate.ts
    routes/
      notifications.ts
    services/
      firebaseAdmin.ts
      notificationSender.ts
      recipientResolver.ts
```

Exemplo de endpoint:

```text
POST /notifications/messages
Authorization: Bearer <firebase-id-token>

{
  "conversationId": "conversation-id",
  "messageId": "message-id"
}
```

Exemplo de configuração:

```ts
type NotificationSettings = {
  conversationId: string;
  policy: NotificationPolicy;
  updatedBy: string;
  updatedAt: number;
};
```

---

# ⚡ Atualização em tempo real

Quando uma nova mensagem for enviada:

```text
Usuário envia a mensagem
          ↓
Realtime Database persiste a mensagem
          ↓
Listeners atualizam a conversa aberta
          ↓
Aplicativo solicita o push à API online
          ↓
API valida usuário, mensagem e política no Firebase
          ↓
FCM notifica somente os destinatários permitidos
```

O usuário não deverá precisar atualizar a tela, reabrir o chat ou pressionar um botão para buscar novas mensagens.

Os listeners deverão ser removidos corretamente quando a tela for desmontada ou a conversa for alterada.

---

# 🗃️ Estrutura sugerida

## Cloud Firestore

```text
users/{uid}
  name
  email
  phoneNumber
  birthDate
  photoUrl
  createdAt

users/{uid}/devices/{deviceId}
  token
  platform
  enabled
  updatedAt

groups/{groupId}
  name
  photoUrl
  ownerId
  memberIds
  memberLimit
  notificationPolicy
  createdAt
  updatedAt

directConversations/{conversationId}
  participantIds
  createdAt
```

## Firebase Realtime Database

```text
messages
  └── conversationId
       └── messageId
            ├── conversationType
            ├── senderId
            ├── text
            ├── target
            ├── mentionedUserIds
            └── createdAt
```

Outra estrutura poderá ser utilizada, desde que as responsabilidades dos dois bancos estejam documentadas e todos os requisitos sejam atendidos.

---

# 🖥️ Telas obrigatórias

## Tela de Login e Cadastro

- campo de nome no cadastro;
- campo de e-mail;
- campo de senha;
- confirmação de senha no cadastro;
- campo de número de celular no cadastro;
- campo de data de nascimento no cadastro;
- seleção de foto de perfil;
- botão de login;
- opção para criar conta;
- loading;
- mensagens de erro compreensíveis.

## Tela de Conversas

- lista de conversas individuais e grupos;
- identificação visual do tipo de conversa;
- acesso à criação de conversa individual;
- acesso à criação de grupo;
- indicador de estado vazio;
- opção de logout.

## Tela de Usuários

- lista de usuários cadastrados;
- busca ou filtro de usuários;
- impedir seleção do próprio usuário;
- permitir iniciar uma conversa individual;
- permitir selecionar integrantes durante a criação ou edição de um grupo.

## Tela de Criação/Edição de Grupo

- nome do grupo;
- seleção ou alteração da foto do grupo;
- seleção de integrantes;
- definição do limite máximo de integrantes;
- exibição da quantidade atual e das vagas disponíveis;
- seleção da política de notificações;
- validações e mensagens de erro;
- gerenciamento de integrantes pelo proprietário.

## Tela de Chat

- nome da pessoa ou do grupo;
- foto da pessoa ou do grupo;
- acesso ao perfil do participante ou à lista de integrantes ao tocar na foto;
- lista de mensagens;
- diferenciação entre mensagens enviadas e recebidas;
- identificação do autor em mensagens de grupo;
- campo para digitar;
- opção para selecionar ou mencionar integrante, quando aplicável;
- botão para enviar;
- atualização em tempo real;
- rolagem da conversa;
- estado para conversa sem mensagens;
- feedback de falha no envio.

## Tela de Perfil

- foto do usuário;
- nome;
- e-mail;
- número de celular;
- data de nascimento;
- tratamento para campos indisponíveis;
- acesso permitido somente a usuários autenticados que compartilhem uma conversa individual ou um grupo com o perfil consultado.

---

# 🚪 Logout

Após o logout:

- a sessão deverá ser encerrada;
- o usuário deverá ser removido do estado da aplicação;
- os listeners deverão ser removidos;
- o fluxo deverá retornar à autenticação;
- o usuário anterior não poderá continuar acessando conversas protegidas.

---

# ⚛️ Hooks obrigatórios

Deverão ser utilizados adequadamente e com finalidade real:

- `useState`;
- `useEffect`;
- `useMemo`;
- `useCallback`.

Hooks personalizados são recomendados para autenticação, mensagens, grupos e notificações.

---

# 🔷 TypeScript obrigatório

É obrigatório tipar:

- componentes e propriedades;
- usuários;
- conversas;
- grupos;
- mensagens;
- configurações de notificação;
- estados e funções;
- dados lidos e gravados no Firebase;
- parâmetros de navegação.

## ❌ Não utilizar `any`

O uso de `any`, inclusive para contornar tipos do Firebase ou da navegação, será considerado erro de implementação.

---

# ♻️ Estado e imutabilidade

Alterações de estado deverão respeitar imutabilidade. Estados derivados deverão ser calculados de maneira adequada, sem mutação direta de arrays ou objetos.

---

# 🧩 Componentização e organização

Estrutura sugerida:

```text
src/
  components/
    ChatMessage.tsx
    ChatInput.tsx
    ConversationItem.tsx
    GroupMemberItem.tsx
    Loading.tsx
    ErrorMessage.tsx

  screens/
    LoginScreen.tsx
    RegisterScreen.tsx
    ConversationsScreen.tsx
    UsersScreen.tsx
    GroupFormScreen.tsx
    ChatScreen.tsx

  services/
    firebase.ts
    authService.ts
    userService.ts
    groupService.ts
    chatService.ts
    notificationService.ts

  hooks/
    useAuth.ts
    useChat.ts
    useGroups.ts
    useNotifications.ts

  contexts/
    AuthContext.tsx

  types/
    user.ts
    chat.ts
    group.ts
    notification.ts

  utils/
    conversationId.ts
    groupValidation.ts

server/
  src/
    app.ts
    middleware/
      authenticate.ts
    routes/
      notifications.ts
    services/
      firebaseAdmin.ts
      notificationSender.ts
      recipientResolver.ts
```

Outra organização será aceita se houver separação clara de responsabilidades.

---

# 📦 Services

## `authService.ts`

- cadastro com e-mail e senha;
- login;
- observação da sessão;
- logout.

## `groupService.ts`

- criar grupo;
- atualizar limite;
- adicionar e remover integrantes;
- validar proprietário e capacidade;
- alterar política de notificações.

## `chatService.ts`

- criar ou localizar conversa individual;
- enviar mensagem;
- escutar mensagens;
- remover listeners.

## `notificationService.ts`

- solicitar permissão;
- registrar o dispositivo;
- atualizar o token;
- tratar recebimento e toque em notificações.

O envio efetivo do push deverá permanecer na API online, nunca no aplicativo mobile.

---

# ⏳ Estados da aplicação

A interface deverá tratar:

- loading;
- erro;
- usuário não autenticado;
- nenhuma conversa disponível;
- nenhum usuário disponível;
- grupo sem vagas;
- conversa sem mensagens;
- falha no envio da mensagem;
- permissão de notificação negada;
- dispositivo sem token disponível;
- falha de conectividade.

---

# 🔒 Segurança

O Firestore e o Realtime Database deverão possuir regras de segurança versionadas no repositório.

As regras deverão garantir, sempre que possível, que:

- somente usuários autenticados acessem dados protegidos;
- somente participantes leiam as mensagens da conversa;
- somente participantes enviem mensagens;
- o `senderId` corresponda ao usuário autenticado;
- somente o proprietário gerencie o grupo;
- o limite de integrantes seja respeitado;
- tokens de dispositivos não fiquem públicos;
- dados cadastrais não fiquem acessíveis a usuários sem uma conversa ou grupo em comum;
- usuários removidos não acessem novas mensagens.

Não serão aceitas permanentemente regras abertas como:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

> Como os dados estão divididos entre Firestore e Realtime Database, validações críticas que dependam dos dois serviços deverão ser executadas pela API. O projeto deverá documentar essa decisão.

---

# ⚠️ Tratamento de erros

O aplicativo deverá tratar erros relacionados a:

- login e cadastro;
- sessão expirada;
- leitura e escrita nos bancos;
- criação e atualização de grupos;
- grupo com limite atingido;
- ações realizadas por usuário sem permissão;
- envio de mensagens;
- registro de token;
- permissão de notificações;
- envio de push;
- conectividade.

O usuário deverá receber feedback compreensível, sem exposição de detalhes internos ou credenciais.

---

# 🚫 Não será permitido

- utilizar outras formas de autenticação além de e-mail e senha;
- substituir usuários autenticados por dados hardcoded;
- utilizar somente Firestore ou somente Realtime Database;
- adicionar dependências obrigatórias sem uso funcional;
- manter regras públicas permanentemente;
- ultrapassar o limite de integrantes do grupo;
- permitir acesso de não integrantes às mensagens do grupo;
- simular mensagens sem persistência;
- simular push apenas com alerta local;
- armazenar chave privada ou credencial administrativa no aplicativo;
- disparar FCM de forma insegura pelo cliente;
- utilizar `any`.

---

# 📄 README.md obrigatório

O repositório deverá conter:

- nome e descrição do projeto;
- tecnologias utilizadas;
- versão do Expo;
- serviços Firebase utilizados e responsabilidade de cada um;
- instruções de instalação e execução;
- configuração do Firebase;
- serviço utilizado para armazenar fotos e suas instruções de configuração;
- configuração das notificações no Android e iOS;
- tecnologia escolhida e instruções para configurar, executar e publicar a API;
- URL pública da API online e descrição de seus endpoints;
- instruções para verificar a disponibilidade da API, como um endpoint de health check;
- estrutura do projeto;
- explicação da política de notificações;
- explicação de como o limite do grupo é protegido contra concorrência;
- regras do Firestore e do Realtime Database;
- prints das telas;
- evidência de notificação recebida;
- nome completo e RM de todos os integrantes.

```md
## Integrantes

- RM12345 — João da Silva
- RM54321 — Maria Souza
```

> ⚠️ Caso o `README.md` não contenha nome e RM de todos os integrantes, o trabalho receberá **nota zero**. Quantidade máxima: cinco integrantes.

---

# 📤 Entrega

A entrega deverá ser realizada pelo Microsoft Teams, na tarefa indicada pelo professor.

Deverão ser enviados pelo Microsoft Teams:

1. o link do repositório no GitHub;
2. a URL pública da API online.

O repositório deverá permanecer acessível durante todo o período de correção.

## Configuração de ambiente obrigatória no repositório

Cada equipe deverá manter dentro do próprio repositório um arquivo chamado `firebaseConfig.json`, contendo a configuração do Firebase SDK utilizada pelo aplicativo cliente:

```json
{
  "apiKey": "...",
  "authDomain": "...",
  "databaseURL": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "..."
}
```

O arquivo deverá:

- corresponder ao projeto Firebase utilizado pelo aplicativo entregue;
- conter os valores necessários para executar e identificar o projeto;
- estar versionado no repositório GitHub da equipe;
- possuir exatamente o nome `firebaseConfig.json`;
- conter apenas a configuração do SDK cliente.

O arquivo **não deverá conter**:

- chave privada de conta de serviço;
- conteúdo de `serviceAccountKey.json`;
- credenciais do Firebase Admin SDK;
- senhas;
- tokens de acesso;
- segredos utilizados pela API online.

> O objeto `firebaseConfig` identifica o projeto Firebase para o SDK cliente, mas não concede privilégios administrativos. A segurança dos dados continuará dependendo do Firebase Authentication e das regras do Firestore e do Realtime Database.

Além disso, o repositório deverá conter um arquivo `.env.example` para o aplicativo e outro para a API, quando aplicável. Esses arquivos deverão listar os nomes das variáveis necessárias, utilizando valores fictícios ou marcadores, sem incluir segredos reais.

Exemplo:

```env
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_CLIENT_EMAIL=email-da-conta-de-servico
FIREBASE_PRIVATE_KEY=CONFIGURAR_APENAS_NA_HOSPEDAGEM
```

Se o arquivo `firebaseConfig.json` não estiver no repositório, estiver incompleto ou não corresponder ao projeto utilizado, não será possível validar integralmente a integração com o Firebase.

## Credenciais administrativas

Credenciais administrativas são chaves usadas por um servidor para acessar o Firebase com privilégios elevados. Elas poderão permitir que a API utilize o Firebase Admin SDK, consulte dados protegidos, valide usuários e envie notificações.

Requisitos obrigatórios:

- configurar as credenciais administrativas diretamente nas variáveis secretas do serviço que hospeda a API;
- conceder somente as permissões mínimas necessárias ao funcionamento da API;
- manter as credenciais fora do aplicativo mobile e do repositório GitHub;
- documentar no README somente os nomes das variáveis utilizadas;
- garantir que a API publicada já esteja configurada e funcionando durante a correção.

É proibido:

- publicar `serviceAccountKey.json`, `firebaseAdminCredentials.json` ou qualquer chave privada no GitHub, mesmo em repositório privado;
- inserir seu conteúdo no código-fonte;
- incluir a credencial no `firebaseConfig.json`;
- compartilhar a credencial em mensagens públicas;
- utilizar uma credencial com permissões superiores às necessárias para o trabalho;
- colocar valores secretos reais nos arquivos `.env.example`.

> A configuração dos segredos na hospedagem não substitui a obrigatoriedade de manter a API publicada e funcionando. O professor não deverá precisar configurar ou publicar a API para validar as notificações.

Não deverão ser versionados arquivos com segredos, chaves privadas, contas de serviço ou credenciais administrativas.

## Regra obrigatória para validação do push

A API deverá estar publicada, online e acessível durante todo o período de correção.

Não será solicitado ao professor que:

- execute a API localmente;
- instale dependências do servidor para testar o push;
- configure variáveis de ambiente do servidor;
- realize o deploy da API;
- mantenha um computador da equipe ligado para que o serviço funcione.

Se a API estiver indisponível, depender de `localhost`, exigir inicialização manual ou não permitir o teste completo, o item **Push notifications e políticas de destinatários**, no valor de **1,50 ponto**, receberá **nota zero**.

---

# 🧪 Critérios de avaliação

| Critério | Pontos |
|---|---:|
| Autenticação por e-mail e senha | 0,75 |
| Conversa individual | 0,75 |
| Criação e gerenciamento de grupos | 1,25 |
| Limite configurável e proteção contra concorrência | 1,00 |
| Realtime Database e sincronização em tempo real | 1,25 |
| Uso funcional do Cloud Firestore | 1,00 |
| Push notifications e políticas de destinatários | 1,50 |
| Segurança do Firebase e envio pelo backend | 0,75 |
| TypeScript, hooks, services e componentização | 1,00 |
| Interface, loading e tratamento de erros | 0,75 |
| **Total** | **10,00** |

---

# ✅ Checklist de requisitos

- [ ] React Native, Expo SDK 55+ e TypeScript
- [ ] Cadastro e login apenas com e-mail/senha
- [ ] Cadastro com nome, celular, data de nascimento e foto de perfil
- [ ] Logout e recuperação de sessão
- [ ] Conversas individuais com exatamente dois participantes
- [ ] Perfil acessível pela foto do participante
- [ ] Criação e edição de grupos
- [ ] Foto do grupo e listagem de seus integrantes
- [ ] Perfil acessível pela lista de integrantes do grupo
- [ ] Proprietário e integrantes identificados por `uid`
- [ ] Limite configurável de integrantes
- [ ] Proteção contra estouro do limite em ações concorrentes
- [ ] Mensagens no Realtime Database
- [ ] Perfis, grupos e configurações no Firestore
- [ ] Imagens armazenadas em serviço apropriado e apenas suas URLs salvas no Firestore
- [ ] Atualização de mensagens em tempo real
- [ ] Firebase Cloud Messaging configurado
- [ ] Tokens de dispositivos armazenados com segurança
- [ ] API online autenticada com Firebase ID Token
- [ ] API publicada em URL pública com HTTPS
- [ ] API funciona sem servidor local ou inicialização pelo professor
- [ ] Push enviado pela API, sem utilização de Cloud Functions
- [ ] Política `all_group_messages`
- [ ] Política `mentioned_members`
- [ ] Política `direct_messages_only`
- [ ] Política `disabled`
- [ ] Remetente excluído dos destinatários do próprio push
- [ ] Toque na notificação abre a conversa correta
- [ ] Regras de segurança do Firestore e Realtime Database
- [ ] Loading, estados vazios e tratamento de erros
- [ ] Hooks obrigatórios utilizados com finalidade real
- [ ] Projeto sem `any`
- [ ] Services e componentes separados
- [ ] README completo com prints e configuração
- [ ] README com nome e RM de todos os integrantes
- [ ] Arquivo `firebaseConfig.json` presente no repositório
- [ ] `firebaseConfig.json` sem credenciais administrativas ou chaves privadas
- [ ] Arquivos `.env.example` presentes e sem segredos reais
- [ ] Credencial administrativa fora do aplicativo e do GitHub
- [ ] Segredos administrativos configurados somente na hospedagem da API
- [ ] Repositório acessível no GitHub

---

# 🏁 Resultado esperado
Ao final, espera-se um aplicativo:

- autenticado exclusivamente por e-mail e senha;
- com conversas individuais e em grupo;
- com grupos de capacidade configurável;
- protegido contra entrada de integrantes acima do limite;
- com mensagens persistidas no Realtime Database;
- com usuários e configurações persistidos no Firestore;
- com atualização em tempo real;
- com push notifications enviadas de forma segura;
- com destinatários definidos pela política de cada conversa;
- tipado com TypeScript e sem `any`;
- organizado em módulos;
- com regras de segurança, loading e tratamento de erros.

---

# 📚 Referências

- React Native: https://reactnative.dev/
- Expo: https://docs.expo.dev/
- Expo Notifications: https://docs.expo.dev/versions/latest/sdk/notifications/
- Firebase Authentication: https://firebase.google.com/docs/auth
- Firebase Realtime Database: https://firebase.google.com/docs/database
- Cloud Firestore: https://firebase.google.com/docs/firestore
- Firebase Cloud Messaging: https://firebase.google.com/docs/cloud-messaging
- Firebase Admin SDK: https://firebase.google.com/docs/admin/setup
- Expo Push Service: https://docs.expo.dev/push-notifications/sending-notifications/
- Express — exemplo opcional: https://expressjs.com/

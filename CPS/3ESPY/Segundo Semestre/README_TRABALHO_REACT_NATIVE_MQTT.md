# Trabalho Prático — Mobile Development & IoT
## MQTT em React Native — Painel de Monitoramento e Controle IoT

### 1. Contexto
Desenvolva um aplicativo mobile em **React Native, Expo e TypeScript** que se comunique com dispositivos IoT simulados por meio do protocolo **MQTT**. O aplicativo deverá **publicar comandos** e **receber dados em tempo real** utilizando um **broker MQTT**. Não é obrigatório possuir hardware físico: um segundo cliente MQTT pode simular o dispositivo.

### 2. Objetivo
Demonstrar o funcionamento do modelo **publish/subscribe**, a utilização de tópicos MQTT e o gerenciamento de conexão e mensagens em uma aplicação mobile.

### 3. Tecnologias
- React Native com Expo e TypeScript.
- Biblioteca cliente MQTT compatível com o ambiente escolhido.
- Broker MQTT acessível por **WebSocket (WS/WSS)** para conexão a partir do aplicativo.
- AsyncStorage para armazenar preferências locais.
- Execução em Android e iOS; funcionamento Web será considerado quando a biblioteca escolhida oferecer suporte.

> **Importante:** não confundir uma porta MQTT TCP (por exemplo, 1883) com uma porta WebSocket. Documente o endereço e a porta efetivamente utilizados. Não inclua senhas, tokens ou credenciais privadas no repositório.

### 4. Cenário do projeto
Crie o aplicativo **IoT Control**, um painel para acompanhar e controlar um ambiente inteligente simulado. O usuário deverá visualizar leituras de **temperatura** e **umidade** e controlar o estado de uma **lâmpada virtual**.

Um segundo cliente MQTT (aplicativo, script ou ferramenta de testes) deverá simular o dispositivo: publicar leituras e receber comandos da lâmpada.

### 5. Funcionalidades obrigatórias

#### 5.1. Conexão MQTT
- Informar ou configurar a URL WebSocket do broker.
- Conectar e desconectar do broker.
- Exibir o estado da conexão: **conectando, conectado, desconectado ou erro**.
- Tratar falhas de conexão e informar o usuário.
- Implementar reconexão ou oferecer uma ação clara de reconectar.

#### 5.2. Inscrição e recebimento de mensagens
- Inscrever-se nos tópicos de temperatura, umidade e estado da lâmpada.
- Atualizar a interface quando novas mensagens forem recebidas, sem botão de atualização.
- Exibir o último valor recebido e o horário da atualização.
- Validar mensagens recebidas para evitar falhas com dados inválidos.

#### 5.3. Publicação de comandos
- Disponibilizar controles **Ligar** e **Desligar** a lâmpada.
- Publicar o comando no tópico correspondente.
- Não permitir publicação silenciosa quando estiver desconectado: exibir feedback apropriado.
- O estado exibido da lâmpada deverá refletir a **mensagem de estado recebida**, não apenas o toque no botão.

#### 5.4. Histórico de mensagens
- Apresentar na interface as **10 mensagens mais recentes** recebidas ou publicadas, com tópico, conteúdo, horário e direção (enviada/recebida).
- Manter o histórico atualizado enquanto o aplicativo estiver aberto.

#### 5.5. Preferências locais
- Salvar com **AsyncStorage** a URL do broker e a preferência de tema.
- Recuperar essas preferências ao reiniciar o aplicativo.
- Implementar temas **Light e Dark** em todas as telas principais.

### 6. Tópicos MQTT sugeridos
Utilize um identificador exclusivo para o grupo, por exemplo `fiap/turma/grupo01`, para evitar interferência entre projetos.

| Tópico | Direção no aplicativo | Payload de exemplo |
|---|---|---|
| `fiap/turma/grupo01/sensor/temperatura` | Subscribe | `{"value":24.5}` |
| `fiap/turma/grupo01/sensor/umidade` | Subscribe | `{"value":58}` |
| `fiap/turma/grupo01/lampada/comando` | Publish | `{"action":"ON"}` |
| `fiap/turma/grupo01/lampada/estado` | Subscribe | `{"state":"ON"}` |

O simulador deverá publicar o estado da lâmpada após receber um comando. É permitido utilizar outro padrão de tópicos, desde que documentado e consistente.

### 7. Telas mínimas
1. **Dashboard:** status da conexão, temperatura, umidade, estado da lâmpada e botões de controle.
2. **Histórico:** últimas 10 mensagens, com tópico, payload, direção e horário.
3. **Configurações:** endereço do broker, botão de conexão/desconexão e alternância de tema.

A navegação entre as telas poderá ser implementada com a solução apresentada em aula.

### 8. Requisitos técnicos
- Utilizar **TypeScript**, tipando estados, mensagens, parâmetros e componentes; evitar `any`.
- Utilizar `useState` e `useEffect` de forma adequada.
- Separar a comunicação MQTT da interface, por exemplo em `src/services/mqttService.ts`.
- Cancelar inscrições e remover listeners quando não forem mais necessários, evitando eventos duplicados.
- Organizar componentes reutilizáveis e utilizar `StyleSheet` e Flexbox.
- Exibir estados de carregamento, conexão e erro.
- Utilizar um identificador exclusivo do grupo nos tópicos.

### 9. Simulação e demonstração
O grupo deverá fornecer um modo **reproduzível** de testar o projeto sem hardware físico, como:
- um script simulador incluído no repositório; **ou**
- instruções detalhadas para simular o dispositivo em outro cliente MQTT.

A avaliação deverá conseguir verificar o ciclo completo:

1. O simulador publica uma temperatura e a tela atualiza.
2. O simulador publica uma umidade e a tela atualiza.
3. O usuário toca em **Ligar** no aplicativo.
4. O simulador recebe o comando e publica o novo estado.
5. O aplicativo recebe e apresenta o estado **Ligada**.
6. O mesmo fluxo funciona para **Desligar**.

### 10. Organização sugerida
```text
src/
  components/
    SensorCard.tsx
    ConnectionStatus.tsx
    MessageItem.tsx
  screens/
    DashboardScreen.tsx
    HistoryScreen.tsx
    SettingsScreen.tsx
  services/
    mqttService.ts
    storageService.ts
  types/
    mqtt.ts
  themes/
    colors.ts
```

### 11. README.md obrigatório
O repositório deverá conter:
- Descrição e objetivo do aplicativo.
- **Nome completo e RM de todos os integrantes**.
- Tecnologias e versões utilizadas.
- Passo a passo de instalação e execução.
- URL WebSocket de teste ou instruções para configurar o broker.
- Lista de tópicos, payloads e direção de cada mensagem.
- Instruções para executar ou reproduzir o simulador.
- Prints das telas e explicação das funcionalidades.
- Observações sobre limitações e configurações necessárias.

**Regra de identificação:** a ausência do **nome completo e RM dos integrantes** no README implica **nota zero**.

### 12. Entrega
- Enviar **somente o link do repositório GitHub** pelo **Microsoft Teams**, na tarefa aberta.
- O repositório deverá estar acessível e conter o código e as instruções necessárias para avaliação.
- **Não é necessário vídeo ou apresentação.**
- Não enviar ZIP como substituto do repositório.

### 13. Critérios de avaliação
| Critério | Pontos |
|---|---:|
| Conexão, desconexão, status e tratamento de erros | 1,5 |
| Inscrição e atualização em tempo real dos sensores | 2,0 |
| Publicação de comandos e confirmação pelo estado recebido | 2,0 |
| Histórico das últimas 10 mensagens | 1,0 |
| AsyncStorage e tema Light/Dark | 1,0 |
| Simulação reproduzível e documentação dos tópicos | 1,0 |
| TypeScript, hooks, organização e limpeza de listeners | 1,0 |
| Interface, navegação e feedback ao usuário | 0,5 |
| **Total** | **10,0** |

### 14. Checklist de entrega
- [ ] Conecta ao broker via WebSocket.
- [ ] Mostra status da conexão e erros.
- [ ] Recebe temperatura e umidade em tempo real.
- [ ] Publica comandos ON/OFF.
- [ ] Recebe confirmação de estado da lâmpada.
- [ ] Exibe histórico das 10 últimas mensagens.
- [ ] Salva URL do broker e tema com AsyncStorage.
- [ ] Possui Light/Dark.
- [ ] Usa TypeScript, hooks e componentes organizados.
- [ ] Não acumula listeners duplicados.
- [ ] Inclui simulador ou procedimento de simulação reproduzível.
- [ ] README documenta tópicos, execução, nome e RM dos integrantes.
- [ ] Repositório GitHub está acessível.

### 15. Resultado esperado
Um aplicativo React Native capaz de **receber telemetria e enviar comandos por MQTT**, demonstrando comunicação publish/subscribe, atualização em tempo real, persistência de preferências e integração com um dispositivo IoT simulado.

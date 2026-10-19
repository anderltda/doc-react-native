# 📱 Checkpoint 3 — React Native
## Formulários Dinâmicos a partir de JSON

## 1. Enunciado

Desenvolva um aplicativo com **React Native, Expo SDK 55 e TypeScript** capaz de **montar um formulário dinamicamente a partir de uma configuração JSON**. Os campos, seus rótulos, tipos, opções e obrigatoriedade devem ser definidos pela configuração, e não escritos individualmente na tela.

O aplicativo deverá validar as respostas, apresentar os dados submetidos e armazená-los **localmente com AsyncStorage**, permitindo recuperá-los após reiniciar a aplicação e apagá-los quando solicitado.

**Objetivo da avaliação:** verificar a implementação de renderização dinâmica, controle de estado, validação, persistência, tipagem e organização do código.

## 2. Tecnologias e plataformas obrigatórias

- React Native;
- **Expo SDK 55**;
- TypeScript;
- AsyncStorage;
- execução em **Android, iOS e Web**.

Comandos de referência:

```bash
npx expo start
npx expo start --web
```

A implementação dos campos deverá ser compatível com as três plataformas. Quando algum componente tiver implementação específica por plataforma, o projeto deverá fornecer a alternativa correspondente.

## 3. Funcionamento obrigatório

O aplicativo deverá:

1. Ler uma configuração JSON contendo, no mínimo, o título do formulário e um array `fields`.
2. Percorrer `fields` e escolher o componente de entrada de acordo com `type`.
3. Exibir o `label` e, quando necessário, as opções definidas em `options`.
4. Controlar os valores preenchidos pelo usuário.
5. Validar os campos marcados com `required: true` antes do envio.
6. Ao submeter um formulário válido, **exibir o resultado na interface**.
7. Salvar os dados submetidos no AsyncStorage.
8. Recuperar os dados salvos ao abrir novamente o aplicativo.
9. Disponibilizar uma ação para limpar os dados persistidos.

**Atenção:** não basta declarar o JSON e montar manualmente cada campo no JSX. A estrutura de renderização deverá ser genérica, de forma que a lista de campos seja determinada pelo conteúdo de `fields`.

## 4. Estrutura de configuração — exemplo

O exemplo abaixo é uma **referência de formato**, não a implementação completa de todos os tipos obrigatórios:

```ts
const formConfig = {
  title: 'Cadastro de Usuário',
  fields: [
    { id: 'name', label: 'Nome', type: 'text', required: true },
    { id: 'email', label: 'E-mail', type: 'email', required: true },
    { id: 'password', label: 'Senha', type: 'password', required: true },
    {
      id: 'gender',
      label: 'Gênero',
      type: 'radio',
      required: true,
      options: [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
      ],
    },
    {
      id: 'state',
      label: 'Estado',
      type: 'select',
      required: true,
      options: [
        { label: 'SP', value: 'SP' },
        { label: 'RJ', value: 'RJ' },
      ],
    },
    { id: 'birthDate', label: 'Data de nascimento', type: 'date', required: true },
  ],
};
```

É permitido utilizar um objeto TypeScript com essa estrutura ou carregar um arquivo `.json`. Em ambos os casos, **os campos deverão ser produzidos a partir dos dados da configuração**.

## 5. Tipos de campos obrigatórios

O projeto deverá demonstrar o funcionamento de **todos** os tipos abaixo. A configuração usada para avaliação deverá conter ao menos um campo de cada tipo.

| Tipo | Comportamento esperado |
|---|---|
| `text` | Entrada de texto em linha única |
| `email` | Entrada de e-mail |
| `password` | Entrada de senha com caracteres ocultos |
| `number` | Entrada de valor numérico |
| `multiline` ou `textarea` | Entrada de texto com múltiplas linhas |
| `select` ou `combo` | Escolha de uma opção entre as configuradas |
| `radio` | Escolha de uma opção entre as configuradas |
| `checkbox` | Controle de seleção por marcação |
| `switch` | Controle de valor ligado/desligado |
| `date` | Entrada ou seleção de data |

Para `select`/`combo` e `radio`, as alternativas exibidas deverão vir de `options` na configuração JSON. Para `date`, a solução escolhida deverá funcionar em Android, iOS e Web.

## 6. Validação e envio

- Os campos com `required: true` deverão ser validados antes do envio.
- Quando um campo obrigatório não estiver preenchido ou selecionado, o aplicativo deverá informar o problema ao usuário.
- O formulário **não poderá ser submetido como válido** enquanto houver campos obrigatórios pendentes.
- Após o envio válido, o aplicativo deverá apresentar os valores informados, identificando a qual campo pertencem.

A validação deve considerar o tipo de dado: por exemplo, `false` em um `switch` não significa automaticamente ausência de resposta. O aplicativo deverá definir um comportamento coerente para cada tipo de campo.

## 7. Persistência local com AsyncStorage

O aplicativo deverá:

- salvar o resultado submetido;
- recuperar e exibir os dados persistidos após fechar e reabrir o aplicativo;
- permitir limpar os dados salvos;
- atualizar a interface de acordo com as operações de salvamento, recuperação e limpeza.

O armazenamento somente em `useState` **não atende** ao requisito de persistência.

## 8. Hooks, TypeScript e organização

### Hooks obrigatórios

Utilizar, com finalidade real na aplicação:

- `useState`;
- `useEffect`;
- `useMemo`;
- `useCallback`.

### TypeScript

- Tipar a configuração do formulário, os campos, as opções e os valores manipulados.
- **Não utilizar `any`**.

### Interface

- Organizar os elementos com **Flexbox**;
- utilizar **StyleSheet**;
- manter os campos e mensagens legíveis e organizados;
- assegurar o funcionamento também na **Web**.

### Modularização

Utilizar módulos ES (`import`/`export`) e separar responsabilidades. Estrutura **sugerida, não obrigatória**:

```text
src/
  components/
  screens/
  config/
  services/
  hooks/
  types/
  utils/
```

A avaliação considerará a organização e a componentização, **não a adoção literal desses nomes de pastas**.

## 9. Como o funcionamento será verificado

Durante a correção, será observado se:

1. A tela realmente é gerada a partir do array `fields`.
2. Todos os tipos de campos exigidos estão presentes e funcionam.
3. As opções de seleção são obtidas da configuração.
4. Campos obrigatórios impedem o envio inválido e apresentam feedback.
5. O envio válido mostra o resultado.
6. O resultado permanece disponível após reiniciar o aplicativo.
7. A ação de limpeza remove os dados persistidos.
8. O projeto utiliza os hooks exigidos, TypeScript sem `any` e código organizado.
9. O aplicativo executa em Android, iOS e Web.

**Orientação:** o repositório deve conter o código e as instruções suficientes para executar e verificar os requisitos, sem depender de explicações que não estejam documentadas.

## 10. README.md obrigatório

O repositório deverá conter um `README.md` com:

- nome do projeto;
- descrição;
- tecnologias utilizadas;
- instruções de execução;
- prints da aplicação;
- estrutura de pastas;
- **nome completo e RM dos integrantes**.

Exemplo:

```md
## Integrantes

- João Silva — RM12345
- Maria Souza — RM54321
```

**Regra de identificação:** caso o `README.md` não identifique os integrantes com **NOME e RM**, **apenas quem enviar o link do repositório no GitHub será considerado**, conforme a regra de entrega deste checkpoint.
**Material a entregar:** **somente o link do repositório no GitHub**.
**Não serão aceitos como substitutos da entrega:** arquivo `.zip`, link do Google Drive ou código enviado fora do GitHub.

## 11. Critérios de avaliação

| Critério | Pontos | O que será observado |
|---|---:|---|
| Geração dinâmica via JSON | **3,0** | Renderização dos campos a partir de `fields`, sem montagem manual individual |
| Tipos de campos obrigatórios | **2,0** | Implementação funcional dos dez tipos previstos |
| Validação dos campos | **1,5** | Respeito a `required` e feedback para entradas inválidas |
| Exibição do resultado | **1,0** | Apresentação dos dados após envio válido |
| TypeScript e ausência de `any` | **1,0** | Tipagem dos dados e componentes envolvidos |
| Persistência com AsyncStorage | **0,5** | Salvar, recuperar após reinício e limpar dados |
| Organização e componentização | **0,5** | Separação de responsabilidades e uso adequado de módulos |
| Funcionamento Android/iOS/Web | **0,5** | Execução nas três plataformas obrigatórias |
| **Total** | **10,0** | |

Os hooks obrigatórios e os requisitos de interface também fazem parte da implementação exigida e serão verificados nos itens pertinentes, sem criar pontuação adicional.

## 12. Situações que resultam em nota zero

Conforme o enunciado original, **o projeto será zerado** caso:

- não funcione em alguma das plataformas obrigatórias;
- o formulário não apresente o funcionamento correto de acordo com o enunciado;
- o projeto não seja entregue no GitHub;
- o projeto não possua `README.md` com as informações obrigatórias.

**Observação para evitar ambiguidades:** a regra de identificação do item 10 e a regra de nota zero por README incompleto foram preservadas do documento original. Elas devem ser lidas em conjunto e podem demandar esclarecimento do professor antes da publicação final.

## 13. Checklist de entrega

- [ ] React Native, Expo SDK 55, TypeScript e AsyncStorage
- [ ] Execução em Android, iOS e Web
- [ ] Formulário gerado dinamicamente a partir de JSON
- [ ] Dez tipos de campo implementados
- [ ] Opções de seleção definidas no JSON
- [ ] Validação de campos obrigatórios
- [ ] Resultado apresentado após envio válido
- [ ] Dados salvos, recuperados e limpos com AsyncStorage
- [ ] `useState`, `useEffect`, `useMemo` e `useCallback`
- [ ] Ausência de `any`
- [ ] Flexbox e StyleSheet
- [ ] Código modularizado
- [ ] README com instruções, prints, estrutura, nomes e RMs
- [ ] Repositório GitHub acessível
- [ ] Link entregue pelo Teams

## 14. Referências

- React Native — documentação de componentes e APIs: https://reactnative.dev/docs/components-and-apis
- Expo — documentação: https://docs.expo.dev/
- TypeScript — documentação: https://www.typescriptlang.org/docs/

# 📱 Checkpoint 3 — React Native
## Formulários Dinâmicos a partir de JSON

---

# 🧾 Enunciado

Desenvolva um aplicativo mobile utilizando **React Native com TypeScript**, no qual o formulário exibido na tela seja gerado dinamicamente a partir de uma estrutura JSON.

O objetivo é simular um cenário real de aplicações profissionais.

---

# 🧰 Tecnologias obrigatórias

- React Native
- Expo SDK 55
- TypeScript
- AsyncStorage

---

# 📱 Plataformas obrigatórias

O aplicativo deverá executar corretamente em:

- Android
- iOS
- Web

Executar com:

```bash
npx expo start
```

E também:

```bash
npx expo start --web
```

---

# 📌 Tema do Projeto

## Formulários Dinâmicos

O formulário deverá ser construído automaticamente a partir de um JSON.

O aluno não deverá criar os campos manualmente.

---

# 🧱 Exemplo de JSON base

```ts
const formConfig = {
  title: 'Cadastro de Usuário',
  fields: [
    {
      id: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      id: 'email',
      label: 'E-mail',
      type: 'email',
      required: true,
    },
    {
      id: 'password',
      label: 'Senha',
      type: 'password',
      required: true,
    },
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
    {
      id: 'birthDate',
      label: 'Data de nascimento',
      type: 'date',
      required: true,
    },
  ],
};
```

---

# 🧩 Tipos de campos obrigatórios

## Campos de texto

- text
- email
- password
- number
- multiline / textarea

## Campos de seleção

- select / combo
- radio
- checkbox
- switch
- date

---

# 🧠 Regras do Formulário Dinâmico

O aplicativo deverá:

- Percorrer o array `fields`
- Identificar o tipo de cada campo
- Renderizar o componente correto
- Controlar o valor de cada campo
- Validar campos obrigatórios
- Salvar dados localmente
- Exibir o resultado após submit

---

# 💾 Persistência local

Utilizar AsyncStorage.

O app deverá:

- Salvar os dados ao submeter
- Recuperar os dados ao abrir o app
- Permitir limpar os dados

---

# ⚛️ Hooks obrigatórios

O projeto deve utilizar:

- useState
- useEffect
- useMemo
- useCallback

---

# 🔷 TypeScript obrigatório

É proibido usar `any`.

---

# 🎨 UI obrigatória

A interface deve conter:

- Layout com Flexbox
- StyleSheet
- Campos organizados
- Funcionamento correto na web

---

# 🧱 Modularização com ESModules

Estrutura sugerida:

```txt
src/
  components/
  screens/
  config/
  services/
  hooks/
  types/
  utils/
```

---

# 📄 README obrigatório

O projeto deverá possuir obrigatoriamente um arquivo:

```txt
README.md
```

O README deverá conter:

- Nome do projeto
- Descrição
- Tecnologias utilizadas
- Como executar o projeto
- Prints da aplicação
- Estrutura de pastas
- Nome completo dos integrantes
- RM dos integrantes

⚠️ Caso o README.md não contenha os integrantes com NOME e RM, apenas quem enviar o link do repositório 
no GitHub será considerado.

Exemplo:

```md
## Integrantes

- João Silva — RM12345
- Maria Souza — RM54321
```

---

# 📦 Entrega do projeto

A entrega deverá ser feita via Microsoft Teams para:

```txt
Anderson da Silva Nascimento
```

A entrega deverá conter apenas:

- Link do repositório no GitHub

Não será aceito:

- arquivo .zip
- Google Drive
- código fora do GitHub

DATA DA ENTREGA:

- 18/05/2026

---

# 🧪 Critérios de avaliação

| Critério | Pontos |
|---|---:|
| Geração dinâmica via JSON | 3,0 |
| Tipos de campos obrigatórios | 2,0 |
| Validação dos campos | 1,5 |
| Exibição do resultado | 1,0 |
| TypeScript e ausência de `any` | 1,0 |
| Persistência com AsyncStorage | 0,5 |
| Organização e componentização | 0,5 |
| Funcionamento Android/iOS/Web | 0,5 |
| **Total** | **10,0** |


# ATENÇÃO: O projeto será ZERADO caso:

- O projeto não funcione em alguma plataforma
- O formulario não tenha o funcionamento correto de acordo com o enunciado.
- O projeto não seja entregue no GitHub
- O projeto não tenha um README.md com as informações obrigatórias

---

# 📚 Referências

- https://reactnative.dev/docs/components-and-apis
- https://docs.expo.dev/
- https://www.typescriptlang.org/docs/

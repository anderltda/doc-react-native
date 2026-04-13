# Projeto Aula 2 - Readme Lab

Portal didatico em React Native + Expo Router para estudar os READMEs do repositorio.

## Objetivo

- Entregar uma base open source facil de manter.
- Ajudar iniciantes com exemplos de codigo, explicacoes e demos operacionais.
- Aplicar boas praticas de arquitetura, UI e performance desde o inicio.

## Arquitetura em camadas

```text
src/
  app/                    # rotas (arquivo por pagina)
  data/                   # dados brutos extraidos dos READMEs
  features/docs/          # regras, layout, componentes e exemplos da feature principal
    components/           # componentes reutilizaveis da feature
    examples/             # exemplos vivos operacionais
    layout/               # shell responsivo com sidebar/drawer
    model/                # tipos, rotas, mapeamentos e explicacoes
    pages/                # componente por pagina (um por README)
  services/               # integrações externas (API)
  shared/                 # design system e utilitarios genericos
    components/
    theme/
    utils/
```

## Principios aplicados

- `09 - UI profissional`:
  - tokens de design (`src/shared/theme/tokens.ts`)
  - componentes visuais reutilizaveis
  - hierarquia visual clara para iniciantes
- `14 - Performance`:
  - `React.memo` com helper tipado (`typedMemo`)
  - `useMemo` e `useCallback` em pontos de re-render
  - `FlatList` virtualizada na pagina e em exemplos de lista grande

## Como rodar

```bash
npm install
npx expo start
```

## Rotas

Cada README possui rota e componente de pagina proprio em `src/features/docs/pages`.

Exemplos:

- `/roadmap-geral`
- `/09-ui-profissional`
- `/14-performance`

## Contribuicao

Para adicionar um novo modulo:

1. Adicione os dados no `src/data/readmeDocs.ts` (ou atualize o gerador).
2. Registre slug/rota em `src/features/docs/model/docRoutes.ts`.
3. Crie o componente de pagina em `src/features/docs/pages`.
4. Opcional: adicione exemplo vivo em `src/features/docs/examples` e registre em `liveExamples.tsx`.

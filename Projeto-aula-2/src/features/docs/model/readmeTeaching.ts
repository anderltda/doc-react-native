import { ReadmeDoc, ReadmeSnippet } from '@/data/readmeDocs';

export interface SnippetLesson {
  objective: string;
  howToUse: string;
  dependencies: string[];
  playful: string;
}

function dependenciesFromSnippet(snippet: ReadmeSnippet) {
  const deps = new Set<string>();
  const regex = /(?:npm install|npx expo install)\s+([^\n\r]+)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(snippet.code)) !== null) {
    match[1]
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .forEach((dep) => deps.add(dep));
  }

  return Array.from(deps);
}

function inferObjective(snippet: ReadmeSnippet) {
  const code = snippet.code.toLowerCase();

  if (snippet.language === 'bash') {
    if (code.includes('create-expo-app')) return 'Cria a base do projeto Expo com TypeScript.';
    if (code.includes('expo start --web')) return 'Inicia o app no navegador para testes rapidos de layout.';
    if (code.includes('expo start')) return 'Liga o servidor de desenvolvimento para rodar o app.';
    if (code.includes('install')) return 'Instala bibliotecas necessarias para o modulo.';
    return 'Executa comandos de terminal para preparar o ambiente.';
  }

  if (code.includes('createnativestacknavigator') || code.includes('navigationcontainer')) {
    return 'Monta navegacao entre telas com stack e tipagem.';
  }
  if (code.includes('usecamerapermissions') || code.includes('cameraview')) {
    return 'Pede permissao da camera e renderiza preview nativo.';
  }
  if (code.includes('asyncstorage')) {
    return 'Persiste dados locais para manter estado entre aberturas do app.';
  }
  if (code.includes('createcontext') || code.includes('usecontext')) {
    return 'Compartilha estado global sem prop drilling usando Context API.';
  }
  if (code.includes('useeffect') && code.includes('fetch')) {
    return 'Busca dados de API e renderiza a lista em tela.';
  }
  if (code.includes('usestate')) {
    return 'Controla estado de interface e reatividade em componentes.';
  }
  if (code.includes('interface') || code.includes('type ') || code.includes('enum')) {
    return 'Demonstra tipagem forte com recursos essenciais do TypeScript.';
  }
  if (code.includes('stylesheet.create') || code.includes('flexdirection')) {
    return 'Define layout visual com Flexbox e estilos reutilizaveis.';
  }

  return 'Apresenta um exemplo pratico da etapa estudada no README.';
}

function inferHowToUse(snippet: ReadmeSnippet, doc: ReadmeDoc) {
  if (snippet.language === 'bash') {
    return 'Execute os comandos em ordem no terminal dentro da pasta do projeto.';
  }

  if (snippet.isCommand) {
    return 'Rode este trecho no terminal para preparar ou iniciar o ambiente.';
  }

  if (doc.usage.length > 0) {
    return `Use em um componente React Native e execute com "${doc.usage[doc.usage.length - 1]}".`;
  }

  return 'Cole este trecho em um arquivo .tsx e execute o app para observar o resultado.';
}

function inferPlayful(snippet: ReadmeSnippet) {
  if (snippet.language === 'bash') {
    return 'Imagine que este comando e a chave para abrir a proxima sala do laboratorio.';
  }

  return 'Pense neste trecho como uma peca de LEGO: sozinho ele e simples, junto com outras pecas vira um app completo.';
}

export function buildLesson(snippet: ReadmeSnippet, doc: ReadmeDoc): SnippetLesson {
  const explicitDeps = dependenciesFromSnippet(snippet);
  const dependencies = explicitDeps.length > 0 ? explicitDeps : doc.dependencies;

  return {
    objective: inferObjective(snippet),
    howToUse: inferHowToUse(snippet, doc),
    dependencies,
    playful: inferPlayful(snippet),
  };
}

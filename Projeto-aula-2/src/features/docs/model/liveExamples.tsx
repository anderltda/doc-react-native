import { ReactNode } from 'react';

import { ApiUsersLiveExample } from '@/features/docs/examples/ApiUsersLiveExample';
import { AsyncStorageLiveExample } from '@/features/docs/examples/AsyncStorageLiveExample';
import { CameraLiveExample } from '@/features/docs/examples/CameraLiveExample';
import { ContextAuthLiveExample } from '@/features/docs/examples/ContextAuthLiveExample';
import { FormLiveExample } from '@/features/docs/examples/FormLiveExample';
import { NavigationLiveExample } from '@/features/docs/examples/NavigationLiveExample';
import { PerformanceListLiveExample } from '@/features/docs/examples/PerformanceListLiveExample';
import { StarterLiveExample } from '@/features/docs/examples/StarterLiveExample';
import { StateCounterLiveExample } from '@/features/docs/examples/StateCounterLiveExample';
import { UiProfessionalLiveExample } from '@/features/docs/examples/UiProfessionalLiveExample';
import { DocIconName, ReadmeSlug } from '@/features/docs/model/docRoutes';

export interface LiveExampleDefinition<TConfig = void> {
  id: string;
  title: string;
  description: string;
  icon: DocIconName;
  config: TConfig;
  render: (config: TConfig) => ReactNode;
}

function createLiveExample<TConfig>(example: LiveExampleDefinition<TConfig>) {
  return example;
}

type AnyLiveExample = LiveExampleDefinition<any>;

function simpleExample(
  id: string,
  title: string,
  description: string,
  icon: DocIconName,
  node: ReactNode,
) {
  return createLiveExample({
    id,
    title,
    description,
    icon,
    config: undefined,
    render: () => node,
  });
}

export const DOC_LIVE_EXAMPLES: Record<ReadmeSlug, AnyLiveExample[]> = {
  'roadmap-geral': [
    simpleExample(
      'starter-roadmap',
      'Laboratorio inicial',
      'Exemplo rapido para validar que o ambiente esta operacional.',
      'map-search-outline',
      <StarterLiveExample />,
    ),
    simpleExample(
      'state-roadmap',
      'Estado e eventos',
      'Counter com atualizacao reativa usando useState.',
      'state-machine',
      <StateCounterLiveExample />,
    ),
  ],
  '01-base-do-react-native': [
    simpleExample(
      'starter-01',
      'Primeira interacao',
      'Interacao simples para estudantes novos enxergarem reatividade na pratica.',
      'language-typescript',
      <StarterLiveExample />,
    ),
  ],
  '02-fundamentos-do-react-native': [
    simpleExample(
      'starter-02',
      'Fundamentos em acao',
      'Exemplo minimo e operacional para revisar o fluxo componente -> estado -> tela.',
      'atom-variant',
      <StateCounterLiveExample />,
    ),
  ],
  '03-navegacao': [
    simpleExample(
      'nav-03',
      'Stack funcionando',
      'Navegue entre Home e Details em um mini fluxo real.',
      'navigation-variant-outline',
      <NavigationLiveExample />,
    ),
  ],
  '04-consumo-de-api': [
    simpleExample(
      'api-04',
      'Lista via API',
      'Busca dados reais da JSONPlaceholder com recarga manual.',
      'api',
      <ApiUsersLiveExample />,
    ),
  ],
  '05-gerenciamento-de-estado': [
    simpleExample(
      'state-05',
      'Estado local',
      'Atualiza valores em tela com callbacks memoizados.',
      'state-machine',
      <StateCounterLiveExample />,
    ),
  ],
  '06-formularios': [
    simpleExample(
      'form-06',
      'Formulario basico',
      'Captura de input com feedback imediato para o usuario.',
      'form-select',
      <FormLiveExample />,
    ),
  ],
  '08-arquitetura-de-projeto': [
    simpleExample(
      'starter-08',
      'Arquitetura por camadas',
      'Este projeto demonstra separacao entre app, features, shared, model e examples.',
      'file-tree-outline',
      <StarterLiveExample />,
    ),
  ],
  '09-ui-profissional': [
    simpleExample(
      'ui-09',
      'Design system na pratica',
      'Uso de tokens, hierarquia visual e contraste consistente.',
      'palette-outline',
      <UiProfessionalLiveExample />,
    ),
  ],
  '10-animacoes-e-gestos': [
    simpleExample(
      'starter-10',
      'Base para animacoes',
      'Componente preparado para evoluir com reanimated e gestos.',
      'gesture-tap-button',
      <StarterLiveExample />,
    ),
  ],
  '11-armazenamento-local': [
    simpleExample(
      'storage-11',
      'Persistencia local',
      'Salva e recupera token com AsyncStorage.',
      'database-outline',
      <AsyncStorageLiveExample />,
    ),
  ],
  '12-recursos-nativos-do-dispositivo': [
    simpleExample(
      'camera-12',
      'Camera nativa',
      'Solicita permissao e renderiza preview da camera.',
      'cellphone-cog',
      <CameraLiveExample />,
    ),
  ],
  '13-seguranca': [
    simpleExample(
      'starter-13',
      'Boas praticas de seguranca',
      'Comece protegendo dados locais e validando entradas do usuario.',
      'shield-lock-outline',
      <StarterLiveExample />,
    ),
  ],
  '14-performance': [
    simpleExample(
      'perf-14',
      'Lista otimizada',
      'FlatList com virtualizacao + memo para reduzir custo de render.',
      'speedometer',
      <PerformanceListLiveExample />,
    ),
  ],
  '15-testes': [
    simpleExample(
      'starter-15',
      'Preparar para testes',
      'Exemplo simples para ser alvo de testes unitarios e de integracao.',
      'test-tube',
      <StateCounterLiveExample />,
    ),
  ],
  '16-debug-e-qualidade': [
    simpleExample(
      'starter-16',
      'Debug guiado',
      'Use este bloco para praticar breakpoints e logs estruturados.',
      'bug-check-outline',
      <StarterLiveExample />,
    ),
  ],
  '17-build-release-e-publicacao': [
    simpleExample(
      'starter-17',
      'Pronto para release',
      'Mini fluxo operacional para validar build antes de publicar.',
      'rocket-launch-outline',
      <StarterLiveExample />,
    ),
  ],
  '18-ci-cd': [
    simpleExample(
      'starter-18',
      'Pipeline friendly',
      'Componente previsivel para pipeline CI/CD e testes automatizados.',
      'source-branch',
      <StarterLiveExample />,
    ),
  ],
  '19-observabilidade-e-monitoramento': [
    simpleExample(
      'starter-19',
      'Observabilidade basica',
      'Ponto de partida para adicionar logs, metricas e traces.',
      'chart-areaspline',
      <StarterLiveExample />,
    ),
  ],
  '20-iot': [
    simpleExample(
      'starter-20',
      'Conexao com IoT',
      'Estrutura inicial para integrar sensores e telemetria.',
      'access-point',
      <StarterLiveExample />,
    ),
  ],
};

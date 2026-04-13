import { ReadmeDoc, README_DOCS } from '@/data/readmeDocs';

export const DOC_ROUTE_PATHS = {
  'roadmap-geral': '/roadmap-geral',
  '01-base-do-react-native': '/01-base-do-react-native',
  '02-fundamentos-do-react-native': '/02-fundamentos-do-react-native',
  '03-navegacao': '/03-navegacao',
  '04-consumo-de-api': '/04-consumo-de-api',
  '05-gerenciamento-de-estado': '/05-gerenciamento-de-estado',
  '06-formularios': '/06-formularios',
  '08-arquitetura-de-projeto': '/08-arquitetura-de-projeto',
  '09-ui-profissional': '/09-ui-profissional',
  '10-animacoes-e-gestos': '/10-animacoes-e-gestos',
  '11-armazenamento-local': '/11-armazenamento-local',
  '12-recursos-nativos-do-dispositivo': '/12-recursos-nativos-do-dispositivo',
  '13-seguranca': '/13-seguranca',
  '14-performance': '/14-performance',
  '15-testes': '/15-testes',
  '16-debug-e-qualidade': '/16-debug-e-qualidade',
  '17-build-release-e-publicacao': '/17-build-release-e-publicacao',
  '18-ci-cd': '/18-ci-cd',
  '19-observabilidade-e-monitoramento': '/19-observabilidade-e-monitoramento',
  '20-iot': '/20-iot',
} as const;

export type ReadmeSlug = keyof typeof DOC_ROUTE_PATHS;
export type DocRoutePath = (typeof DOC_ROUTE_PATHS)[ReadmeSlug];

export type DocIconName =
  | 'map-search-outline'
  | 'language-typescript'
  | 'atom-variant'
  | 'navigation-variant-outline'
  | 'api'
  | 'state-machine'
  | 'form-select'
  | 'file-tree-outline'
  | 'palette-outline'
  | 'gesture-tap-button'
  | 'database-outline'
  | 'cellphone-cog'
  | 'shield-lock-outline'
  | 'speedometer'
  | 'test-tube'
  | 'bug-check-outline'
  | 'rocket-launch-outline'
  | 'source-branch'
  | 'chart-areaspline'
  | 'access-point';

export interface DocRouteItem {
  slug: ReadmeSlug;
  path: DocRoutePath;
  icon: DocIconName;
}

const ICONS_BY_SLUG: Record<ReadmeSlug, DocIconName> = {
  'roadmap-geral': 'map-search-outline',
  '01-base-do-react-native': 'language-typescript',
  '02-fundamentos-do-react-native': 'atom-variant',
  '03-navegacao': 'navigation-variant-outline',
  '04-consumo-de-api': 'api',
  '05-gerenciamento-de-estado': 'state-machine',
  '06-formularios': 'form-select',
  '08-arquitetura-de-projeto': 'file-tree-outline',
  '09-ui-profissional': 'palette-outline',
  '10-animacoes-e-gestos': 'gesture-tap-button',
  '11-armazenamento-local': 'database-outline',
  '12-recursos-nativos-do-dispositivo': 'cellphone-cog',
  '13-seguranca': 'shield-lock-outline',
  '14-performance': 'speedometer',
  '15-testes': 'test-tube',
  '16-debug-e-qualidade': 'bug-check-outline',
  '17-build-release-e-publicacao': 'rocket-launch-outline',
  '18-ci-cd': 'source-branch',
  '19-observabilidade-e-monitoramento': 'chart-areaspline',
  '20-iot': 'access-point',
};

export const DOC_ROUTES: DocRouteItem[] = (Object.keys(DOC_ROUTE_PATHS) as ReadmeSlug[]).map(
  (slug) => ({
    slug,
    path: DOC_ROUTE_PATHS[slug],
    icon: ICONS_BY_SLUG[slug],
  }),
);

const routeBySlug = Object.fromEntries(
  DOC_ROUTES.map((route) => [route.slug, route] as const),
) as Record<ReadmeSlug, DocRouteItem>;

export const DEFAULT_DOC_SLUG: ReadmeSlug = 'roadmap-geral';
export const DEFAULT_DOC_PATH: DocRoutePath = DOC_ROUTE_PATHS[DEFAULT_DOC_SLUG];

const docsBySlug = Object.fromEntries(
  README_DOCS.map((doc) => [doc.slug, doc] as const),
) as Record<ReadmeSlug, ReadmeDoc>;

export function getDocBySlug(slug: ReadmeSlug) {
  return docsBySlug[slug];
}

export function getDocByPath(pathname: string) {
  const match = DOC_ROUTES.find((route) => route.path === pathname);
  if (!match) return getDocBySlug(DEFAULT_DOC_SLUG);
  return getDocBySlug(match.slug);
}

export function getRouteBySlug(slug: ReadmeSlug) {
  return routeBySlug[slug];
}

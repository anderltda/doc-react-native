import { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';

import { ReadmeSnippet } from '@/data/readmeDocs';
import { DocHero } from '@/features/docs/components/DocHero';
import { DocLiveExampleCard } from '@/features/docs/components/DocLiveExampleCard';
import { DocMetadataPanels } from '@/features/docs/components/DocMetadataPanels';
import { DocSnippetSection } from '@/features/docs/components/DocSnippetSection';
import { ReadmeSlug, getDocBySlug, getRouteBySlug } from '@/features/docs/model/docRoutes';
import { DOC_LIVE_EXAMPLES } from '@/features/docs/model/liveExamples';
import { buildLesson } from '@/features/docs/model/readmeTeaching';
import { theme } from '@/shared/theme/tokens';

interface SnippetWithLesson {
  snippet: ReadmeSnippet;
  lesson: ReturnType<typeof buildLesson>;
}

interface DocPageTemplateProps {
  slug: ReadmeSlug;
}

export function DocPageTemplate({ slug }: DocPageTemplateProps) {
  const doc = getDocBySlug(slug);
  const route = getRouteBySlug(slug);
  const liveExamples = DOC_LIVE_EXAMPLES[slug] ?? [];

  const sections = useMemo<SnippetWithLesson[]>(
    () => doc.snippets.map((snippet) => ({ snippet, lesson: buildLesson(snippet, doc) })),
    [doc],
  );

  const keyExtractor = useCallback((item: SnippetWithLesson) => item.snippet.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<SnippetWithLesson>) => (
      <DocSnippetSection snippet={item.snippet} lesson={item.lesson} />
    ),
    [],
  );

  const ListHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <DocHero doc={doc} icon={route.icon} />
        <DocMetadataPanels doc={doc} />

        {liveExamples.map((example) => (
          <DocLiveExampleCard
            key={example.id}
            title={example.title}
            description={example.description}
            icon={example.icon}
            config={example.config}
            renderExample={example.render}
          />
        ))}

        <View style={styles.sectionIntro}>
          <Text style={styles.sectionIntroTitle}>Trechos de codigo do README</Text>
          <Text style={styles.sectionIntroText}>
            Cada bloco abaixo contem o codigo original, uma explicacao objetiva e orientacao de uso.
          </Text>
        </View>
      </View>
    ),
    [doc, liveExamples, route.icon],
  );

  return (
    <FlatList
      data={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeader}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      initialNumToRender={5}
      maxToRenderPerBatch={8}
      windowSize={7}
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 40,
  },
  headerContainer: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  sectionIntro: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  sectionIntroTitle: {
    color: '#F4FAFB',
    fontSize: 14,
    fontWeight: '800',
  },
  sectionIntroText: {
    color: '#C8E0E3',
    fontSize: 13,
    lineHeight: 20,
  },
  separator: {
    height: theme.spacing.sm,
  },
});

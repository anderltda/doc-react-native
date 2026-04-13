import { StyleSheet, Text, View } from 'react-native';

import { ReadmeSnippet } from '@/data/readmeDocs';
import { SnippetLesson } from '@/features/docs/model/readmeTeaching';
import { CodeSnippetView } from '@/shared/components/CodeSnippetView';
import { ContentPanel } from '@/shared/components/ContentPanel';
import { GenericPillList } from '@/shared/components/GenericPillList';
import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface DocSnippetSectionProps<TSnippet extends ReadmeSnippet> {
  snippet: TSnippet;
  lesson: SnippetLesson;
}

function DocSnippetSectionInner<TSnippet extends ReadmeSnippet>({
  snippet,
  lesson,
}: DocSnippetSectionProps<TSnippet>) {
  return (
    <View style={styles.section}>
      <CodeSnippetView title={snippet.title} language={snippet.language} code={snippet.code} />

      <ContentPanel title="Explicacao do codigo" variant="light">
        <Text style={styles.text}>O que este trecho faz: {lesson.objective}</Text>
        <Text style={styles.text}>Como usar: {lesson.howToUse}</Text>
        <Text style={styles.text}>Explicacao ludica: {lesson.playful}</Text>
        <Text style={styles.text}>Dependencias relevantes:</Text>
        <GenericPillList
          items={lesson.dependencies}
          keyExtractor={(item) => item}
          labelExtractor={(item) => item}
          emptyLabel="Nenhuma dependencia adicional"
        />
      </ContentPanel>
    </View>
  );
}

export const DocSnippetSection = typedMemo(DocSnippetSectionInner) as typeof DocSnippetSectionInner;

const styles = StyleSheet.create({
  section: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    backgroundColor: 'rgba(6, 21, 25, 0.82)',
    padding: 12,
    gap: 10,
  },
  text: {
    color: theme.colors.textDark,
    fontSize: 13,
    lineHeight: 20,
  },
});

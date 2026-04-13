import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface CodeSnippetViewProps {
  title: string;
  language: string;
  code: string;
}

function CodeSnippetViewComponent({ title, language, code }: CodeSnippetViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.language}>{language || 'text'}</Text>
      </View>
      <ScrollView horizontal style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.codeText}>{code.replace(/\r\n/g, '\n')}</Text>
      </ScrollView>
    </View>
  );
}

export const CodeSnippetView = typedMemo(CodeSnippetViewComponent);

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: '#06161B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    color: '#D7EEF1',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    marginRight: 12,
  },
  language: {
    color: theme.colors.brand,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  scroll: {
    maxHeight: 340,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  codeText: {
    color: '#D5E8E7',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: theme.typography.monoFamily,
  },
});

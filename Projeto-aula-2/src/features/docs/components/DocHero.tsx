import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { ReadmeDoc } from '@/data/readmeDocs';
import { DocIconName } from '@/features/docs/model/docRoutes';
import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface DocHeroProps {
  doc: ReadmeDoc;
  icon: DocIconName;
}

function DocHeroComponent({ doc, icon }: DocHeroProps) {
  return (
    <View style={styles.hero}>
      <View style={styles.kickerRow}>
        <MaterialCommunityIcons name={icon} size={16} color={theme.colors.brand} />
        <Text style={styles.kicker}>Rota: /{doc.slug}</Text>
      </View>
      <Text style={styles.title}>{doc.title}</Text>
      <Text style={styles.path}>Arquivo fonte: {doc.sourcePath}</Text>
      <Text style={styles.summary}>{doc.summary}</Text>
    </View>
  );
}

export const DocHero = typedMemo(DocHeroComponent);

const styles = StyleSheet.create({
  hero: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    backgroundColor: 'rgba(6, 21, 25, 0.78)',
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  kicker: {
    color: '#A9CBCD',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  title: {
    color: '#FFF7E8',
    fontSize: 30,
    fontWeight: '800',
    fontFamily: theme.typography.titleFamily,
  },
  path: {
    color: '#A5C3C7',
    fontSize: 12,
  },
  summary: {
    color: '#E7F3F4',
    fontSize: 15,
    lineHeight: 22,
  },
});

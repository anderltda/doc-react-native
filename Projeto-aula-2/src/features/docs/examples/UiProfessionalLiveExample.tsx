import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

function UiProfessionalLiveExampleComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Exemplo de UI com hierarquia visual, contraste e espaçamento consistente.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardKicker}>Dashboard</Text>
        <Text style={styles.cardTitle}>Visao Geral de Aulas</Text>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>UX</Text>
          <Text style={styles.badge}>Acessibilidade</Text>
          <Text style={styles.badge}>Tokens</Text>
        </View>
      </View>
    </View>
  );
}

export const UiProfessionalLiveExample = typedMemo(UiProfessionalLiveExampleComponent);

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  description: {
    color: '#DCEEF1',
    fontSize: 13,
    lineHeight: 19,
  },
  card: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  cardKicker: {
    color: '#F2B077',
    textTransform: 'uppercase',
    fontSize: 11,
    letterSpacing: 0.6,
    fontWeight: '700',
  },
  cardTitle: {
    color: '#F8FBFC',
    fontSize: 20,
    fontFamily: theme.typography.titleFamily,
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  badge: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    color: '#D7EAED',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

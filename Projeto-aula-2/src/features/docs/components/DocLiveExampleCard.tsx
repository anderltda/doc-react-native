import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DocIconName } from '@/features/docs/model/docRoutes';
import { ContentPanel } from '@/shared/components/ContentPanel';
import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface DocLiveExampleCardProps<TConfig> {
  title: string;
  description: string;
  icon: DocIconName;
  config: TConfig;
  renderExample: (config: TConfig) => ReactNode;
}

function DocLiveExampleCardInner<TConfig>({
  title,
  description,
  icon,
  config,
  renderExample,
}: DocLiveExampleCardProps<TConfig>) {
  return (
    <ContentPanel title={title} subtitle={description} variant="dark">
      <View style={styles.iconRow}>
        <MaterialCommunityIcons name={icon} size={18} color={theme.colors.brand} />
        <Text style={styles.caption}>Exemplo funcionando</Text>
      </View>
      {renderExample(config)}
    </ContentPanel>
  );
}

export const DocLiveExampleCard = typedMemo(DocLiveExampleCardInner) as typeof DocLiveExampleCardInner;

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  caption: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
});

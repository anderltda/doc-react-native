import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface GenericPillListProps<TItem> {
  items: readonly TItem[];
  keyExtractor: (item: TItem, index: number) => string;
  labelExtractor: (item: TItem, index: number) => string;
  emptyLabel?: string;
}

function GenericPillListInner<TItem>({
  items,
  keyExtractor,
  labelExtractor,
  emptyLabel = 'Sem itens cadastrados',
}: GenericPillListProps<TItem>) {
  if (items.length === 0) {
    return <Text style={styles.emptyText}>{emptyLabel}</Text>;
  }

  return (
    <View style={styles.wrap}>
      {items.map((item, index) => (
        <Text key={keyExtractor(item, index)} style={styles.pill}>
          {labelExtractor(item, index)}
        </Text>
      ))}
    </View>
  );
}

export const GenericPillList = typedMemo(GenericPillListInner) as typeof GenericPillListInner;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  pill: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: '#BFDEE1',
    backgroundColor: '#E7F4F5',
    color: '#1E4952',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  emptyText: {
    color: '#3C5960',
    fontSize: 13,
  },
});

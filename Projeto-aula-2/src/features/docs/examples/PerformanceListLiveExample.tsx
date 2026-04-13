import { useMemo } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface PerfItem {
  id: string;
  label: string;
}

const ROW_HEIGHT = 34;

const PerfRow = typedMemo(function PerfRow({ label }: { label: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowText}>{label}</Text>
    </View>
  );
});

function PerformanceListLiveExampleComponent() {
  const data = useMemo<PerfItem[]>(
    () =>
      Array.from({ length: 120 }, (_, index) => ({
        id: `perf-${index + 1}`,
        label: `Item otimizado #${index + 1}`,
      })),
    [],
  );

  const renderItem = ({ item }: ListRenderItemInfo<PerfItem>) => <PerfRow label={item.label} />;

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Este exemplo usa FlatList com virtualizacao para renderizar listas grandes com performance.
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={7}
        removeClippedSubviews
        getItemLayout={(_, index) => ({
          length: ROW_HEIGHT,
          offset: ROW_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}

export const PerformanceListLiveExample = typedMemo(PerformanceListLiveExampleComponent);

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  description: {
    color: '#DAEEF1',
    fontSize: 13,
    lineHeight: 19,
  },
  list: {
    maxHeight: 220,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  row: {
    minHeight: ROW_HEIGHT,
    paddingHorizontal: theme.spacing.sm,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  rowText: {
    color: '#D7EAED',
    fontSize: 12,
  },
});

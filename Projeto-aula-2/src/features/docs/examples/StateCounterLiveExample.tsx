import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

function StateCounterLiveExampleComponent() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const reset = useCallback(() => setCount(0), []);

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Contador: {count}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>
        <Pressable style={styles.ghostButton} onPress={reset}>
          <Text style={styles.ghostButtonText}>Resetar</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const StateCounterLiveExample = typedMemo(StateCounterLiveExampleComponent);

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  counter: {
    color: '#E3F4F6',
    fontSize: 14,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  button: {
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#102D33',
    fontSize: 12,
    fontWeight: '700',
  },
  ghostButton: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ghostButtonText: {
    color: '#DAEEF0',
    fontSize: 12,
    fontWeight: '700',
  },
});

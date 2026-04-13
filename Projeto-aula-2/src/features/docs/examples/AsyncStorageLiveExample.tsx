import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

const STORAGE_KEY = 'token';

function AsyncStorageLiveExampleComponent() {
  const [token, setToken] = useState('');

  const load = useCallback(async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    setToken(value ?? '');
  }, []);

  const save = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEY, '123');
    setToken('123');
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Token salvo: {token || 'Nenhum token'}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={save}>
          <Text style={styles.buttonText}>Salvar token</Text>
        </Pressable>
        <Pressable style={styles.ghostButton} onPress={load}>
          <Text style={styles.ghostButtonText}>Ler token</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const AsyncStorageLiveExample = typedMemo(AsyncStorageLiveExampleComponent);

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  label: {
    color: '#E0F0F2',
    fontSize: 13,
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
    color: '#D7EBEE',
    fontSize: 12,
    fontWeight: '700',
  },
});

import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { ApiUser, getUsers } from '@/services/api';
import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

function ApiUsersLiveExampleComponent() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data.slice(0, 8));
    } catch {
      setUsers([]);
      setError('Falha ao buscar dados da API.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={loadUsers}>
        <Text style={styles.buttonText}>Recarregar API</Text>
      </Pressable>

      {loading ? <ActivityIndicator color={theme.colors.brand} /> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {!loading && !error ? (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => <Text style={styles.itemText}>• {item.name}</Text>}
          removeClippedSubviews
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
        />
      ) : null}
    </View>
  );
}

export const ApiUsersLiveExample = typedMemo(ApiUsersLiveExampleComponent);

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  button: {
    alignSelf: 'flex-start',
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
  itemText: {
    color: '#DCEEF0',
    fontSize: 13,
    lineHeight: 20,
  },
  errorText: {
    color: '#FFC6BE',
    fontSize: 13,
  },
});

import React, { createContext, useContext, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface AuthState {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthState | null>(null);

function Inner() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Status: {auth.user ?? 'Nao logado'}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={() => auth.setUser('Anderson')}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={styles.ghostButton} onPress={() => auth.setUser(null)}>
          <Text style={styles.ghostButtonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ContextAuthLiveExampleComponent() {
  const [user, setUser] = useState<string | null>(null);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={value}>
      <Inner />
    </AuthContext.Provider>
  );
}

export const ContextAuthLiveExample = typedMemo(ContextAuthLiveExampleComponent);

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  label: {
    color: '#E3F3F6',
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
    fontWeight: '700',
    fontSize: 12,
  },
  ghostButton: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  ghostButtonText: {
    color: '#D4E8EB',
    fontWeight: '700',
    fontSize: 12,
  },
});

import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

function StarterLiveExampleComponent() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleToggle = useCallback(() => {
    setIsUnlocked((prev) => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isUnlocked ? 'Parabens, voce ativou o exemplo!' : 'Clique para ativar o exemplo operacional.'}
      </Text>
      <Pressable style={styles.button} onPress={handleToggle}>
        <Text style={styles.buttonText}>{isUnlocked ? 'Reiniciar' : 'Ativar'}</Text>
      </Pressable>
    </View>
  );
}

export const StarterLiveExample = typedMemo(StarterLiveExampleComponent);

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  text: {
    color: '#D9EBED',
    fontSize: 13,
    lineHeight: 20,
  },
  button: {
    alignSelf: 'flex-start',
    borderRadius: theme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: theme.colors.brand,
  },
  buttonText: {
    color: '#102D33',
    fontWeight: '700',
    fontSize: 12,
  },
});

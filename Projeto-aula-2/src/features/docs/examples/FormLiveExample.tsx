import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

function FormLiveExampleComponent() {
  const [name, setName] = useState('');

  const handleShow = useCallback(() => {
    Alert.alert('Nome digitado', name || 'Nenhum nome informado');
  }, [name]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite seu nome:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Seu nome" />
      <Pressable style={styles.button} onPress={handleShow}>
        <Text style={styles.buttonText}>Mostrar no alerta</Text>
      </Pressable>
    </View>
  );
}

export const FormLiveExample = typedMemo(FormLiveExampleComponent);

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  label: {
    color: '#D7EAEC',
    fontSize: 13,
  },
  input: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#F2FAFB',
    paddingHorizontal: 10,
    paddingVertical: 9,
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
});

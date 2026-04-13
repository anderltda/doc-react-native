import { CameraView, useCameraPermissions } from 'expo-camera';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

function CameraLiveExampleComponent() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <View style={styles.messageBox}>
        <Text style={styles.message}>Carregando permissoes da camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.messageBox}>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Permitir camera</Text>
        </Pressable>
      </View>
    );
  }

  return <CameraView style={styles.camera} />;
}

export const CameraLiveExample = typedMemo(CameraLiveExampleComponent);

const styles = StyleSheet.create({
  camera: {
    height: 260,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
  },
  messageBox: {
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: theme.spacing.md,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  message: {
    color: '#D7EBEE',
    fontSize: 13,
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
});

import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({ navigation }: HomeProps) {
  return (
    <View style={styles.inner}>
      <Text style={styles.text}>Home</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Details')}>
        <Text style={styles.buttonText}>Ir para detalhes</Text>
      </Pressable>
    </View>
  );
}

function Details() {
  return (
    <View style={styles.inner}>
      <Text style={styles.text}>Detalhes</Text>
    </View>
  );
}

function NavigationLiveExampleComponent() {
  return (
    <View style={styles.container}>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </View>
  );
}

export const NavigationLiveExample = typedMemo(NavigationLiveExampleComponent);

const styles = StyleSheet.create({
  container: {
    height: 260,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  text: {
    fontSize: 16,
    color: '#163E46',
    fontWeight: '700',
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

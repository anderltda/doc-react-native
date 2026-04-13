import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/shared/theme/tokens';
import { typedMemo } from '@/shared/utils/typedMemo';

interface ContentPanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  variant?: 'dark' | 'light' | 'highlight';
}

function ContentPanelComponent({
  title,
  subtitle,
  children,
  variant = 'light',
}: ContentPanelProps) {
  return (
    <View style={[styles.panel, variant === 'dark' && styles.dark, variant === 'highlight' && styles.highlight]}>
      <Text style={[styles.title, variant !== 'light' && styles.titleDark]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, variant !== 'light' && styles.subtitleDark]}>{subtitle}</Text> : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export const ContentPanel = typedMemo(ContentPanelComponent);

const styles = StyleSheet.create({
  panel: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    backgroundColor: theme.colors.panelLight,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  dark: {
    backgroundColor: theme.colors.panelDark,
  },
  highlight: {
    borderColor: theme.colors.borderStrong,
    backgroundColor: '#FFF4E8',
  },
  title: {
    color: '#17333A',
    fontSize: 15,
    fontWeight: '800',
  },
  titleDark: {
    color: theme.colors.textPrimary,
  },
  subtitle: {
    color: '#2A4A50',
    fontSize: 13,
  },
  subtitleDark: {
    color: theme.colors.textSecondary,
  },
  content: {
    gap: theme.spacing.xs,
  },
});

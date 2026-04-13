import { Slot } from 'expo-router';

import { DocsShell } from '@/features/docs/layout/DocsShell';

export default function DocsLayout() {
  return (
    <DocsShell>
      <Slot />
    </DocsShell>
  );
}

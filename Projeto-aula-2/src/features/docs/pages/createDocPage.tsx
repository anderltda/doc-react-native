import { ComponentType } from 'react';

import { DocPageTemplate } from '@/features/docs/components/DocPageTemplate';
import { ReadmeSlug } from '@/features/docs/model/docRoutes';
import { typedMemo } from '@/shared/utils/typedMemo';

export function createDocPage<TSlug extends ReadmeSlug>(slug: TSlug): ComponentType {
  function ReadmePage() {
    return <DocPageTemplate slug={slug} />;
  }

  ReadmePage.displayName = `ReadmePage(${slug})`;

  return typedMemo(ReadmePage);
}

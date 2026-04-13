import { Redirect } from 'expo-router';

import { DEFAULT_DOC_PATH } from '@/features/docs/model/docRoutes';

export default function NotFound() {
  return <Redirect href={DEFAULT_DOC_PATH} />;
}

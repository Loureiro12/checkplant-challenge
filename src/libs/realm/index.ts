import { createRealmContext } from '@realm/react';

import { Annotation } from './schemas/Annotation';

export const {
  RealmProvider,
  useRealm,
  useQuery,
  useObject,
} = createRealmContext({
  schema: [Annotation],
});

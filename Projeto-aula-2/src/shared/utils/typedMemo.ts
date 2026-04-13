import React from 'react';

export function typedMemo<T extends React.ComponentType<any>>(component: T) {
  return React.memo(component) as unknown as T;
}

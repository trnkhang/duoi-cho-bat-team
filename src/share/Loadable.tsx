/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, lazy, Suspense } from 'react';

export default function loadable(
  factory: () => Promise<{ default: ComponentType<any> }>,
) {
  const Component = lazy(factory);
  return function LoadableComponent(props: any) {
    return (
      <Suspense fallback={<div aria-busy="true">Đang tải…</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
}

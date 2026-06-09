'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';
import { rootStore } from '@shared/store/rootStore';

export const CommonWrapper = observer(({ children }: PropsWithChildren): ReactElement => {
  const { uiStore } = rootStore;

  return (
    <>
      {children}
      {uiStore.message || uiStore.error ? (
        <div className={uiStore.error ? 'toast toast-error' : 'toast'} role="status">
          <span>{uiStore.error || uiStore.message}</span>
          <button aria-label="Закрыть уведомление" onClick={() => uiStore.clear()} type="button">
            ×
          </button>
        </div>
      ) : null}
    </>
  );
});

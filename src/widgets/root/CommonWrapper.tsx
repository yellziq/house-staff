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
      {uiStore.sync.getMessage() || uiStore.sync.getError() ? (
        <div className={uiStore.sync.getError() ? 'toast toast-error' : 'toast'} role="status">
          <span>{uiStore.sync.getError() || uiStore.sync.getMessage()}</span>
          <button aria-label="Закрыть уведомление" onClick={() => uiStore.sync.clear()} type="button">
            ×
          </button>
        </div>
      ) : null}
    </>
  );
});

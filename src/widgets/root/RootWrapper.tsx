'use client';

import type { ReactElement } from 'react';

import { useEffect, type PropsWithChildren } from 'react';
import { rootStore } from '@shared/store/rootStore';
import { AuthWrapper } from '@widgets/root/AuthWrapper';
import { CommonWrapper } from '@widgets/root/CommonWrapper';


export const RootWrapper = ({ children }: PropsWithChildren): ReactElement => {
  useEffect(() => {
    rootStore.userStore.sync.hydrate();
  }, []);

  return (
    <CommonWrapper>
      <AuthWrapper>{children}</AuthWrapper>
    </CommonWrapper>
  );
};

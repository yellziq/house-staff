import type { ReactElement } from 'react';
import type { PropsWithChildren } from 'react';
import { defaultMetadata } from '@shared/seo/metadata';
import { RootWrapper } from '@widgets/root/RootWrapper';
import '@shared/styles/globals.css';

export const metadata = defaultMetadata;

const RootLayout = ({ children }: PropsWithChildren): ReactElement => (
  <html lang="ru">
    <body>
      <RootWrapper>{children}</RootWrapper>
    </body>
  </html>
);

export default RootLayout;

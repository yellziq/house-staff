'use client';

import type { ReactElement } from 'react';

import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { Header } from '@widgets/header/Header';

export const SiteLayout = ({ children }: PropsWithChildren): ReactElement => (
  <div className="site-shell">
    <Header />

    <main>{children}</main>

    <footer className="site-footer">
      <strong>Home Staff</strong>
      <div className="footer-links">
        <Link href="/catalog">Каталог</Link>
        <Link href="/staff">Специалисты</Link>
        <Link href="/support">Поддержка</Link>
      </div>
    </footer>
  </div>
);

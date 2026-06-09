import type { ReactElement } from 'react';
import Link from 'next/link';
import { SiteLayout } from '@widgets/layout/SiteLayout';

const NotFoundPage = (): ReactElement => (
  <SiteLayout>
    <section className="empty-state">
      <p className="eyebrow">404</p>
      <h1>Страница не найдена</h1>
      <p>Такого раздела нет, но можно вернуться на главную страницу.</p>
      <Link className="primary-link" href="/">
        Вернуться в корень сайта
      </Link>
    </section>
  </SiteLayout>
);

export default NotFoundPage;

import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { OrdersView } from '@features/profile/ui/OrdersView';
import { SiteLayout } from '@widgets/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Данные заявок',
  description: 'Страница показа серверных данных после авторизации.',
};

const OrdersPage = (): ReactElement => (
  <SiteLayout>
    <section className="page-intro">
      <p className="eyebrow">серверные данные</p>
      <h1>История заявок</h1>
      <p>Данные загружаются через типизированный GET-запрос после авторизации.</p>
    </section>
    <OrdersView />
  </SiteLayout>
);

export default OrdersPage;

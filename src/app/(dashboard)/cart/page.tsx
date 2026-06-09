import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { CartView } from '@features/cart/ui/CartView';
import { SiteLayout } from '@widgets/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Корзина',
  description: 'Выбранные услуги пользователя.',
};

const CartPage = (): ReactElement => (
  <SiteLayout>
    <section className="page-intro">
      <p className="eyebrow">корзина</p>
      <h1>Ваши выбранные услуги</h1>
      <p>Проверьте состав корзины и отправьте заявку на подбор персонала.</p>
    </section>
    <CartView />
  </SiteLayout>
);

export default CartPage;

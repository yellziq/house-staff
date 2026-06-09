'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { homeStaffApi } from '@shared/api/homeStaffApi';
import { formatPrice } from '@shared/lib/formatters';
import { rootStore } from '@shared/store/rootStore';
import { Button } from '@shared/ui/Button';

export const CartView = observer((): ReactElement => {
  const { cartStore, ordersStore, uiStore, handleUnknownError } = rootStore;

  const handleCheckout = async (): Promise<void> => {
    try {
      const response = await homeStaffApi.createOrder(cartStore.items);
      cartStore.clear();
      ordersStore.addOrder(response.order);
      uiStore.setMessage(response.message);
    } catch (error) {
      handleUnknownError(error);
    }
  };

  return (
    <section className="cart-layout">
      <div className="cart-items">
        {cartStore.items.length === 0 ? (
          <div className="empty-state">
            <h3>Корзина пока пуста</h3>
            <p>Добавьте специалистов из каталога, чтобы начать оформление.</p>
            <Link className="primary-link" href="/catalog">
              Открыть каталог
            </Link>
          </div>
        ) : (
          cartStore.items.map((item) => (
            <article className="cart-item" key={`${item.id}-${item.name}`}>
              <div className="cart-item-content">
                <h3>{item.name}</h3>
                <p>Бронирование услуги для дома</p>
              </div>
              <strong className="cart-item-price">{formatPrice(item.price)}</strong>
            </article>
          ))
        )}
      </div>

      <aside className="summary-card">
        <h3>Итого по заявке</h3>
        <div className="summary-line">
          <span>Услуг</span>
          <strong>{cartStore.items.length}</strong>
        </div>
        <div className="summary-line">
          <span>Сумма</span>
          <strong>{formatPrice(cartStore.total)}</strong>
        </div>
        <Button disabled={cartStore.items.length === 0} onClick={handleCheckout}>
          Отправить заявку
        </Button>
      </aside>
    </section>
  );
});

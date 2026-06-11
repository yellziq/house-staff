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
      const response = await homeStaffApi.createOrder(cartStore.sync.getItems());
      cartStore.sync.clear();
      ordersStore.sync.addOrder(response.order);
      uiStore.sync.setMessage(response.message);
    } catch (error) {
      handleUnknownError(error);
    }
  };

  return (
    <section className="cart-layout">
      <div className="cart-items">
        {cartStore.sync.getItems().length === 0 ? (
          <div className="empty-state">
            <h3>Корзина пока пуста</h3>
            <p>Добавьте специалистов из каталога, чтобы начать оформление.</p>
            <Link className="primary-link" href="/catalog">
              Открыть каталог
            </Link>
          </div>
        ) : (
          cartStore.sync.getItems().map((item) => (
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
          <strong>{cartStore.sync.getItems().length}</strong>
        </div>
        <div className="summary-line">
          <span>Сумма</span>
          <strong>{formatPrice(cartStore.sync.getTotal())}</strong>
        </div>
        <Button disabled={cartStore.sync.getItems().length === 0} onClick={handleCheckout}>
          Отправить заявку
        </Button>
      </aside>
    </section>
  );
});

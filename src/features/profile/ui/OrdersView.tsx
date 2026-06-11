'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { formatOrderDate } from '@shared/lib/formatters';
import { rootStore } from '@shared/store/rootStore';

export const OrdersView = observer((): ReactElement => {
  const { ordersStore, handleUnknownError } = rootStore;

  useEffect(() => {
    ordersStore.async.loadOrders().catch(handleUnknownError);
  }, [ordersStore, handleUnknownError]);

  return (
    <section className="cart-items">
      {ordersStore.sync.getOrders().length === 0 ? (
        <div className="empty-state">
          <h3>История пока пустая</h3>
          <p>Здесь появятся данные, полученные с сервера после авторизации.</p>
        </div>
      ) : (
        ordersStore.sync.getOrders().map((order) => (
          <article className="cart-item" key={order.id}>
            <div>
              <h3>{order.id}</h3>
              <p>{order.items.map((item) => item.name).join(', ')}</p>
            </div>
            <strong>{formatOrderDate(order.createdAt)}</strong>
          </article>
        ))
      )}
    </section>
  );
});

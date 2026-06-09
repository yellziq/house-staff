'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { homeStaffApi } from '@shared/api/homeStaffApi';
import { formatOrderDate } from '@shared/lib/formatters';
import { rootStore } from '@shared/store/rootStore';
import { Button } from '@shared/ui/Button';

export const DashboardView = observer((): ReactElement => {
  const { cartStore, ordersStore, dashboardStore, userStore, uiStore, handleUnknownError } =
    rootStore;

  useEffect(() => {
    dashboardStore.loadDashboard().catch(handleUnknownError);
    ordersStore.loadOrders().catch(handleUnknownError);
  }, [dashboardStore, ordersStore, handleUnknownError]);

  const handleDeleteOrder = async (orderId: string): Promise<void> => {
    try {
      const response = await homeStaffApi.deleteOrder(orderId);
      ordersStore.removeOrder(orderId);
      dashboardStore.decrementActiveOrders();
      uiStore.setMessage(response.message);
    } catch (error) {
      handleUnknownError(error);
    }
  };

  return (
    <>
      <section className="dashboard-grid">
        <article className="info-card">
          <p className="eyebrow">кабинет</p>
          <h1>Здравствуйте, {userStore.user?.email}</h1>
          <p>Здесь можно следить за заявками, корзиной и выбранными услугами для дома.</p>
        </article>
        <article className="info-card">
          <h2>{dashboardStore.summary.activeOrders}</h2>
          <p>заявок уже отправлено</p>
        </article>
        <article className="info-card">
          <h2>{dashboardStore.summary.favoriteCategory}</h2>
          <p>Популярная категория. Сейчас в корзине {cartStore.items.length} услуг.</p>
        </article>
        <article className="info-card">
          <h2>{dashboardStore.summary.responseTime}</h2>
          <p>Среднее время ответа менеджера после отправки заявки.</p>
        </article>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">заявки</p>
            <h2>Отправленные бронирования</h2>
          </div>
        </div>
        <div className="cart-items">
          {ordersStore.orders.length === 0 ? (
            <div className="empty-state">
              <h3>Заявок пока нет</h3>
              <p>После бронирования специалиста заявка появится здесь.</p>
            </div>
          ) : (
            ordersStore.orders.map((order) => (
              <article className="cart-item" key={order.id}>
                <div>
                  <h3>{order.id}</h3>
                  <p>{order.items.map((item) => item.name).join(', ')}</p>
                </div>
                <div className="dashboard-order-meta">
                  <strong>{formatOrderDate(order.createdAt)}</strong>
                  <Button variant="secondary" onClick={() => handleDeleteOrder(order.id)}>
                    Удалить
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
});

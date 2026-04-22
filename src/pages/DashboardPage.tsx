import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeStaffApi } from '../api/homeStaffApi';
import { Layout } from '../components/Layout';
import type { RootState } from '../store';
import { dashboardSlice } from '../store/slices/dashboardSlice';
import { ordersSlice } from '../store/slices/ordersSlice';
import { settingsSlice } from '../store/slices/settingsSlice';
import { formatOrderDate } from '../utils/formatters';

export const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { items: orders, isLoaded: areOrdersLoaded } = useSelector(
    (state: RootState) => state.orders,
  );
  const { summary, isLoaded: isDashboardLoaded } = useSelector(
    (state: RootState) => state.dashboard,
  );
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    let active = true;

    if (!isDashboardLoaded) {
      homeStaffApi
        .getDashboard()
        .then((data) => {
          if (active) {
            dispatch(dashboardSlice.actions.setSummary(data));
          }
        })
        .catch(() => undefined);
    }

    if (!areOrdersLoaded) {
      homeStaffApi
        .getOrders()
        .then((items) => {
          if (active) {
            dispatch(ordersSlice.actions.setOrders(items));
          }
        })
        .catch(() => undefined);
    }

    return () => {
      active = false;
    };
  }, [areOrdersLoaded, dispatch, isDashboardLoaded]);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await homeStaffApi.deleteOrder(orderId);
      dispatch(ordersSlice.actions.removeOrder(orderId));
      dispatch(settingsSlice.actions.setError(response.message));
      dispatch(dashboardSlice.actions.decrementActiveOrders());
    } catch (error) {
      return;
    }
  };

  return (
    <Layout>
      <section className="dashboard-grid">
        <article className="info-card">
          <p className="eyebrow">кабинет</p>
          <h1>Здравствуйте, {user?.email}</h1>
          <p>Здесь можно следить за заявками, корзиной и выбранными услугами для дома.</p>
        </article>
        <article className="info-card">
          <h2>{summary.activeOrders}</h2>
          <p>заявок уже отправлено</p>
        </article>
        <article className="info-card">
          <h2>{summary.favoriteCategory}</h2>
          <p>Популярная категория. Сейчас в корзине {cartItems.length} услуг.</p>
        </article>
        <article className="info-card">
          <h2>{summary.responseTime}</h2>
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
          {orders.length === 0 ? (
            <div className="empty-state">
              <h3>Заявок пока нет</h3>
              <p>После бронирования специалиста заявка появится здесь.</p>
            </div>
          ) : (
            orders.map((order) => (
              <article className="cart-item" key={order.id}>
                <div>
                  <h3>{order.id}</h3>
                  <p>{order.items.map((item) => item.name).join(', ')}</p>
                </div>
                <div className="dashboard-order-meta">
                  <strong>{formatOrderDate(order.createdAt)}</strong>
                  <button className="secondary-button" onClick={() => handleDeleteOrder(order.id)}>
                    Удалить
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
};

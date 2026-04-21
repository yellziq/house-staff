import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/Layout';
import { homeStaffApi } from '../api/homeStaffApi';
import type { RootState } from '../store';
import { cartSlice } from '../store/slices/cartSlice';
import { ordersSlice } from '../store/slices/ordersSlice';
import { settingsSlice } from '../store/slices/settingsSlice';
import { formatPrice } from '../utils/formatters';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (!isAuth) {
      dispatch(settingsSlice.actions.setError('Сначала войдите в аккаунт, чтобы отправить заявку.'));
      return;
    }

    try {
      const response = await homeStaffApi.createOrder(items);
      dispatch(cartSlice.actions.clearCart());
      dispatch(ordersSlice.actions.addOrder(response.order));
      dispatch(settingsSlice.actions.setError(response.message));
    } catch (error) {
      return;
    }
  };

  return (
    <Layout>
      <section className="page-intro">
        <p className="eyebrow">корзина</p>
        <h1>Ваши выбранные услуги</h1>
        <p>Проверьте состав корзины и отправьте заявку на подбор персонала.</p>
      </section>

      <section className="cart-layout">
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-state">
              <h3>Корзина пока пуста</h3>
              <p>Добавьте специалистов из каталога, чтобы начать оформление.</p>
            </div>
          ) : (
            items.map((item) => (
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
            <strong>{items.length}</strong>
          </div>
          <div className="summary-line">
            <span>Сумма</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button className="primary-button" disabled={items.length === 0} onClick={handleCheckout}>
            Отправить заявку
          </button>
        </aside>
      </section>
    </Layout>
  );
};

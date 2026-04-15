import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/Button';
import { Layout } from '../components/Layout';
import { useStaffCatalog } from '../hooks/useStaffCatalog';
import type { RootState } from '../store';
import { favoritesSlice } from '../store/slices/favoritesSlice';
import { cartSlice } from '../store/slices/cartSlice';
import { catalogSlice } from '../store/slices/catalogSlice';
import { settingsSlice } from '../store/slices/settingsSlice';
import { formatPrice } from '../utils/formatters';

export const StaffPage: React.FC = () => {
  const dispatch = useDispatch();
  const { staff, isLoading } = useStaffCatalog();
  const activeCategory = useSelector((state: RootState) => state.catalog.activeCategory);
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const filteredStaff = activeCategory ? staff.filter((member) => member.role === activeCategory) : staff;

  const handleBook = (id: number, role: string, name: string, price: number) => {
    dispatch(
      cartSlice.actions.addToCart({
        id,
        name: `${role}: ${name}`,
        price,
      }),
    );
    dispatch(settingsSlice.actions.setError(`Бронирование для ${name} добавлено в корзину.`));
  };

  return (
    <Layout>
      <section className="page-intro">
        <p className="eyebrow">специалисты</p>
        <h1>Люди, которым доверяют дом и семью.</h1>
        {activeCategory ? (
          <div className="active-filter">
            <span>Выбранная категория: {activeCategory}</span>
            <button
              className="secondary-button"
              onClick={() => dispatch(catalogSlice.actions.setActiveCategory(null))}
            >
              Сбросить фильтр
            </button>
          </div>
        ) : null}
      </section>

      <section className="staff-list">
        {isLoading ? <div className="empty-state">Загружаем специалистов...</div> : null}
        {filteredStaff.map((member) => (
          <article className="staff-row" key={member.id}>
            <div className="staff-row-main">
              <span className="badge">{member.badge}</span>
              <h3>{member.name}</h3>
              <p className="staff-role">{member.role}</p>
              <button
                className="favorite-link"
                onClick={() => dispatch(favoritesSlice.actions.toggleFavorite(member.id))}
              >
                {favoriteIds.includes(member.id) ? 'Убрать из избранного' : 'В избранное'}
              </button>
            </div>
            <p>{member.description}</p>
            <div className="staff-row-meta">
              <span>{member.experience}</span>
              <span>{member.schedule}</span>
              <strong>{formatPrice(member.price)}</strong>
              <Button
                label="Забронировать"
                onClick={() => handleBook(member.id, member.role, member.name, member.price)}
              />
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
};

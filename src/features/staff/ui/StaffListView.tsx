'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { formatPrice } from '@shared/lib/formatters';
import { rootStore } from '@shared/store/rootStore';
import { Button } from '@shared/ui/Button';


export const StaffListView = observer((): ReactElement => {
  const { catalogStore, cartStore, uiStore, handleUnknownError } = rootStore;
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    catalogStore.async.loadStaff().catch(handleUnknownError);
  }, [catalogStore, handleUnknownError]);

  const toggleFavorite = (id: number): void => {
    setFavoriteIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <section className="staff-list">
      {!catalogStore.sync.getIsLoaded() ? <div className="empty-state">Загружаем специалистов...</div> : null}
      {catalogStore.sync.getActiveCategory() ? (
        <div className="active-filter">
          <span>Выбранная категория: {catalogStore.sync.getActiveCategory()}</span>
          <Button variant="secondary" onClick={() => catalogStore.sync.setActiveCategory(null)}>
            Сбросить фильтр
          </Button>
        </div>
      ) : null}
      {catalogStore.sync.getFilteredStaff().map((member) => (
        <article className="staff-row" key={member.id}>
          <div className="staff-row-main">
            <span className="badge">{member.badge}</span>
            <h3>{member.name}</h3>
            <p className="staff-role">{member.role}</p>
            <button className="favorite-link" onClick={() => toggleFavorite(member.id)} type="button">
              {favoriteIds.includes(member.id) ? 'Убрать из избранного' : 'В избранное'}
            </button>
          </div>
          <p>{member.description}</p>
          <div className="staff-row-meta">
            <span>{member.experience}</span>
            <span>{member.schedule}</span>
            <strong>{formatPrice(member.price)}</strong>
            <Button
              onClick={() => {
                cartStore.sync.add({
                  id: member.id,
                  name: `${member.role}: ${member.name}`,
                  price: member.price,
                });
                uiStore.sync.setMessage(`Бронирование для ${member.name} добавлено в корзину.`);
              }}
            >
              Забронировать
            </Button>
          </div>
        </article>
      ))}
    </section>
  );
});

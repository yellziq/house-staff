'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { formatPrice } from '@shared/lib/formatters';
import { rootStore } from '@shared/store/rootStore';
import { Button } from '@shared/ui/Button';


interface ServiceGroup {
  count: number;
  minPrice: number;
  description: string;
}

export const CatalogView = observer((): ReactElement => {
  const router = useRouter();
  const { catalogStore, handleUnknownError } = rootStore;

  useEffect(() => {
    catalogStore.async.loadStaff().catch(handleUnknownError);
  }, [catalogStore, handleUnknownError]);

  const serviceGroups = catalogStore.sync.getStaff().reduce<Record<string, ServiceGroup>>((acc, member) => {
    const current = acc[member.role];
    if (!current) {
      acc[member.role] = {
        count: 1,
        minPrice: member.price,
        description: member.description,
      };
      return acc;
    }

    current.count += 1;
    current.minPrice = Math.min(current.minPrice, member.price);
    return acc;
  }, {});

  return (
    <section className="service-grid">
      {!catalogStore.sync.getIsLoaded() ? <div className="empty-state">Загружаем каталог...</div> : null}
      {Object.entries(serviceGroups).map(([role, info]) => (
        <article className="service-card" key={role}>
          <span className="badge">Услуга</span>
          <h3>{role}</h3>
          <p>{info.description}</p>
          <div className="service-meta">
            <span>Специалистов: {info.count}</span>
            <span>От {formatPrice(info.minPrice)}</span>
          </div>
          <Button
            onClick={() => {
              catalogStore.sync.setActiveCategory(role);
              router.push('/staff');
            }}
          >
            Подобрать специалиста
          </Button>
        </article>
      ))}
    </section>
  );
});

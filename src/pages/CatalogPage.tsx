import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout } from '../components/Layout';
import { useStaffCatalog } from '../hooks/useStaffCatalog';
import { catalogSlice } from '../store/slices/catalogSlice';
import { formatPrice } from '../utils/formatters';

export const CatalogPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { staff, isLoading } = useStaffCatalog();
  const serviceGroups = staff.reduce<Record<string, { count: number; minPrice: number; description: string }>>(
    (acc, member) => {
      if (!acc[member.role]) {
        acc[member.role] = {
          count: 0,
          minPrice: member.price,
          description: member.description,
        };
      }

      acc[member.role].count += 1;
      acc[member.role].minPrice = Math.min(acc[member.role].minPrice, member.price);
      return acc;
    },
    {},
  );

  return (
    <Layout>
      <section className="page-intro">
        <p className="eyebrow">каталог</p>
        <h1>Каталог услуг для дома.</h1>
      </section>

      <section className="service-grid">
        {isLoading ? <div className="empty-state">Загружаем каталог...</div> : null}
        {!isLoading
          ? Object.entries(serviceGroups).map(([role, info]) => (
              <article className="service-card" key={role}>
                <span className="badge">Услуга</span>
                <h3>{role}</h3>
                <p>{info.description}</p>
                <div className="service-meta">
                  <span>Специалистов: {info.count}</span>
                  <span>От {formatPrice(info.minPrice)}</span>
                </div>
                <button
                  className="primary-button"
                  onClick={() => {
                    dispatch(catalogSlice.actions.setActiveCategory(role));
                    navigate('/staff');
                  }}
                >
                  Подобрать специалиста
                </button>
              </article>
            ))
          : null}
      </section>
    </Layout>
  );
};

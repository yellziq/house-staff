import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const UnauthorizedPage: React.FC = () => {
  return (
    <Layout>
      <section className="auth-card">
        <p className="eyebrow">401</p>
        <h1>Доступ ограничен</h1>
        <p>Эта страница доступна только авторизованным пользователям.</p>
        <Link className="primary-link" to="/login">
          Перейти ко входу
        </Link>
      </section>
    </Layout>
  );
};

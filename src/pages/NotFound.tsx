import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../ui/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="auth-card">
        <p className="eyebrow">404</p>
        <h1>Страница не найдена</h1>
        <p>Похоже, такой страницы нет. Вернём вас обратно на главную витрину.</p>
        <Button label="На главную" onClick={() => navigate('/')} />
      </section>
    </Layout>
  );
};

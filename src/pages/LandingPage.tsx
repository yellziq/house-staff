import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { StaffCard } from '../components/StaffCard';
import { useStaffCatalog } from '../hooks/useStaffCatalog';

export const LandingPage: React.FC = () => {
  const { staff } = useStaffCatalog();

  return (
    <Layout>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">магазин для дома</p>
          <h1>Лучшие решения для уюта, чистоты и заботы о доме.</h1>
          <p className="hero-text">
            Здесь можно подобрать домашний персонал и услуги для семьи: от няни и уборки до
            повара, помощника по дому и регулярного ухода.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" to="/catalog">
              Открыть каталог
            </Link>
            <Link className="secondary-link" to="/staff">
              Посмотреть персонал
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>250+</strong>
              <span>проверенных специалистов</span>
            </div>
            <div>
              <strong>4.9</strong>
              <span>средняя оценка клиентов</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>среднее время ответа</span>
            </div>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-card accent-card">
            <span>Популярно сейчас: </span>
            <strong>Няни и домработницы</strong>
            <p>Самые востребованные услуги для семей, которым важны комфорт и время.</p>
          </div>
          <div className="hero-panel-card">
            <span>Почему выбирают нас</span>
            <ul className="feature-list">
              <li>Проверенные кандидаты и понятные условия</li>
              <li>Удобный выбор услуг и простая заявка</li>
              <li>Спокойный светлый интерфейс без перегруза</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="home-strip">
        <div className="strip-card">
          <span>Для квартиры</span>
          <strong>Уборка, глажка, уход за гардеробом</strong>
        </div>
        <div className="strip-card">
          <span>Для семьи</span>
          <strong>Няни, сиделки, повара и ассистенты</strong>
        </div>
        <div className="strip-card">
          <span>Для комфорта</span>
          <strong>Гибкий график, прозрачные цены, быстрая связь</strong>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">подборка</p>
            <h2>Специалисты, которых часто выбирают</h2>
          </div>
          <Link className="text-link" to="/catalog">
            Весь каталог
          </Link>
        </div>
        <div className="card-grid">
          {staff.slice(0, 3).map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

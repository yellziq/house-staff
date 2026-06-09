import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { SiteLayout } from '@widgets/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Поддержка',
  description: 'Дополнительная страница помощи клиентам.',
};

const SupportPage = (): ReactElement => (
  <SiteLayout>
    <section className="dashboard-grid">
      <article className="info-card">
        <p className="eyebrow">поддержка</p>
        <h1>Центр помощи</h1>
        <p>Менеджер помогает уточнить график, стоимость и условия выхода специалиста.</p>
      </article>
      <article className="info-card">
        <h2>09:00 - 21:00</h2>
        <p>Время ответа службы заботы о клиентах.</p>
      </article>
      <article className="info-card">
        <h2>1 заявка</h2>
        <p>Достаточно одной заявки, чтобы менеджер подобрал несколько кандидатов.</p>
      </article>
    </section>
  </SiteLayout>
);

export default SupportPage;

import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { CatalogView } from '@features/staff/ui/CatalogView';
import { SiteLayout } from '@widgets/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Каталог',
  description: 'Каталог услуг Home Staff.',
};

const CatalogPage = (): ReactElement => (
  <SiteLayout>
    <section className="page-intro">
      <p className="eyebrow">каталог</p>
      <h1>Каталог услуг для дома.</h1>
    </section>
    <CatalogView />
  </SiteLayout>
);

export default CatalogPage;

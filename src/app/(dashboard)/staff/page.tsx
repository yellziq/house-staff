import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { StaffListView } from '@features/staff/ui/StaffListView';
import { SiteLayout } from '@widgets/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Персонал',
  description: 'Список проверенных специалистов Home Staff.',
};

const StaffPage = (): ReactElement => (
  <SiteLayout>
    <section className="page-intro">
      <p className="eyebrow">специалисты</p>
      <h1>Люди, которым доверяют дом и семью.</h1>
    </section>
    <StaffListView />
  </SiteLayout>
);

export default StaffPage;

import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { DashboardView } from '@features/profile/ui/DashboardView';
import { SiteLayout } from '@widgets/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Личный кабинет',
  description: 'Личный кабинет пользователя Home Staff.',
};

const DashboardPage = (): ReactElement => (
  <SiteLayout>
    <DashboardView />
  </SiteLayout>
);

export default DashboardPage;

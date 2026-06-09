import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { ProfileView } from '@features/profile/ui/ProfileView';
import { SiteLayout } from '@widgets/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Профиль',
  description: 'Настройки профиля пользователя.',
};

const ProfilePage = (): ReactElement => (
  <SiteLayout>
    <ProfileView />
  </SiteLayout>
);

export default ProfilePage;

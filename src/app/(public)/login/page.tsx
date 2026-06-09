import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from '@features/auth/ui/LoginForm';
import { SiteLayout } from '@widgets/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Авторизация',
  description: 'Страница входа в аккаунт Home Staff.',
};

const LoginPage = (): ReactElement => (
  <SiteLayout>
    <LoginForm />
  </SiteLayout>
);

export default LoginPage;

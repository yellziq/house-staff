import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { RegisterForm } from '@features/auth/ui/RegisterForm';
import { SiteLayout } from '@widgets/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'Регистрация',
  description: 'Создание аккаунта Home Staff.',
};

const RegisterPage = (): ReactElement => (
  <SiteLayout>
    <RegisterForm />
  </SiteLayout>
);

export default RegisterPage;

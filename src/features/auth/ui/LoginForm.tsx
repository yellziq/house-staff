'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { homeStaffApi } from '@shared/api/homeStaffApi';
import { rootStore } from '@shared/store/rootStore';
import { Button } from '@shared/ui/Button';

export const LoginForm = observer((): ReactElement => {
  const router = useRouter();
  const { userStore, uiStore, handleUnknownError } = rootStore;
  const [email, setEmail] = useState<string>('client@homestaff.com');
  const [password, setPassword] = useState<string>('demo123');

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await homeStaffApi.login({ email, password });
      userStore.setAuth(response);
      uiStore.setMessage('Вы успешно вошли в аккаунт.');
      router.push('/dashboard');
    } catch (error) {
      handleUnknownError(error);
    }
  };

  return (
    <section className="auth-card">
      <p className="eyebrow">вход</p>
      <h1>С возвращением</h1>
      <p>Войдите в аккаунт, чтобы управлять заявками и сохранять выбранные услуги.</p>
      <label className="field">
        <span>Электронная почта</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label className="field">
        <span>Пароль</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <Button onClick={handleLogin}>Войти</Button>
      <div className="auth-helper">
        <span>Еще нет аккаунта?</span>
        <Link className="text-link" href="/register">
          Зарегистрироваться
        </Link>
      </div>
    </section>
  );
});

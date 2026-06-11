'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type PropsWithChildren } from 'react';
import { rootStore } from '@shared/store/rootStore';

const protectedRoutes = ['/dashboard', '/profile', '/orders', '/support', '/catalog', '/staff', '/cart'];

export const AuthWrapper = observer(({ children }: PropsWithChildren): ReactElement => {
  const pathname = usePathname();
  const router = useRouter();
  const { userStore } = rootStore;
  const currentPathname = pathname || '/';
  const isProtectedRoute = protectedRoutes.some((route) => currentPathname.startsWith(route));

  useEffect(() => {
    if (isProtectedRoute && userStore.sync.getHasHydrated() && !userStore.sync.getIsAuth()) {
      router.replace('/login');
    }
  }, [isProtectedRoute, router, userStore.sync.getHasHydrated(), userStore.sync.getIsAuth()]);

  if (isProtectedRoute && !userStore.sync.getHasHydrated()) {
    return (
      <main className="auth-guard">
        <section className="auth-guard-card">
          <p className="eyebrow">проверка</p>
          <h1>Проверяем сессию</h1>
          <p>Сейчас откроем защищенный раздел, если вы уже вошли в аккаунт.</p>
        </section>
      </main>
    );
  }

  if (isProtectedRoute && !userStore.sync.getIsAuth()) {
    return (
      <main className="auth-guard">
        <section className="auth-guard-card">
          <p className="eyebrow">401</p>
          <h1>Нужна авторизация</h1>
          <p>Войдите в аккаунт, чтобы открыть личный кабинет и данные заявок.</p>
          <Link className="primary-link" href="/login">
            Перейти ко входу
          </Link>
        </section>
      </main>
    );
  }

  return <>{children}</>;
});

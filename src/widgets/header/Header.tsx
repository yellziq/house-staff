'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { rootStore } from '@shared/store/rootStore';

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/staff', label: 'Персонал' },
  { href: '/cart', label: 'Корзина' },
  { href: '/dashboard', label: 'Кабинет' },
];

export const Header = observer((): ReactElement => {
  const pathname = usePathname();
  const { userStore, cartStore } = rootStore;

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">HS</span>
        <span className="brand-text">
          <strong>Home Staff</strong>
          <small>Персонал и услуги для дома</small>
        </span>
      </Link>

      <nav className="topnav" aria-label="Главная навигация">
        {navItems.map((item) => (
          <Link
            className={pathname === item.href ? 'nav-link nav-link-active' : 'nav-link'}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="topbar-actions">
        <Link className="cart-pill" href="/cart">
          Корзина: {cartStore.items.length}
        </Link>
        {userStore.isAuth ? (
          <Link className="ghost-link" href="/profile">
            Профиль
          </Link>
        ) : (
          <>
            <Link className="ghost-link" href="/login">
              Войти
            </Link>
            <Link className="primary-link topbar-register" href="/register">
              Регистрация
            </Link>
          </>
        )}
      </div>
    </header>
  );
});

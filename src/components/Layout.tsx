import React, { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/staff', label: 'Персонал' },
  { to: '/cart', label: 'Корзина' },
  { to: '/dashboard', label: 'Кабинет' },
];

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">HS</span>
          <span className="brand-text">
            <strong>Home Staff</strong>
            <small>Товары и персонал для дома</small>
          </span>
        </Link>

        <nav className="topnav">
          {navItems.map((item) => (
            <Link
              key={item.to}
              className={location.pathname === item.to ? 'nav-link nav-link-active' : 'nav-link'}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="topbar-actions">
          {isAuth ? (
            <Link className="ghost-link" to="/profile">
              Профиль
            </Link>
          ) : (
            <>
              <Link className="ghost-link" to="/login">
                Войти
              </Link>
              <Link className="primary-link topbar-register" to="/register">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <strong>Home Staff</strong>
        </div>
        <div className="footer-links">
          <Link to="/catalog">Каталог</Link>
          <Link to="/staff">Специалисты</Link>
          <Link to="/cart">Корзина</Link>
        </div>
      </footer>
    </div>
  );
};

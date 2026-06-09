'use client';

import type { ReactElement } from 'react';

import Link from 'next/link';
import { Button } from '@shared/ui/Button';

interface RouteErrorProps {
  error: Error;
  reset: () => void;
}

export const RouteLoading = (): ReactElement => (
  <div className="empty-state">
    <h2>Загружаем страницу</h2>
    <p>Подготавливаем данные и интерфейс.</p>
  </div>
);

export const RouteError = ({ error, reset }: RouteErrorProps): ReactElement => (
  <div className="empty-state">
    <p className="eyebrow">ошибка</p>
    <h2>Раздел временно недоступен</h2>
    <p>{error.message || 'Попробуйте обновить страницу.'}</p>
    <Button onClick={reset}>Повторить</Button>
  </div>
);

export const RouteNotFound = (): ReactElement => (
  <div className="empty-state">
    <p className="eyebrow">404</p>
    <h2>Раздел не найден</h2>
    <p>Можно вернуться в корень дерева маршрутов.</p>
    <Link className="primary-link" href="/">
      На главную
    </Link>
  </div>
);

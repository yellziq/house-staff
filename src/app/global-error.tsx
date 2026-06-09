'use client';

import type { ReactElement } from 'react';

import { Button } from '@shared/ui/Button';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps): ReactElement => (
  <html lang="ru">
    <body>
      <main className="auth-guard">
        <section className="auth-guard-card">
          <p className="eyebrow">ошибка</p>
          <h1>Что-то пошло не так</h1>
          <p>{error.message || 'Критическая ошибка обработана без поломки интерфейса.'}</p>
          <Button onClick={reset}>Повторить</Button>
        </section>
      </main>
    </body>
  </html>
);

export default GlobalError;

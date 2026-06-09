'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { homeStaffApi } from '@shared/api/homeStaffApi';
import { rootStore } from '@shared/store/rootStore';
import { Button } from '@shared/ui/Button';

const interestOptions = [
  'Домработница',
  'Няня',
  'Личный повар',
  'Сиделка',
  'Садовник',
  'Управляющая домом',
];

export const RegisterForm = observer((): ReactElement => {
  const router = useRouter();
  const { userStore, uiStore, handleUnknownError } = rootStore;
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string): void => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  const handleOpenPreferences = (): void => {
    if (!email || !password || !phone || !address) {
      uiStore.setError('Сначала заполните все поля регистрации.');
      return;
    }

    setIsModalOpen(true);
  };

  const handleRegister = async (): Promise<void> => {
    try {
      const response = await homeStaffApi.register({
        email,
        password,
        phone,
        address,
        interests: selectedInterests,
      });
      userStore.setAuth(response);
      uiStore.setMessage('Аккаунт успешно создан.');
      router.push('/dashboard');
    } catch (error) {
      handleUnknownError(error);
    }
  };

  return (
    <>
      <section className="auth-card">
        <p className="eyebrow">регистрация</p>
        <h1>Создайте аккаунт Home Staff</h1>
        <p>После регистрации можно сохранять выбранные услуги и отправлять заявки онлайн.</p>
        <label className="field">
          <span>Электронная почта</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="field">
          <span>Номер телефона</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label className="field">
          <span>Адрес</span>
          <input value={address} onChange={(event) => setAddress(event.target.value)} />
        </label>
        <label className="field">
          <span>Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <Button onClick={handleOpenPreferences}>Продолжить</Button>
      </section>

      {isModalOpen ? (
        <div className="preferences-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="preferences-modal" onClick={(event) => event.stopPropagation()}>
            <p className="eyebrow">предпочтения</p>
            <h2>Что вас интересует?</h2>
            <p className="modal-copy">
              Выберите услуги, чтобы мы показали более точные рекомендации после регистрации.
            </p>
            <div className="interest-grid">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  className={
                    selectedInterests.includes(interest)
                      ? 'interest-chip interest-chip-active'
                      : 'interest-chip'
                  }
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Назад
              </Button>
              <Button onClick={handleRegister}>Завершить регистрацию</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});

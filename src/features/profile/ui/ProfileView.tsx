'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
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

export const ProfileView = observer((): ReactElement => {
  const { userStore, uiStore, handleUnknownError } = rootStore;
  const [phone, setPhone] = useState<string>(userStore.user?.phone || '');
  const [address, setAddress] = useState<string>(userStore.user?.address || '');
  const [interests, setInterests] = useState<string[]>(userStore.user?.interests || []);

  const handleSaveProfile = async (): Promise<void> => {
    try {
      const response = await homeStaffApi.updateProfile({ phone, address });
      userStore.setAuth(response);
      uiStore.setMessage('Профиль обновлен.');
    } catch (error) {
      handleUnknownError(error);
    }
  };

  const handleSaveInterests = async (): Promise<void> => {
    try {
      const response = await homeStaffApi.patchInterests({ interests });
      userStore.setAuth(response);
      uiStore.setMessage('Интересы обновлены.');
    } catch (error) {
      handleUnknownError(error);
    }
  };

  return (
    <section className="dashboard-grid">
      <article className="info-card">
        <p className="eyebrow">профиль</p>
        <h1>{userStore.user?.email}</h1>
        <p>Роль: {userStore.user?.role}</p>
        <label className="field">
          <span>Телефон</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label className="field">
          <span>Адрес</span>
          <input value={address} onChange={(event) => setAddress(event.target.value)} />
        </label>
        <Button onClick={handleSaveProfile}>Сохранить профиль</Button>
      </article>
      <article className="info-card">
        <p className="eyebrow">интересы</p>
        <h2>Настройка рекомендаций</h2>
        <div className="interest-grid">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              className={
                interests.includes(interest) ? 'interest-chip interest-chip-active' : 'interest-chip'
              }
              onClick={() =>
                setInterests((current) =>
                  current.includes(interest)
                    ? current.filter((item) => item !== interest)
                    : [...current, interest],
                )
              }
            >
              {interest}
            </button>
          ))}
        </div>
        <Button onClick={handleSaveInterests}>Обновить интересы</Button>
        <Button variant="secondary" onClick={() => userStore.logout()}>
          Выйти
        </Button>
      </article>
    </section>
  );
});

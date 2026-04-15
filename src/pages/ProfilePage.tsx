import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeStaffApi } from '../api/homeStaffApi';
import { Layout } from '../components/Layout';
import type { RootState } from '../store';
import { settingsSlice } from '../store/slices/settingsSlice';
import { userSlice } from '../store/slices/userSlice';

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const interestOptions = [
    'Домработница',
    'Няня',
    'Личный повар',
    'Сиделка',
    'Садовник',
    'Управляющая домом',
  ];

  const handleSaveProfile = async () => {
    try {
      const response = await homeStaffApi.updateProfile({ phone, address });
      dispatch(userSlice.actions.setUser(response));
      dispatch(settingsSlice.actions.setError('Профиль обновлён.'));
    } catch (error) {
      return;
    }
  };

  const handleSaveInterests = async () => {
    try {
      const response = await homeStaffApi.patchInterests({ interests });
      dispatch(userSlice.actions.setUser(response));
      dispatch(settingsSlice.actions.setError('Интересы обновлены.'));
    } catch (error) {
      return;
    }
  };

  return (
    <Layout>
      <section className="dashboard-grid">
        <article className="info-card">
          <p className="eyebrow">профиль</p>
          <h1>{user?.email}</h1>
          <p>Роль: {user?.role}</p>
          <label className="field">
            <span>Телефон</span>
            <input value={phone} onChange={(event) => setPhone(event.target.value)} />
          </label>
          <label className="field">
            <span>Адрес</span>
            <input value={address} onChange={(event) => setAddress(event.target.value)} />
          </label>
          <button className="primary-button" onClick={handleSaveProfile}>
            Сохранить профиль
          </button>
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
                  interests.includes(interest)
                    ? 'interest-chip interest-chip-active'
                    : 'interest-chip'
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
          <button className="primary-button" onClick={handleSaveInterests}>
            Обновить интересы
          </button>
          <button
            className="secondary-button"
            onClick={() => {
              dispatch(userSlice.actions.logout());
            }}
          >
            Выйти
          </button>
        </article>
      </section>
    </Layout>
  );
};

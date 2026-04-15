import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { homeStaffApi } from '../api/homeStaffApi';
import { Layout } from '../components/Layout';
import { settingsSlice } from '../store/slices/settingsSlice';
import { userSlice } from '../store/slices/userSlice';

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interestOptions = [
    'Домработница',
    'Няня',
    'Личный повар',
    'Сиделка',
    'Садовник',
    'Управляющая домом',
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  const handleOpenPreferences = () => {
    if (!email || !password || !phone || !address) {
      dispatch(settingsSlice.actions.setError('Сначала заполните все поля регистрации.'));
      return;
    }

    setIsModalOpen(true);
  };

  const handleRegister = async () => {
    try {
      const response = await homeStaffApi.register({
        email,
        password,
        phone,
        address,
        interests: selectedInterests,
      });
      dispatch(userSlice.actions.setUser(response));
      dispatch(settingsSlice.actions.setError('Аккаунт успешно создан.'));
      setIsModalOpen(false);
      navigate('/dashboard');
    } catch (error) {
      return;
    }
  };

  return (
    <Layout>
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
        <button className="primary-button" onClick={handleOpenPreferences}>
          Продолжить
        </button>
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
              <button className="secondary-button" onClick={() => setIsModalOpen(false)}>
                Назад
              </button>
              <button className="primary-button" onClick={handleRegister}>
                Завершить регистрацию
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

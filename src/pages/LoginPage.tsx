import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { homeStaffApi } from '../api/homeStaffApi';
import { Layout } from '../components/Layout';
import { settingsSlice } from '../store/slices/settingsSlice';
import { userSlice } from '../store/slices/userSlice';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('client@homestaff.com');
  const [password, setPassword] = useState('demo123');

  const handleLogin = async () => {
    try {
      const response = await homeStaffApi.login({ email, password });
      dispatch(userSlice.actions.setUser(response));
      dispatch(settingsSlice.actions.setError('Вы успешно вошли в аккаунт.'));
      navigate('/dashboard');
    } catch (error) {
      return;
    }
  };

  return (
    <Layout>
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
        <button className="primary-button" onClick={handleLogin}>
          Войти
        </button>
        <div className="auth-helper">
          <span>Ещё нет аккаунта?</span>
          <Link className="text-link" to="/register">
            Зарегистрироваться
          </Link>
        </div>
      </section>
    </Layout>
  );
};

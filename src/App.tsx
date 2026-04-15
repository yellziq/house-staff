import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthWrapper } from './hoc/AuthWrapper';
import { CommonWrapper } from './hoc/CommonWrapper';
import { CartPage } from './pages/CartPage';
import { CatalogPage } from './pages/CatalogPage';
import { DashboardPage } from './pages/DashboardPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';
import { StaffPage } from './pages/StaffPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CommonWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={
              <AuthWrapper>
                <ProfilePage />
              </AuthWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthWrapper>
                <DashboardPage />
              </AuthWrapper>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CommonWrapper>
    </BrowserRouter>
  );
};

export default App;

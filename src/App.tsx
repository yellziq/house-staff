import { Provider } from 'react-redux';
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
import { store } from './store';
import { ThemeProvider } from './theme/ThemeProvider';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <CommonWrapper>
            <AuthWrapper>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthWrapper>
          </CommonWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeStaffApi } from '../api/homeStaffApi';
import type { AppDispatch, RootState } from '../store';
import { logoutAndResetUserData } from '../store/slices/favoritesSlice';
import { userSlice } from '../store/slices/userSlice';

interface Props {
  children: ReactNode;
}

const privatePaths = ['/profile', '/dashboard'];

export const AuthWrapper: FC<Props> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const [isChecking, setIsChecking] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const isPrivateRoute = useMemo(() => privatePaths.includes(pathname), [pathname]);

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    const { pushState, replaceState } = window.history;

    window.addEventListener('popstate', syncPathname);

    window.history.pushState = function (...args) {
      pushState.apply(this, args);
      syncPathname();
    };

    window.history.replaceState = function (...args) {
      replaceState.apply(this, args);
      syncPathname();
    };

    return () => {
      window.removeEventListener('popstate', syncPathname);
      window.history.pushState = pushState;
      window.history.replaceState = replaceState;
    };
  }, []);

  useEffect(() => {
    let active = true;

    if (!isAuth || !isPrivateRoute) {
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    homeStaffApi
      .getProfile()
      .then((response) => {
        if (active) {
          dispatch(userSlice.actions.setUser(response));
          setIsChecking(false);
        }
      })
      .catch(() => {
        if (active) {
          dispatch(logoutAndResetUserData());
          setIsChecking(false);
        }
      });

    return () => {
      active = false;
    };
  }, [dispatch, isAuth, isPrivateRoute]);

  if (isPrivateRoute && !isAuth) {
    return (
      <div className="auth-guard">
        <div className="auth-guard-card">
          <p className="eyebrow">401</p>
          <h1>Доступ ограничен</h1>
          <p>Эта страница доступна только авторизованным пользователям.</p>
          <a className="primary-link" href="/login">
            Перейти ко входу
          </a>
        </div>
      </div>
    );
  }

  if (isPrivateRoute && isChecking) {
    return null;
  }

  return <>{children}</>;
};

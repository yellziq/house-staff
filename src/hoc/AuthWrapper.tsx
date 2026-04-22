import { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { homeStaffApi } from '../api/homeStaffApi';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
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
  const token = useSelector((state: RootState) => state.user.token);
  const { pathname } = useLocation();
  const [isChecking, setIsChecking] = useState(isAuth && privatePaths.includes(pathname));
  const [verifiedToken, setVerifiedToken] = useState<string | null>(null);
  const isPrivateRoute = privatePaths.includes(pathname);

  useEffect(() => {
    let active = true;

    if (!isAuth) {
      setVerifiedToken(null);
      setIsChecking(false);
      return;
    }

    if (!isPrivateRoute || verifiedToken === token) {
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    homeStaffApi
      .getProfile()
      .then((response) => {
        if (active) {
          dispatch(userSlice.actions.setUser(response));
          setVerifiedToken(token);
          setIsChecking(false);
        }
      })
      .catch(() => {
        if (active) {
          setVerifiedToken(null);
          dispatch(logoutAndResetUserData());
          setIsChecking(false);
        }
      });

    return () => {
      active = false;
    };
  }, [dispatch, isAuth, isPrivateRoute, token, verifiedToken]);

  if (isPrivateRoute && !isAuth) {
    return <UnauthorizedPage />;
  }

  if (isPrivateRoute && (verifiedToken !== token || isChecking)) {
    return null;
  }

  return <>{children}</>;
};

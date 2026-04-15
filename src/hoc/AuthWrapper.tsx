import { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeStaffApi } from '../api/homeStaffApi';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import type { AppDispatch, RootState } from '../store';
import { logoutAndResetUserData } from '../store/slices/favoritesSlice';
import { userSlice } from '../store/slices/userSlice';

interface Props {
  children: ReactNode;
}

export const AuthWrapper: FC<Props> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const [isChecking, setIsChecking] = useState(isAuth);

  useEffect(() => {
    let active = true;

    if (!isAuth) {
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
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return <UnauthorizedPage />;
  }

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
};

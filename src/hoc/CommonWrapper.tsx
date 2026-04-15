import React, { FC, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { settingsSlice } from '../store/slices/settingsSlice';
import { Button } from '../ui/Button';

interface Props { children: ReactNode; }

export const CommonWrapper: FC<Props> = ({ children }) => {
  const { isLoading, errorMessage } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  return (
    <div className="common-layout">
      {/* Лоадер */}
      {isLoading && <div className="loader-overlay"><div className="spinner"></div></div>}

      {/* Модальное окно ошибки */}
      {errorMessage && (
        <div className="modal-error">
          <p>{errorMessage}</p>
          <Button label="Закрыть" onClick={() => dispatch(settingsSlice.actions.setError(null))} />
        </div>
      )}

      {children}
    </div>
  );
};

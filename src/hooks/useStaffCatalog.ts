import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeStaffApi } from '../api/homeStaffApi';
import type { RootState } from '../store';
import { catalogSlice } from '../store/slices/catalogSlice';

export const useStaffCatalog = () => {
  const dispatch = useDispatch();
  const staff = useSelector((state: RootState) => state.catalog.items);
  const isLoaded = useSelector((state: RootState) => state.catalog.isLoaded);

  useEffect(() => {
    if (isLoaded) {
      return;
    }

    let active = true;

    homeStaffApi
      .getStaff()
      .then((items) => {
        if (active) {
          dispatch(catalogSlice.actions.setCatalog(items));
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [dispatch, isLoaded]);

  return { staff, isLoading: !isLoaded };
};

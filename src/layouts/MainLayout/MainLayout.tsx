import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store.ts';
import { Outlet } from 'react-router-dom';

import Header from '../../components/Header/Header.tsx';
import AsideBar from '../../components/AsideBar/AsideBar.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import { getUser } from '../../redux/userSlice.ts';

import styles from './MainLayout.module.scss';

function MainLayout() {
  const dispatch: ThunkDispatch<RootState, undefined, Action> = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const isToken = useSelector((state: RootState) => state.signInUpSlice.isTokenReceived);

  useEffect(() => {
    if (isToken) dispatch(getUser());
  }, [isToken]);

  return (
    <>
      {user ? (
        <>
          <Header />
          <div className={styles['container']}>
            <AsideBar />
            <div className={styles['outlet']}>
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default MainLayout;

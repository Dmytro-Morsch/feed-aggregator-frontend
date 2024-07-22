import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store.ts';

import { getUser } from '../../redux/userSlice.ts';

import Header from '../../components/Header/Header.tsx';
import AsideBar from '../../components/AsideBar/AsideBar.tsx';

import styles from './MainLayout.module.scss';

function MainLayout() {
  const dispatch: ThunkDispatch<RootState, undefined, never> = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Header />
      <div className={styles['container']}>
        <AsideBar />
        <div className={styles['outlet']}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;

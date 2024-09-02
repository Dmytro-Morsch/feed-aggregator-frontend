import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

import isTokenExpired from '../../utils/isTokenExpired.ts';
import { setReceivedToken } from '../../redux/signInUpSlice.ts';

function MainLayout() {
  const isToken = useSelector((state: RootState) => state.signInUpSlice.isTokenReceived);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname;
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        path == '/signup' ? navigate('/signup') : navigate('/login');
        dispatch(setReceivedToken(false));
      } else {
        dispatch(setReceivedToken(true));
        navigate('/');
      }
    } else {
      path == '/signup' ? navigate('/signup') : navigate('/login');
      dispatch(setReceivedToken(false));
    }
  }, [isToken]);

  return <Outlet />;
}

export default MainLayout;

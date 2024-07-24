import Routing from './routing/Routing.tsx';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from './redux/store.ts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './redux/userSlice.ts';

function App() {
  const dispatch: ThunkDispatch<RootState, undefined, never> = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return <Routing />;
}

export default App;

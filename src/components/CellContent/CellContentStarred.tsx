import { useEffect } from 'react';
import { getStarredItems } from '../../redux/itemsSlice.ts';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';

import CellContent from './CellContent.tsx';

function CellContentStarred() {
  const dispatch: ThunkDispatch<RootState, undefined, never> = useDispatch();

  useEffect(() => {
    console.log('Show starred items');
    dispatch(getStarredItems());
  }, []);

  return <CellContent title="Starred" />;
}

export default CellContentStarred;

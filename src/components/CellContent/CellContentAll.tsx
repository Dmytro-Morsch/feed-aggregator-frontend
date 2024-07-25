import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllItems } from '../../redux/itemsSlice.ts';

import Items from '../Items/Items.tsx';

function CellContentAll() {
  const dispatch: ThunkDispatch<RootState, undefined, never> = useDispatch();

  useEffect(() => {
    console.log('Show all items');
    dispatch(getAllItems());
  }, []);

  return <Items title="All items" />;
}

export default CellContentAll;

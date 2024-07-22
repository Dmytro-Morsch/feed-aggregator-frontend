import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.ts';
import userFeedsSlice from './userFeedsSlice.ts';
import feedSlice from './feedSlice.ts';
import itemsSlice from './itemsSlice.ts';

const rootReducer = combineReducers({
  userSlice,
  userFeedsSlice,
  feedSlice,
  itemsSlice
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

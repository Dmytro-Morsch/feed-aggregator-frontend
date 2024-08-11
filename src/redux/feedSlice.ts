import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FeedType from '../types/feedType.ts';

export interface IFeedState {
  feed: FeedType | null;
}

const initialState: IFeedState = {
  feed: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetFeedData: (state) => {
      state.feed = null;
    },
    setFeed: (state, action: PayloadAction<FeedType>) => {
      state.feed = action.payload;
    }
  }
});

export const { resetFeedData, setFeed } = feedSlice.actions;
export default feedSlice.reducer;

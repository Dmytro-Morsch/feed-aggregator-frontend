import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiAxios from '../api';
import FeedType from '../types/feedType.ts';

export interface IUserFeedsState {
  userFeeds: FeedType[];
  isLoadingFeed: boolean;
}

const initialState: IUserFeedsState = {
  userFeeds: [],
  isLoadingFeed: false
};

export const getUserFeeds = createAsyncThunk('getUserFeeds', async () => {
  const response = await apiAxios.feeds.getFeeds();
  return response.data;
});

export const userFeedsSlice = createSlice({
  name: 'userFeeds',
  initialState,
  reducers: {
    resetFeedData: (state) => {
      state.userFeeds = [];
    },
    addFeed: (state, action: PayloadAction<FeedType>) => {
      state.userFeeds.push(action.payload);
    },
    updateFeed: (state, action: PayloadAction<FeedType>) => {
      const index = state.userFeeds.findIndex((feed) => feed.id === action.payload.id);
      if (index >= 0) state.userFeeds[index] = action.payload;
    },
    deleteFeed: (state, action: PayloadAction<number>) => {
      const index = state.userFeeds.findIndex((feed) => feed.id === action.payload);
      state.userFeeds.splice(index, 1);
    },
    renameFeedTitle: (
      state,
      action: PayloadAction<{ feedId: FeedType['id']; title: FeedType['title'] }>
    ) => {
      const index = state.userFeeds.findIndex((feed) => feed.id === action.payload.feedId);
      state.userFeeds[index].title = action.payload.title;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserFeeds.pending, (state) => {
      state.isLoadingFeed = true;
    });
    builder.addCase(getUserFeeds.fulfilled, (state, action: PayloadAction<FeedType[]>) => {
      state.isLoadingFeed = false;
      state.userFeeds = action.payload;
    });
  }
});

export const { resetFeedData, addFeed, updateFeed, deleteFeed, renameFeedTitle } = userFeedsSlice.actions;
export default userFeedsSlice.reducer;

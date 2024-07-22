import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiAxios from '../api';
import FeedType from '../types/feedType.ts';
import ItemType from '../types/itemType.ts';

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
    deleteFeed: (state, action: PayloadAction<FeedType['id']>) => {
      const index = state.userFeeds.findIndex((feed) => feed.id === action.payload);
      state.userFeeds.splice(index, 1);
    },
    renameFeedTitle: (
      state,
      action: PayloadAction<{ feedId: FeedType['id']; title: FeedType['title'] }>
    ) => {
      const index = state.userFeeds.findIndex((feed) => feed.id === action.payload.feedId);
      state.userFeeds[index].title = action.payload.title;
    },
    updateFeedCountUnreadItems: (
      state,
      action: PayloadAction<{ feedId: FeedType['id']; read: ItemType['read'] }>
    ) => {
      const index = state.userFeeds.findIndex((feed) => feed.id === action.payload.feedId);
      if (action.payload.read) state.userFeeds[index].countUnreadItems -= 1;
      else state.userFeeds[index].countUnreadItems += 1;
    },
    updateAllFeedCountUnreadItems: (state, action: PayloadAction<FeedType['id'] | undefined>) => {
      if (!action.payload) {
        state.userFeeds.forEach((feed) => {
          feed.countUnreadItems = 0;
        });
      } else {
        const index = state.userFeeds.findIndex((feed) => feed.id === action.payload);
        state.userFeeds[index].countUnreadItems = 0;
      }
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

export const {
  resetFeedData,
  addFeed,
  updateFeed,
  deleteFeed,
  renameFeedTitle,
  updateFeedCountUnreadItems,
  updateAllFeedCountUnreadItems
} = userFeedsSlice.actions;
export default userFeedsSlice.reducer;

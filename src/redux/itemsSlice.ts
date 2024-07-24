import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ItemType from '../types/itemType.ts';
import FeedType from '../types/feedType.ts';
import apiAxios from '../api';

export const getFeedItems = createAsyncThunk('getFeedItems', async (feedId: FeedType['id']) => {
  const response = await apiAxios.items.getFeedItems(feedId, false);
  return response.data;
});

export const getAllItems = createAsyncThunk('getAllItems', async () => {
  const response = await apiAxios.items.getAllUserItems(false, false);
  return response.data;
});

export const getStarredItems = createAsyncThunk('getStarredItems', async () => {
  const response = await apiAxios.items.getAllUserItems(false, true);
  return response.data;
});

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    descOrder: false
  },
  reducers: {
    resetItemsData: (state) => {
      state.items = [];
    },
    setItems: (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload;
    },
    toggleDescOrder: (state) => {
      state.descOrder = !state.descOrder;
    },
    updateAllRead: (state) => {
      state.items.forEach((item) => {
        item.read = true;
      });
    },
    updateRead: (
      state,
      action: PayloadAction<{ itemId: ItemType['id']; read: ItemType['read'] }>
    ) => {
      const index = state.items.findIndex((item) => item.id === action.payload.itemId);
      state.items[index].read = action.payload.read;
    },
    updateStarredMarker: (
      state,
      action: PayloadAction<{ itemId: ItemType['id']; starred: ItemType['starred'] }>
    ) => {
      const index = state.items.findIndex((item) => item.id === action.payload.itemId);
      state.items[index].starred = action.payload.starred;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedItems.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload;
    });
    builder.addCase(getAllItems.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload;
    });
    builder.addCase(getStarredItems.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload;
    });
  }
});

export const {
  resetItemsData,
  setItems,
  toggleDescOrder,
  updateAllRead,
  updateRead,
  updateStarredMarker
} = itemsSlice.actions;
export default itemsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ItemType from '../types/itemType.ts';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    starred: false
  },
  reducers: {
    resetItemsData: (state) => {
      state.items = [];
    },
    setItems: (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload;
    },
    setStar: (state, action: PayloadAction<boolean>) => {
      state.starred = action.payload;
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
  }
});

export const { resetItemsData, setItems, setStar, updateAllRead, updateRead, updateStarredMarker } =
  itemsSlice.actions;
export default itemsSlice.reducer;

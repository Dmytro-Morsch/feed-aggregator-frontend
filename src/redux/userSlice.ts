import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserType from '../types/userType.ts';
import apiAxios from '../api';

export const getUser = createAsyncThunk('getUser', async () => {
  const response = await apiAxios.users.getUser();
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: undefined,
    isLoadingUser: false
  },
  reducers: {
    resetUserData: (state) => {
      state.user = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoadingUser = true;
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.isLoadingUser = false;
      state.user = action.payload;
    });
  }
});

export const { resetUserData } = userSlice.actions;
export default userSlice.reducer;

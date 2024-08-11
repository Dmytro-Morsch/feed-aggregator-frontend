import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserType from '../types/userType.ts';
import apiAxios from '../api';

export interface IUserState {
  user: UserType | undefined;
  isLoadingUser: boolean;
}

const initialState: IUserState = {
  user: undefined,
  isLoadingUser: false
};

export const getUser = createAsyncThunk('getUser', async () => {
  const response = await apiAxios.users.getUser();
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
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

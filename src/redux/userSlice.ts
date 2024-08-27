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
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<UserType>) => {
      console.log('fulfilled');
      state.isLoadingUser = false;
      state.user = action.payload;
    });
    builder.addCase(getUser.pending, (state) => {
      console.log('pending');
      state.isLoadingUser = true;
    });
    builder.addCase(getUser.rejected, (state) => {
      console.log('rejected');
      state.isLoadingUser = false;
    });
  }
});

export const { resetUserData } = userSlice.actions;
export default userSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserType from '../types/userType.ts';
import apiAxios from '../api';

export interface ISignInUpState {
  isLoading: boolean;
  isTokenReceived: boolean;
  message: string | null;
}

const initialState: ISignInUpState = {
  isLoading: false,
  isTokenReceived: false,
  message: ''
};

export const signIn = createAsyncThunk(
  'signIn',
  async (payload: { email: UserType['email']; password: UserType['password'] }) => {
    const response = await apiAxios.users.postSignIn(payload);
    return response.data;
  }
);

export const signUp = createAsyncThunk(
  'signUp',
  async (payload: {
    username: UserType['username'];
    email: UserType['email'];
    password: UserType['password'];
    repeatPassword: UserType['password'];
  }) => {
    const response = await apiAxios.users.postSignUp(payload);
    return response.data;
  }
);

export const signInUpSlice = createSlice({
  name: 'signInUp',
  initialState,
  reducers: {
    setReceivedToken: (state, action: PayloadAction<boolean>) => {
      state.isTokenReceived = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    }
  },
  extraReducers: (builder) => {
    //signIn
    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isTokenReceived = true;
      localStorage.setItem('token', action.payload);
    });
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isTokenReceived = false;
      if (`${action.error.message}`.includes('404')) {
        state.message = 'Error credentials! Wrong email or password';
      } else if (`${action.error.message}`.includes('401')) {
        state.message = 'Error credentials! Wrong email or password';
      } else {
        state.message = 'Failed!';
      }
    });

    //singUp
    builder.addCase(signUp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      if (`${action.error.message}`.includes('409')) {
        state.message = 'This email is already in use';
      } else if (`${action.error.message}`.includes('400')) {
        state.message = 'Invalid password!';
      } else {
        state.message = 'Failed!';
      }
    });
  }
});

export const { setReceivedToken, setMessage } = signInUpSlice.actions;
export default signInUpSlice.reducer;

import { AxiosInstance } from 'axios';
import UserType from '../types/userType.ts';

export default function (instance: AxiosInstance) {
  return {
    getUser() {
      return instance.get<UserType>('/user');
    },

    patchUser(payload: Pick<UserType, 'email' | 'username'> & Partial<Pick<UserType, 'password'>>) {
      return instance.patch<UserType>('/user/update', payload);
    },

    deleteAccount() {
      return instance.delete('/user/delete');
    },

    async postSignIn(payload: { email: UserType['email']; password: UserType['password'] }) {
      return await instance.post<string>('/token', payload);
    },

    async postSignUp(payload: {
      username: UserType['username'];
      email: UserType['email'];
      password: UserType['password'];
      repeatPassword: UserType['password'];
    }) {
      return await instance.post('/user/signup', payload);
    }
  };
}

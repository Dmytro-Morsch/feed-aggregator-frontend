import { AxiosInstance } from 'axios';
import UserType from '../types/userType.ts';

export default function (instance: AxiosInstance) {
  return {
    getUser() {
      return instance.get<UserType>('/user');
    }
  };
}

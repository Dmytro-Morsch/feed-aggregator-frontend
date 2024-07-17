import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import UserType from '../types/userType.ts';
import apiAxios from '../api/index.ts';

interface UserContextProps {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  getUser: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => console.log('setUser'),
  getUser: () => console.log('getUser')
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);

  const getUser = useCallback(() => {
    (async () => {
      const response = await apiAxios.users.getUser();
      setUser(response.data);
    })();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      getUser
    }),
    [getUser, user]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import API from '../API.ts';
import UserType from '../types/userType.ts';

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
    API.getUser().then(
      (r) => setUser(r),
      () => {}
    );
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

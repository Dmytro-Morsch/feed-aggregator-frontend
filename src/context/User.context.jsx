import {createContext, useCallback, useContext, useMemo, useState} from "react";
import API from "../API.js";

export const UserContext = createContext({
    user: {},
    setUser: () => console.log("setUser"),
});

export function UserProvider({children}) {
    const [user, setUser] = useState(null);

    const getUser = useCallback(() => {
        API.getUser().then(r => setUser(r))
    }, []);

    const value = useMemo(() => ({
        user,
        setUser,
        getUser
    }), [getUser, user]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
    return useContext(UserContext);
}

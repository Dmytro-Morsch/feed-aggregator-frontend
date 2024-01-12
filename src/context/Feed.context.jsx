import {createContext, useContext, useMemo, useState} from "react";

export const FeedContext = createContext({
    feed: null,
    setFeed: () => console.log("setFeed"),
});

export function FeedProvider({children}) {
    const [feed, setFeed] = useState(null);

    const value = useMemo(() => ({
        feed,
        setFeed,
    }), [feed, setFeed])
    return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>
}

export function useFeed() {
    return useContext(FeedContext);
}
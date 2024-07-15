import {createContext, useContext, useMemo, useState} from "react";

export const FeedContext = createContext({
    feed: null,
    setFeed: () => console.log("setFeed"),
    userFeeds: [],
    setUserFeeds: () => console.log("setUserFeeds"),
    starFeed: false,
    setStarFeed: () => console.log("setStarFeed")
});

export function FeedProvider({children}) {
    const [userFeeds, setUserFeeds] = useState([]);
    const [feed, setFeed] = useState(null);
    const [starFeed, setStarFeed] = useState(false);

    const value = useMemo(() => ({
        feed,
        setFeed,
        userFeeds,
        setUserFeeds,
        starFeed,
        setStarFeed
    }), [feed, setFeed, userFeeds, setUserFeeds, starFeed, setStarFeed])
    return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>
}

export function useFeed() {
    return useContext(FeedContext);
}
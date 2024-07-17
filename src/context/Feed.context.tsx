import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import FeedType from '../types/feedType.ts';

interface FeedContextProps {
  feed: FeedType | null;
  setFeed: (value: ((prevState: FeedType | null) => FeedType | null) | FeedType | null) => void;
  userFeeds: FeedType[];
  setUserFeeds: (value: ((prevState: FeedType[]) => FeedType[]) | FeedType[]) => void;
  starFeed: boolean;
  setStarFeed: (value: boolean) => void;
}

export const FeedContext = createContext<FeedContextProps>({
  feed: null,
  setFeed: () => console.log('setFeed'),
  userFeeds: [],
  setUserFeeds: () => console.log('setUserFeeds'),
  starFeed: false,
  setStarFeed: () => console.log('setStarFeed')
});

interface FeedProviderProps {
  children: ReactNode;
}

export function FeedProvider({ children }: FeedProviderProps) {
  const [userFeeds, setUserFeeds] = useState<FeedType[]>([]);
  const [feed, setFeed] = useState<FeedType | null>(null);
  const [starFeed, setStarFeed] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      feed,
      setFeed,
      userFeeds,
      setUserFeeds,
      starFeed,
      setStarFeed
    }),
    [feed, setFeed, userFeeds, setUserFeeds, starFeed, setStarFeed]
  );
  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export function useFeed() {
  return useContext(FeedContext);
}

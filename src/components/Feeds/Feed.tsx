import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useFeed } from '../../context/Feed.context.tsx';
import API from '../../API.ts';

import feedStyles from './Feeds.module.scss';
import loaderStyles from './Loader.module.scss';
import FeedType from '../../types/feedType.ts';

interface FeedProps {
  feed: FeedType;
}

function Feed({ feed }: FeedProps) {
  const [num, setNum] = useState(0);
  const { setFeed, setStarFeed } = useFeed();

  const handleToFeed = () => {
    setFeed(feed);
    setStarFeed(false);
  };

  useEffect(() => {
    API.getUnreadItemsCount(feed.id).then(
      (r) => setNum(r),
      () => {}
    );
  }, [feed.id]);

  return (
    <li className={feedStyles['feed-item']} key={feed.id}>
      <NavLink
        to={`/feeds/${feed.id}`}
        className={feedStyles['feed']}
        title={feed.title}
        onClick={() => handleToFeed()}>
        {feed.loaded ? (
          <img className={feedStyles['source-icon']} src={`/api/feeds/${feed.id}/icon`} alt="" />
        ) : (
          <div className={loaderStyles['loader']}></div>
        )}
        <span className={feedStyles['title']}>{feed.title}</span>

        <div className={feedStyles['count-unread-posts']}>{num}</div>
      </NavLink>
    </li>
  );
}

export default Feed;

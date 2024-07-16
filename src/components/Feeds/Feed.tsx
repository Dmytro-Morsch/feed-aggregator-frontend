import {NavLink} from 'react-router-dom';

import {useFeed} from '../../context/Feed.context.tsx';
import FeedType from '../../types/feedType.ts';

import feedStyles from './Feeds.module.scss';
import loaderStyles from './Loader.module.scss';

interface FeedProps {
  feed: FeedType;
}

function Feed({ feed }: FeedProps) {
  const { setFeed, setStarFeed } = useFeed();

  const handleToFeed = () => {
    setFeed(feed);
    setStarFeed(false);
  };

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

        {feed.countUnreadItems > 0 && (
          <div className={feedStyles['count-unread-posts']}>{feed.countUnreadItems}</div>
        )}
      </NavLink>
    </li>
  );
}

export default Feed;

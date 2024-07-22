import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store.ts';

import FeedType from '../../types/feedType.ts';

import { setFeed } from '../../redux/feedSlice.ts';
import { setStar } from '../../redux/itemsSlice.ts';

import feedStyles from './Feeds.module.scss';
import loaderStyles from './Loader.module.scss';

interface FeedProps {
  feed: FeedType;
}

function Feed({ feed }: FeedProps) {
  const dispatch: ThunkDispatch<RootState, undefined, never> = useDispatch();

  const handleMoveToFeed = () => {
    dispatch(setFeed(feed));
    dispatch(setStar(false));
  };

  return (
    <li className={feedStyles['feed-item']} key={feed.id}>
      <NavLink
        to={`/feeds/${feed.id}`}
        className={feedStyles['feed']}
        title={feed.title}
        onClick={() => handleMoveToFeed()}>
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

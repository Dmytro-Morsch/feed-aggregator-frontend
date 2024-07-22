import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

import Feed from './Feed.tsx';

import feedStyles from './Feeds.module.scss';

function Feeds() {
  const userFeeds = useSelector((state: RootState) => state.userFeedsSlice.userFeeds);

  return (
    <ul className={feedStyles['feed-list']}>
      {userFeeds.map((feed) => (
        <Feed feed={feed} key={feed.id} />
      ))}
    </ul>
  );
}

export default Feeds;

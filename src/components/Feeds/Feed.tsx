import { NavLink } from 'react-router-dom';

import FeedType from '../../types/feedType.ts';
import { MdWarningAmber } from 'react-icons/md';
import NumberUnreadItems from '../NumberUnreadItems/NumberUnreadItems.tsx';

import feedStyles from './Feeds.module.scss';
import loaderStyles from './Loader.module.scss';

interface FeedProps {
  feed: FeedType;
}

function Feed({ feed }: FeedProps) {
  return (
    <li className={feedStyles['feed-item']} key={feed.id}>
      <NavLink to={`/feeds/${feed.id}`} className={feedStyles['feed']} title={feed.title}>
        {feed.status === 'CREATED' && <div className={loaderStyles['loader']}></div>}
        {feed.status === 'DOWNLOADED' && (
          <img className={feedStyles['source-icon']} src={`/api/feeds/${feed.id}/icon`} alt="" />
        )}
        {feed.status === 'DOWNLOAD_FAILED' && <MdWarningAmber className={feedStyles['icon']} />}

        <span className={feedStyles['title']}>{feed.title}</span>

        {feed.countUnreadItems > 0 && (
          <NumberUnreadItems count={feed.countUnreadItems} className={'feed-count'} />
        )}
      </NavLink>
    </li>
  );
}

export default Feed;

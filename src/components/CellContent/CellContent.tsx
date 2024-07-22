import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

import Items from '../Items/Items.tsx';

import styles from './CellContent.module.scss';

function CellContent() {
  const feed = useSelector((state: RootState) => state.feedSlice.feed);
  const starred = useSelector((state: RootState) => state.itemsSlice.starred);

  return (
    <div className={styles['content']}>
      <div className={styles['toolbar']}>
        <h1 className={styles['item-title']}>
          {feed ? feed.title : starred ? 'Starred' : 'All items'}
        </h1>
        {feed && (
          <div className={styles['sources']}>
            <span className={`${styles['source']} ${styles['site']}`}>
              Site: <a href={feed.siteLink}>{feed.siteLink}</a>
            </span>
            <span className={`${styles['source']} ${styles['site']}`}>
              Feed: <a href={feed.feedLink}>{feed.feedLink}</a>
            </span>
          </div>
        )}
        <hr className={styles['hr']} />
      </div>

      <Items />
    </div>
  );
}

export default CellContent;

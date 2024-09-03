import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

import styles from './Home.module.scss';

function Home() {
  const userFeeds = useSelector((state: RootState) => state.userFeedsSlice.userFeeds);

  const [countUnreadItems, setCountUnreadItems] = useState(0);

  useEffect(() => {
    let count = 0;
    userFeeds.map((feed) => (count += feed.countUnreadItems));
    setCountUnreadItems(count);
  }, [userFeeds]);

  useEffect(() => {
    document.title = 'CoN - Home';
  }, []);

  return (
    <div className={styles['main']}>
      <div className={styles['toolbar']}>
        <h1 className={styles['title']}>Welcome to &#34;Collection of news&#34;</h1>
        <hr className={styles['hr']} />
      </div>
      <div className={styles['content']}>
        {userFeeds.length ? (
          <h3 className={styles['h3']}>
            You have <b>{countUnreadItems}</b> unread posts
          </h3>
        ) : (
          <h3 className={styles['h3']}>
            Add your first feed to be aware news of this websites feed
          </h3>
        )}
      </div>
    </div>
  );
}

export default Home;

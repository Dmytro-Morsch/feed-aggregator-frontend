import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../redux/store.ts';
import { ThunkDispatch } from '@reduxjs/toolkit';

import FeedType from '../../types/feedType.ts';
import apiAxios from '../../api/index.ts';
import useComponentVisible from '../../hooks/useCompontentVisible.tsx';

import RenamePopup from '../../components/RenamePopup/RenamePopup.tsx';
import Button from '../../components/Button/Button.tsx';

import { getUserFeeds, deleteFeed, renameFeedTitle } from '../../redux/userFeedsSlice.ts';
import { setFeed } from '../../redux/feedSlice.ts';

import styles from './ManageFeeds.module.scss';

function ManageFeeds() {
  const [currentFeed, setCurrentFeed] = useState<FeedType>({} as FeedType);

  const userFeeds = useSelector((state: RootState) => state.userFeedsSlice.userFeeds);
  const dispatch: ThunkDispatch<RootState, undefined, never> = useDispatch();

  const {
    ref: refRenamePopup,
    isComponentVisible: isRenamePopup,
    setIsComponentVisible: setRenamePopup
  } = useComponentVisible(false);

  const handleUnsubscribe = (feedId: FeedType['id']) => {
    (async () => {
      await apiAxios.feeds.unsubscribeFromFeed(feedId);
      dispatch(deleteFeed(feedId));
    })();
  };

  const handleRename = (feedId: FeedType['id'], title: FeedType['title']) => {
    (async () => {
      await apiAxios.feeds.renameFeed(feedId, title);
      dispatch(renameFeedTitle({ feedId, title }));
    })();
  };

  useEffect(() => {
    dispatch(getUserFeeds());
  }, []);

  return (
    <div className={styles['manage-feeds']}>
      <div>
        <h1 className={styles['h1']}>Manage Subscriptions</h1>
        <div className={styles['subtitle']}>
          Below is a list of your current feeds. From this page, you can unsubscribe from existing
          feeds as well as organize feeds into folders. You can manage the sort order and visibility
          settings of your feeds and folders in settings. You can also view your subscription
          backups here.
        </div>
      </div>

      {isRenamePopup && (
        <RenamePopup
          myref={refRenamePopup}
          feed={currentFeed}
          onRenameTitle={handleRename}
          onClosePopup={() => setRenamePopup(false)}
        />
      )}

      <ul className={styles['user-feed-list']}>
        <li className={`${styles['header']} ${styles['feed-name']}`}>Feed name</li>
        <li className={`${styles['header']} ${styles['feed-unsub']}`}></li>
        <li className={`${styles['header']} ${styles['feed-rename']}`}></li>
        {userFeeds.map((feed) => {
          return (
            <div key={feed.id}>
              <li className={`${styles['body']} ${styles['feed-list__link']}`}>
                <div>
                  <NavLink
                    to={`/feeds/${feed.id}`}
                    className={styles['site-link']}
                    onClick={() => dispatch(setFeed(feed))}>
                    {feed.title}
                  </NavLink>
                </div>
              </li>
              <li className={`${styles['body']} ${styles['feed-list__unsub']}`}>
                <Button className={styles['btn-unsub']} onClick={() => handleUnsubscribe(feed.id)}>
                  Unsubscribe
                </Button>
              </li>
              <li className={`${styles['body']} ${styles['feed-list__rename']}`}>
                <Button
                  myref={refRenamePopup}
                  className={styles['btn-rename']}
                  onClick={() => {
                    setCurrentFeed(feed);
                    setRenamePopup(!isRenamePopup);
                  }}>
                  Rename
                </Button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default ManageFeeds;

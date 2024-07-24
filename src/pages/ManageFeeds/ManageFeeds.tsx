import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../redux/store.ts';
import { ThunkDispatch } from '@reduxjs/toolkit';

import FeedType from '../../types/feedType.ts';
import apiAxios from '../../api/index.ts';
import useComponentVisible from '../../hooks/useCompontentVisible.tsx';
import { getUserFeeds, deleteFeed, renameFeedTitle } from '../../redux/userFeedsSlice.ts';

import RenamePopup from '../../components/RenamePopup/RenamePopup.tsx';
import Button from '../../components/Button/Button.tsx';

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
      <div className={styles['head']}>
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

      <table className={styles['user-feed-list']}>
        <thead>
          <tr>
            <th className={styles['header']}>Feed title</th>
            <th className={styles['header']}>Last update</th>
            <th className={styles['header']}></th>
            <th className={styles['header']}></th>
          </tr>
        </thead>
        <tbody>
          {userFeeds.map((feed) => {
            return (
              <tr key={feed.id}>
                <td className={styles['body']}>
                  <div>
                    <NavLink to={`/feeds/${feed.id}`} className={styles['site-link']}>
                      {feed.title}
                    </NavLink>
                  </div>
                </td>
                <td className={styles['body']}>
                  <div className={styles['update-time']}>Recently</div>
                </td>
                <td className={styles['body']}>
                  <Button
                    className={styles['btn-unsub']}
                    onClick={() => handleUnsubscribe(feed.id)}>
                    Unsubscribe
                  </Button>
                </td>
                <td className={styles['body']}>
                  <Button
                    myref={refRenamePopup}
                    className={styles['btn-rename']}
                    onClick={() => {
                      setCurrentFeed(feed);
                      setRenamePopup(!isRenamePopup);
                    }}>
                    Rename
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ManageFeeds;

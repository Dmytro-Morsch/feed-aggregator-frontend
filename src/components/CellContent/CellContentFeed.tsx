import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store.ts';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { getFeedItems } from '../../redux/itemsSlice.ts';
import { setFeed } from '../../redux/feedSlice.ts';

import CellContent from './CellContent.tsx';

import styles from './CellContent.module.scss';

function CellContentFeed() {
  const feed = useSelector((state: RootState) => state.feedSlice.feed);
  const userFeeds = useSelector((state: RootState) => state.userFeedsSlice.userFeeds);
  const dispatch: ThunkDispatch<RootState, undefined, never> = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    const feed = userFeeds.find((feed) => feed.id.toString() === id);
    if (feed) dispatch(setFeed(feed));
  }, [id, userFeeds]);

  useEffect(() => {
    console.log('Show feed items');
    if (feed) dispatch(getFeedItems(feed.id));
  }, [feed]);

  return (
    <>
      {feed ? (
        <CellContent title={feed.title}>
          <div className={styles['sources']}>
            <span className={`${styles['source']} ${styles['site']}`}>
              Site: <a href={feed.siteLink}>{feed.siteLink}</a>
            </span>
            <span className={`${styles['source']} ${styles['site']}`}>
              Feed: <a href={feed.feedLink}>{feed.feedLink}</a>
            </span>
          </div>
        </CellContent>
      ) : (
        <div className={styles['not-exist']}>Sorry, but this feed does not exist(</div>
      )}
    </>
  );
}

export default CellContentFeed;

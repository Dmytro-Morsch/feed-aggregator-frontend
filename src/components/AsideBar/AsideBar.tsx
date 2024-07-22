import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed, updateFeed, getUserFeeds } from '../../redux/userFeedsSlice.ts';
import { setStar } from '../../redux/itemsSlice.ts';
import { resetFeedData } from '../../redux/feedSlice.ts';
import {
  MdFormatListBulleted,
  MdHome,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdStar
} from 'react-icons/md';

import FeedType from '../../types/feedType.ts';
import apiAxios from '../../api/index.ts';

import Feeds from '../Feeds/Feeds.tsx';
import Button from '../Button/Button.tsx';
import NumberUnreadItems from '../NumberUnreadItems/NumberUnreadItems.tsx';

import styles from './AsideBar.module.scss';

function AsideBar() {
  const [link, setLink] = useState('');
  const [isOpenSub, setIsOpenSub] = useState(true);
  const [countUnreadItems, setCountUnreadItems] = useState(0);

  const userFeeds = useSelector((state: RootState) => state.userFeedsSlice.userFeeds);
  const dispatch: ThunkDispatch<RootState, undefined, never> = useDispatch();

  const onSubmit = () => {
    if (link === '' || link === null) {
      console.log('Invalid link');
    } else {
      (async () => {
        const response = await apiAxios.feeds.subscribeToFeed(link);
        dispatch(addFeed(response.data));
        setLink('');
        refreshFeed(response.data.id);
      })();
    }
  };

  const refreshFeed = (feedId: FeedType['id']) => {
    const intervalId = setInterval(() => {
      (async () => {
        const response = await apiAxios.feeds.getFeed(feedId);
        dispatch(updateFeed(response.data));
        if (response.data.loaded) {
          clearInterval(intervalId);
        }
      })();
    }, 5000);
  };

  useEffect(() => {
    let count = 0;
    userFeeds.map((feed) => (count += feed.countUnreadItems));
    setCountUnreadItems(count);
  }, [userFeeds]);

  useEffect(() => {
    dispatch(getUserFeeds());
  }, []);

  return (
    <aside className={styles['navigator']}>
      <div className={styles['form-feed']}>
        <input
          className={`${styles['input']} ${styles['feed']}`}
          placeholder="Paste feed"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button type="button" className={styles['btn-feed']} onClick={onSubmit}>
          Add
        </Button>
      </div>

      <ul className={styles['sidebar-nav']}>
        <li className={styles['nav']}>
          <NavLink
            to="/"
            className={styles['nav-link']}
            onClick={() => {
              dispatch(resetFeedData());
              dispatch(setStar(false));
            }}>
            <MdHome className={styles['icon']} /> Home
          </NavLink>
        </li>
        <li className={styles['nav']}>
          <NavLink
            to="/posts/all"
            className={styles['nav-link']}
            onClick={() => {
              dispatch(resetFeedData());
              dispatch(setStar(false));
            }}>
            <MdFormatListBulleted className={styles['icon']} /> All items
          </NavLink>
          {countUnreadItems > 0 && (
            <NumberUnreadItems count={countUnreadItems} className={'file-count'} />
          )}
        </li>
        <li className={styles['nav']}>
          <NavLink
            to="/starred"
            className={styles['nav-link']}
            onClick={() => {
              dispatch(resetFeedData());
              dispatch(setStar(true));
            }}>
            <MdStar className={styles['icon']} /> Starred
          </NavLink>
        </li>
      </ul>

      {userFeeds.length !== 0 && (
        <div className={styles['drop-down']}>
          <div className={styles['content']}>
            <div className={styles['title']} onClick={() => setIsOpenSub(!isOpenSub)}>
              {isOpenSub ? (
                <MdKeyboardArrowDown className={styles['icon']} />
              ) : (
                <MdKeyboardArrowRight className={styles['icon']} />
              )}
              Subscriptions
            </div>
            {countUnreadItems > 0 && (
              <NumberUnreadItems count={countUnreadItems} className={'file-count'} />
            )}
          </div>
          {isOpenSub && <Feeds />}
        </div>
      )}
    </aside>
  );
}

export default AsideBar;

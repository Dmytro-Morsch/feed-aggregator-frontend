import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdFormatListBulleted,
  MdHome,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdStar
} from 'react-icons/md';

import { useFeed } from '../../context/Feed.context.tsx';

import Feeds from '../Feeds/Feeds.tsx';
import Button from '../Button/Button.tsx';
import FeedType from '../../types/feedType.ts';
import apiAxios from '../../api/index.ts';

import styles from './AsideBar.module.scss';

function AsideBar() {
  const [link, setLink] = useState('');
  const [isOpenSub, setIsOpenSub] = useState(true);

  const { setFeed, userFeeds, setUserFeeds, setStarFeed } = useFeed();

  const onSubmit = () => {
    if (link === '' || link === null) {
      console.log('Invalid link');
    } else {
      (async () => {
        const response = await apiAxios.feeds.subscribeToFeed(link);
        setUserFeeds((prevState) => [...prevState, response.data]);
        setLink('');
        updateFeed(response.data.id);
      })();
    }
  };

  const updateFeed = (feedId: FeedType['id']) => {
    const intervalId = setInterval(() => {
      (async () => {
        const response = await apiAxios.feeds.getFeed(feedId);
        setUserFeeds((prevFeeds: FeedType[]) =>
          prevFeeds.map((feed) => (feed.id === feedId ? response.data : feed))
        );
        if (response.data.loaded) {
          clearInterval(intervalId);
        }
      })();
    }, 5000);
  };

  const handleToAllFeeds = () => {
    setFeed(null);
    setStarFeed(false);
  };

  const handleToStarred = () => {
    setFeed(null);
    setStarFeed(true);
  };

  useEffect(() => {
    (async () => {
      const response = await apiAxios.feeds.getFeeds();
      setUserFeeds(response.data);
    })();
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
          <NavLink to="/" className={styles['nav-link']} onClick={() => setStarFeed(false)}>
            <MdHome className={styles['icon']} /> Home
          </NavLink>
        </li>
        <li className={styles['nav']}>
          <NavLink
            to="/posts/all"
            className={styles['nav-link']}
            onClick={() => handleToAllFeeds()}>
            <MdFormatListBulleted className={styles['icon']} /> All items
          </NavLink>
        </li>
        <li className={styles['nav']}>
          <NavLink to="/starred" className={styles['nav-link']} onClick={() => handleToStarred()}>
            <MdStar className={styles['icon']} /> Starred
          </NavLink>
        </li>
      </ul>

      {userFeeds.length !== 0 && (
        <div className={styles['drop-down']}>
          <div className={styles['title']} onClick={() => setIsOpenSub(!isOpenSub)}>
            {isOpenSub ? (
              <MdKeyboardArrowDown className={styles['icon']} />
            ) : (
              <MdKeyboardArrowRight className={styles['icon']} />
            )}
            Subscriptions
          </div>
          {isOpenSub && <Feeds />}
        </div>
      )}
    </aside>
  );
}

export default AsideBar;

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
  setItems,
  toggleDescOrder,
  updateAllRead,
  updateRead,
  updateStarredMarker
} from '../../redux/itemsSlice.ts';
import {
  updateAllFeedCountUnreadItems,
  updateFeedCountUnreadItems
} from '../../redux/userFeedsSlice.ts';
import {
  MdArrowDownward,
  MdArrowUpward,
  MdCheck,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineRefresh
} from 'react-icons/md';

import ItemType from '../../types/itemType.ts';
import apiAxios from '../../api/index.ts';

import Item from './Item.tsx';
import Button from '../Button/Button.tsx';

import styles from './Items.module.scss';

interface ItemsProps {
  title: string;
  children?: React.ReactNode;
}

function Items({ title, children }: ItemsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unreadOnly, setUnreadOnly] = useState(true);

  const feed = useSelector((state: RootState) => state.feedSlice.feed);
  const items = useSelector((state: RootState) => state.itemsSlice.items);
  const descOrder = useSelector((state: RootState) => state.itemsSlice.descOrder);
  const dispatch: ThunkDispatch<RootState, undefined, never> = useDispatch();
  const ref = useRef<HTMLUListElement>(null);

  const itemsDisplay = useMemo(
    () => (descOrder ? [...items].reverse() : items),
    [items, descOrder]
  );

  const scrollContainer = (index: number) => {
    if (ref.current) {
      const elem = ref.current.querySelector(`[data-id="${index}"]`) as HTMLElement;
      ref.current.scrollTop = elem.offsetTop;
    }
  };
  const handleNextItem = () => {
    const newIndex = Math.min(currentIndex + 1, items.length - 1);
    setCurrentIndex(newIndex);
    scrollContainer(newIndex);
  };

  const handlePrevItem = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollContainer(newIndex);
  };

  const handleRefresh = () => {
    (async () => {
      const response = await apiAxios.feeds.updateFeed(feed?.id ?? 0, descOrder);
      dispatch(setItems(response.data));
    })();
  };

  const handleAllAsRead = (feedId?: ItemType['feedId']) => {
    const itemIds = items.filter((item) => !item.read).map((item) => item.id);
    (async () => {
      await apiAxios.items.markAllRead(itemIds);
      dispatch(updateAllRead());
      dispatch(updateAllFeedCountUnreadItems(feedId));
    })();
  };

  const handleMarkAsRead = useCallback(
    (itemId: ItemType['id'], feedId: ItemType['feedId'], read: ItemType['read']) => {
      (async () => {
        await apiAxios.items.markItemRead(read, itemId);
        dispatch(updateRead({ itemId, read }));
        dispatch(updateFeedCountUnreadItems({ feedId, read }));
      })();
    },
    []
  );

  const handleMarkAsStar = useCallback(
    (itemId: ItemType['id'], feedId: ItemType['feedId'], starred: ItemType['starred']) => {
      (async () => {
        await apiAxios.items.markItemStar(starred, itemId);
        dispatch(updateStarredMarker({ itemId, starred }));
      })();
    },
    []
  );

  const handleShowPost = () => {
    if (feed) {
      (async () => {
        const response = await apiAxios.items.getFeedUnreadItems(feed.id, descOrder, unreadOnly);
        dispatch(setItems(response.data));
        setUnreadOnly(!unreadOnly);
      })();
    } else {
      (async () => {
        const response = await apiAxios.items.getAllUnreadItems(descOrder, unreadOnly);
        dispatch(setItems(response.data));
        setUnreadOnly(!unreadOnly);
      })();
    }
  };

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = 0;
  }, [itemsDisplay]);

  return (
    <>
      <div className={styles['content']}>
        <div className={styles['toolbar']}>
          <h1 className={styles['item-title']}>{title}</h1>
          {children}
          <hr className={styles['hr']} />
        </div>
      </div>
      <div className={styles['floating']}>
        <div className={styles['pull-left']}>
          {feed && (
            <Button className={styles['btn-refresh']} onClick={handleRefresh}>
              <MdOutlineRefresh className={`${styles['icon']} ${styles['i-refresh']}`} />
              Refresh
            </Button>
          )}
          <Button className={styles['btn-check']} onClick={() => handleAllAsRead(feed?.id)}>
            <MdCheck />
            Mark all as read
          </Button>
        </div>

        <div className={styles['pull-right']}>
          <Button className={styles['btn-prev_post']} onClick={handlePrevItem}>
            <MdKeyboardArrowUp className={`${styles['icon']} ${styles['i-prev_arrow']}`} />
          </Button>
          <Button className={styles['btn-next_post']} onClick={handleNextItem}>
            <MdKeyboardArrowDown className={`${styles['icon']} ${styles['i-next_arrow']}`} />
          </Button>
          <Button className={styles['btn-sort']} onClick={() => dispatch(toggleDescOrder())}>
            {descOrder ? (
              <MdArrowDownward className={`${styles['icon']} ${styles['i-arrow_down']}`} />
            ) : (
              <MdArrowUpward className={`${styles['icon']} ${styles['i-arrow_up']}`} />
            )}
          </Button>
          <Button className={styles['btn-show_post']} onClick={handleShowPost}>
            {unreadOnly ? 'Show unread only' : 'Show all posts'}
          </Button>
        </div>
      </div>

      {items.length > 0 ? (
        <ul ref={ref} className={styles['item-list']}>
          {itemsDisplay.map((item, index) => {
            return (
              <li key={item.id} data-id={index} className={styles['item']}>
                <Item item={item} onMarkRead={handleMarkAsRead} onMarkStar={handleMarkAsStar} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles['load-container']}>
          <div className={styles['loader']}></div>
        </div>
      )}
    </>
  );
}

export default Items;

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MdArrowDownward,
  MdArrowUpward,
  MdCheck,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineRefresh
} from 'react-icons/md';

import { useFeed } from '../../context/Feed.context.tsx';
import ItemType from '../../types/itemType.ts';
import apiAxios from '../../api/index.ts';

import Item from '../Item/Item.tsx';
import Button from '../Button/Button.tsx';

import styles from './Items.module.scss';

function Items() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<ItemType[]>([]);
  const [descOrder, setDescOrder] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const { feed, starFeed } = useFeed();
  const ref = useRef<HTMLUListElement>(null);

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
      setItems(response.data);
    })();
  };

  const handleAllRead = () => {
    const itemIds = items.filter((item) => !item.read).map((item) => item.id);
    (async () => {
      await apiAxios.items.markAllRead(itemIds);
      setItems((prevState) => prevState.map((value) => ({ ...value, read: true })));
    })();
  };

  const handleMarkAsRead = useCallback((itemId: ItemType['id'], marker: ItemType['read']) => {
    (async () => {
      await apiAxios.items.markItemRead(marker, itemId);
      setItems((prevState) =>
        prevState.map((value) => {
          if (value.id === itemId) return { ...value, read: marker };
          return value;
        })
      );
    })();
  }, []);

  const handleMarkAsStar = useCallback((itemId: ItemType['id'], marker: ItemType['starred']) => {
    (async () => {
      await apiAxios.items.markItemStar(marker, itemId);
      setItems((prevState) =>
        prevState.map((value) => {
          if (value.id === itemId) return { ...value, starred: marker };
          return value;
        })
      );
    })();
  }, []);

  const handleShowPost = () => {
    if (feed) {
      (async () => {
        const response = await apiAxios.items.getFeedUnreadItems(feed.id, descOrder, unreadOnly);
        setItems(response.data);
        setUnreadOnly(!unreadOnly);
      })();
    } else {
      (async () => {
        const response = await apiAxios.items.getAllUnreadItems(descOrder, unreadOnly);
        setItems(response.data);
        setUnreadOnly(!unreadOnly);
      })();
    }
  };

  useEffect(() => {
    if (feed) {
      (async () => {
        const response = await apiAxios.items.getFeedItems(feed.id, descOrder);
        setItems(response.data);
      })();
    } else {
      (async () => {
        const response = await apiAxios.items.getAllUserItems(descOrder, starFeed);
        setItems(response.data);
      })();
    }
    setUnreadOnly(true);
  }, [feed, descOrder, starFeed]);

  return (
    <>
      <div className={styles['floating']}>
        <div className={styles['pull-left']}>
          {feed && (
            <Button className={styles['btn-refresh']} onClick={handleRefresh}>
              <MdOutlineRefresh className={`${styles['icon']} ${styles['i-refresh']}`} />
              Refresh
            </Button>
          )}
          <Button className={styles['btn-check']} onClick={handleAllRead}>
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
          <Button className={styles['btn-sort']} onClick={() => setDescOrder(!descOrder)}>
            {descOrder ? (
              <MdArrowDownward className={`${styles['icon']} ${styles['i-arrow_down']}`} />
            ) : (
              <MdArrowUpward className={`${styles['icon']} ${styles['i-arrow_up']}`} />
            )}
          </Button>
          <Button className={styles['btn-show_post']} onClick={handleShowPost}>
            {!unreadOnly ? 'Show all posts' : 'Show unread only'}
          </Button>
        </div>
      </div>

      {items.length > 0 ? (
        <ul ref={ref} className={styles['item-list']}>
          {items.map((item, index) => {
            return (
              <li key={item.id} data-id={index} className={styles['item-list__item']}>
                <Item item={item} onMarkRead={handleMarkAsRead} onMarkStar={handleMarkAsStar} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles['notif-not_found']}>There are no posts to view at this time</div>
      )}
    </>
  );
}

export default Items;

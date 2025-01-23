import { useEffect, useRef, useState } from 'react';

import { MdCheck, MdStar } from 'react-icons/md';
import dateTimeConvert from '../../utils/dateTimeConvert.ts';
import useComponentVisible from '../../hooks/useCompontentVisible.tsx';

import ItemType from '../../types/itemType.ts';

import Button from '../Button/Button.tsx';
import ConfirmPopup from '../../popups/ConfirmPopup/ConfirmPopup.tsx';

import styles from './Item.module.scss';

interface ItemProps {
  item: ItemType;
  onMarkRead: (itemId: ItemType['id'], feedId: ItemType['feedId'], read: ItemType['read']) => void;
  onMarkStar: (itemId: ItemType['id'], starred: ItemType['starred']) => void;
}

function Item({ item, onMarkRead, onMarkStar }: ItemProps) {
  const [linkHref, setLinkHref] = useState('');

  const descriptionRef = useRef(null);

  const {
    ref: refConfirmPopup,
    isComponentVisible: isConfirmPopup,
    setIsComponentVisible: setConfirmPopup
  } = useComponentVisible(false);

  useEffect(() => {
    if (descriptionRef.current) {
      const links = descriptionRef.current.querySelectorAll('a');
      links.forEach((link) =>
        link.addEventListener('click', (event) => {
          event.preventDefault();
          setLinkHref(link.getAttribute('href'));
          setConfirmPopup(true);
        })
      );
    }
  }, []);

  return (
    <>
      <div className={styles['item-header']}>
        <a href={item.link} className={styles['title']}>
          {item.title}
        </a>
        <span className={styles['pubdate']}>{dateTimeConvert(item.pubDate)}</span>
      </div>
      {item.description && (
        <div
          className={styles['description']}
          ref={descriptionRef}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      )}

      <div className={styles['control-panel']}>
        <Button className={styles['btn-star']} onClick={() => onMarkStar(item.id, !item.starred)}>
          <MdStar className={`${styles['icon']} ${item.starred ? styles['stared'] : ''}`} />{' '}
          {item.starred ? 'Unstar' : 'Star'}
        </Button>
        <Button
          className={styles['btn-check']}
          onClick={() => onMarkRead(item.id, item.feedId, !item.read)}>
          <MdCheck className={styles['icon']} /> {item.read ? 'Mark as unread' : 'Mark as read'}
        </Button>
      </div>

      {isConfirmPopup && (
        <ConfirmPopup
          myref={refConfirmPopup}
          link={linkHref}
          onClosePopup={() => setConfirmPopup(false)}
        />
      )}
    </>
  );
}

export default Item;

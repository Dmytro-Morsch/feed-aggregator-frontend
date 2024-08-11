import { MdCheck, MdStar } from 'react-icons/md';

import dateTimeConvert from '../../utils/dateTimeConvert.ts';
import ItemType from '../../types/itemType.ts';

import Button from '../Button/Button.tsx';

import styles from './Item.module.scss';

interface ItemProps {
  item: ItemType;
  onMarkRead: (itemId: ItemType['id'], feedId: ItemType['feedId'], read: ItemType['read']) => void;
  onMarkStar: (itemId: ItemType['id'], starred: ItemType['starred']) => void;
}

function Item({ item, onMarkRead, onMarkStar }: ItemProps) {
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
    </>
  );
}

export default Item;

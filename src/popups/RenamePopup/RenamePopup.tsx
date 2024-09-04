import { RefObject, useState } from 'react';

import FeedType from '../../types/feedType.ts';
import Button from '../../components/Button/Button.tsx';
import Popup from '../Popup/Popup.tsx';
import Input from '../../components/Input/Input.tsx';

import styles from './RenamePopup.module.scss';

interface RenamePopupProps {
  feed: FeedType;
  myref: RefObject<HTMLDivElement>;
  onRenameTitle: (feedId: FeedType['id'], title: FeedType['title']) => void;
  onClosePopup: () => void;
}

function RenamePopup({ myref, feed, onRenameTitle, onClosePopup }: RenamePopupProps) {
  const [title, setTitle] = useState(feed.title);

  return (
    <Popup myref={myref} onClosePopup={onClosePopup} title="Rename subscription">
      <div className={styles['popup-body']}>
        <label className={styles['label']}>Subscription name</label>
        <Input
          placeholder="Feed title"
          value={title}
          className={styles['input-title']}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <hr className={styles['hr']} />
      <div className={styles['popup-footer']}>
        <Button className={styles['cancel']} onClick={onClosePopup}>
          Cancel
        </Button>
        <Button
          className={styles['rename']}
          onClick={() => {
            onRenameTitle(feed.id, title);
            onClosePopup();
          }}>
          Rename
        </Button>
      </div>
    </Popup>
  );
}

export default RenamePopup;

import { IoCloseCircleOutline } from 'react-icons/io5';
import { MdClose, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { RefObject } from 'react';

import Button from '../../components/Button/Button.tsx';

import styles from './NotificationPopup.module.scss';

interface NotificationProps {
  onClosePopup?: () => void;
  myref?: RefObject<HTMLDivElement>;
  type?: string;
}

function NotificationPopup({ onClosePopup, type, myref }: NotificationProps) {
  const message = useSelector((state: RootState) => state.userSlice.message);

  return (
    <div className={`${styles['container']} ${type ? styles[type] : ''}`} ref={myref}>
      <Button className={styles['close']} onClick={onClosePopup}>
        <MdClose className={styles['icon']} />
      </Button>
      <div className={`${styles['message']} ${type ? styles[type] : ''}`}>
        {type === 'failed' ? (
          <>
            <IoCloseCircleOutline className={styles['icon']} />
            <p className={styles['text']}>{message}</p>
          </>
        ) : (
          <>
            <MdOutlineCheckCircleOutline className={styles['icon']} />
            <p className={styles['text']}>{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationPopup;

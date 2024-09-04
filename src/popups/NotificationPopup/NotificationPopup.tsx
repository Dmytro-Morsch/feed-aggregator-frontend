import { IoCloseCircleOutline } from 'react-icons/io5';
import { MdClose, MdOutlineCheckCircleOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { RefObject } from 'react';

import Button from '../../components/Button/Button.tsx';

import styles from './NotificationPopup.module.scss';
import UserType from '../../types/userType.ts';

interface NotificationProps {
  onClosePopup?: () => void;
  myref?: RefObject<HTMLDivElement>;
  type: 'failed' | 'success';
}

function NotificationPopup({ onClosePopup, type, myref }: NotificationProps) {
  const message: UserType = useSelector((state: RootState) => state.userSlice.message);

  return (
    <div className={`${styles['container']} ${styles[type]}`} ref={myref}>
      <Button className={styles['close']} onClick={onClosePopup}>
        <MdClose className={styles['icon']} />
      </Button>
      <div className={`${styles['message']} ${styles[type]}`}>
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

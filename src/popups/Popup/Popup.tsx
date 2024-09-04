import { ReactNode, RefObject } from 'react';

import styles from './Popup.module.scss';
import { MdClose } from 'react-icons/md';

interface PopupProps {
  children: ReactNode;
  myref: RefObject<HTMLDivElement>;
  title: string;
  onClosePopup: () => void;
}

function Popup({ children, myref, title, onClosePopup }: PopupProps) {
  return (
    <div className={styles['popup']} ref={myref}>
      <div className={styles['popup-header']}>
        <span className={styles['popup-title']}>{title}</span>
        <MdClose className={styles['icon']} onClick={onClosePopup} />
      </div>
      <hr className={styles['hr']} />
      {children}
    </div>
  );
}

export default Popup;

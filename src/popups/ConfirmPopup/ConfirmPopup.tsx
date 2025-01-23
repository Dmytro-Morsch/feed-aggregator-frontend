import { RefObject } from 'react';

import Button from '../../components/Button/Button.tsx';

import styles from './ConfirmPopup.module.scss';

interface ConfirmPopupProps {
  onClosePopup: () => void;
  link: string;
  myref: RefObject<HTMLDivElement>;
}

function ConfirmPopup({ myref, link, onClosePopup }: ConfirmPopupProps) {
  return (
    <div className={styles['popup-body']} ref={myref}>
      <p className={styles['message']}>Are you sure you want to navigate to this site?</p>
      <p className={styles['link-text']}>{link}</p>
      <div className={styles['btn-container']}>
        <Button className={styles['link']} onClick={() => window.open(link, '_blank')}>
          Navigate
        </Button>
        <Button className={styles['cancel']} onClick={onClosePopup}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ConfirmPopup;

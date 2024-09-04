import { RefObject } from 'react';

import Button from '../../components/Button/Button.tsx';
import Popup from '../Popup/Popup.tsx';

import styles from './DeletePopup.module.scss';

interface DeletePopupProps {
  onClosePopup: () => void;
  onDeleteAccount: () => void;
  myref: RefObject<HTMLDivElement>;
}

function DeletePopup({ onClosePopup, onDeleteAccount, myref }: DeletePopupProps) {
  return (
    <Popup myref={myref} onClosePopup={onClosePopup} title="Delete account">
      <div className={styles['popup-body']}>
        <p className={styles['message']}>Are you sure you want to delete account?</p>
        <div className={styles['btn-container']}>
          <Button className={styles['cancel']} onClick={onClosePopup}>
            Cancel
          </Button>
          <Button className={styles['delete']} onClick={onDeleteAccount}>
            Delete
          </Button>
        </div>
      </div>
    </Popup>
  );
}

export default DeletePopup;

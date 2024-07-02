import {useState} from 'react';
import {MdClose} from 'react-icons/md';

import Button from '../Button/Button.jsx';

import styles from './RenamePopup.module.scss';

function RenamePopup({myref, feed, onRenameTitle, onClosePopup}) {
    const [title, setTitle] = useState(feed.title);

    return (
        <div ref={myref} className={styles["rename-popup"]}>
            <div className={styles["popup-header"]}>
                <span className={styles["popup-title"]}>Rename subscription</span>
                <MdClose className={`${styles["icon"]} ${styles["i-close"]}`} onClick={onClosePopup}/>
            </div>
            <hr className={styles["hr"]}/>
            <div className={styles["popup-body"]}>
                <label className={styles["label"]}>Subscription name</label>
                <input placeholder="Feed title" value={title} className={styles["input-title"]}
                       onChange={e => setTitle(e.target.value)} required/>
            </div>
            <hr className={styles["hr"]}/>
            <div className={styles["popup-footer"]}>
                <Button className={styles["btn-cancel"]} onClick={onClosePopup}>Cancel</Button>
                <Button className={styles["btn-rename"]} onClick={() => {
                    onRenameTitle(feed.id, title);
                    onClosePopup();
                }}>Rename
                </Button>
            </div>
        </div>
    );
}

export default RenamePopup;

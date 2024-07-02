import {MdCheck} from 'react-icons/md';

import dateTimeConvert from '../../utils/dateTimeConvert.js';
import Button from '../Button/Button.jsx';

import styles from './Item.module.scss';

function Item({item, onMarkRead}) {
    return (
        <>
            <div className={styles["item-header"]}>
                <a href={item.link} className={styles["title"]}>{item.title}</a>
                <span className={styles["pubdate"]}>{dateTimeConvert(item.pubDate)}</span>
            </div>
            {item.description &&
                <div className={styles["description"]} dangerouslySetInnerHTML={{__html: item.description}}/>}

            <div className={styles["control-panel"]}>
                <Button className={styles["btn-check"]} onClick={() => onMarkRead(item.id, !item.read)}>
                    <MdCheck/> {item.read ? 'Mark as unread' : 'Mark as read'}
                </Button>
            </div>
        </>
    );
}

export default Item;

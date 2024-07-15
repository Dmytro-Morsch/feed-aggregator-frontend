import {MdCheck, MdStar} from 'react-icons/md';

import dateTimeConvert from '../../utils/dateTimeConvert.js';
import Button from '../Button/Button.jsx';

import styles from './Item.module.scss';

function Item({item, onMarkRead, onMarkStar}) {
    return (
        <>
            <div className={styles["item-header"]}>
                <a href={item.link} className={styles["title"]}>{item.title}</a>
                <span className={styles["pubdate"]}>{dateTimeConvert(item.pubDate)}</span>
            </div>
            {item.description &&
                <div className={styles["description"]} dangerouslySetInnerHTML={{__html: item.description}}/>}

            <div className={styles["control-panel"]}>
                <Button className={styles["btn-star"]} onClick={() => onMarkStar(item.id, !item.starred)}>
                    <MdStar
                        className={`${styles["icon"]} ${item.starred ? styles['stared'] : ''}`}/> {item.starred ? 'Unstar' : 'Star'}
                </Button>
                <Button className={styles["btn-check"]} onClick={() => onMarkRead(item.id, !item.read)}>
                    <MdCheck className={styles["icon"]}/> {item.read ? 'Mark as unread' : 'Mark as read'}
                </Button>
            </div>
        </>
    );
}

export default Item;

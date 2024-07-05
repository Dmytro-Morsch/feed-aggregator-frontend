import {useFeed} from '../../context/Feed.context.jsx';

import Items from '../Items/Items.jsx';

import styles from './CellContent.module.scss';

function CellContent() {
    const {feed} = useFeed();

    return (
        <div className={styles["content"]}>
            <div className={styles["toolbar"]}>
                <h1 className={styles["item-title"]}>{feed ? feed.title : 'All items'}</h1>
                {feed &&
                    <div className={styles["sources"]}>
                        <span className={`${styles["source"]} ${styles["site"]}`}>Site: <a
                            href={feed.siteLink}>{feed.siteLink}</a></span>
                        <span className={`${styles["source"]} ${styles["site"]}`}>Feed: <a
                            href={feed.feedLink}>{feed.feedLink}</a></span>
                    </div>
                }
                <hr className={styles["hr"]}/>
            </div>

            <Items/>
        </div>
    )
}

export default CellContent;

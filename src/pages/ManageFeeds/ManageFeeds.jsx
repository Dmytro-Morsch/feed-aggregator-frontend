import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {useFeed} from '../../context/Feed.context.jsx';

import API from '../../API.js';
import useComponentVisible from '../../hooks/useCompontentVisible.js';
import RenamePopup from '../../components/RenamePopup/RenamePopup.jsx';
import Button from '../../components/Button/Button.jsx';

import styles from './ManageFeeds.module.scss';

function ManageFeeds() {
    const [currentFeed, setCurrentFeed] = useState({});

    const {userFeeds, setUserFeeds, setFeed} = useFeed();

    const {
        ref: refRenamePopup,
        isComponentVisible: isRenamePopup,
        setIsComponentVisible: setRenamePopup
    } = useComponentVisible(false);

    const handleUnsubscribe = (feedId) => {
        API.unsubscribeFromFeed(feedId).then(() => {
            setUserFeeds(prevState => prevState.filter(value => value.id !== feedId));
        });
    };

    const handleRename = (feedId, title) => {
        API.renameFeed(feedId, title).then(() => {
            setUserFeeds(prevState => prevState.map(value => {
                if (value.id === feedId) return {...value, title}
                return value;
            }))
        })
    };

    useEffect(() => {
        API.getFeeds().then(r => setUserFeeds(r))
    }, []);

    return (
        <div className={styles["manage-feeds"]}>
            <div>
                <h1 className={styles["h1"]}>Manage Subscriptions</h1>
                <div className={styles["subtitle"]}>Below is a list of your current feeds. From this page, you can
                    unsubscribe
                    from existing feeds
                    as well as organize feeds into folders. You can manage the sort order and visibility settings of
                    your feeds and folders in settings. You can also view your subscription backups here.
                </div>
            </div>

            {isRenamePopup &&
                <RenamePopup myref={refRenamePopup} feed={currentFeed} onRenameTitle={handleRename}
                             onClosePopup={() => setRenamePopup(false)}/>
            }

            <ul className={styles["user-feed-list"]}>
                <li className={`${styles["header"]} ${styles["feed-name"]}`}>Feed name</li>
                <li className={`${styles["header"]} ${styles["feed-unsub"]}`}></li>
                <li className={`${styles["header"]} ${styles["feed-rename"]}`}></li>
                {userFeeds.map(feed => {
                    return (
                        <React.Fragment key={feed.id}>
                            <li className={`${styles["body"]} ${styles["feed-list__link"]}`}>
                                <div>
                                    <NavLink to={`/feeds/${feed.id}`} className={styles["site-link"]}
                                             onClick={() => setFeed(feed)}>
                                        {feed.title}
                                    </NavLink>
                                </div>
                            </li>
                            <li className={`${styles["body"]} ${styles["feed-list__unsub"]}`}>
                                <Button className={styles["btn-unsub"]} onClick={() => handleUnsubscribe(feed.id)}>
                                    Unsubscribe
                                </Button>
                            </li>
                            <li className={`${styles["body"]} ${styles["feed-list__rename"]}`}>
                                <Button myref={refRenamePopup} className={styles["btn-rename"]}
                                        onClick={() => {
                                            setCurrentFeed(feed);
                                            setRenamePopup(!isRenamePopup)
                                        }}>Rename
                                </Button>
                            </li>
                        </React.Fragment>
                    )
                })}
            </ul>
        </div>
    );
}

export default ManageFeeds;

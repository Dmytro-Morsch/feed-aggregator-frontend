import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {MdFormatListBulleted, MdHome, MdKeyboardArrowDown, MdKeyboardArrowRight} from 'react-icons/md';

import {useFeed} from '../../context/Feed.context.jsx';

import Feeds from '../Feeds/Feeds.jsx';
import Button from '../Button/Button.jsx';
import API from '../../API.js';

import styles from './AsideBar.module.scss';

function AsideBar() {
    const [link, setLink] = useState('');
    const [isOpenSub, setIsOpenSub] = useState(true);

    const {setFeed, userFeeds, setUserFeeds} = useFeed();

    const onSubmit = () => {
        if (link === '' || link === null) {
            console.log("Invalid link");
        } else {
            API.subscribeToFeed(link)
                .then(r => {
                    setUserFeeds(prevState => [...prevState, r]);
                    setLink('');
                    updateFeed(r.id);
                });
        }
    };

    const updateFeed = (feedId) => {
        const intervalId = setInterval(() => {
            API.getFeed(feedId)
                .then(updatedFeed => {
                    setUserFeeds(prevFeeds => prevFeeds.map(feed =>
                        feed.id === feedId ? updatedFeed : feed
                    ));
                    if (updatedFeed.loaded) {
                        clearInterval(intervalId);
                    }
                })
        }, 5000);
    };

    useEffect(() => {
        API.getFeeds().then(r => setUserFeeds(r));
    }, []);

    return (
        <aside className={styles['navigator']}>
            <div className={styles['form-feed']}>
                <input className={`${styles['input']} ${styles['feed']}`} placeholder="Paste feed" value={link}
                       onChange={e => setLink(e.target.value)}/>
                <Button type="button" className={styles['btn-feed']} onClick={onSubmit}>Add</Button>
            </div>

            <ul className={styles['sidebar-nav']}>
                <li className={styles['nav']}>
                    <NavLink to="/" className={styles['home']}>
                        <MdHome className={styles['icon']}/> Home
                    </NavLink>
                </li>
                <li className={styles['nav']}>
                    <NavLink to="/posts/all" className={styles['all-items']} onClick={() => setFeed(null)}>
                        <MdFormatListBulleted className={styles['icon']}/> All items
                    </NavLink>
                </li>
            </ul>

            {userFeeds.length !== 0 &&
                <div className={styles['drop-down']}>
                    <div className={styles['title']} onClick={() => setIsOpenSub(!isOpenSub)}>
                        {isOpenSub ? <MdKeyboardArrowDown className={styles['icon']}/>
                            :
                            <MdKeyboardArrowRight className={styles['icon']}/>
                        }
                        Subscriptions
                    </div>
                    {isOpenSub &&
                        <Feeds/>
                    }
                </div>
            }
        </aside>
    )
}

export default AsideBar;

import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {useFeed} from '../../context/Feed.context.jsx';
import API from '../../API.js';

import feedStyles from './Feeds.module.scss';
import loaderStyles from './Loader.module.scss';

function Feed({feed}) {
    const [num, setNum] = useState(0);
    const {setFeed, setStarFeed} = useFeed();

    const handleToFeed = () => {
        setFeed(feed);
        setStarFeed(false);
    };

    useEffect(() => {
        API.getUnreadItemsCount(feed.id).then(r => setNum(r));
    }, [feed.id]);

    return (
        <li className={feedStyles["feed-item"]} key={feed.id}>
            <NavLink to={`/feeds/${feed.id}`} className={feedStyles["feed"]} title={feed.title}
                     onClick={() => handleToFeed()}>
                {feed.loaded ?
                    <img className={feedStyles["source-icon"]} src={`/api/feeds/${feed.id}/icon`} alt=""/>
                    :
                    <div className={loaderStyles["loader"]}></div>
                }
                <span className={feedStyles["title"]}>{feed.title}</span>

                <div className={feedStyles["count-unread-posts"]}>{num}</div>
            </NavLink>
        </li>
    );
}

export default Feed;

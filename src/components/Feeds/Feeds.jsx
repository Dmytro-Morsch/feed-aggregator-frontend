import {NavLink} from 'react-router-dom';

import {useFeed} from '../../context/Feed.context.jsx';

import feedStyles from './Feeds.module.scss';
import loaderStyles from './Loader.module.scss';

function Feeds() {
    const {setFeed, userFeeds} = useFeed();

    return (
        <ul className={feedStyles["feed-list"]}>
            {userFeeds.map(feed => (
                <li className={feedStyles["feed-item"]} key={feed.id}>
                    <NavLink to={`/feeds/${feed.id}`} className={feedStyles["feed"]} title={feed.title}
                             onClick={() => setFeed(feed)}>
                        {feed.loaded ?
                            <img className={feedStyles["source-icon"]} src={`/api/feeds/${feed.id}/icon`} alt=""/>
                            :
                            <div className={loaderStyles["loader"]}></div>
                        }
                        <span className={feedStyles["title"]}>{feed.title}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default Feeds;

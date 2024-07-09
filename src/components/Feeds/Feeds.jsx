import {useFeed} from '../../context/Feed.context.jsx';
import Feed from './Feed.jsx';

import feedStyles from './Feeds.module.scss';

function Feeds() {
    const {userFeeds} = useFeed();

    return (
        <ul className={feedStyles["feed-list"]}>
            {userFeeds.map(feed => (
                <Feed feed={feed} key={feed.id}/>
            ))}
        </ul>
    );
}

export default Feeds;

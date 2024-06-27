import {useFeed} from "../../context/Feed.context.jsx";

import "./Feeds.css";
import "./Loader.css";

function Feeds({feeds}) {
    const {setFeed} = useFeed();

    return (
        <ul className="feed-list">
            {feeds.map(feed => {
                return (
                    <li className="feed-list__item" key={feed.id}>
                        <a href="#" className="feed" title={feed.title} onClick={() => setFeed(feed)}>
                            {feed.loaded ?
                                <img className="source-icon" src={`/api/feeds/${feed.id}/icon`} alt=""/>
                                :
                                <div className="loader"></div>
                            }
                            <span className="title">{feed.title}</span>
                        </a>
                    </li>
                )
            })}
        </ul>
    );
}

export default Feeds;

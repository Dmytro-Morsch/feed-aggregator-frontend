import {MdFormatListBulleted} from "react-icons/md";

import {useFeed} from "../../context/Feed.context.jsx";

import "./Feeds.css";

function Feeds({feeds}) {
    const {setFeed} = useFeed();

    return (
        <ul className="feed-list">
            <li className="feed-list__item">
                <a href="#" className="feed" onClick={() => setFeed(null)}>
                    <MdFormatListBulleted className="icon"/> All items
                </a>
            </li>
            {feeds.map(feed => {
                return (
                    <li className="feed-list__item" key={feed.id}>
                        <a href="#" className="feed" onClick={() => setFeed(feed)}>{feed.title}</a>
                    </li>
                )
            })}
        </ul>
    );
}

export default Feeds;

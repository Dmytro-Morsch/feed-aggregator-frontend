import {Items} from "../index.js";
import {useFeed} from "../../context/Feed.context.jsx";

import "./Home.css";

function Home() {
    const {feed} = useFeed();

    return (
        <div className="content">
            <div className="toolbar">
                <h1 className="item-title">{feed ? feed.title : 'All items'}</h1>
                {feed &&
                    <div className="sources">
                        <span className="source site">Site: <a href={feed.siteLink}>{feed.siteLink}</a></span>
                        <span className="source feed">Feed: <a href={feed.feedLink}>{feed.feedLink}</a></span>
                    </div>
                }
                <hr className="hr"/>
            </div>

            <Items/>
        </div>
    )
}

export default Home;

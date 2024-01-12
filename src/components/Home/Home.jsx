import {useEffect, useState} from "react";

import API from "../../API.js";
import {Feeds, Items} from "../index.js";
import {useFeed} from "../../context/Feed.context.jsx";

import "./Home.css";

function Home() {
    const [link, setLink] = useState('');
    const [feeds, setFeeds] = useState([]);

    const {feed} = useFeed();

    const onSubmit = () => {
        if (link === '' || link === null) {
            console.log("Invalid link");
        } else {
            API.postFeedLink(link);
        }
    };

    useEffect(() => {
        API.getFeeds().then(r => setFeeds(r));
    }, []);

    return (
        <div className="container">
            <div className="navigator">
                <div className="form-feed">
                    <input className="input feed" onChange={e => setLink(e.target.value)}
                           placeholder="Paste feed"/>
                    <button type="button" className="btn btn-feed" onClick={onSubmit}>Add</button>
                </div>

                <Feeds feeds={feeds}/>
            </div>

            <div className="content">
                <div className="toolbar">
                    <h1 className="item-title">{feed ? feed.title : 'All items'}</h1>
                    {feed &&
                        <div>
                            <span>Feed: <a href={feed.link}>{feed.link}</a></span>
                        </div>
                    }
                    <hr className="hr"/>
                </div>
                <Items/>
            </div>
        </div>
    )
}

export default Home;

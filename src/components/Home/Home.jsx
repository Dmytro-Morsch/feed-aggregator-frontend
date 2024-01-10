import {useEffect, useState} from "react";

import API from "../../API.js";
import {Feeds, Items} from "../index.js";

import "./Home.css";

function Home() {
    const [link, setLink] = useState('');
    const [feeds, setFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [items, setItems] = useState([]);

    const onSubmit = () => {
        if (link === '' || link === null) {
            console.log("Invalid link");
        } else {
            API.postFeedLink(link);
        }
    };

    const handleRefresh = () => {
        if (selectedFeed) {
            API.getFeedItems(selectedFeed).then(r => setItems(r));
        } else {
            API.getAllItems().then(r => setItems(r));
        }
    };

    useEffect(() => {
        API.getFeeds().then(r => setFeeds(r));
    }, []);

    useEffect(() => {
        if (selectedFeed) {
            API.getFeedItems(selectedFeed).then(r => setItems(r));
        } else {
            API.getAllItems().then(r => setItems(r));
        }
    }, [selectedFeed]);

    return (
        <div className="container">
            <div className="navigator">
                <div className="form-feed">
                    <input className="input feed" onChange={e => setLink(e.target.value)}
                           placeholder="Paste feed"/>
                    <button type="button" className="button submit" onClick={onSubmit}>Add</button>
                </div>

                <Feeds feeds={feeds} onFeedSelected={setSelectedFeed}/>
            </div>

            <div className="content">
                <div className="toolbar">
                    <button onClick={handleRefresh}>Refresh</button>
                </div>
                <Items items={items}/>
            </div>
        </div>
    )
}

export default Home;

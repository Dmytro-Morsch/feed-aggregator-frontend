import {useEffect, useState} from "react";

import API from "../../API.js";
import {Feeds, Items} from "../index.js";

import "./Home.css";

function Home() {
    const [link, setLink] = useState('');
    const [feeds, setFeeds] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [items, setItems] = useState([]);
    const [isDescOrder, setIsDescOrder] = useState(false);

    const onSubmit = () => {
        if (link === '' || link === null) {
            console.log("Invalid link");
        } else {
            API.postFeedLink(link);
        }
    };

    const handleRefresh = () => {
        if (selectedFeed) {
            API.getFeedItems(selectedFeed.id, isDescOrder).then(r => setItems(r));
        } else {
            API.getAllItems(isDescOrder).then(r => setItems(r));
        }
    };

    useEffect(() => {
        API.getFeeds().then(r => setFeeds(r));
    }, []);

    useEffect(() => {
        if (selectedFeed) {
            API.getFeedItems(selectedFeed.id, isDescOrder).then(r => setItems(r));
        } else {
            API.getAllItems(isDescOrder).then(r => setItems(r));
        }
    }, [selectedFeed, isDescOrder]);

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
                    <h1 className="item-title">{selectedFeed ? selectedFeed.title : 'All items'}</h1>
                    <hr className="hr"/>
                    <button className="button refresh" onClick={handleRefresh}>Refresh</button>
                    <button className="button sort" onClick={() => setIsDescOrder(!isDescOrder)}>
                        Sort
                    </button>
                </div>
                <Items items={items}/>
            </div>
        </div>
    )
}

export default Home;

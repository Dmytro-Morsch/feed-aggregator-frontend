import {useEffect, useState} from "react";

import API from "../../API.js";
import {Feeds, Items} from "../index.js";

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
        <>
            <h1>Home Page</h1>
            <div>
                <input onChange={e => setLink(e.target.value)} placeholder="Paste feed"/>
                <button type="button" className="button submit" onClick={onSubmit}>Submit</button>
                <Feeds feeds={feeds} onFeedSelected={setSelectedFeed}/>
            </div>

            <Items items={items}/>
        </>
    )
}

export default Home;

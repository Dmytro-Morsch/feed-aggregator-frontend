import {useEffect, useState} from "react";

import Feeds from "../Feeds/Feeds.jsx";
import API from "../../API.js";

import './AsideBar.css';

function AsideBar() {
    const [link, setLink] = useState('');
    const [feeds, setFeeds] = useState([]);

    const onSubmit = () => {
        if (link === '' || link === null) {
            console.log("Invalid link");
        } else {
            API.postFeedLink(link).then(r => {
                setFeeds(prevState => [...prevState, r]);
                setLink('');
            });
        }
    };

    useEffect(() => {
        API.getFeeds().then(r => setFeeds(r));
    }, []);

    return (
        <aside className="navigator">
            <div className="form-feed">
                <input className="input feed" placeholder="Paste feed" value={link}
                       onChange={e => setLink(e.target.value)}/>
                <button type="button" className="btn btn-feed" onClick={onSubmit}>Add</button>
            </div>

            <Feeds feeds={feeds}/>
        </aside>
    )
}

export default AsideBar;

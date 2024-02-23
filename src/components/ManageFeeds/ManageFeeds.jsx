import React, {useEffect, useState} from "react";

import API from "../../API.js";
import useComponentVisible from "../../hooks/useCompontentVisible.js";
import RenamePopup from "../RenamePopup/RenamePopup.jsx";

import "./ManageFeeds.css";

function ManageFeeds() {
    const [userFeeds, setUserFeeds] = useState([]);

    const {
        ref: refRenamePopup,
        isComponentVisible: isRenamePopup,
        setIsComponentVisible: setRenamePopup
    } = useComponentVisible(false);

    const handleUnsubscribe = (feedId) => {
        API.unsubscribeFromFeed(feedId).then(() => {
            setUserFeeds(prevState => prevState.filter(value => value.feedId !== feedId));
        });
    };

    const handleRename = (userId, feedId, feedTitle) => {
        const userFeed = {
            userId,
            feedId,
            feedTitle
        };
        console.log(userFeed)
        API.renameFeed(userFeed).then(() => {
            setUserFeeds(prevState => prevState.map(value => {
                if (value.feedId === feedId) return {...value, feedTitle: feedTitle}
                return value;
            }))
        })
    }

    useEffect(() => {
        API.getUserFeeds().then(r => setUserFeeds(r))
    }, []);

    return (
        <div className="manage-feeds">
            <div>
                <h1 className="h1">Manage Subscriptions</h1>
                <div className="subtitle">Below is a list of your current feeds. From this page, you can unsubscribe
                    from existing feeds
                    as well as organize feeds into folders. You can manage the sort order and visibility settings of
                    your feeds and folders in settings. You can also view your subscription backups here.
                </div>
            </div>

            <ul className="user-feed-list">
                <li className="header feed-name">
                    Feed name
                </li>
                <li className="header feed-unsub"></li>
                <li className="header feed-rename"></li>
                {userFeeds.map(feed => {
                    return (
                        <React.Fragment key={feed.feedId}>
                            {isRenamePopup &&
                                <RenamePopup myref={refRenamePopup} feed={feed} onRenameTitle={handleRename}
                                             onClosePopup={() => setRenamePopup(false)}/>
                            }
                            <li className="body feed-list__link">
                                <div><a href="#" className="site-link">{feed.feedTitle}</a></div>
                            </li>
                            <li className="body feed-list__unsub">
                                <button className="btn btn-unsub" onClick={() => handleUnsubscribe(feed.feedId)}>
                                    Unsubscribe
                                </button>
                            </li>
                            <li className="body feed-list__rename">
                                <button ref={refRenamePopup} className="btn btn-rename"
                                        onClick={() => setRenamePopup(!isRenamePopup)}>Rename
                                </button>
                            </li>
                        </React.Fragment>
                    )
                })}
            </ul>
        </div>
    );
}

export default ManageFeeds;

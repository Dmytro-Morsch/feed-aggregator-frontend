import {useEffect, useState} from "react";

import API from "../../API.js";
import useComponentVisible from "../../hooks/useCompontentVisible.js";
import RenamePopup from "../RenamePopup/RenamePopup.jsx";

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
        <div>
            <ul className="feed-list">
                {userFeeds.map(feed => {
                    return (
                        <li className="feed-list__feed" key={feed.feedId}>
                            {isRenamePopup &&
                                <RenamePopup myref={refRenamePopup} feed={feed} onRenameTitle={handleRename}
                                             onClosePopup={() => setRenamePopup(false)}/>
                            }
                            <span>{feed.feedTitle}</span>
                            <button className="btn btn-unsub" onClick={() => handleUnsubscribe(feed.feedId)}>
                                Unsubscribe
                            </button>

                            <button ref={refRenamePopup} className="btn btn-rename"
                                    onClick={() => setRenamePopup(!isRenamePopup)}>
                                Rename
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ManageFeeds;

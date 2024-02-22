import {useState} from "react";
import {MdClose} from "react-icons/md";

import './RenamePopup.css';

function RenamePopup({myref, feed, onRenameTitle, onClosePopup}) {
    const [title, setTitle] = useState(feed.feedTitle);

    return (
        <div ref={myref} className="rename-popup">
            <div className="popup-header">
                <span className="popup-title">Rename subscription</span>
                <MdClose className="icon i-close" onClick={onClosePopup}/>
            </div>
            <hr className="hr"/>
            <div className="popup-body">
                <label className="label">Subscription name</label>
                <input placeholder="Feed title" value={title} className="input-title"
                       onChange={e => setTitle(e.target.value)} required/>
            </div>
            <hr className="hr"/>
            <div className="popup-footer">
                <button className="btn btn-cancel" onClick={onClosePopup}>Cancel</button>
                <button className="btn btn-rename" onClick={() => {
                    onRenameTitle(feed.userId, feed.feedId, title);
                    onClosePopup();
                }}>Rename
                </button>
            </div>
        </div>
    );
}

export default RenamePopup;

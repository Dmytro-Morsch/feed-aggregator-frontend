import {useState} from "react";
import {MdCheck} from "react-icons/md";

import dateTimeConvert from "../../utils/dateTimeConvert.js";

import "./Item.css";

function Item({item}) {
    const [isRead, setIsRead] = useState(item.markAsRead);

    const handleRead = () => {
        API.markItemAsRead(!isRead, item.id).then(() => {
            setIsRead(!isRead);
            item.markAsRead = !isRead;
        });
    };

function Item({item, onMarkRead}) {
    return (
        <>
            <div className="item-header">
                <a href={item.link} className="title">{item.title}</a>
                <span className="pubdate">{dateTimeConvert(item.pubDate)}</span>
            </div>
            {item.description && <div className="description" dangerouslySetInnerHTML={{__html: item.description}}/>}

            <div className="control-panel">
                <button className="btn btn-check" onClick={handleRead}>
                    <MdCheck/> {isRead ? 'Mark as unread' : 'Mark as read'}
                </button>
            </div>
        </>
    );
}

export default Item;

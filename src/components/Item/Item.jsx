import {useState} from "react";
import {MdCheck} from "react-icons/md";

import API from "../../API.js";

import "./Item.css";

function Item({item}) {
    const [isRead, setIsRead] = useState(item.markAsRead);

    const dateTimeConvert = () => {
        const itemDate = new Date(item.pubDate);
        const isoDate = itemDate.toISOString();
        const date = isoDate.substring(0, 10);
        const time = itemDate.getHours() + ":" + isoDate.substring(14, 16);
        return date + '\n' + time;
    };

    const handleRead = () => {
        API.markItemAsRead(!isRead, item.id).then(() => {
            setIsRead(!isRead);
            item.markAsRead = !isRead;
        });
    };

    return (
        <>
            <div className="item-header">
                <a href={item.link} className="title">{item.title}</a>
                <span className="pubdate">{dateTimeConvert()}</span>
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

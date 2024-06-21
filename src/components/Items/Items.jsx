import {useCallback, useEffect, useRef, useState} from "react";
import {
    MdArrowDownward,
    MdArrowUpward,
    MdCheck,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdOutlineRefresh
} from "react-icons/md";

import API from "../../API.js";
import {useFeed} from "../../context/Feed.context.jsx";

import "./Items.css";
import Item from "../Item/Item.jsx";

function Items() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [isDescOrder, setIsDescOrder] = useState(false);
    const [unreadPosts, setUnreadPosts] = useState(true);

    const {feed} = useFeed();
    const ref = useRef(null);

    const scrollContainer = (index) => {
        if (ref.current) {
            const elem = ref.current.querySelector(`[data-id="${index}"]`)
            ref.current.scrollTop = elem.offsetTop;
        }
    };

    const handleNextItem = () => {
        const newIndex = Math.min(currentIndex + 1, items.length - 1);
        setCurrentIndex(newIndex);
        scrollContainer(newIndex);
    };

    const handlePrevItem = () => {
        const newIndex = Math.max(currentIndex - 1, 0);
        setCurrentIndex(newIndex);
        scrollContainer(newIndex);
    };

    const handleRefresh = () => {
        API.updateFeed(feed.id, isDescOrder).then(r => setItems(r));
    };

    const handleAllRead = () => {
        const itemIds = items.filter(item => !item.read).map(item => item.id);
        API.markAllAsRead(itemIds).then(() => {
            setItems((prevState) => prevState.map(value => ({...value, read: true})));
        });
    };

    const handleMarkAsRead = useCallback((itemId, marker) => {
        API.markItemAsRead(marker, itemId).then(() => {
            setItems((prevState) => prevState.map(value => {
                if (value.id === itemId) return {...value, read: marker}
                return value;
            }));
        });
    }, []);

    const handleShowPost = () => {
        if (feed) {
            API.getFeedUnreadItems(feed.id, isDescOrder, unreadPosts).then(r => {
                setUnreadPosts(!unreadPosts);
                setItems(r);
            });
        } else {
            API.getAllUnreadItems(isDescOrder, unreadPosts).then(r => {
                setUnreadPosts(!unreadPosts);
                setItems(r);
            });
        }
    };

    useEffect(() => {
        if (feed) {
            API.getFeedItems(feed.id, isDescOrder).then(r => setItems(r));
        } else {
            API.getAllUserItems(isDescOrder).then(r => setItems(r));
        }
        setUnreadPosts(true);
    }, [feed, isDescOrder]);

    return (
        <>
            <div className="floating">
                <div className="pull-left">
                    {feed && <button className="btn btn-refresh" onClick={handleRefresh}>
                        <MdOutlineRefresh className="icon i-refresh"/>Refresh
                    </button>}
                    <button className="btn btn-check" onClick={handleAllRead}>
                        <MdCheck/>Mark all as read
                    </button>
                </div>

                <div className="pull-right">
                    <button className="btn btn-prev_post" onClick={handlePrevItem}><MdKeyboardArrowUp
                        className="icon i-prev_arrow"/></button>
                    <button className="btn btn-next_post" onClick={handleNextItem}><MdKeyboardArrowDown
                        className="icon i-next_arrow"/></button>
                    <button className="btn btn-sort" onClick={() => setIsDescOrder(!isDescOrder)}>
                        {isDescOrder ? <MdArrowDownward className="icon i-arrow_down"/> :
                            <MdArrowUpward className="icon i-arrow_up"/>}
                    </button>
                    <button className="btn btn-show_post" onClick={handleShowPost}>
                        {!unreadPosts ? 'Show all posts' : 'Show unread only'}
                    </button>
                </div>
            </div>

            {items.length > 0 ?
                <ul ref={ref} className="item-list">
                    {items.map((item, index) => {
                        return (
                            <li key={`item-${item.id}`} data-id={index} className="item-list__item">
                                <Item item={item} onMarkRead={handleMarkAsRead}/>
                            </li>
                        )
                    })}
                </ul>
                : <div className="notif-not_found">There are no posts to view at this time</div>
            }
        </>
    );
}

export default Items;

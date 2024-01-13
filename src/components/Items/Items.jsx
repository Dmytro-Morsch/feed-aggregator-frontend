import {useEffect, useRef, useState} from "react";
import {MdArrowDownward, MdArrowUpward, MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineRefresh} from "react-icons/md";

import API from "../../API.js";
import {Item} from "../index.js";
import {useFeed} from "../../context/Feed.context.jsx";

import "./Items.css";

function Items() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [isDescOrder, setIsDescOrder] = useState(false);

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

    useEffect(() => {
        if (feed) {
            API.getFeedItems(feed.id, isDescOrder).then(r => setItems(r));
        } else {
            API.getAllItems(isDescOrder).then(r => setItems(r));
        }
    }, [feed, isDescOrder]);


    return (
        <>
            <div className="floating">
                <div className="pull-left">
                    {feed && <button className="btn btn-refresh" onClick={handleRefresh}>
                        <MdOutlineRefresh className="icon i-refresh"/>Refresh
                    </button>}
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
                </div>
            </div>

            {items &&
                <ul ref={ref} className="item-list">
                    {items.map((item, index) => {
                        return (
                            <li key={`item-${item.id}`} data-id={index} className="item-list__item">
                                <Item item={item}/>
                            </li>
                        )
                    })}
                </ul>
            }
        </>
    );
}

export default Items;

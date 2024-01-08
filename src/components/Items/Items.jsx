import {useEffect, useState} from "react";

import API from "../../API.js";
import {Item} from "../index.js";

import "./Items.css";

function Items() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        API.getItems().then(r => setItems(r))
    }, []);

    return (
        <ul className="item-list">
            {items.map((item) => {
                return (
                    <li key={`item-${item.id}`} className="item-list__item">
                        <Item item={item}/>
                    </li>
                )
            })}
        </ul>
    );
}

export default Items;

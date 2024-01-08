import {Item} from "../index.js";

import "./Items.css";

function Items({items}) {
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

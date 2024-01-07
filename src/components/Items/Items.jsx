import {useEffect, useState} from "react";

import API from "../../API.js";
import {Item} from "../index.js";

function Items() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        API.getItems().then(r => setItems(r))
    }, []);

    return (
        <>
            {items.map((item) => {
                return (
                    <div key={`item-${item.id}`}>
                        <Item item={item}/>
                    </div>
                )
            })}
        </>
    );
}

export default Items;

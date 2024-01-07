import {useState} from "react";

import API from "../../API.js";
import {Items} from "../index.js";

function Home() {
    const [link, setLink] = useState('');

    const onSubmit = () => {
        if (link === '' || link === null) {
            console.log("Invalid link");
        } else {
            API.postXmlLink(link);
        }
    };

    return (
        <>
            <h1>Home Page</h1>
            <input onChange={e => setLink(e.target.value)}/>
            <button type="button" onClick={onSubmit}>Submit</button>

            <Items/>
        </>
    )
}

export default Home;

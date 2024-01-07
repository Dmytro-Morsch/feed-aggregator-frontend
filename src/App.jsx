import {useState} from 'react'
import Items from "./components/Items/Items.jsx";
import API from "./API.js";

function App() {
    const [link, setLink] = useState('');

    const onSubmit = () => {
        if (link === '' || link === null) {
            console.log("Invalid link");
        } else {
            API.postXmlLink(link);
        }
    };

    return (
        <div>
            <input onChange={e => setLink(e.target.value)}/>
            <button type="button" onClick={onSubmit}>Submit</button>

            <Items/>
        </div>
    )
}

export default App

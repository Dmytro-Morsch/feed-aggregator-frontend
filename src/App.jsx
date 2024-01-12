import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Home, MainLayout} from "./components";
import {FeedProvider} from "./context/Feed.context.jsx";

function App() {

    return (
        <FeedProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<Home/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </FeedProvider>
    );
}

export default App

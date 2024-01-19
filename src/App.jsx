import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Home, MainLayout} from "./components";
import {FeedProvider} from "./context/Feed.context.jsx";
import {UserProvider} from "./context/User.context.jsx";

function App() {

    return (
        <UserProvider>
            <FeedProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainLayout/>}>
                            <Route path="/" element={<Home/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </FeedProvider>
        </UserProvider>
    );
}

export default App

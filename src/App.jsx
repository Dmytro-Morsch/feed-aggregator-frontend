import {BrowserRouter, Route, Routes} from "react-router-dom";

import {FeedProvider} from "./context/Feed.context.jsx";
import {UserProvider} from "./context/User.context.jsx";

import MainLayout from "./components/MainLayout/MainLayout.jsx";
import Home from "./components/Home/Home.jsx";
import ManageFeeds from "./components/ManageFeeds/ManageFeeds.jsx";

function App() {

    return (
        <UserProvider>
            <FeedProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainLayout/>}>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/manage/subscriptions" element={<ManageFeeds/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </FeedProvider>
        </UserProvider>
    );
}

export default App

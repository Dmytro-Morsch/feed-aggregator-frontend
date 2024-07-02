import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {FeedProvider} from './context/Feed.context.jsx';
import {UserProvider} from './context/User.context.jsx';

import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import Home from './pages/Home/Home.jsx';
import ManageFeeds from './pages/ManageFeeds/ManageFeeds.jsx';

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

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FeedProvider } from './context/Feed.context.tsx';
import { UserProvider } from './context/User.context.tsx';

import MainLayout from './layouts/MainLayout/MainLayout.tsx';
import Home from './pages/Home/Home.tsx';
import ManageFeeds from './pages/ManageFeeds/ManageFeeds.tsx';
import CellContent from './components/CellContent/CellContent.tsx';

function App() {
  return (
    <UserProvider>
      <FeedProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/posts/all" element={<CellContent />} />
              <Route path="/starred" element={<CellContent />} />
              <Route path="/feeds/:id" element={<CellContent />} />
              <Route path="/manage/subscriptions" element={<ManageFeeds />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FeedProvider>
    </UserProvider>
  );
}

export default App;

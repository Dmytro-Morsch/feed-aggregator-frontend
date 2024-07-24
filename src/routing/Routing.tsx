import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import MainLayout from '../layouts/MainLayout/MainLayout.tsx';
import Home from '../pages/Home/Home.tsx';
import ManageFeeds from '../pages/ManageFeeds/ManageFeeds.tsx';
import CellContentStarred from '../components/CellContent/CellContentStarred.tsx';
import CellContentAll from '../components/CellContent/CellContentAll.tsx';
import CellContentFeed from '../components/CellContent/CellContentFeed.tsx';

function Routing() {
  const user = useSelector((state: RootState) => state.userSlice.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/posts/all" element={<CellContentAll />} />
              <Route path="/starred" element={<CellContentStarred />} />
              <Route path="/feeds/:id" element={<CellContentFeed />} />
              <Route path="/manage/subscriptions" element={<ManageFeeds />} />
            </>
          ) : (
            <Route path="/login" element={<h1>Sign in</h1>} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;

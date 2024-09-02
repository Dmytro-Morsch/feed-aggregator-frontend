import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

import AuthLayout from '../layouts/AuthLayout/AuthLayout.tsx';
import Home from '../pages/Home/Home.tsx';
import ManageFeeds from '../pages/ManageFeeds/ManageFeeds.tsx';
import Settings from '../pages/Settings/Settings.tsx';
import CellContentStarred from '../components/CellContent/CellContentStarred.tsx';
import CellContentAll from '../components/CellContent/CellContentAll.tsx';
import CellContentFeed from '../components/CellContent/CellContentFeed.tsx';
import MainLayout from '../layouts/MainLayout/MainLayout.tsx';
import Auth from '../pages/Auth/Auth.tsx';

function Routing() {
  const isToken = useSelector((state: RootState) => state.signInUpSlice.isTokenReceived);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={isToken ? <AuthLayout /> : <Navigate to="/" />}>
            <Route index element={<Home />} />
            <Route path="posts/all" element={<CellContentAll />} />
            <Route path="starred" element={<CellContentStarred />} />
            <Route path="feeds/:id" element={<CellContentFeed />} />
            <Route path="manage/subscriptions" element={<ManageFeeds />} />
            <Route path="users/edit" element={<Settings />} />
          </Route>
          <>
            <Route path="/" element={<Auth view="sign-in" />} />
            <Route path="login" element={<Auth view="sign-in" />} />
            <Route path="signup" element={<Auth view="sign-up" />} />
          </>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;

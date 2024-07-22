import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store.ts';

import MainLayout from './layouts/MainLayout/MainLayout.tsx';
import Home from './pages/Home/Home.tsx';
import ManageFeeds from './pages/ManageFeeds/ManageFeeds.tsx';
import CellContent from './components/CellContent/CellContent.tsx';

function App() {
  return (
    <Provider store={setupStore()}>
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
    </Provider>
  );
}

export default App;

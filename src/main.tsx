import ReactDOM from 'react-dom/client';
import { setupStore } from './redux/store.ts';
import { Provider } from 'react-redux';

import App from './App';

import './index.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
);

import { BrowserRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.scss';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

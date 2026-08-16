import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Entry point: mounts the React app into the #root div in index.html.
// BrowserRouter enables client-side routing (see App.jsx for the route list)
// so navigating between pages does not reload the whole page from the server.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

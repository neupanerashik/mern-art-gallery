import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.js';
import { BrowserRouter } from 'react-router-dom';
import {HelmetProvider } from 'react-helmet-async';
import store from './store.js';
import { Provider as ReduxProvider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ReduxProvider>
  </React.StrictMode>
);